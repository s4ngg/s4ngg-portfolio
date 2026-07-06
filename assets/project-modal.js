(() => {
  const STYLE_ID = "portfolio-project-modal-style";
  const MODAL_ID = "portfolio-project-modal";

  const PROJECTS = {
    mini: {
      kind: "Mini Project",
      title: "미니프로젝트",
      description:
        "AllPick 쇼핑몰에서 회원·판매자·관리자 흐름, 상품·주문·결제·쿠폰·CS 기능과 FastAPI 기반 AI 추천 연동을 구현한 미니 프로젝트입니다.",
      domain: { label: "준비중", href: null },
      tags: ["React", "Spring Boot", "FastAPI", "AWS"],
      role: "AI 추천(FastAPI)과 AWS 인프라 구축을 단독으로 담당했고, 프론트엔드·백엔드에서는 JWT 인증 흐름과 주문·결제, 쿠폰·멤버십 기능을 맡았습니다.",
      href: "mini-project.html",
    },
    final: {
      kind: "Final Project",
      title: "파이널프로젝트",
      description:
        "TFT-gogo 전적 검색 서비스에서 Riot API 기반 매치 분석, 메타덱·패치노트, AI 추천, 커뮤니티 기능을 모노레포로 구현 중인 파이널 프로젝트입니다.",
      domain: { label: "tftgogo.com", href: "https://tftgogo.com" },
      tags: ["Spring Boot", "React", "FastAPI", "Docker"],
      role: "AWS 인프라 구축을 단독으로 담당했고, 프론트엔드·백엔드·AI 전반에서 덱 모음과 AI 기반 덱 추천 기능을 맡았습니다.",
      href: "final-project.html",
    },
    troubleshooting: {
      kind: "Troubleshooting",
      title: "트러블슛팅 기록",
      description:
        "프로젝트 중 만난 배포, API, DB 연동, 인증 흐름 이슈를 재현 조건부터 원인 분석, 해결 방법, 재검증까지 정리했습니다.",
      domain: null,
      tags: ["Debugging", "Log", "Deploy", "API"],
      role: null,
      href: "troubleshooting.html",
    },
  };

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${MODAL_ID} {
        position: fixed;
        inset: 0;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        background: rgba(12, 14, 18, 0.72);
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: opacity 0.2s ease, visibility 0.2s ease;
      }
      #${MODAL_ID}[aria-hidden="false"] {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
      }
      #${MODAL_ID} .project-modal-panel {
        position: relative;
        width: min(560px, 100%);
        max-height: calc(100vh - 48px);
        overflow-y: auto;
        padding: 32px;
        border-radius: 12px;
        background: #ffffff;
        transform: scale(0.94);
        opacity: 0;
        transition: transform 0.22s ease, opacity 0.22s ease;
        font-family: "Inter", "Noto Sans KR", sans-serif;
      }
      #${MODAL_ID}[aria-hidden="false"] .project-modal-panel {
        transform: scale(1);
        opacity: 1;
      }
      #${MODAL_ID} .project-modal-close {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 36px;
        height: 36px;
        border: 1px solid #e1e4e7;
        border-radius: 50%;
        background: #ffffff;
        color: #111827;
        font-size: 20px;
        font-weight: 800;
        line-height: 1;
        cursor: pointer;
      }
      #${MODAL_ID} .project-modal-kind {
        display: block;
        color: #6a7075;
        font-size: 12px;
        font-weight: 700;
        line-height: 18px;
        text-transform: uppercase;
      }
      #${MODAL_ID} .project-modal-title {
        margin-top: 8px;
        color: #141516;
        font-size: 24px;
        font-weight: 800;
        line-height: 1.3;
      }
      #${MODAL_ID} .project-modal-copy {
        margin-top: 14px;
        color: #4f565c;
        font-size: 14px;
        line-height: 1.68;
      }
      #${MODAL_ID} .project-modal-meta {
        margin: 22px 0 0;
        display: grid;
        gap: 16px;
      }
      #${MODAL_ID} .project-modal-row dt {
        color: #6a7075;
        font-size: 12px;
        font-weight: 700;
        line-height: 18px;
        text-transform: uppercase;
      }
      #${MODAL_ID} .project-modal-row dd {
        margin: 6px 0 0;
        color: #141516;
        font-size: 14px;
        font-weight: 600;
        line-height: 1.6;
      }
      #${MODAL_ID} .project-modal-row dd a {
        color: #1d4ed8;
        text-decoration: underline;
      }
      #${MODAL_ID} .project-modal-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 7px;
        margin: 6px 0 0;
        padding: 0;
        list-style: none;
      }
      #${MODAL_ID} .project-modal-tags li {
        padding: 5px 9px;
        border: 1px solid #dde1e5;
        border-radius: 999px;
        color: #4f565c;
        font-size: 12px;
        font-weight: 700;
        line-height: 16px;
      }
      #${MODAL_ID} .project-modal-link {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        margin-top: 26px;
        color: #ffffff;
        background: #141516;
        padding: 10px 16px;
        border-radius: 999px;
        font-size: 13px;
        font-weight: 800;
        line-height: 20px;
        text-decoration: none;
      }
      #${MODAL_ID} .project-modal-link .material-symbols-outlined {
        font-size: 17px;
      }
      @media (max-width: 640px) {
        #${MODAL_ID} .project-modal-panel {
          padding: 24px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function ensureModal() {
    const existing = document.getElementById(MODAL_ID);
    if (existing) return existing;

    const modal = document.createElement("div");
    modal.id = MODAL_ID;
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.innerHTML = `
      <div class="project-modal-panel">
        <button class="project-modal-close" type="button" aria-label="닫기">×</button>
        <span class="project-modal-kind"></span>
        <h3 class="project-modal-title"></h3>
        <p class="project-modal-copy"></p>
        <dl class="project-modal-meta">
          <div class="project-modal-row" data-row="domain">
            <dt>도메인 주소</dt>
            <dd></dd>
          </div>
          <div class="project-modal-row" data-row="tags">
            <dt>사용 기술</dt>
            <dd><ul class="project-modal-tags"></ul></dd>
          </div>
          <div class="project-modal-row" data-row="role">
            <dt>담당 파트</dt>
            <dd></dd>
          </div>
        </dl>
        <a class="project-modal-link" href="#">상세 페이지 보기 <span class="material-symbols-outlined" aria-hidden="true">arrow_outward</span></a>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  let lastTrigger = null;

  function closeModal(modal) {
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  }

  function renderRow(modal, rowName, content) {
    const row = modal.querySelector(`.project-modal-row[data-row="${rowName}"]`);
    if (!content) {
      row.style.display = "none";
      return;
    }
    row.style.display = "";
    return row.querySelector("dd");
  }

  function openModal(modal, project, trigger) {
    lastTrigger = trigger;

    modal.querySelector(".project-modal-kind").textContent = project.kind;
    modal.querySelector(".project-modal-title").textContent = project.title;
    modal.querySelector(".project-modal-copy").textContent = project.description;

    const domainDd = renderRow(modal, "domain", project.domain);
    if (domainDd) {
      domainDd.textContent = "";
      if (project.domain.href) {
        const link = document.createElement("a");
        link.href = project.domain.href;
        link.target = "_blank";
        link.rel = "noreferrer";
        link.textContent = project.domain.label;
        domainDd.appendChild(link);
      } else {
        domainDd.textContent = project.domain.label;
      }
    }

    const tagsDd = renderRow(modal, "tags", project.tags && project.tags.length);
    if (tagsDd) {
      const list = tagsDd.querySelector("ul");
      list.innerHTML = "";
      project.tags.forEach((tag) => {
        const li = document.createElement("li");
        li.textContent = tag;
        list.appendChild(li);
      });
    }

    const roleDd = renderRow(modal, "role", project.role);
    if (roleDd) {
      roleDd.textContent = project.role;
    }

    modal.querySelector(".project-modal-link").href = project.href;

    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.querySelector(".project-modal-close").focus();
  }

  function init() {
    ensureStyle();
    const modal = ensureModal();
    const closeButton = modal.querySelector(".project-modal-close");

    document.querySelectorAll("[data-project-modal]").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const project = PROJECTS[trigger.dataset.projectModal];
        if (project) openModal(modal, project, trigger);
      });
    });

    closeButton.addEventListener("click", () => closeModal(modal));
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal(modal);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
        closeModal(modal);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
