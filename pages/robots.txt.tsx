import { GetServerSideProps } from 'next'
import { requestSearchIndexDisabledPages } from '../lib/requestSearchIndexDisabledPages'
import { CmsPage } from '../types/contentful-cms-types'

const generateRobotsTxt = (pages: CmsPage[]) => {
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN
        ? `https://${process.env.NEXT_PUBLIC_DOMAIN}`
        : ''

    return `User-agent: *
Allow: /

Disallow: /design-system
${pages
    .map(({ slug }) => {
        return `Disallow: ${slug}`
    })
    .join('\n')}

Sitemap: ${baseUrl}/sitemap.xml`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const pages = await requestSearchIndexDisabledPages(false)
    const robotsTxt = generateRobotsTxt(pages || [])
    res.setHeader('Content-Type', 'text/plain')
    res.write(robotsTxt)
    res.end()

    return {
        props: {},
    }
}

function Robots() {
    // getServerSideProps will do the heavy lifting
}

export default Robots
