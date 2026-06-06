import { NextRouter } from 'next/router'

/** Update the URL hash without triggering a page load. */
export const updateUrlHash = (hash: string) => {
    history.pushState(null, '', `#${hash}`)
}

/** Update the URL search parameters without triggering a page load. */
export const updateSearchParams = (
    router: NextRouter,
    searchParams: string | null
) => {
    const url = new URL(document.location.href)
    const queryStr = searchParams ? `?${searchParams}` : ''
    const target = url.pathname + queryStr + url.hash
    router.push(target)
}
