(() => {
  const STYLE_ID = "portfolio-project-modal-style";
  const MODAL_ID = "portfolio-project-modal";

  const PROJECTS = {
    mini: {
      kind: "쇼핑몰 서비스",
      title: "AllPick",
      accent: "blue",
      description:
        "AllPick 쇼핑몰에서 회원·판매자·관리자 흐름, 상품·주문·결제·쿠폰·CS 기능과 FastAPI 기반 AI 추천 연동을 구현한 프로젝트입니다.",
      domain: { label: "https://d15b731cpaqp76.cloudfront.net/ (배포중단상태)", href: "https://d15b731cpaqp76.cloudfront.net/" },
      tags: ["Java", "React", "Spring Boot", "FastAPI", "AWS"],
      techGroups: [
        { label: "Frontend", items: ["React", "JavaScript", "HTML/CSS", "Axios"] },
        { label: "Backend", items: ["Java", "Spring Boot", "Spring Security", "JPA", "JWT", "MySQL"] },
        { label: "AI", items: ["FastAPI", "Python", "OpenAI API"] },
        { label: "Infra", items: ["AWS EC2", "S3 Bucket", "CloudFront", "GitHub Actions"] },
      ],
      role: "AI 추천(FastAPI)과 EC2·S3·CloudFront 기반 AWS 배포 구성을 단독으로 담당했고, 프론트엔드·백엔드에서는 JWT 인증 흐름과 주문·결제, 쿠폰·멤버십 기능을 맡았습니다.",
      href: "mini-project.html",
      previewImage: { src: "assets/allpick-modal-summary.png", alt: "AllPick 쇼핑몰 주요 화면 요약" },
      previewImages: [
        { src: "assets/allpick-main-home.png", alt: "AllPick 쇼핑몰 메인 홈페이지 화면", caption: "메인 홈" },
        { src: "assets/allpick-auth-seller-flow.png", alt: "AllPick 회원가입, 로그인, 판매자 신청 화면", caption: "회원가입·로그인·판매자 신청" },
        { src: "assets/allpick-product-category-management.png", alt: "AllPick 상품과 카테고리 관리 화면", caption: "상품·카테고리 관리" },
        { src: "assets/allpick-order-payment-flow.png", alt: "AllPick 주문서, Toss Payments 결제창, 주문 내역 화면", caption: "주문·결제 흐름" },
        { src: "assets/allpick-ai-recommendation.png", alt: "AllPick AI 상품 추천 화면", caption: "AI 상품 추천" },
      ],
    },
    final: {
      kind: "롤토체스 전적 검색 서비스",
      title: "TFT-gogo",
      accent: "violet",
      description:
        "TFT-gogo 전적 검색 서비스에서 Riot API 기반 매치 분석, 메타덱, 게임 가이드, AI 맞춤 덱 추천 기능을 모노레포로 구현 중인 프로젝트입니다.",
      domain: { label: "tftgogo.com (배포중단상태)", href: null },
      tags: ["Java", "Spring Boot", "React", "FastAPI", "Docker", "AWS"],
      techGroups: [
        { label: "Frontend", items: ["React", "TypeScript", "Vite", "TanStack Query", "Axios", "Zustand"] },
        { label: "Backend", items: ["Java", "Spring Boot", "Spring Security", "Spring Data JPA", "MySQL", "Redis", "Flyway", "JWT"] },
        { label: "AI", items: ["FastAPI", "Pydantic", "SQLAlchemy", "PostgreSQL/pgvector", "OpenAI API"] },
        { label: "Infra", items: ["Docker", "Docker Compose", "AWS ECS", "AWS ECR", "ALB", "GitHub Actions"] },
      ],
      role: "AWS 인프라 구축을 단독으로 담당했고, 프론트엔드·백엔드·AI 서버를 연결해 덱 모음과 AI 기반 덱 추천 기능의 화면, API 계약, 배포 흐름을 맡았습니다.",
      href: "final-project.html",
      previewImage: { src: "assets/tft-main-dashboard.png", alt: "TFT-gogo 메인 대시보드와 메타 스냅샷 화면" },
      previewImages: [
        { src: "assets/tft-main-dashboard.png", alt: "TFT-gogo 메인 대시보드와 메타 스냅샷 화면", caption: "메인 대시보드" },
        { src: "assets/tft-search-detail.png", alt: "TFT-gogo 소환사 전적 검색 결과와 최근 매치 목록 화면", caption: "전적 검색" },
        { src: "assets/tft-decks-list.png", alt: "TFT-gogo 덱모음 메타덱 목록 화면", caption: "메타덱 목록" },
        { src: "assets/tft-game-guide.png", alt: "TFT-gogo 게임 가이드 시너지 정보 화면", caption: "게임 가이드" },
        { src: "assets/tft-ai-recommendation.png", alt: "TFT-gogo AI 맞춤 덱 추천 결과 화면", caption: "AI 맞춤 덱 추천" },
        { src: "assets/tft-aws-architecture.png", alt: "TFT-gogo AWS 아키텍처 다이어그램", caption: "AWS 아키텍처" },
        { src: "assets/tft-usecase-diagram.png", alt: "TFT-gogo 유스케이스 다이어그램", caption: "유스케이스 다이어그램" },
      ],
    },
    lojipsa: {
      kind: "로스트아크 AI 에이전트 플랫폼",
      title: "Lojipsa",
      accent: "emerald",
      description:
        "로스트아크 게임 정보를 자동으로 수집·판단해 Slack으로 전달하는 AI 에이전트 여러 개를 혼자 기획·개발·배포·운영하는 개인 프로젝트입니다. 배포 후에도 스스로 품질을 점검하는 피드백 에이전트까지 구현했습니다.",
      domain: { label: "lojipsa.com", href: "https://lojipsa.com" },
      tags: ["Spring Boot", "Next.js", "Claude API", "PostgreSQL", "AWS"],
      techGroups: [
        { label: "Backend", items: ["Java", "Spring Boot", "Spring Data JPA", "Discord OAuth2", "JWT"] },
        { label: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS"] },
        { label: "AI", items: ["Claude API(Anthropic)", "스케줄 기반 Agent", "LLM-as-judge"] },
        { label: "Infra", items: ["Docker", "AWS EC2", "RDS(PostgreSQL)", "Route 53", "Vercel"] },
      ],
      role: "1인 프로젝트로 기획·백엔드·프론트·인프라·운영 전체를 담당. 배경지식 주입으로 LLM의 환각을 막고, 실 유저 데이터 없이 합성 시나리오로 핵심 기능을 매일 자동 실행해 그 결과를 다시 LLM으로 채점(LLM-as-judge)하는 자체 피드백 루프를 설계·구현했습니다.",
      href: "lojipsa-project.html",
      previewImage: { src: "assets/lojipsa-main-home.png", alt: "Lojipsa 홈 화면" },
      previewImages: [
        { src: "assets/lojipsa-main-home.png", alt: "Lojipsa 홈 화면", caption: "홈 — 배포된 에이전트 소개" },
        { src: "assets/lojipsa-my-roster.png", alt: "Lojipsa 내 공격대 캐릭터 목록 화면", caption: "내 공격대" },
        { src: "assets/lojipsa-homework-management.png", alt: "Lojipsa 숙제 관리 화면", caption: "숙제 관리" },
        { src: "assets/lojipsa-weekly-gold.png", alt: "Lojipsa 주간 골드 계산 화면", caption: "주간 골드 계산" },
        { src: "assets/lojipsa-ai-recommendation.png", alt: "Lojipsa 원정대 방향성 AI 추천 결과 화면", caption: "원정대 방향성 AI 추천" },
      ],
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
        display: flex;
        width: min(1320px, 96vw);
        height: min(800px, 90vh);
        border-radius: 16px;
        background: #ffffff;
        overflow: hidden;
        transform: scale(0.94);
        opacity: 0;
        transition: transform 0.22s ease, opacity 0.22s ease;
        font-family: "Inter", "Noto Sans KR", sans-serif;
      }
      #${MODAL_ID}[aria-hidden="false"] .project-modal-panel {
        transform: scale(1);
        opacity: 1;
      }
      #${MODAL_ID} .project-modal-preview {
        position: relative;
        flex: 1 1 62%;
        overflow-y: auto;
        background: #f8fafc;
        border-right: 1px solid #e6e7e9;
      }
      #${MODAL_ID} .project-modal-preview > img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        padding: 18px;
      }
      #${MODAL_ID} .project-modal-preview-scroll {
        display: grid;
        gap: 18px;
        padding: 22px;
      }
      #${MODAL_ID} .project-modal-shot {
        overflow: hidden;
        border: 1px solid #e1e6ef;
        border-radius: 14px;
        background: #ffffff;
        box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
      }
      #${MODAL_ID} .project-modal-shot img {
        display: block;
        width: 100%;
        height: auto;
        max-height: 520px;
        object-fit: contain;
        background: #eef2ff;
      }
      #${MODAL_ID} .project-modal-shot figcaption {
        border-top: 1px solid #e5e7eb;
        padding: 10px 14px;
        color: #4f565c;
        font-size: 12px;
        font-weight: 800;
        line-height: 1.5;
        background: #ffffff;
      }
      #${MODAL_ID} .project-modal-preview-badge {
        position: absolute;
        left: 12px;
        bottom: 12px;
        border-radius: 999px;
        background: rgba(20, 21, 22, 0.72);
        padding: 5px 12px;
        color: #ffffff;
        font-size: 12px;
        font-weight: 700;
      }
      #${MODAL_ID} .project-modal-body {
        flex: 1 1 38%;
        min-width: 0;
        padding: 32px;
        overflow-y: auto;
      }
      #${MODAL_ID} .project-modal-close {
        position: absolute;
        top: 16px;
        right: 16px;
        z-index: 1;
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
      #${MODAL_ID} .project-modal-tech-groups {
        display: grid;
        gap: 10px;
        margin: 8px 0 0;
      }
      #${MODAL_ID} .project-modal-tech-group {
        display: grid;
        gap: 5px;
      }
      #${MODAL_ID} .project-modal-tech-label {
        color: #141516;
        font-size: 13px;
        font-weight: 800;
        line-height: 18px;
      }
      #${MODAL_ID} .project-modal-tech-list {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      #${MODAL_ID} .project-modal-tech-list li {
        padding: 4px 8px;
        border: 1px solid #dde1e5;
        border-radius: 999px;
        background: #f8fafc;
        color: #4f565c;
        font-size: 11px;
        font-weight: 700;
        line-height: 15px;
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
      #${MODAL_ID} .project-modal-panel[data-accent="blue"] .project-modal-title {
        color: #1d4ed8;
      }
      #${MODAL_ID} .project-modal-panel[data-accent="blue"] .project-modal-tech-label {
        color: #1d4ed8;
      }
      #${MODAL_ID} .project-modal-panel[data-accent="blue"] .project-modal-tech-list li,
      #${MODAL_ID} .project-modal-panel[data-accent="blue"] .project-modal-tags li {
        background: #eff6ff;
        border-color: #dbeafe;
        color: #1d4ed8;
      }
      #${MODAL_ID} .project-modal-panel[data-accent="blue"] .project-modal-link {
        background: #1d4ed8;
      }
      #${MODAL_ID} .project-modal-panel[data-accent="violet"] .project-modal-title {
        color: #6d28d9;
      }
      #${MODAL_ID} .project-modal-panel[data-accent="violet"] .project-modal-tech-label {
        color: #6d28d9;
      }
      #${MODAL_ID} .project-modal-panel[data-accent="violet"] .project-modal-tech-list li,
      #${MODAL_ID} .project-modal-panel[data-accent="violet"] .project-modal-tags li {
        background: #f5f3ff;
        border-color: #ede9fe;
        color: #6d28d9;
      }
      #${MODAL_ID} .project-modal-panel[data-accent="violet"] .project-modal-link {
        background: #6d28d9;
      }
      #${MODAL_ID} .project-modal-panel[data-accent="emerald"] .project-modal-title {
        color: #047857;
      }
      #${MODAL_ID} .project-modal-panel[data-accent="emerald"] .project-modal-tech-label {
        color: #047857;
      }
      #${MODAL_ID} .project-modal-panel[data-accent="emerald"] .project-modal-tech-list li,
      #${MODAL_ID} .project-modal-panel[data-accent="emerald"] .project-modal-tags li {
        background: #ecfdf5;
        border-color: #d1fae5;
        color: #047857;
      }
      #${MODAL_ID} .project-modal-panel[data-accent="emerald"] .project-modal-link {
        background: #047857;
      }
      @media (max-width: 800px) {
        #${MODAL_ID} {
          padding: 0;
        }
        #${MODAL_ID} .project-modal-panel {
          width: 100%;
          height: 100%;
          flex-direction: column;
          border-radius: 0;
        }
        #${MODAL_ID} .project-modal-preview {
          flex: 0 0 46%;
          border-right: none;
          border-bottom: 1px solid #e6e7e9;
        }
        #${MODAL_ID} .project-modal-preview-scroll {
          padding: 16px;
        }
        #${MODAL_ID} .project-modal-body {
          flex: 1 1 auto;
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
        <div class="project-modal-preview">
          <div class="project-modal-preview-scroll"></div>
        </div>
        <div class="project-modal-body">
          <span class="project-modal-kind"></span>
          <h3 class="project-modal-title"></h3>
          <p class="project-modal-copy"></p>
          <dl class="project-modal-meta">
            <div class="project-modal-row" data-row="domain">
              <dt>도메인 주소</dt>
              <dd></dd>
            </div>
            <div class="project-modal-row" data-row="tech">
              <dt>사용 기술</dt>
              <dd></dd>
            </div>
            <div class="project-modal-row" data-row="role">
              <dt>담당 파트</dt>
              <dd></dd>
            </div>
          </dl>
          <a class="project-modal-link" href="#">상세 페이지 보기 <span class="material-symbols-outlined" aria-hidden="true">arrow_outward</span></a>
        </div>
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

  function renderPreview(modal, project) {
    const preview = modal.querySelector(".project-modal-preview-scroll");
    preview.innerHTML = "";

    const images = project.previewImages && project.previewImages.length
      ? project.previewImages
      : [project.previewImage];

    images.forEach((image) => {
      const figure = document.createElement("figure");
      figure.className = "project-modal-shot";

      const img = document.createElement("img");
      img.src = image.src;
      img.alt = image.alt || "";
      figure.appendChild(img);

      if (image.caption) {
        const caption = document.createElement("figcaption");
        caption.textContent = image.caption;
        figure.appendChild(caption);
      }

      preview.appendChild(figure);
    });

    preview.scrollTop = 0;
  }

  function openModal(modal, project, trigger) {
    lastTrigger = trigger;

    modal.querySelector(".project-modal-panel").dataset.accent = project.accent || "";

    renderPreview(modal, project);

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

    const techDd = renderRow(
      modal,
      "tech",
      (project.techGroups && project.techGroups.length) || (project.tags && project.tags.length)
    );
    if (techDd) {
      techDd.innerHTML = "";
      if (project.techGroups && project.techGroups.length) {
        const wrapper = document.createElement("div");
        wrapper.className = "project-modal-tech-groups";
        project.techGroups.forEach((group) => {
          const groupEl = document.createElement("div");
          groupEl.className = "project-modal-tech-group";

          const label = document.createElement("p");
          label.className = "project-modal-tech-label";
          label.textContent = group.label;
          groupEl.appendChild(label);

          const list = document.createElement("ul");
          list.className = "project-modal-tech-list";
          group.items.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item;
            list.appendChild(li);
          });
          groupEl.appendChild(list);
          wrapper.appendChild(groupEl);
        });
        techDd.appendChild(wrapper);
      } else {
        const list = document.createElement("ul");
        list.className = "project-modal-tags";
        project.tags.forEach((tag) => {
          const li = document.createElement("li");
          li.textContent = tag;
          list.appendChild(li);
        });
        techDd.appendChild(list);
      }
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
