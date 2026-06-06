import Link from 'next/link'
import React from 'react'
import {
    Hits,
    Configure,
    Highlight,
    Pagination,
    InstantSearch,
    connectSearchBox,
    connectStateResults,
} from 'react-instantsearch-dom'
import { StateResultsProvided } from 'react-instantsearch/connectors'
import { ChevronRightIcon } from '../atoms/icons/ChevronRightIcon'
import { SearchEmpty } from '../atoms/icons/SearchEmpty'

const VirtualSearchBox = connectSearchBox(() => null)

const HitComponent = ({ hit }: any) => (
    <Link href={hit.url ? hit.url : '#'}>
        <a className="group">
            <div className="hit flex items-center">
                <div className="hit-content text-base text-navy grow">
                    <div className="font-medium group-hover:underline">
                        <Highlight
                            attribute="title"
                            hit={hit}
                            class="text-cyan"
                        />
                    </div>
                    <div className="hit-description text-grey text-sm">
                        <Highlight attribute="content" hit={hit} />
                    </div>
                </div>
                <div className="ml-6">
                    <ChevronRightIcon />
                </div>
            </div>
        </a>
    </Link>
)

interface StateResultsWithChildren extends StateResultsProvided {
    children: JSX.Element
}

const NoResults = () => (
    <div className="bg-warm-paper-100 rounded min-h-[470px] flex justify-center flex-col items-center mt-6">
        <div className="mb-6">
            <SearchEmpty />
        </div>
        <div className="text-navy font-medium text-2xl">
            Sorry no results found
        </div>
        <div className="content-center">Please try refining your search</div>
    </div>
)

type showInfo = {
    nbHits: number
    currentPage: number
    hitsPerPage: number
    currentCount: number
}

const Showing = ({
    nbHits,
    currentPage,
    hitsPerPage,
    currentCount,
}: showInfo) => (
    <>
        Showing {currentPage * hitsPerPage + 1} to{' '}
        {currentPage * hitsPerPage + currentCount} of {nbHits}
    </>
)

const Results = connectStateResults(
    ({ searchState, searchResults, children }: StateResultsWithChildren) => {
        if (
            searchResults &&
            searchResults.nbHits !== 0 &&
            searchState.query !== '' &&
            searchState.query !== undefined
        ) {
            return (
                <>
                    <main>
                        <div className="results">
                            <div className="hit-header md:flex my-8 items-center">
                                <div className="text-navy font-medium text-2xl grow">
                                    Showing results for &apos;
                                    {searchState.query}
                                    &apos;
                                </div>
                                <div className="shrink-0 mt-6 md:ml-6 md:mt-0">
                                    <Showing
                                        nbHits={searchResults.nbHits}
                                        currentPage={searchResults.page}
                                        hitsPerPage={searchResults.hitsPerPage}
                                        currentCount={searchResults.hits.length}
                                    />
                                </div>
                            </div>
                            {children}
                        </div>
                    </main>
                    <footer>
                        <div className="my-6 md:flex flex-row-reverse items-center">
                            <div className="my-6 md:my-14 text-center">
                                <Showing
                                    nbHits={searchResults.nbHits}
                                    currentPage={searchResults.page}
                                    hitsPerPage={searchResults.hitsPerPage}
                                    currentCount={searchResults.hits.length}
                                />
                            </div>
                            <div className="my-6 grow md:my-14">
                                {searchResults.nbHits >
                                    searchResults.hitsPerPage && <Pagination />}
                            </div>
                        </div>
                    </footer>
                </>
            )
        } else {
            if (searchState.query == '' || searchState.query == undefined) {
                return <div className="m-24">&nbsp;</div>
            } else {
                return <NoResults />
            }
        }
    }
)

export function App(props: any) {
    const showHits = props.fullSearch ? true : false
    return (
        <InstantSearch {...props}>
            <Configure hitsPerPage={10} />
            <header>
                <VirtualSearchBox />
                {props.children}
            </header>
            {showHits && (
                <Results>
                    <Hits hitComponent={HitComponent} />
                </Results>
            )}
        </InstantSearch>
    )
}
