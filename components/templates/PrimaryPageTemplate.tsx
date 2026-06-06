import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { INLINES, Node } from '@contentful/rich-text-types'
import Head from 'next/head'
import Link from 'next/link'
import { useRef } from 'react'
import {
    GlobalPageData,
    GlobalPageDataProvider,
} from '../../hooks/useGlobalPageData'
import { useIsVisibleInViewport } from '../../hooks/useIsVisibleInViewport'
import { useMicroCopy } from '../../hooks/useMicroCopy'
import { useRichTextMicroCopy } from '../../hooks/useRichTextMicroCopy'
import { FooterData } from '../../lib/requestFooterData'
import { CmsPage } from '../../types/contentful-cms-types'
import { BackToTop } from '../atoms/BackToTop'
import { BelowHeader } from '../atoms/BelowHeader'
import AlertBlock from '../molecules/blocks/AlertBlock'
import { BreadCrumbsBlock } from '../molecules/blocks/BreadCrumbsBlock'
import StickyBar from '../molecules/blocks/StickyBar'
import { Footer } from '../organisms/Footer'
import { PreviewEnabledNotification } from '../organisms/PreviewEnabledNotification'
import { formattingOptionsForColouredCard } from '../../utils/formattingOptions'

export const PrimaryPageTemplate = ({
    isPreview,
    footerData,
    pageData,
    globalPageData,
    children,
}: {
    isPreview: boolean
    footerData?: FooterData
    pageData: Pick<
        CmsPage,
        | 'title'
        | 'breadCrumbsEnabled'
        | 'breadCrumbParent'
        | 'backToTopEnabled'
        | 'indexForSearching'
        | 'topNotificationBar'
        | 'metaDescription'
        | 'seoStructuredDataMarkup'
        | 'openGraphTitle'
        | 'openGraphDescription'
        | 'openGraphImage'
        | 'canonicalTag'
        | 'slug'
        | 'hideStickyBar'
        | 'pageBackground'
    >
    globalPageData?: GlobalPageData
    children?: React.ReactNode
}) => {
    const { data: stickyBarMessage } = useRichTextMicroCopy('stickyBarMessage')
    const { data: backToTop } = useMicroCopy('backToTop')
    const breadcrumbs = [{ title: 'Home', link: '/' }]

    const {
        title,
        breadCrumbsEnabled,
        breadCrumbParent,
        backToTopEnabled,
        indexForSearching,
        topNotificationBar,
        metaDescription,
        seoStructuredDataMarkup,
        openGraphTitle,
        openGraphDescription,
        openGraphImage,
        canonicalTag,
        slug,
        hideStickyBar,
        pageBackground,
    } = pageData

    if (breadCrumbParent) {
        const { caption, href } = breadCrumbParent
        if (caption && href) {
            breadcrumbs.push({
                title: caption,
                link: href,
            })
        }
    }

    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN
        ? `https://${process.env.NEXT_PUBLIC_DOMAIN}`
        : ''

    const headerRef = useRef(null)
    const isHeaderVisible = useIsVisibleInViewport(headerRef)
    const pageContent = (
        <GlobalPageDataProvider data={globalPageData || {}}>
            <Head>
                {title && <title>{title}</title>}
                {metaDescription && (
                    <meta name="description" content={metaDescription}></meta>
                )}
                {seoStructuredDataMarkup && (
                    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:seoStructuredDataMarkup}}></script>
                )}
                {openGraphTitle && (
                    <meta property="og:title" content={openGraphTitle}></meta>
                )}
                {openGraphDescription && (
                    <meta
                        property="og:description"
                        content={openGraphDescription}
                    ></meta>
                )}
                {openGraphImage && openGraphImage.url && (
                    <meta
                        property="og:image"
                        content={openGraphImage.url}
                    ></meta>
                )}
                {!indexForSearching && (
                    <meta name="robots" content="noindex"></meta>
                )}
                {canonicalTag && slug && (
                    <link rel="canonical" href={baseUrl + slug}></link>
                )}
            </Head>
            <div>
                <div ref={headerRef} />
                {!isHeaderVisible && backToTopEnabled && (
                    <BackToTop linkText={backToTop} />
                )}
                {topNotificationBar && (
                    <AlertBlock>
                        {documentToReactComponents(
                            topNotificationBar.json,
                            options
                        )}
                    </AlertBlock>
                )}
                {breadCrumbsEnabled && title && (
                    <BreadCrumbsBlock title={title} breadcrumbs={breadcrumbs} />
                )}
                {isPreview && <PreviewEnabledNotification />}
                {children}
            </div>
        </GlobalPageDataProvider>
    )

    const FooterContent = () => {
        const ref = useRef(null)
        const isVisible = useIsVisibleInViewport(ref)

        return (
            <div ref={ref}>
                {!hideStickyBar && !isVisible && stickyBarMessage && (
                    <StickyBar>
                        {documentToReactComponents(
                            stickyBarMessage,
                            formattingOptionsForColouredCard
                        )}
                    </StickyBar>
                )}
                {footerData && <Footer {...footerData} />}
            </div>
        )
    }

    return (
        <BelowHeader
            pageContent={pageContent}
            footerContent={<FooterContent />}
            backgroundColor={pageBackground?.toString()}
        />
    )
}

const options = {
    renderNode: {
        [INLINES.HYPERLINK]: (node: Node, children: React.ReactNode) => (
            <Link href={node.data.uri}>
                <a className="underline">{children}</a>
            </Link>
        ),
    },
}
