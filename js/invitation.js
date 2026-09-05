/* ============================================================
   INVITATION OPENING — the bow is the interaction
   ============================================================ */
(function () {
  const gate = document.getElementById("gate");
  const bow = document.getElementById("bow-button");
  if (!gate || !bow) return;

  const reduced = window.prefersReducedMotion;
  const RIBBON_MS = reduced ? 40 : 1000;
  const CARD_MS = reduced ? 40 : 900;

  let opened = false;

  function openInvitation() {
    if (opened) return;
    opened = true;

    gate.classList.add("is-opening");
    bow.setAttribute("aria-disabled", "true");

    window.setTimeout(() => {
      gate.classList.add("is-card-open");

      window.setTimeout(() => {
        gate.classList.add("gate--closed");
        gate.setAttribute("aria-hidden", "true");
        document.body.classList.remove("lock-scroll");

        document.dispatchEvent(new CustomEvent("invitation:opened"));

        // Move focus to the hero for keyboard/screen-reader users
        const hero = document.getElementById("home");
        if (hero) {
          hero.setAttribute("tabindex", "-1");
          hero.focus({ preventScroll: true });
        }
      }, CARD_MS);
    }, RIBBON_MS);
  }

  bow.addEventListener("click", openInvitation);
  bow.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      openInvitation();
    }
  });

  // Lock scroll until the invitation opens
  document.body.classList.add("lock-scroll");
})();
