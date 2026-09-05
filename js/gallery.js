/* ============================================================
   GALLERY — lightbox with keyboard support
   ============================================================ */
(function () {
  const items = Array.from(document.querySelectorAll(".gallery__item"));
  const lightbox = document.getElementById("lightbox");
  if (!items.length || !lightbox) return;

  const img = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  let index = 0;
  let lastFocused = null;

  function openAt(i) {
    index = (i + items.length) % items.length;
    const source = items[index].querySelector("img");
    img.src = source.src;
    img.alt = source.alt;
    lastFocused = document.activeElement;
    lightbox.classList.add("is-open");
    document.body.classList.add("lock-scroll");
    closeBtn.focus();
  }

  function close() {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("lock-scroll");
    img.src = "";
    if (lastFocused) lastFocused.focus();
  }

  items.forEach((item, i) => {
    item.addEventListener("click", () => openAt(i));
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
    item.setAttribute(
      "aria-label",
      "View larger: " + (item.querySelector("img").alt || "photo")
    );
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openAt(i);
      }
    });
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", () => openAt(index - 1));
  nextBtn.addEventListener("click", () => openAt(index + 1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") openAt(index + 1);
    if (e.key === "ArrowLeft") openAt(index - 1);
  });
})();
