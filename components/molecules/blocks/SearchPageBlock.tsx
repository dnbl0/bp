import { HeroBanner } from '../HeroBanner'

import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import qs from 'qs'
import algoliasearch from 'algoliasearch/lite'
import { App } from '../AlgoliaSearch'
import { Autocomplete } from '../Autocomplete'
import { SearchState } from 'react-instantsearch/connectors'
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions'
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches'
import { invariant } from '@apollo/client/utilities/globals'

const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_PUBLIC_KEY
const searchAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
const searchIndex = process.env.NEXT_PUBLIC_ALGOLIA_INDEX
const suggestionIndex = process.env.NEXT_PUBLIC_ALGOLIA_SUGGESTIONS

invariant(apiKey, 'publicKey not defined')
invariant(searchAppId, 'searchAppId not defined')
invariant(searchIndex, 'searchIndex not defined')
invariant(suggestionIndex, 'searchIndex not defined')

const searchClient = algoliasearch(searchAppId, apiKey)

const updateAfterMs = 700

const createURL = (state: string) => `?${qs.stringify(state)}`

const pathToSearchState = (path: string) =>
    path.includes('?') ? qs.parse(path.substring(path.indexOf('?') + 1)) : {}

const searchStateToURL = (searchState: SearchState) =>
    searchState
        ? `${window.location.pathname}?${qs.stringify(searchState)}`
        : ''

const DEFAULT_PROPS = {
    searchClient,
    indexName: searchIndex,
}

export const SearchPageBlock = ({
    heading,
    subheading,
    searchCallToAction,
    searchButtonText,
    searchInputPlaceholder,
    searchEndpoint,
    image,
    startSearchState,
    resultsState,
}: {
    heading: string
    subheading: string
    searchCallToAction: string
    searchButtonText: string
    searchInputPlaceholder: string
    searchEndpoint: string
    image: any
    startSearchState: SearchState
    resultsState: JSON
}) => {
    const [searchState, setSearchState] = React.useState(startSearchState)
    const router = useRouter()
    const debouncedSetState = useRef<ReturnType<typeof setInterval> | null>(
        null
    )

    const ExtraStyle = ({ searchButtonText }: { searchButtonText: string }) => (
        <style suppressHydrationWarning>{`
            .large-search .aa-SubmitButton {
                --search-button-text: '${searchButtonText}';
            }
        `}</style>
    )

    const onSubmit = React.useCallback(
        ({ state }: SearchState) => {
            setSearchState((searchState: SearchState) => ({
                ...searchState,
                query: state.query,
            }))
            window.history.pushState(
                searchState,
                '',
                searchStateToURL(searchState)
            )
        },
        [searchState]
    )

    const onReset = React.useCallback(() => {
        setSearchState((searchState: SearchState) => ({
            ...searchState,
            query: '',
        }))
    }, [])

    useEffect(() => {
        window.history.pushState(searchState, '', searchStateToURL(searchState))
    }, [searchState])

    const plugins = React.useMemo(() => {
        const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
            key: 'search',
            limit: 3,
            transformSource({ source }) {
                return {
                    ...source,
                    onSelect({ item }) {
                        setSearchState((searchState: SearchState) => ({
                            ...searchState,
                            query: item.label,
                        }))
                    },
                }
            },
        })
        const querySuggestionsPlugin = createQuerySuggestionsPlugin({
            searchClient,
            indexName: suggestionIndex,
            getSearchParams() {
                // This creates a shared `hitsPerPage` value once the duplicates
                // between recent searches and Query Suggestions are removed.
                return recentSearchesPlugin.data!.getAlgoliaSearchParams({
                    hitsPerPage: 6,
                })
            },
            transformSource({ source }) {
                return {
                    ...source,
                    onSelect({ item }) {
                        setSearchState((searchState: SearchState) => ({
                            ...searchState,
                            query: item.query,
                        }))
                    },
                }
            },
        })

        return [recentSearchesPlugin, querySuggestionsPlugin]
    }, [])

    const searchWrapper = (
        <div className="grid grid-cols-12 gap-4 w-content m-auto">
            <div className="col-span-12 lg:col-span-8">
                <App
                    {...DEFAULT_PROPS}
                    searchState={searchState}
                    resultsState={resultsState}
                    onSearchStateChange={(nextSearchState: SearchState) => {
                        setSearchState(nextSearchState)
                    }}
                    createURL={createURL}
                    fullSearch={true}
                >
                    <div className="bg-white rounded shadow-depth-hover">
                        <div className="p-6 mt-12 large-search">
                            {searchCallToAction && (
                                <h2 className="text-heading font-medium mb-3">
                                    {searchCallToAction}
                                </h2>
                            )}
                            <ExtraStyle searchButtonText={searchButtonText} />
                            <Autocomplete
                                placeholder={searchInputPlaceholder}
                                detachedMediaQuery="none"
                                initialState={{
                                    query: searchState.query,
                                }}
                                openOnFocus={true}
                                onSubmit={(searchState: SearchState) =>
                                    onSubmit(searchState)
                                }
                                onReset={onReset}
                                plugins={plugins}
                            />
                        </div>
                    </div>
                </App>
            </div>
        </div>
    )

    const bannerText = (
        <div className="py-6 md:pt-[100px] pb-12">
            <div className="flex flex-col-reverse justify-between gap-3">
                <h1 className="text-white text-heading-l">{heading}</h1>
                <h2 className="text-white font-semibold">{subheading}</h2>
            </div>
        </div>
    )

    return (
        <HeroBanner
            image={image || undefined}
            foreground={searchWrapper}
            bannerText={bannerText}
        />
    )
}
