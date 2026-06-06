import type { GetStaticProps, NextPage } from 'next'
import { MouseEventHandler } from 'react'
import { ErrorMessageWrapper } from '../components/atoms/ErrorMessageWrapper'
import { Header } from '../components/organisms/Header'
import { PrimaryPageTemplate } from '../components/templates/PrimaryPageTemplate'
import { NextPageWithLayout } from '../types/nextLayout'

interface PageProps {}

export const getStaticProps: GetStaticProps<PageProps> = async context => {
    const showPreviewContent = false

    // TODO[Shannon]: The footer data is not currently usuable as
    // we don't yet have a way to request it. We might be able to set something
    // up once we implement caching.
    // https://iegroup.atlassian.net/browse/BVAC-133
    // const footerData = await requestFooterData(showPreviewContent)

    return {
        props: {},
    }
}

const View: NextPage<PageProps> = () => {
    const title = 'Server error (500)'
    const breadcrumbs = [{ title: 'Home', link: '/' }]

    const handleClick: MouseEventHandler<HTMLAnchorElement> = event => {
        event.preventDefault()
        location.reload()
    }

    return (
        <PrimaryPageTemplate
            isPreview={false}
            pageData={{ title, breadCrumbsEnabled: true }}
        >
            <ErrorMessageWrapper>
                <div className="flex flex-col items-center">
                    <h1 className="mb-8 text-heading-m font-semibold">
                        {"This page isn't working"}
                    </h1>

                    <p className="mb-6 mx-6 max-w-sm text-center">
                        Please try to reload the page. If the problem continues,
                        try again later.
                    </p>

                    <div>
                        <a className="button" href="/" onClick={handleClick}>
                            Reload
                        </a>
                    </div>
                </div>
            </ErrorMessageWrapper>
        </PrimaryPageTemplate>
    )
}

export default View
;(View as NextPageWithLayout).headerComponent = Header
