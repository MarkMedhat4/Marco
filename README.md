# Marco & Nadeen — Wedding Invitation Website

A luxury, interactive digital wedding invitation for **Marco Atif & Nadeen Assem**,
built as a real, physical-invitation-inspired experience: a sealed card with a
ribbon and bow that the guest unties to reveal the site.

Plain HTML5, CSS3, and vanilla JavaScript — no frameworks, no build step.

---

## 1. Design Concept

The visual identity blends two colors into one coherent system rather than
alternating between them section-by-section:

- **Burgundy** (`#6E2B40`, deepening to `#4A1B2B`) — the primary color, used for
  the ribbon, headings, and the deep gradient panels (hero, countdown, closing).
- **Olive** (`#6C6E52`, deepening to `#4C4E39`) — the secondary color, used for
  labels, hairline accents, and to warm the burgundy gradients where the two
  meet.
- **Ivory / cream / beige** — the "paper" the rest of the site sits on.
- **Gold** — used sparingly, only as a hairline accent (card border, bow
  stitching, rule dividers) — never as a dominant color.

Typography is two families only: **Cormorant Garamond** (serif, for names,
headings, and the monogram) and **Jost** (sans-serif, for body copy, labels,
and buttons), both loaded from Google Fonts.

The signature moment is the opening sequence: a sealed ivory card with a
burgundy ribbon and bow fills the screen first. The guest untie the bow (by
clicking/tapping it, or via keyboard) — the ribbon slides away, the bow
loosens and its tails fall, the card lifts, and the site's hero is revealed.
Background music begins at that same moment, respecting browser autoplay
restrictions (it only starts after this user interaction).

## 2. Folder Structure

```
/
├── index.html
├── css/
│   ├── tokens.css        → colors, type scale, spacing, motion variables
│   ├── base.css          → reset, typography, buttons, nav, toast, music button
│   ├── invitation.css    → the opening card + ribbon + bow interaction
│   ├── sections.css      → hero, couple, details, gallery, story, RSVP, etc.
│   └── responsive.css    → mobile-specific refinements, safe-area insets
├── js/
│   ├── data.js           → ⭐ single config file — edit names/date/venue here
│   ├── toast.js          → small on-screen confirmation messages
│   ├── main.js           → fills repeated text from data.js, WhatsApp + copy button
│   ├── invitation.js     → the bow-click / opening sequence logic
│   ├── navigation.js     → sticky nav, mobile menu, active-section highighting
│   ├── countdown.js      → live countdown to the wedding date
│   ├── gallery.js        → lightbox with keyboard support
│   └── music.js          → background music controller
├── assets/
│   ├── images/           → couple + gallery photos
│   ├── music/            → ambient.mp3 (trimmed/compressed 2-minute loop)
│   └── icons/            → favicon.svg
└── README.md
```

## 3. Editing the Wedding Details (single source of truth)

Almost everything you'll want to change lives in **`js/data.js`**:

```js
window.weddingData = {
  groom: "Marco Atif",
  bride: "Nadeen Assem",
  monogram: "M & N",
  weddingDateISO: "2026-10-11T19:00:00",   // used by the countdown
  weddingDateDisplay: "October 11, 2026",   // used everywhere else
  ceremonyTime: "7:00 PM",
  ceremonyLabel: "Church Ceremony",
  receptionTime: "8:00 PM",
  receptionLabel: "Reception",
  venue: "El Qasr Hall",
  whatsappNumber: "201551553557",
  whatsappMessage: "…",
  musicPath: "assets/music/ambient.mp3",
  couplePhotos: { … },
  galleryPhotos: [ … ]
};
```

Changing a value here updates every place it appears on the site (hero,
opening card, details cards, countdown heading, closing section, footer
year, etc.) — those elements are marked with `data-field="…"` attributes in
`index.html` and filled in by `js/main.js` on load.

### How to change names
Edit `groom` and `bride` in `js/data.js`. **Do not** reorder them anywhere
else — the groom is always displayed first per the design brief.

### How to change the date
Edit both `weddingDateISO` (drives the live countdown — keep it in
`YYYY-MM-DDTHH:MM:SS` format) and `weddingDateDisplay` (the human-readable
string shown everywhere else) in `js/data.js`.

### How to change the venue / times
Edit `venue`, `ceremonyTime`, `ceremonyLabel`, `receptionTime`,
`receptionLabel` in `js/data.js`. Also update the "Get Directions" link's
`href` in `index.html` (search for `id="venue-directions"`) if the venue
changes.

### How to change the WhatsApp number / message
Edit `whatsappNumber` (digits only, with country code, no `+` or spaces)
and `whatsappMessage` in `js/data.js`.

### How to replace couple photos
Replace the files in `assets/images/` (keep the same filenames, or update
the paths in `js/data.js` and the `<img>` tags in `index.html`):

- `groom-solo.jpg` — the groom's portrait (Couple section)
- `bride-solo.jpg` — the bride's portrait (Couple section)
- `couple-formal.jpg` — the "together" photo under the Couple section
- `couple-church.jpg` — the Venue section photo
- `couple-candid.jpg`, `couple-night.jpg` — used in the gallery

Recommended: portrait orientation, at least 1000px on the short side.

### How to replace gallery photos
Edit the `galleryPhotos` array in `js/data.js` **and** the matching
`<div class="gallery__item">` blocks in `index.html` (search for
`id="gallery"`). Keep alt text descriptive for accessibility.

### How to add / change the background music
Drop an MP3 into `assets/music/` and update `musicPath` in `js/data.js`.
Keep it short (1–3 minutes) and let it loop — the player already sets
`loop = true`. Long files slow down the first load.

### How to edit "Our Story"
Open `index.html`, search for `id="story"`, and edit the four
`.story__item` blocks (Beginning / Journey / Moment / Forever). Placeholder
text is clearly marked `[Add your own … here.]` — no real personal facts
were invented.

## 4. Running Locally

No build step is required. From this folder, run any static file server, e.g.:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly via `file://` also works, though the
clipboard "Copy Details" button requires a proper `http(s)` origin in some
browsers.

## 5. Deploying

Upload the whole folder as-is to any static host — Netlify, Vercel, GitHub
Pages, Cloudflare Pages, or a plain web server. No server-side code, no
database, no environment variables. Point the host at `index.html`.

## 6. Browser Compatibility

Tested against modern Chromium. Uses only standard, widely supported APIs:

- `IntersectionObserver` (active nav highlighting) — supported in all
  modern browsers; nav still functions without it, just without the
  highlight.
- `navigator.clipboard.writeText` (Copy Details) — requires a secure
  context (`https://` or `localhost`); the button shows a graceful fallback
  message if it's unavailable.
- `HTMLAudioElement` autoplay — intentionally gated behind the bow-click
  interaction, since Chrome, Safari, and Firefox all block unprompted
  autoplay with sound.

## 7. Accessibility Notes

- The bow is a real `<button>` with a descriptive `aria-label`, reachable
  and activatable by keyboard (Enter / Space).
- Opening the invitation moves keyboard focus to the hero heading.
- The gallery lightbox supports Escape (close) and Arrow Left/Right
  (previous/next), and returns focus to the triggering thumbnail on close.
- `prefers-reduced-motion` is respected globally: the bow/card opening
  becomes near-instant instead of animated, and all other transitions
  shorten to 1ms, while remaining fully functional.
- All interactive elements have visible focus states.
- Images use descriptive `alt` text; decorative SVGs are `aria-hidden`.

## 8. Performance Notes

- All photos are re-encoded to a max of 1800px on the long side and
  compressed (~100–165KB each) — originals were several MB.
- The background track is trimmed to a 2-minute loop and re-encoded at
  112kbps (~1.6MB), down from a 15-minute, 14MB source file.
- Images use `loading="lazy"` outside the opening card/hero.
- No JavaScript framework, no icon font, no unused CSS libraries — every
  script in `js/` is a small, single-purpose vanilla file.
- Google Fonts are loaded with `preconnect` hints.

## 9. What to double-check before sending invitations

- [ ] Confirm the wedding date/time in `js/data.js` one more time.
- [ ] Confirm the WhatsApp number is correct and reachable.
- [ ] Fill in real "Our Story" content (currently placeholder text).
- [ ] Swap in any additional/updated photos.
- [ ] Test the "Accept Invitation" button on an actual phone with WhatsApp
      installed.
- [ ] Test the site on the couple's own phones (iOS Safari + Android
      Chrome) before sharing widely.
