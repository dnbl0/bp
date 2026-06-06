import type { GetServerSideProps, NextPage } from 'next'
import { FooterData, requestFooterData } from '../lib/requestFooterData'

import { CmsElement } from '../components/molecules/CmsElement'
import { Header } from '../components/organisms/Header'
import { PrimaryPageTemplate } from '../components/templates/PrimaryPageTemplate'
import { requestPageData } from '../lib/requestPageData'
import { CmsPage } from '../types/contentful-cms-types'
import { NextPageWithLayout } from '../types/nextLayout'
import { requestAgedCareHomeData } from '../lib/requestAgedCareHomeData'
import { GlobalPageData } from '../hooks/useGlobalPageData'
import { BlogComponent } from '../components/molecules/blocks/BlogComponent'

interface PageProps {
    isPreview: boolean
    footerData?: FooterData
    pageData: CmsPage
    globalPageData: GlobalPageData
}

export const getServerSideProps: GetServerSideProps = async context => {
    const showPreviewContent = !!context.preview
    const slug = pageSlug(context.params?.slug || '/')

    if (!slug) {
        return {
            notFound: true,
        }
    }

    const pageData = await requestPageData(
        slug.toLowerCase(),
        showPreviewContent
    )

    if (!pageData) {
        return {
            notFound: true,
        }
    }

    const footerData = await requestFooterData(showPreviewContent)

    const agedCareHomeData = await requestAgedCareHomeData(showPreviewContent)

    const props: PageProps = {
        isPreview: showPreviewContent,
        footerData,
        pageData,
        globalPageData: {
            ...agedCareHomeData,
        },
    }

    return { props }
}

const View: NextPage<PageProps> = ({
    isPreview,
    footerData,
    pageData,
    globalPageData,
}) => {
    const { template } = pageData
    return (
        <PrimaryPageTemplate
            isPreview={isPreview}
            footerData={footerData}
            pageData={pageData}
            globalPageData={globalPageData}
        >
            {template && (
                <main>
                    <CmsElement component={{ block: template }} />
                </main>
            )}
            <BlogComponent tagName={'jason'}></BlogComponent>
        </PrimaryPageTemplate>
    )
}

export default View
;(View as NextPageWithLayout).headerComponent = Header

const pageSlug = (slugParams: string | string[]): string | undefined => {
    return typeof slugParams === 'string'
        ? slugParams
        : '/' + slugParams.join('/')
}
