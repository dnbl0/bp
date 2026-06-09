// When DOCS_EXPORT=1 we build a static, Contentful-free snapshot of the
// /design-system docs for GitHub Pages (served under a base path, default /bp).
// This block is inert for normal dev and the Netlify production build.
const docsExport = process.env.DOCS_EXPORT === '1'
const docsBasePath = process.env.DOCS_BASE_PATH || '/bp'

/** @type {import('next').NextConfig} */

/*
    When PAGES_EXPORT=true we are building the static design-system docs for
    GitHub Pages (served under /bp). The main app cannot be statically exported
    because most routes use getServerSideProps and API routes, so the export is
    run against a pruned `pages/` tree (see scripts/export-docs.mjs) and only
    the fully-static /design-system pages are emitted. These overrides apply
    only to that build; normal `next dev` / `next build` are unaffected.
*/
const isPagesExport = process.env.PAGES_EXPORT === 'true'

const nextConfig = {
    ...(docsExport
        ? {
              basePath: docsBasePath,
              assetPrefix: `${docsBasePath}/`,
              // Expose the base path to the client so absolute references to
              // static files in public/ (e.g. brand assets, which use a plain
              // <img>) can be prefixed — Next only auto-prefixes next/image and
              // _next assets, not raw <img src>.
              env: { NEXT_PUBLIC_BASE_PATH: docsBasePath },
              trailingSlash: true,
              images: { unoptimized: true },
              typescript: { ignoreBuildErrors: true },
              eslint: { ignoreDuringBuilds: true },
          }
        : {}),
    webpack: config => {
        config.module.rules.push({
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: 'graphql-tag/loader',
        })
        return config
    },
    reactStrictMode: true,
    swcMinify: true,
    images: {
        // Whitelist external domains.
        // https://nextjs.org/docs/api-reference/next/image#domains
        domains: [
            'images.ctfassets.net',
            'videos.ctfassets.net',
            'img.youtube.com',
        ],
        // next/image optimisation is unavailable in a static export.
        ...(isPagesExport ? { unoptimized: true } : {}),
    },
    ...(isPagesExport
        ? {
              basePath: '/bp',
              assetPrefix: '/bp/',
              env: { NEXT_PUBLIC_BASE_PATH: '/bp' },
              trailingSlash: true,
              // The generated Contentful types and the SSR pages live outside
              // the docs build; skip type/lint gates so the static export of
              // the self-contained docs does not fail on unrelated code.
              typescript: { ignoreBuildErrors: true },
              eslint: { ignoreDuringBuilds: true },
          }
        : {}),
}

module.exports = nextConfig
