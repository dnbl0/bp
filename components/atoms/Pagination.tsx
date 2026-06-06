import { cx } from '../../utils/cx'

export interface PaginationProps {
    /** The current page, 1-indexed. */
    page: number
    /** The total number of pages. */
    totalPages: number
    /** Called with the requested page when the user navigates. */
    onPageChange: (page: number) => void
    /** How many numbered links to show around the current page. Defaults to 1. */
    siblingCount?: number
}

const GAP = -1

/**
 * Builds the list of page numbers to render, inserting `GAP` sentinels where
 * the sequence is truncated with an ellipsis. The first and last pages are
 * always shown.
 */
const buildRange = (
    page: number,
    totalPages: number,
    siblingCount: number
): number[] => {
    const pages = new Set<number>([1, totalPages])
    for (let p = page - siblingCount; p <= page + siblingCount; p++) {
        if (p >= 1 && p <= totalPages) pages.add(p)
    }
    const sorted = [...pages].sort((a, b) => a - b)

    const withGaps: number[] = []
    sorted.forEach((p, index) => {
        if (index > 0 && p - sorted[index - 1] > 1) withGaps.push(GAP)
        withGaps.push(p)
    })
    return withGaps
}

const arrowClass = (disabled: boolean) =>
    cx(
        'inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-md px-2 text-sm font-semibold',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan',
        disabled
            ? 'text-disabled-text cursor-not-allowed'
            : 'text-cyan hover:bg-cyan-50'
    )

/**
 * Numbered page navigation for long listings such as search results and the
 * health-information article hub. Truncates with ellipses around the current
 * page and exposes previous/next controls.
 */
export const Pagination = ({
    page,
    totalPages,
    onPageChange,
    siblingCount = 1,
}: PaginationProps) => {
    if (totalPages <= 1) return null

    const range = buildRange(page, totalPages, siblingCount)
    const isFirst = page <= 1
    const isLast = page >= totalPages

    return (
        <nav aria-label="Pagination">
            <ul className="flex list-none items-center gap-1 m-0 p-0">
                <li>
                    <button
                        type="button"
                        className={arrowClass(isFirst)}
                        disabled={isFirst}
                        aria-label="Previous page"
                        onClick={() => !isFirst && onPageChange(page - 1)}
                    >
                        ‹ Prev
                    </button>
                </li>
                {range.map((p, index) =>
                    p === GAP ? (
                        <li
                            key={`gap-${index}`}
                            aria-hidden="true"
                            className="px-2 text-sm text-disabled-text"
                        >
                            …
                        </li>
                    ) : (
                        <li key={p}>
                            <button
                                type="button"
                                aria-current={p === page ? 'page' : undefined}
                                aria-label={`Page ${p}`}
                                onClick={() => onPageChange(p)}
                                className={cx(
                                    'inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-md px-2 text-sm font-semibold',
                                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan',
                                    p === page
                                        ? 'bg-cyan text-white'
                                        : 'text-grey dark:text-light-grey hover:bg-cyan-50'
                                )}
                            >
                                {p}
                            </button>
                        </li>
                    )
                )}
                <li>
                    <button
                        type="button"
                        className={arrowClass(isLast)}
                        disabled={isLast}
                        aria-label="Next page"
                        onClick={() => !isLast && onPageChange(page + 1)}
                    >
                        Next ›
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination
