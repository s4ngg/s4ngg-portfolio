/*!
 * Portfolio AI 챗봇 위젯 (프레임워크 없음, 단일 파일)
 *
 * 사용법: 페이지 </body> 앞에 아래 한 줄만 추가
 *   <script src="assets/chat-widget.js" data-endpoint="https://portfolio-agent.onrender.com" defer></script>
 *
 * data-endpoint 는 백엔드 베이스 URL. 위젯은 여기에 POST {endpoint}/chat 만 호출한다.
 * API 키 등 비밀값은 위젯에 절대 두지 않는다 (백엔드 환경변수로만 관리).
 */
(function () {
  "use strict";

  if (window.__portfolioAgentLoaded) return;
  window.__portfolioAgentLoaded = true;

  var script =
    document.currentScript || document.querySelector("script[data-endpoint]");
  var ENDPOINT = (
    (script && script.dataset.endpoint) ||
    window.PORTFOLIO_AGENT_ENDPOINT ||
    ""
  ).replace(/\/$/, "");

  var SUGGESTIONS = [
    "AllPick에서 어떤 역할을 맡았나요?",
    "N+1 쿼리 문제는 어떻게 해결했나요?",
    "TFT-gogo에서 성능을 얼마나 개선했나요?",
    "협업할 때 어떤 방식으로 일하나요?",
  ];

  var STYLE = [
    ".pa-fab{position:fixed;right:20px;bottom:20px;z-index:2147483000;width:56px;height:56px;border:0;border-radius:50%;",
    "background:#1d4ed8;color:#fff;cursor:pointer;box-shadow:0 6px 24px rgba(29,78,216,.35);display:flex;align-items:center;",
    "justify-content:center;transition:transform .15s ease}",
    ".pa-fab:hover{transform:scale(1.06)}",
    ".pa-fab svg{width:26px;height:26px}",
    ".pa-panel{position:fixed;right:20px;bottom:88px;z-index:2147483000;width:min(380px,calc(100vw - 32px));",
    "height:min(560px,calc(100vh - 120px));background:#fff;border:1px solid #e5e5e5;border-radius:16px;display:flex;",
    "flex-direction:column;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.18);font-family:inherit}",
    ".pa-panel[hidden]{display:none}",
    ".pa-head{padding:14px 16px;background:#1d4ed8;color:#fff;display:flex;align-items:center;justify-content:space-between}",
    ".pa-head strong{font-size:14px;font-weight:700}",
    ".pa-head span{font-size:12px;opacity:.8;display:block;margin-top:2px}",
    ".pa-close{background:transparent;border:0;color:#fff;font-size:20px;line-height:1;cursor:pointer;padding:4px}",
    ".pa-body{flex:1;overflow-y:auto;padding:16px;background:#fafafa}",
    ".pa-msg{margin-bottom:12px;display:flex}",
    ".pa-msg.user{justify-content:flex-end}",
    ".pa-bubble{max-width:85%;padding:10px 12px;border-radius:12px;font-size:13.5px;line-height:1.6;white-space:pre-wrap;word-break:break-word}",
    ".pa-msg.bot .pa-bubble{background:#fff;border:1px solid #e5e5e5;color:#171717}",
    ".pa-msg.user .pa-bubble{background:#1d4ed8;color:#fff}",
    ".pa-sources{margin-top:8px;display:grid;gap:6px}",
    ".pa-source{font-size:11.5px;border:1px solid #e5e5e5;border-radius:8px;padding:6px 8px;background:#fff;color:#404040;text-decoration:none;display:block}",
    ".pa-source:hover{border-color:#1d4ed8}",
    ".pa-source b{color:#1d4ed8;font-weight:700}",
    ".pa-chips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px}",
    ".pa-chip{font-size:12px;border:1px solid #d4d4d4;background:#fff;border-radius:999px;padding:6px 10px;cursor:pointer;color:#404040}",
    ".pa-chip:hover{border-color:#1d4ed8;color:#1d4ed8}",
    ".pa-foot{border-top:1px solid #e5e5e5;padding:10px;display:flex;gap:8px;background:#fff}",
    ".pa-foot input{flex:1;border:1px solid #d4d4d4;border-radius:10px;padding:9px 11px;font-size:13.5px;font-family:inherit;outline:none}",
    ".pa-foot input:focus{border-color:#1d4ed8}",
    ".pa-send{border:0;background:#1d4ed8;color:#fff;border-radius:10px;padding:0 14px;font-size:13px;font-weight:700;cursor:pointer}",
    ".pa-send:disabled{opacity:.5;cursor:default}",
    ".pa-dots{display:inline-block}.pa-dots::after{content:'';animation:pa-dots 1.2s steps(4,end) infinite}",
    "@keyframes pa-dots{0%{content:''}25%{content:'.'}50%{content:'..'}75%{content:'...'}}",
    ".pa-note{font-size:11px;color:#a3a3a3;text-align:center;padding:0 16px 10px;background:#fafafa}",
  ].join("");

  var CHAT_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';

  var state = { open: false, busy: false, history: [] };
  var els = {};

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function mount() {
    var style = el("style");
    style.textContent = STYLE;
    document.head.appendChild(style);

    els.fab = el("button", "pa-fab");
    els.fab.setAttribute("aria-label", "포트폴리오 챗봇 열기");
    els.fab.innerHTML = CHAT_ICON;
    els.fab.addEventListener("click", toggle);

    els.panel = el("div", "pa-panel");
    els.panel.hidden = true;
    els.panel.setAttribute("role", "dialog");
    els.panel.setAttribute("aria-label", "포트폴리오 AI 챗봇");
    els.panel.innerHTML =
      '<div class="pa-head"><div><strong>포트폴리오 AI 챗봇</strong>' +
      "<span>프로젝트·경력 내용을 근거로 답합니다</span></div>" +
      '<button class="pa-close" aria-label="닫기">&times;</button></div>' +
      '<div class="pa-body"></div>' +
      '<div class="pa-note">AI가 생성한 답변이며 부정확할 수 있습니다.</div>' +
      '<form class="pa-foot"><input type="text" placeholder="질문을 입력하세요" ' +
      'autocomplete="off" aria-label="질문 입력" maxlength="1000"/>' +
      '<button class="pa-send" type="submit">전송</button></form>';

    els.body = els.panel.querySelector(".pa-body");
    els.input = els.panel.querySelector("input");
    els.send = els.panel.querySelector(".pa-send");
    els.panel.querySelector(".pa-close").addEventListener("click", toggle);
    els.panel.querySelector(".pa-foot").addEventListener("submit", onSubmit);

    document.body.appendChild(els.fab);
    document.body.appendChild(els.panel);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && state.open) toggle();
    });

    renderIntro();
  }

  function toggle() {
    state.open = !state.open;
    els.panel.hidden = !state.open;
    els.fab.setAttribute("aria-label", state.open ? "챗봇 닫기" : "포트폴리오 챗봇 열기");
    if (state.open) setTimeout(function () { els.input.focus(); }, 50);
  }

  function renderIntro() {
    var wrap = el("div", "pa-msg bot");
    var bubble = el(
      "div",
      "pa-bubble",
      "안녕하세요. 김상우 님의 포트폴리오에 대해 궁금한 점을 물어보세요."
    );
    var chips = el("div", "pa-chips");
    SUGGESTIONS.forEach(function (q) {
      var c = el("button", "pa-chip", q);
      c.type = "button";
      c.addEventListener("click", function () { ask(q); });
      chips.appendChild(c);
    });
    bubble.appendChild(chips);
    wrap.appendChild(bubble);
    els.body.appendChild(wrap);
  }

  function addMessage(role, text) {
    var wrap = el("div", "pa-msg " + role);
    var bubble = el("div", "pa-bubble");
    bubble.textContent = text;
    wrap.appendChild(bubble);
    els.body.appendChild(wrap);
    els.body.scrollTop = els.body.scrollHeight;
    return bubble;
  }

  function addSources(bubble, sources) {
    if (!sources || !sources.length) return;
    var box = el("div", "pa-sources");
    sources.forEach(function (s) {
      var a = el("a", "pa-source");
      a.href = s.url;
      a.target = "_blank";
      a.rel = "noreferrer";
      a.innerHTML =
        "<b>" + escapeHtml(s.title) + "</b>" +
        (s.heading ? " · " + escapeHtml(s.heading) : "") +
        "<br>" + escapeHtml(s.snippet);
      box.appendChild(a);
    });
    bubble.appendChild(box);
    els.body.scrollTop = els.body.scrollHeight;
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    ask(els.input.value);
  }

  function ask(question) {
    question = (question || "").trim();
    if (!question || state.busy) return;

    if (!ENDPOINT) {
      addMessage("bot", "챗봇 백엔드 주소가 설정되지 않았습니다 (data-endpoint).");
      return;
    }

    els.input.value = "";
    addMessage("user", question);
    state.busy = true;
    els.send.disabled = true;

    var pending = addMessage("bot", "");
    pending.innerHTML = '<span class="pa-dots">답변 작성 중</span>';

    fetch(ENDPOINT + "/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: question, history: state.history.slice(-4) }),
    })
      .then(function (r) {
        return r.json().then(function (data) { return { ok: r.ok, status: r.status, data: data }; });
      })
      .then(function (res) {
        var data = res.data || {};
        pending.textContent = data.answer || "답변을 가져오지 못했습니다.";
        if (res.ok) {
          addSources(pending, data.sources);
          state.history.push({ role: "user", content: question });
          state.history.push({ role: "assistant", content: data.answer || "" });
        }
      })
      .catch(function () {
        pending.textContent = "네트워크 오류로 답변을 가져오지 못했습니다. 잠시 후 다시 시도해 주세요.";
      })
      .finally(function () {
        state.busy = false;
        els.send.disabled = false;
        els.body.scrollTop = els.body.scrollHeight;
        els.input.focus();
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
