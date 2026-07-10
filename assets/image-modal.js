(() => {
  const STYLE_ID = "portfolio-image-modal-style";
  const MODAL_ID = "portfolio-image-modal";

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      img[data-image-modal="true"] {
        cursor: zoom-in;
      }
      #${MODAL_ID} {
        position: fixed;
        inset: 0;
        z-index: 1000;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 28px;
        background: rgba(12, 14, 18, 0.82);
      }
      #${MODAL_ID}[aria-hidden="false"] {
        display: flex;
      }
      #${MODAL_ID} .image-modal-panel {
        position: relative;
        display: grid;
        gap: 12px;
        width: min(1120px, 100%);
        max-height: calc(100vh - 56px);
      }
      #${MODAL_ID} .image-modal-close {
        position: absolute;
        top: -14px;
        right: -14px;
        width: 40px;
        height: 40px;
        border: 1px solid rgba(255, 255, 255, 0.36);
        border-radius: 50%;
        background: #ffffff;
        color: #111827;
        font-size: 22px;
        font-weight: 800;
        line-height: 1;
        cursor: pointer;
      }
      #${MODAL_ID} .image-modal-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        display: grid;
        place-items: center;
        width: 44px;
        height: 44px;
        border: 1px solid rgba(255, 255, 255, 0.48);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.92);
        color: #111827;
        font-size: 28px;
        font-weight: 900;
        line-height: 1;
        cursor: pointer;
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.24);
      }
      #${MODAL_ID} .image-modal-nav:hover {
        background: #ffffff;
      }
      #${MODAL_ID} .image-modal-prev {
        left: -58px;
      }
      #${MODAL_ID} .image-modal-next {
        right: -58px;
      }
      #${MODAL_ID} img {
        display: block;
        width: 100%;
        max-height: calc(100vh - 118px);
        object-fit: contain;
        border-radius: 8px;
        background: #ffffff;
      }
      #${MODAL_ID} .image-modal-caption {
        color: #ffffff;
        font: 600 14px/1.5 "Noto Sans KR", sans-serif;
        text-align: center;
      }
      #${MODAL_ID} .image-modal-counter {
        margin-left: 8px;
        color: rgba(255, 255, 255, 0.72);
        font-weight: 700;
      }
      @media (max-width: 640px) {
        #${MODAL_ID} {
          padding: 18px;
        }
        #${MODAL_ID} .image-modal-close {
          top: 8px;
          right: 8px;
        }
        #${MODAL_ID} .image-modal-prev {
          left: 8px;
        }
        #${MODAL_ID} .image-modal-next {
          right: 8px;
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
      <div class="image-modal-panel">
        <button class="image-modal-close" type="button" aria-label="이미지 닫기">×</button>
        <button class="image-modal-nav image-modal-prev" type="button" aria-label="이전 이미지 보기">‹</button>
        <button class="image-modal-nav image-modal-next" type="button" aria-label="다음 이미지 보기">›</button>
        <img alt="" />
        <p class="image-modal-caption"><span class="image-modal-caption-text"></span><span class="image-modal-counter"></span></p>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  function closeModal(modal) {
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  let modalImages = [];
  let currentIndex = 0;

  function renderModal(modal) {
    const image = modalImages[currentIndex];
    if (!image) return;
    const modalImage = modal.querySelector("img");
    const captionText = modal.querySelector(".image-modal-caption-text");
    const counter = modal.querySelector(".image-modal-counter");
    const prevButton = modal.querySelector(".image-modal-prev");
    const nextButton = modal.querySelector(".image-modal-next");
    modalImage.src = image.currentSrc || image.src;
    modalImage.alt = image.alt || "확대 이미지";
    captionText.textContent = image.alt || "";
    counter.textContent = modalImages.length > 1 ? ` ${currentIndex + 1} / ${modalImages.length}` : "";
    const shouldShowNav = modalImages.length > 1;
    prevButton.hidden = !shouldShowNav;
    nextButton.hidden = !shouldShowNav;
  }

  function showAdjacent(modal, direction) {
    if (modalImages.length < 2) return;
    currentIndex = (currentIndex + direction + modalImages.length) % modalImages.length;
    renderModal(modal);
  }

  function openModal(modal, image) {
    currentIndex = Math.max(0, modalImages.indexOf(image));
    renderModal(modal);
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.querySelector(".image-modal-close").focus();
  }

  function init() {
    ensureStyle();
    const modal = ensureModal();
    const closeButton = modal.querySelector(".image-modal-close");
    const prevButton = modal.querySelector(".image-modal-prev");
    const nextButton = modal.querySelector(".image-modal-next");

    modalImages = Array.from(document.querySelectorAll("img:not(#portfolio-image-modal img):not([data-project-modal] img):not(#portfolio-project-modal img)"));
    modalImages.forEach((image) => {
      image.dataset.imageModal = "true";
      image.addEventListener("click", () => openModal(modal, image));
    });

    closeButton.addEventListener("click", () => closeModal(modal));
    prevButton.addEventListener("click", () => showAdjacent(modal, -1));
    nextButton.addEventListener("click", () => showAdjacent(modal, 1));
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal(modal);
    });
    document.addEventListener("keydown", (event) => {
      if (modal.getAttribute("aria-hidden") === "true") return;
      if (event.key === "Escape") {
        closeModal(modal);
      } else if (event.key === "ArrowLeft") {
        showAdjacent(modal, -1);
      } else if (event.key === "ArrowRight") {
        showAdjacent(modal, 1);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
