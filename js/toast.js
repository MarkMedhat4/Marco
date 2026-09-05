/* ============================================================
   TOAST — small, unobtrusive confirmations
   ============================================================ */
window.showToast = (function () {
  let timer = null;
  let el = null;

  function ensureEl() {
    if (el) return el;
    el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");
    document.body.appendChild(el);
    return el;
  }

  return function showToast(message, duration = 2600) {
    const node = ensureEl();
    node.textContent = message;
    node.classList.add("is-visible");
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => node.classList.remove("is-visible"), duration);
  };
})();

window.prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
