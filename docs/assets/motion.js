(() => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const progress = document.getElementById("reading-progress-bar");
  let scrollFrame = 0;

  const updateProgress = () => {
    scrollFrame = 0;
    if (!progress) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const amount = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    progress.style.transform = `scaleX(${amount})`;
  };

  const requestProgressUpdate = () => {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateProgress);
  };

  window.addEventListener("scroll", requestProgressUpdate, { passive: true });
  window.addEventListener("resize", requestProgressUpdate, { passive: true });
  updateProgress();

  if (reducedMotion.matches) return;

  const revealItems = [...document.querySelectorAll("[data-reveal]")];
  document.querySelectorAll(".feature-card ul").forEach(list => {
    [...list.children].forEach((item, index) => item.style.setProperty("--point-index", index));
  });
  if ("IntersectionObserver" in window && revealItems.length) {
    const observer = new IntersectionObserver((entries, activeObserver) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });

    revealItems.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${(index % 3) * 65}ms`);
      observer.observe(item);
    });
    root.classList.add("has-motion");
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll(".screen-card, .feature-card").forEach(card => {
      card.addEventListener("pointermove", event => {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        card.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
        card.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
        card.style.setProperty("--tilt-x", `${(0.5 - y) * 2.4}deg`);
        card.style.setProperty("--tilt-y", `${(x - 0.5) * 2.4}deg`);
      }, { passive: true });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
      }, { passive: true });
    });
  }

  reducedMotion.addEventListener?.("change", event => {
    if (!event.matches) return;
    root.classList.remove("has-motion");
    revealItems.forEach(item => item.classList.add("is-visible"));
  });
})();
