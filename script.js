(() => {
  document.documentElement.classList.add("js");

  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".site-nav a");

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });

  const year = String(new Date().getFullYear());
  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = year;
  });

  const revealItems = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("in-view");
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -7% 0px"
    }
  );

  revealItems.forEach((item, index) => {
    const fallbackDelay = (index % 6) * 60;
    const customDelay = Number(item.dataset.delay || fallbackDelay);
    item.style.transitionDelay = `${customDelay}ms`;
    observer.observe(item);
  });

  // Tab component logic
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const container = btn.closest(".tabs-container");
      if (!container) return;
      
      container.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      container.querySelectorAll(".tab-pane").forEach((p) => p.classList.remove("active"));
      
      btn.classList.add("active");
      const target = container.querySelector(btn.dataset.target);
      if (target) {
        target.classList.add("active");
      }
    });
  });
})();
