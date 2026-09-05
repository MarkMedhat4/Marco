/* ============================================================
   MAIN — fills repeated wedding details from the single config,
   wires the WhatsApp RSVP and the "copy details" action
   ============================================================ */
(function () {
  const data = window.weddingData;
  if (!data) return;

  const fieldValues = {
    groom: data.groom,
    bride: data.bride,
    monogram: data.monogram,
    date: data.weddingDateDisplay,
    ceremonyTime: data.ceremonyTime,
    ceremonyLabel: data.ceremonyLabel,
    receptionTime: data.receptionTime,
    receptionLabel: data.receptionLabel,
    venue: data.venue,
    year: new Date().getFullYear(),
  };

  document.querySelectorAll("[data-field]").forEach((el) => {
    const key = el.getAttribute("data-field");
    if (key in fieldValues) el.textContent = fieldValues[key];
  });

  // WhatsApp RSVP link
  const rsvpLink = document.getElementById("whatsapp-rsvp");
  if (rsvpLink) {
    const url =
      "https://wa.me/" +
      data.whatsappNumber +
      "?text=" +
      encodeURIComponent(data.whatsappMessage);
    rsvpLink.href = url;
  }

  // Copy wedding details to clipboard
  const copyBtn = document.getElementById("copy-details");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const text = `${data.groom} & ${data.bride}\n${data.weddingDateDisplay}\n${data.ceremonyLabel}: ${data.ceremonyTime}\n${data.receptionLabel}: ${data.receptionTime} — ${data.venue}`;
      try {
        await navigator.clipboard.writeText(text);
        window.showToast("Details copied");
      } catch (err) {
        window.showToast("Couldn't copy — please note the details manually");
      }
    });
  }
})();
