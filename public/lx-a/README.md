# lx-a — My Lexus (authenticated experience prototype)

Prebuilt static export of the `lexus-auth-state` Vite/React prototype, served by
GitHub Pages at https://dnbl0.github.io/bp/lx-a/. The folio case study is nested
at https://dnbl0.github.io/bp/lx-a/folio/.

This is generated output committed for hosting only — the source lives outside
this repo (`~/lexus-auth-state`). To redeploy:

1. `npx vite build --base=./` (the relative base is required — served from a sub-path).
2. Strip junk from `dist/` (`dist/assets/lexus-encore-download`, stray large files).
3. Replace the app files at the root of this folder, keeping `README.md`,
   `.nojekyll`, and `folio/`; then copy `dist/.` in.
4. Re-copy `~/lexus-auth-state/folio` into `folio/` if the case study changed.
5. Commit & push — the `bp` Pages workflow publishes on any `public/**` change.
