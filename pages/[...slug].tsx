import type { GetServerSideProps, NextPage } from 'next'
import { FooterData, requestFooterData } from '../lib/requestFooterData'

import { CmsElement } from '../components/molecules/CmsElement'
import { Header } from '../components/organisms/Header'
import { PrimaryPageTemplate } from '../components/templates/PrimaryPageTemplate'
import { requestAgedCareHomeData } from '../lib/requestAgedCareHomeData'
import { requestPageData } from '../lib/requestPageData'
import { CmsPage } from '../types/contentful-cms-types'
import { NextPageWithLayout } from '../types/nextLayout'
import { GlobalPageData } from '../hooks/useGlobalPageData'
import { requestRedirectRecord } from '../lib/requestRedirectRecord'

interface PageProps {
    isPreview: boolean
    footerData?: FooterData
    pageData: CmsPage
    globalPageData: GlobalPageData
}

export const getServerSideProps: GetServerSideProps = async context => {
    const { PREVIEW_ACCESS_KEY } = process.env
    const {showPreview} = context.query
    const showPreviewContent = !!context.preview || showPreview === PREVIEW_ACCESS_KEY
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
        const redirectRecord = await requestRedirectRecord(slug)

        if (redirectRecord) {
            return {
                redirect: {
                    destination: redirectRecord.redirectUrl,
                    statusCode: redirectRecord.statusCode,
                },
            }
        }

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
