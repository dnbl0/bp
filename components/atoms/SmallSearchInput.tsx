import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import qs from 'qs'
import algoliasearch from 'algoliasearch/lite'
import { App } from '../molecules/AlgoliaSearch'
import { Autocomplete } from '../molecules/Autocomplete'
import { SearchState } from 'react-instantsearch/connectors'
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions'
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches'

const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_PUBLIC_KEY
const searchAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
const searchIndex = process.env.NEXT_PUBLIC_ALGOLIA_INDEX
const suggestionIndex = process.env.NEXT_PUBLIC_ALGOLIA_SUGGESTIONS
const searchSuggestions = process.env.NEXT_PUBLIC_ALGOLIA_SUGGESTIONS

// When Algolia keys aren't configured (e.g. local docs-only runs) we don't
// throw at import time — that would crash every page whose bundle pulls in the
// Header. Instead the component renders a disabled placeholder input.
const hasAlgolia = Boolean(apiKey && searchAppId && suggestionIndex)

const searchClient = hasAlgolia
    ? algoliasearch(searchAppId as string, apiKey as string)
    : null

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
    // `hasAlgolia` is a module-level constant, so this branch is stable across
    // renders and doesn't violate the rules of hooks.
    if (!hasAlgolia) {
        return (
            <div>
                <input
                    type="search"
                    placeholder={placeholder}
                    disabled
                    aria-label="Search (disabled — Algolia not configured)"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-400"
                />
            </div>
        )
    }

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
