(() => {
  const revealTargets = document.querySelectorAll(".reveal-on-scroll");
  if (revealTargets.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("visible"));
  }

  const topBtn = document.createElement("button");
  topBtn.type = "button";
  topBtn.className = "scroll-top-btn";
  topBtn.setAttribute("aria-label", "맨 위로 이동");
  topBtn.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">arrow_upward</span>';
  topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.body.appendChild(topBtn);

  const toggleTopBtn = () => {
    topBtn.classList.toggle("visible", window.scrollY > 480);
  };
  window.addEventListener("scroll", toggleTopBtn, { passive: true });
  toggleTopBtn();
})();
