import type { GetStaticProps, NextPage } from 'next'
import { readResourceString } from '../lib/cmsResource'
import { FooterData, requestFooterData } from '../lib/requestFooterData'
import { requestResourceSet } from '../lib/requestResourceSet'
import { NextPageWithLayout } from '../types/nextLayout'

import { Context } from '@apollo/client'
import { invariant } from '@apollo/client/utilities/globals'
import algoliasearch from 'algoliasearch/lite'
import qs from 'qs'
import { findResultsState } from 'react-instantsearch-dom/server'
import { SearchState } from 'react-instantsearch/connectors'
import { App } from '../components/molecules/AlgoliaSearch'
import { SearchPageBlock } from '../components/molecules/blocks/SearchPageBlock'
import { Header } from '../components/organisms/Header'
import { PrimaryPageTemplate } from '../components/templates/PrimaryPageTemplate'

const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_PUBLIC_KEY
const searchAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
const searchIndex = process.env.NEXT_PUBLIC_ALGOLIA_INDEX

invariant(apiKey, 'publicKey not defined')
invariant(searchAppId, 'searchAppId not defined')
invariant(searchIndex, 'searchIndex not defined')

const searchClient = algoliasearch(searchAppId, apiKey)

const pathToSearchState = (path: string) =>
    path.includes('?') ? qs.parse(path.substring(path.indexOf('?') + 1)) : {}

const DEFAULT_PROPS = {
    searchClient,
    indexName: searchIndex,
}

interface PageProps {
    resultsState: JSON
    searchState: SearchState
    footerData?: FooterData
    searchInputPlaceholder: string
    searchHeading: string
    searchButtonText: string
    searchSubHeading: string
    searchCTA: string
}

export const getServerSideProps: GetStaticProps<PageProps> = async ({
    resolvedUrl,
}: Context) => {
    const searchState = pathToSearchState(resolvedUrl)
    const showPreviewContent = false
    const resultsState = await findResultsState(App, {
        ...DEFAULT_PROPS,
        searchState,
    })
    const footerData = await requestFooterData(showPreviewContent)
    const resourceSet = await requestResourceSet('Search', showPreviewContent)

    return {
        props: {
            resultsState: JSON.parse(JSON.stringify(resultsState)),
            searchState,
            footerData,
            searchInputPlaceholder: readResourceString(
                resourceSet,
                'searchInputPlaceholder',
                'Search'
            ),
            searchHeading: readResourceString(
                resourceSet,
                'searchHeading',
                'Search and find'
            ),
            searchButtonText: readResourceString(
                resourceSet,
                'searchButtonText',
                'Search'
            ),
            searchSubHeading: readResourceString(
                resourceSet,
                'searchSubHeading',
                ''
            ),
            searchCTA: readResourceString(resourceSet, 'searchCTA', ''),
        },
    }
}

const View: NextPage<PageProps> = ({
    resultsState,
    searchState,
    footerData,
    searchInputPlaceholder,
    searchHeading,
    searchButtonText,
    searchSubHeading,
    searchCTA,
}) => {
    const title = 'Search'

    return (
        <PrimaryPageTemplate
            isPreview={false}
            pageData={{ title, breadCrumbsEnabled: true }}
            footerData={footerData}
        >
            <div className="flex flex-col items-center">
                <SearchPageBlock
                    heading={searchHeading}
                    subheading={searchSubHeading}
                    searchCallToAction={searchCTA}
                    searchButtonText={searchButtonText}
                    searchInputPlaceholder={searchInputPlaceholder}
                    searchEndpoint={''}
                    image={''}
                    startSearchState={searchState}
                    resultsState={resultsState}
                />
            </div>
        </PrimaryPageTemplate>
    )
}

export default View
;(View as NextPageWithLayout).headerComponent = Header
