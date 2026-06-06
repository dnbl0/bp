import { GetServerSideProps } from 'next'
import { requestSitemapPages } from '../lib/requestSitemapPages'
import { CmsPage } from '../types/contentful-cms-types'

const generateSiteMap = (pages: CmsPage[]) => {
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN
        ? `https://${process.env.NEXT_PUBLIC_DOMAIN}`
        : ''

    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
        .map(({ sys: { publishedAt }, slug }) => {
            return `
            <url>
                <loc>${baseUrl}${slug}</loc>
                <lastmod>${publishedAt}</lastmod>
            </url>
            `
        })
        .join('')}
   </urlset>
`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const pages = await requestSitemapPages(false)
    const sitemap = generateSiteMap(pages || [])
    res.setHeader('Content-Type', 'text/xml')
    res.write(sitemap)
    res.end()

    return {
        props: {},
    }
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export default SiteMap
