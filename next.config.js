// When DOCS_EXPORT=1 we build a static, Contentful-free snapshot of the
// /design-system docs for GitHub Pages (served under a base path, default /bp).
// This block is inert for normal dev and the Netlify production build.
const docsExport = process.env.DOCS_EXPORT === '1'
const docsBasePath = process.env.DOCS_BASE_PATH || '/bp'

/** @type {import('next').NextConfig} */
const nextConfig = {
    ...(docsExport
        ? {
              basePath: docsBasePath,
              assetPrefix: `${docsBasePath}/`,
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
    },
}

module.exports = nextConfig
