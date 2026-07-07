(() => {
  const STYLE_ID = "portfolio-project-modal-style";
  const MODAL_ID = "portfolio-project-modal";

  // TODO: previewImage는 실제 배포 도메인 스크린샷을 촬영한 뒤 assets/에 추가하고 교체할 것
  const PROJECTS = {
    mini: {
      kind: "쇼핑몰 서비스",
      title: "AllPick",
      description:
        "AllPick 쇼핑몰에서 회원·판매자·관리자 흐름, 상품·주문·결제·쿠폰·CS 기능과 FastAPI 기반 AI 추천 연동을 구현한 프로젝트입니다.",
      domain: { label: "준비중", href: null },
      tags: ["React", "Spring Boot", "FastAPI", "AWS"],
      techGroups: [
        { label: "Frontend", items: ["React", "JavaScript", "HTML/CSS", "Axios"] },
        { label: "Backend", items: ["Java", "Spring Boot", "Spring Security", "JPA", "JWT", "MySQL"] },
        { label: "AI", items: ["FastAPI", "Python", "OpenAI API"] },
        { label: "Infra", items: ["AWS EC2", "S3 Bucket", "CloudFront", "GitHub Actions"] },
      ],
      role: "AI 추천(FastAPI)과 EC2·S3·CloudFront 기반 AWS 배포 구성을 단독으로 담당했고, 프론트엔드·백엔드에서는 JWT 인증 흐름과 주문·결제, 쿠폰·멤버십 기능을 맡았습니다.",
      href: "mini-project.html",
      previewImage: { src: "assets/blank-placeholder.svg", alt: "AllPick 실제 배포 화면 스크린샷 (준비중)" },
    },
    final: {
      kind: "롤토체스 전적 검색 서비스",
      title: "TFT-gogo",
      description:
        "TFT-gogo 전적 검색 서비스에서 Riot API 기반 매치 분석, 메타덱·패치노트, AI 추천, 커뮤니티 기능을 모노레포로 구현 중인 프로젝트입니다.",
      domain: { label: "tftgogo.com", href: "https://tftgogo.com" },
      tags: ["Spring Boot", "React", "FastAPI", "Docker"],
      techGroups: [
        { label: "Frontend", items: ["React", "TypeScript", "Vite", "TanStack Query", "Axios", "Zustand"] },
        { label: "Backend", items: ["Java", "Spring Boot", "Spring Security", "Spring Data JPA", "MySQL", "Redis", "Flyway", "JWT"] },
        { label: "AI", items: ["FastAPI", "Pydantic", "SQLAlchemy", "PostgreSQL/pgvector", "OpenAI API"] },
        { label: "Infra", items: ["Docker", "Docker Compose", "AWS ECS", "AWS ECR", "ALB", "GitHub Actions"] },
      ],
      role: "AWS 인프라 구축을 단독으로 담당했고, 프론트엔드·백엔드·AI 서버를 연결해 덱 모음과 AI 기반 덱 추천 기능의 화면, API 계약, 배포 흐름을 맡았습니다.",
      href: "final-project.html",
      previewImage: { src: "assets/blank-placeholder.svg", alt: "TFT-gogo 실제 배포 화면 스크린샷 (준비중)" },
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
        width: min(1120px, 94vw);
        height: min(720px, 88vh);
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
        flex: 1 1 58%;
        overflow: hidden;
        background: #f8fafc;
        border-right: 1px solid #e6e7e9;
      }
      #${MODAL_ID} .project-modal-preview img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
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
        flex: 1 1 42%;
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
          flex: 0 0 34%;
          border-right: none;
          border-bottom: 1px solid #e6e7e9;
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
          <img alt="" />
          <span class="project-modal-preview-badge">실제 배포 화면 준비중</span>
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

  function openModal(modal, project, trigger) {
    lastTrigger = trigger;

    const previewImg = modal.querySelector(".project-modal-preview img");
    previewImg.src = project.previewImage.src;
    previewImg.alt = project.previewImage.alt;

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
