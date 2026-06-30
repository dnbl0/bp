# My Lexus — Authenticated Experience · Case Study

A single-page, self-contained case study for the authenticated **My Lexus**
prototype, framed from three angles — **UI design**, **design system** and
**UX** — and built to *demonstrate* the craft it describes.

## What it showcases

- **Animation & micro-interactions** — scroll-reveal with staggered timing,
  animated counters, magnetic buttons, ripple feedback, a spring-eased toggle,
  3D pointer-tilt cards, a hero shine, and a live easing-curve visualiser driven
  by the prototype's own motion tokens (`emphasized`, `decelerate`, `standard`,
  `sharp`).
- **Dynamic pop-ups & component interactions** — a media lightbox, plus an
  **interactive component lab**: each panel is the *real* component embedded live
  from Storybook (service flyout, ⌘K command palette, swipeable offers carousel,
  benefit card, date picker, vehicle panel, points sparkline). Open the flyout,
  type in a field, drag the carousel — these are not videos.
- **Mobile navigation & gestures** — a touch/pointer/keyboard swipe carousel
  with drag, momentum and snap, plus device-framed **screen recordings** of the
  off-canvas drawer and scroll choreography.
- **Embedded video** — page previews are smooth, subtle 30fps screen recordings
  (desktop dashboard scroll, the AI concierge flow, mobile scroll & drawer),
  device-framed and expandable in the lightbox.
- **Accessibility** — a dedicated section covering WCAG AA contrast, reduced
  motion, full keyboard paths, semantics/ARIA, comfortable targets and the
  axe-on-every-story tooling. The page itself holds the same bar.
- **The live prototype, embedded** — the deployed app running in an `<iframe>`
  with a desktop/mobile viewport toggle.

### The distinction

- **Page previews → screen recordings** (smooth, subtle walkthroughs of whole flows).
- **Isolated components → interactive embeds** (the real thing, from Storybook).

## Run

Plain HTML/CSS/JS — no build step. Serve the folder as the document root so the
Storybook embeds (which reference `/assets/*`) resolve:

```bash
cd folio
python3 -m http.server 8799   # → http://localhost:8799
```

## Structure

```text
folio/
  index.html      markup + section structure
  styles.css      tokens (mirrored from the prototype) + all styling
  script.js       reveal, counters, scrollspy, mobile menu, lightbox, tilt,
                  magnetic, component lab, swiper, viewport toggle
  assets/
    brand/        Lexus mark + favicon
    fonts/        Nobel (brand typeface, self-hosted woff2)
    media/        JPEG stills + 30fps MP4 captures (+ poster frames)
    storybook/    the 131-story component library (interactive embeds)
    *.png/.jpg    public imagery the Storybook stories reference
```

## Notes

- The brand typeface (Nobel) and colour/motion tokens are pulled straight from
  the prototype so the case study and the product share one visual language.
- Media are real captures of the live build at
  <https://dnbl0.github.io/bp/lx-a/>; component embeds are the project's own
  Storybook.
- Everything respects `prefers-reduced-motion` — animation, autoplay video,
  parallax and the hero shine all stand down.
- Because the Storybook embeds use absolute `/assets/*` image paths, deploy with
  `folio/` as the site root (or adjust those paths for a sub-path deploy).
