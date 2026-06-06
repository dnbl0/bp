# Bupa Component Library Builder (Figma plugin)

A self-contained Figma plugin that **builds the Bupa component library into your
Figma file** — colour styles, text styles, and the core components — sourced
directly from the design tokens in this repo so Figma never drifts from
production.

This is the reliable way to push a code-defined design system into Figma. The
Figma MCP connector can only _read_ designs (extract code/screenshots/variables
from existing frames); it has no API to author components, which is why this runs
as a plugin instead.

## What it creates

**Foundations**
- **Colour styles** — the full palette from [`tailwind.config.js`](../tailwind.config.js),
  grouped as `Primary/…`, `Secondary/…`, `UI/…`, `Background/…`, plus a visible
  swatch board (chip + name + hex) with each style linked.
- **Text styles** — the responsive type scale (desktop sizes) as
  `Heading/XL … Heading/S`, `Heading`, `Body`, `Body Small`, `Caption`, in
  Montserrat, with a specimen for each.

**Components — the full catalogue, grouped by atomic-design layer**
Mirrors [`styleguide-components/componentCatalog.ts`](../styleguide-components/componentCatalog.ts):
**Atoms · Molecules · Sections · Organisms · Templates · Pages**.

- **Variant sets:** Button (`Variant` × `Size`), Tag (`Color`), Heading (`Size`).
- **Rendered visuals** for components with a clear visual form — Hero, Alert,
  Accordion, the card family (Card / Coloured / Contact / Image / Promotion /
  Video / Testimonial), Breadcrumbs, Tags, Header, Footer, Preview banner,
  the section grid diagrams (12, 6+6, 4+8, 4+4+4, 3+3+3+3, hero/banner bands),
  Templates and example Pages, plus the small atoms (Search input, Show more,
  Back to top, Error message, Section, Responsive image).
- **Labelled placeholders** for integration-only / infrastructure parts that
  have no meaningful standalone visual (Algolia search, maps, calculators,
  Calendly, CMS dispatcher, LinkHandler, etc.) — catalogued with a type badge
  and description so coverage stays complete and **honest**, exactly as the
  codebase's own [`componentGroups.ts`](../styleguide-components/componentGroups.ts)
  documents them.

## How to run it

1. Open the target file in the **Figma desktop app**
   (Component Library — `vvf035VybcSNoOWLVRwIVd`). The page that's open is where
   the library is built.
2. Menu → **Plugins → Development → Import plugin from manifest…**
3. Select [`figma-plugin/manifest.json`](manifest.json) from this repo.
4. Menu → **Plugins → Development → Bupa Component Library Builder** to run it.

It builds onto the current page, zooms to fit, and closes.

### Layout & structure
- **Each component is its own named, top-level frame** (a label + a centred
  preview), laid out in a wrapping grid grouped under a heading per atomic
  layer — not crammed into one master frame.
- Foundations (Colour, Typography) and the title are their own artboards.
- **Everything inside a frame uses auto layout** — no child is absolutely
  positioned. Only top-level frames carry canvas coordinates, which is inherent
  to the page.
- **Every frame is named** after its component or role (`Header`, `Preview`,
  `Label`, `Nav`, `Columns`, `Chip`, …) so the layer tree reads cleanly.

### Notes
- **Re-running is safe.** Every frame it creates is tagged with plugin data;
  on re-run it removes those and upserts styles by name, so no duplicates.
- **Fonts:** it uses **Montserrat** (the Bupa brand font). If Montserrat isn't
  installed it falls back to Inter (then Roboto) and notifies you — install
  Montserrat for brand-accurate type.
- **Tokens are mirrored** at the top of [`code.js`](code.js). If
  `tailwind.config.js` or `buttons.css` change, update the arrays there to keep
  the library in sync.

## Scope

Covers **foundations + the full component catalogue** (atoms, molecules,
sections, organisms, templates and example pages). To add or refine a
component, add an entry to the `CATALOG` array in [`code.js`](code.js) and, for a
custom visual, a builder function registered in the `VISUAL` map — anything not
in `VISUAL` renders automatically as a labelled placeholder.
