import { NextRouter, useRouter } from 'next/router'
import { MouseEventHandler } from 'react'
import { invariant } from '@apollo/client/utilities/globals'
import { scrollToTarget } from '../../utils/scrollToTarget'
import { updateSearchParams } from '../../utils/urlState'

export const LinkHandler = ({ children }: { children?: React.ReactNode }) => {
    const router = useRouter()

    const handleClick: MouseEventHandler<HTMLDivElement> = event => {
        invariant(event.target instanceof Element, 'unexpected target type')
        const href = event.target.getAttribute('href')
        const target = event.target.getAttribute('target')
        if (href) {
            event.preventDefault()
            if (isAnchorLink(href)) {
                scrollToTarget(href)
            } else if (isQueryStringLink(href)) {
                updateQueryString(href, router)
            } else {
                if (target === '_blank') {
                    window.open(href, '_blank')
                } else {
                    router.push(href)
                }
            }
        }
    }

    return (
        <div className="h-full" onClick={handleClick}>
            {children}
        </div>
    )
}

/** Returns true for HREF values beginning with a hash `#`. */
const isAnchorLink = (href: string) => href.startsWith('#')

/** Returns true for HREF values beginning with a question mark `#`. */
const isQueryStringLink = (href: string) => href.startsWith('?')

const updateQueryString = (href: string, router: NextRouter) => {
    const searchQueryStr = href.slice(1)
    updateSearchParams(router, searchQueryStr)
}
