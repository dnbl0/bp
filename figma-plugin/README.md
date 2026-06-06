# Bupa Component Library Builder (Figma plugin)

A self-contained Figma plugin that **builds the Bupa component library into your
Figma file** — colour styles, text styles, and the core components — sourced
directly from the design tokens in this repo so Figma never drifts from
production.

This is the reliable way to push a code-defined design system into Figma. The
Figma MCP connector can only _read_ designs (extract code/screenshots/variables
from existing frames); it has no API to author components, which is why this runs
as a plugin instead.

## Code ↔ Figma parity

The library mirrors the codebase so the two stay in sync:

- **Names mirror code paths.** Every component is named after its source path,
  so the Figma assets panel renders the same folder tree as `components/`:
  `Atoms/Tag`, `Molecules/Blocks/CardBlock`, `Molecules/Sections/Section6x6`,
  `Organisms/Header`, `Templates/PrimaryPageTemplate`. Each component's
  description and on-canvas label show its real source file.
- **Composition mirrors code.** Where the code composes a component, Figma nests
  a **real instance** of it: `CtaBlock` is a Button instance, `TagsBlock` is a
  wrap of Tag instances, and the card family / `ContactCardBlock` / `Header`
  embed Button instances. Edit the Button master → every usage updates.
- **Canvas sections are labelled with their code folder** (e.g. “Molecules ·
  components/molecules/blocks”).

## Components that actually do something

- **Editable content via component properties** — Button & Tag expose a `Label`
  text property; the card family, Hero, Alert, Testimonial and Heading expose
  their headings/body/quote as **`TEXT` properties**, editable from the
  properties panel without digging into layers.
- **Responsive** — headings and body copy are set to **fill**, so they reflow
  when an instance is resized.
- **Button** has a full state matrix plus a `Trailing icon` boolean toggle.

## Dev-ready / best practice

This is a **token-backed** library, not a static mockup:

- **Figma Variables** — a `Bupa Tokens` collection: primitive colours
  (`Color/Primary/Cyan` …), **semantic** colours that alias them
  (`Color/Action/Default`, `Color/Text/Muted`, `Color/Surface/Default`,
  `Color/Border/…`, `Color/Focus`), plus **spacing** (`Space/4…64`) and
  **radius** (`Radius/Sm|Default|Lg|Pill`) number variables. Dev Mode turns
  these into code tokens.
- **Everything is bound to tokens** — colour styles resolve to their primitive
  variable; component fills, strokes, text colours, padding and corner radius
  are bound to semantic variables (so Dev Mode shows `Action/Default`, not a raw
  hex).
- **Real component APIs** — the Button exposes a **`Label` text property** and a
  **`Trailing icon` boolean**; the Tag exposes a **`Label`** property.
- **Interactive states** — the Button is a full `Variant × Size × State` matrix
  (Primary/Secondary/Ghost/Tertiary × Small/Standard/Giant × Default/Hover/
  Active/Disabled = 48 variants), with state colours taken straight from
  [`buttons.css`](../styles/components/buttons.css).
- **Component descriptions** — every component carries a description (atomic
  layer + summary) shown in the asset panel and Dev Mode.

If the file/host has no Variables API, the plugin still runs and falls back to
raw values (the build notification says which path it took).

## What it creates

**Foundations**
- **Variables** — the `Bupa Tokens` collection described above.
- **Colour styles** — the full palette from [`tailwind.config.js`](../tailwind.config.js),
  grouped as `Primary/…`, `Secondary/…`, `UI/…`, `Background/…`, each **bound to
  its variable**, plus a visible swatch board.
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
- **A title banner**, then a **Foundations** group (Colour + Typography
  artboards side by side), then one **Figma Section per atomic layer**
  (Atoms, Molecules, Sections, Organisms, Templates, Pages) so the canvas reads
  as an organised board.
- **Each component is its own named frame** (label + centred preview), snapped
  to a **3-column grid**: cards/bands take one column, wide components (hero,
  header, footer) span two, and the Button state matrix spans all three — so
  everything aligns into tidy rows instead of a ragged wrap.
- **Everything inside a frame uses auto layout** — no child is absolutely
  positioned. Component frames carry canvas coordinates (grouped by Section),
  which is inherent to the page.
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
