/*
    Builds a static export of the design-system documentation for GitHub Pages.

    The main Bupa app cannot be statically exported: most routes use
    getServerSideProps and there are API routes, both of which `next export`
    rejects. The /design-system pages, however, are fully static. This script
    temporarily moves the non-exportable pages out of `pages/`, runs the export
    against the remaining static tree (with PAGES_EXPORT=true so next.config
    applies the /bp basePath and export-safe settings), then restores them.

    Output: `out/` containing the docs, ready to publish to GitHub Pages.
*/
import { execSync } from 'node:child_process'
import {
    existsSync,
    mkdirSync,
    renameSync,
    rmSync,
    writeFileSync,
} from 'node:fs'
import { dirname, join } from 'node:path'

const root = process.cwd()
const pagesDir = join(root, 'pages')
const stashDir = join(root, '.docs-export-stash')

// Everything that is NOT a fully-static page and would break `next export`.
const nonExportable = [
    'index.tsx',
    '[...slug].tsx',
    'search.tsx',
    'sitemap.xml.tsx',
    'robots.txt.tsx',
    // The custom 404/500 pages fetch CMS data in getStaticProps and so need
    // live Contentful credentials; drop them so the export falls back to the
    // default error pages.
    '404.tsx',
    '500.tsx',
    'api',
    'preview',
    'aged-care-homes',
    'contentful-app',
]

const stash = () => {
    if (existsSync(stashDir)) rmSync(stashDir, { recursive: true, force: true })
    mkdirSync(stashDir, { recursive: true })
    for (const entry of nonExportable) {
        const from = join(pagesDir, entry)
        if (!existsSync(from)) continue
        const to = join(stashDir, entry)
        mkdirSync(dirname(to), { recursive: true })
        renameSync(from, to)
        console.log(`  stashed pages/${entry}`)
    }
}

const restore = () => {
    if (!existsSync(stashDir)) return
    for (const entry of nonExportable) {
        const from = join(stashDir, entry)
        if (!existsSync(from)) continue
        const to = join(pagesDir, entry)
        mkdirSync(dirname(to), { recursive: true })
        renameSync(from, to)
    }
    rmSync(stashDir, { recursive: true, force: true })
    console.log('  restored stashed pages')
}

const run = cmd =>
    execSync(cmd, {
        stdio: 'inherit',
        env: { ...process.env, PAGES_EXPORT: 'true' },
    })

console.log('→ Stashing non-exportable pages')
stash()
try {
    console.log('→ next build')
    run('npx next build')
    console.log('→ next export')
    run('npx next export -o out')
    // Stop GitHub Pages (Jekyll) from dropping the _next/ asset directory.
    writeFileSync(join(root, 'out', '.nojekyll'), '')
    console.log('✓ Static docs exported to out/')
} finally {
    console.log('→ Restoring pages')
    restore()
}
