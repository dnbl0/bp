# Bupa Design System documentation

A live, Adobe Spectrum–style documentation site for the Bupa Aged Care design
language, served at [`/design-system`](/design-system).

It is built **inside this Next.js app** so that it documents the real theme and
the real components — there is no separate copy of tokens or markup to keep in
sync.

## How it is wired together

| Concern | Source |
| --- | --- |
| Tokens (colour, type, elevation, layering, motion) | Read live from `tailwind.config.js` + `styles/base/typography.css` via `tokens.ts` |
| Components | Imported from the app's own `components/` directory |
| Navigation & search | Generated from `designSystem.config.ts` |
| Page chrome (sidebar, search, light/dark, "on this page") | `DesignSystemLayout.tsx` |
| Reusable doc blocks | `primitives/` (`Example`, `PropsTable`, `Anatomy`, `Do`/`Dont`, `SwatchGrid`, `TokenTable`, `PageHeader`, `StatusBadge`) |

Dark mode is scoped to the docs: the layout toggles a `dark` class on its own
root and Tailwind's `darkMode: 'class'` strategy applies `dark:` variants. The
marketing site never sets this class, so production pages are unaffected. The
route is excluded from `robots.txt` and is not part of the CMS-driven sitemap.

## Adding a page

1. Create a page under `pages/design-system/...` (e.g.
   `pages/design-system/components/button.tsx`).
2. Wrap its content in `<DesignSystemLayout title="…" toc={…}>`.
3. Build the body from the `primitives/` (a `PageHeader`, then `Section`s with
   `Example`/`PropsTable`/`Anatomy`/`Do`/`Dont`).
4. Register it in `designSystem.config.ts` so it appears in the sidebar and
   search.

## Roadmap

- [x] **Phase 1** – Scaffold, layout, token introspection, Color foundation.
- [x] **Phase 2** – Documentation primitives (`primitives/`).
- [x] **Phase 3** – Foundations: Typography, Spacing & Layout, Elevation,
      Iconography, Motion, Layering, Logo.
- [x] **Phase 4** – Components: full catalogue (`componentCatalog.ts`) plus
      dedicated live pages for Button, Tag, Alert and CTA. Additional component
      pages are added incrementally using the same page template.
- [x] **Phase 5** – Patterns, Resources, scroll-spy and responsive polish.

> Note: a full `next build` runs `yarn codegen`, which needs Contentful
> credentials. The design-system pages themselves are static and do not depend
> on the CMS.
