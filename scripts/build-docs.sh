#!/usr/bin/env bash
#
# Build a static, Contentful-free snapshot of the /design-system documentation
# for GitHub Pages, into ./out.
#
# The product pages (homepage, [...slug], 404/500, search, api, …) pull in
# Contentful and Algolia at build time, which aren't available for a public
# docs deploy. They are moved aside so only the static /design-system routes are
# built and exported. This mutates the working tree, so run it in CI (or a
# throwaway checkout), not on a tree you want to keep.
#
# Expects (set by the workflow):
#   DOCS_EXPORT=1            -> enables the docs build config in next.config.js
#   DOCS_BASE_PATH=/bp       -> base path for the GitHub Pages project site
#   NEXT_PUBLIC_CONTENTFUL_* -> dummy values so the Apollo client can construct
#                               (it is never queried by the docs)
set -euo pipefail

NEXT=./node_modules/.bin/next

# 1. Isolate the design-system pages: keep _app, _document and design-system/.
STASH="$(mktemp -d)"
for p in index.tsx '[...slug].tsx' search.tsx sitemap.xml.tsx robots.txt.tsx \
    404.tsx 500.tsx api aged-care-homes preview contentful-app; do
    if [ -e "pages/$p" ]; then mv "pages/$p" "$STASH/"; fi
done

# 2. Minimal static root that redirects to the docs.
cat > pages/index.tsx <<'TSX'
import Head from 'next/head'

export default function Home() {
    return (
        <Head>
            <meta httpEquiv="refresh" content="0; url=design-system/" />
        </Head>
    )
}
TSX

# 3. Build and export the static site, then disable Jekyll so _next/ is served.
"$NEXT" build
"$NEXT" export -o out
touch out/.nojekyll

echo "Static docs written to ./out"
