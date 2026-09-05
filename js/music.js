/* ============================================================
   MUSIC — starts only after user interaction (the bow)
   ============================================================ */
(function () {
  const btn = document.getElementById("music-toggle");
  if (!btn) return;

  const audio = new Audio(window.weddingData.musicPath);
  audio.loop = true;
  audio.volume = 0.55;
  audio.preload = "none";

  function setPlayingUI(isPlaying) {
    btn.classList.toggle("is-playing", isPlaying);
    btn.setAttribute("aria-pressed", String(isPlaying));
    btn.setAttribute(
      "aria-label",
      isPlaying ? "Pause background music" : "Play background music"
    );
  }

  function tryPlay() {
    audio
      .play()
      .then(() => setPlayingUI(true))
      .catch(() => setPlayingUI(false)); // autoplay blocked — user can tap the button
  }

  document.addEventListener("invitation:opened", () => {
    btn.classList.add("is-visible");
    tryPlay();
  });

  btn.addEventListener("click", () => {
    if (audio.paused) {
      tryPlay();
    } else {
      audio.pause();
      setPlayingUI(false);
    }
  });
})();
