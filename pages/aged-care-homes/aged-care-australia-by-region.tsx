import type { GetStaticProps, NextPage } from 'next'
import { NextRouter, useRouter } from 'next/router'
import { Section } from '../../components/atoms/Section'
import { SearchHomeHeroSection } from '../../components/molecules/sections/SearchHomeHeroSection'
import { Header } from '../../components/organisms/Header'
import { PrimaryPageTemplate } from '../../components/templates/PrimaryPageTemplate'
import { GlobalPageData } from '../../hooks/useGlobalPageData'
import { createClient } from '../../lib/contentfulGraphqlClient'
import { requestAgedCareHomeData } from '../../lib/requestAgedCareHomeData'
import { FooterData, requestFooterData } from '../../lib/requestFooterData'
import { RequestBrowseByRegion } from '../../schema/requestBrowseByRegion'
import {
    CmsContentfulTag,
    CmsQuery,
    CmsSearchHomeHeroSection,
} from '../../types/contentful-cms-types'
import { NextPageWithLayout } from '../../types/nextLayout'
import { isDefined } from '../../utils/typeguards'

const SearchHeroSectionName = 'RegionSearch'

interface PageProps {
    heroSectionData?: CmsSearchHomeHeroSection
    footerData?: FooterData
    globalPageData: GlobalPageData
}

export const getServerSideProps: GetStaticProps<PageProps> = async () => {
    const heroSectionData = await requestSearchHeroSectionData(false)

    const footerData = await requestFooterData(false)

    const agedCareHomeData = await requestAgedCareHomeData(false)

    return {
        props: {
            heroSectionData,
            footerData,
            globalPageData: {
                ...agedCareHomeData,
            },
        },
    }
}

const View: NextPage<PageProps> = ({
    heroSectionData,
    footerData,
    globalPageData,
}) => {
    const title = 'Search by region'
    const router = useRouter()

    return (
        <PrimaryPageTemplate
            isPreview={false}
            footerData={footerData}
            pageData={{ title, breadCrumbsEnabled: true }}
            globalPageData={globalPageData}
        >
            <div className="bg-warm-paper-100">
                {heroSectionData && (
                    <SearchHomeHeroSection component={heroSectionData} />
                )}

                {heroSectionData?.contentfulMetadata &&
                    heroSectionData.contentfulMetadata.tags && (
                        <Section className="pb-12">
                            <div className="gap-6 flex flex-wrap">
                                {heroSectionData.contentfulMetadata.tags
                                    .filter(isDefined)
                                    .map(tag => (
                                        <a
                                            key={tag.id}
                                            className="button button--secondary block"
                                            href={getTagHref(tag, router)}
                                        >
                                            {extractRegionFromTagName(tag)}
                                        </a>
                                    ))}
                            </div>
                        </Section>
                    )}
            </div>
        </PrimaryPageTemplate>
    )
}

const requestSearchHeroSectionData = async (showPreviewContent: boolean) => {
    const client = createClient(showPreviewContent)

    try {
        const { data, error } = await client.query<CmsQuery>({
            query: RequestBrowseByRegion,
            variables: { name: SearchHeroSectionName },
            fetchPolicy: 'no-cache',
            // Ignore errors coming from draft as they trip up apollo
            errorPolicy: 'ignore',
        })

        if (error) {
            console.error(`Search hero section error: ${error}`)
            throw error
        }

        const filteredData =
            data.searchHomeHeroSectionCollection?.items.find(isDefined)

        return filteredData
    } catch (error) {
        console.error(`Browse by region page error: ${error}`)
        throw error
    }
}

const getTagHref = (tag: CmsContentfulTag, router: NextRouter) => {
    const newPath = new URL('http://localhost' + router.asPath);
    const newPathname = newPath.pathname + '/' + extractRegionFromTagId(tag);
    return `${newPathname}${newPath.search}`;
}

const extractRegionFromTagId = (tag: CmsContentfulTag) => {
    let regionName = ''

    if (tag.id) {
        const idWithoutPrefix = tag.id.replace(/^region/, '')
        const splitId = idWithoutPrefix.split(/(?=[A-Z])/)
        regionName = splitId.map(part => part.toLowerCase()).join('-')
    }

    return regionName
}

const extractRegionFromTagName = (tag: CmsContentfulTag) => {
    return tag.name?.split(':')[1].trim()
}

export default View
;(View as NextPageWithLayout).headerComponent = Header
