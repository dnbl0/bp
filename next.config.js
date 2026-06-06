/** @type {import('next').NextConfig} */
const nextConfig = {
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
