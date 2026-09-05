/* ============================================================
   NAVIGATION — sticky nav, mobile menu, active-section indication
   ============================================================ */
(function () {
  const nav = document.getElementById("site-nav");
  const toggle = document.getElementById("nav-toggle");
  const mobile = document.getElementById("nav-mobile");
  if (!nav) return;

  document.addEventListener("invitation:opened", () => {
    nav.classList.add("is-ready");
  });

  function onScroll() {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && mobile) {
    const musicBtn = document.getElementById("music-toggle");
    toggle.addEventListener("click", () => {
      const isOpen = mobile.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("lock-scroll", isOpen);
      if (musicBtn) musicBtn.classList.toggle("is-hidden-by-menu", isOpen);
    });

    mobile.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobile.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("lock-scroll");
        if (musicBtn) musicBtn.classList.remove("is-hidden-by-menu");
      });
    });
  }

  // Active-section indication
  const links = document.querySelectorAll(".site-nav__links a, .site-nav__mobile a");
  const sections = Array.from(links)
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = "#" + entry.target.id;
          links.forEach((l) =>
            l.classList.toggle("is-active", l.getAttribute("href") === id)
          );
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
  }
})();
