import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import qs from 'qs'
import algoliasearch from 'algoliasearch/lite'
import { App } from '../molecules/AlgoliaSearch'
import { Autocomplete } from '../molecules/Autocomplete'
import { SearchState } from 'react-instantsearch/connectors'
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions'
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches'
import { invariant } from '@apollo/client/utilities/globals'

const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_PUBLIC_KEY
const searchAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
const searchIndex = process.env.NEXT_PUBLIC_ALGOLIA_INDEX
const suggestionIndex = process.env.NEXT_PUBLIC_ALGOLIA_SUGGESTIONS
const searchSuggestions = process.env.NEXT_PUBLIC_ALGOLIA_SUGGESTIONS

invariant(apiKey, 'publicKey not defined')
invariant(searchAppId, 'searchAppId not defined')
invariant(searchIndex, 'searchIndex not defined')
invariant(suggestionIndex, 'searchIndex not defined')

const searchClient = algoliasearch(searchAppId, apiKey)

const updateAfter = 700

const DEFAULT_PROPS = {
    searchClient,
    indexName: suggestionIndex,
}

const createURL = (state: string) => `?${qs.stringify(state)}`

const pathToSearchState = (path: string) =>
    path.includes('?') ? qs.parse(path.substring(path.indexOf('?') + 1)) : {}

const searchStateToURL = (searchState: SearchState) =>
    searchState
        ? `${window.location.pathname}?${qs.stringify(searchState)}`
        : ''

export const SmallSearchInput = ({
    focusOnMount,
    placeholder,
    allowEmptySearch,
}: {
    focusOnMount: boolean
    placeholder: string
    allowEmptySearch: boolean
}) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [searchState, setSearchState] = React.useState(
        pathToSearchState(window.location.href)
    )

    const router = useRouter()
    const debouncedSetState = useRef<ReturnType<typeof setInterval> | null>(
        null
    )

    useEffect(() => {
        if (focusOnMount) {
            inputRef.current?.focus()
        }
        // The `exhaustive-deps` check has been disabled because
        // we don't want to include `focusOnMount` as
        // a dependency.
        //
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit = React.useCallback(
        ({ state }: SearchState) => {
            const searchLocation = (query: string | undefined) => {
                if (query || allowEmptySearch) {
                    window.location.href = `/search/?query=${
                        query ? query : ''
                    }`
                }
            }

            searchLocation(state.query)
        },
        [allowEmptySearch]
    )

    const plugins = React.useMemo(() => {
        const searchLocation = (query: string | undefined) => {
            if (query || allowEmptySearch) {
                window.location.href = `/search/?query=${query}`
            }
        }

        const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
            key: 'search',
            limit: 3,
            transformSource({ source }) {
                return {
                    ...source,
                    onSelect({ item }) {
                        searchLocation(item.label)
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
                        window.location.href = `/search/?query=${item.query}`
                    },
                }
            },
        })

        return [recentSearchesPlugin, querySuggestionsPlugin]
    }, [allowEmptySearch])

    return (
        <div>
            <App
                {...DEFAULT_PROPS}
                searchState={searchState}
                // resultsState={props.resultsState}
                onSearchStateChange={(nextSearchState: SearchState) => {
                    if (debouncedSetState.current) {
                        clearTimeout(debouncedSetState.current)
                    }
                    debouncedSetState.current = setTimeout(() => {
                        const href = searchStateToURL(nextSearchState)

                        router.push(href, href, { shallow: true })
                    }, updateAfter)

                    setSearchState(nextSearchState)
                }}
                createURL={createURL}
                fullSearch={false}
            >
                <Autocomplete
                    placeholder={placeholder}
                    detachedMediaQuery="none"
                    initialState={{
                        query: searchState.query,
                    }}
                    openOnFocus={true}
                    onSubmit={(searchState: SearchState) =>
                        onSubmit(searchState)
                    }
                    plugins={plugins}
                ></Autocomplete>
            </App>
        </div>
    )
}
