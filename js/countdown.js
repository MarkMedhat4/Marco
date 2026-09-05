/* ============================================================
   COUNTDOWN — to the wedding day
   ============================================================ */
(function () {
  const root = document.getElementById("countdown");
  if (!root) return;

  const target = new Date(window.weddingData.weddingDateISO).getTime();
  const days = document.getElementById("cd-days");
  const hours = document.getElementById("cd-hours");
  const mins = document.getElementById("cd-mins");
  const secs = document.getElementById("cd-secs");
  const done = document.getElementById("cd-done");
  const grid = document.getElementById("cd-grid");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tick() {
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      if (grid) grid.hidden = true;
      if (done) done.hidden = false;
      clearInterval(timer);
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    if (days) days.textContent = d;
    if (hours) hours.textContent = pad(h);
    if (mins) mins.textContent = pad(m);
    if (secs) secs.textContent = pad(s);
  }

  tick();
  const timer = setInterval(tick, 1000);
})();
