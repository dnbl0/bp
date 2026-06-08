import Link from 'next/link'
import { ArrowLeft } from '../../components/atoms/icons/ArrowLeft'
import { ArrowRight } from '../../components/atoms/icons/ArrowRight'
import { cx } from '../../utils/cx'
import { NavItem } from '../designSystem.config'
import { useBrand } from '../BrandContext'
import { adjacentDocs, hrefForItem } from '../brands'

const PagerCard = ({
    doc,
    direction,
}: {
    doc: NavItem
    direction: 'prev' | 'next'
}) => {
    const brand = useBrand()
    const isPrev = direction === 'prev'
    return (
        <Link href={hrefForItem(brand, doc)}>
            <a
                className={cx(
                    'group flex flex-1 flex-col gap-1 rounded-xl border border-cool-paper-200 dark:border-charcoal p-4 hover:border-cyan transition-colors',
                    isPrev ? 'items-start text-left' : 'items-end text-right'
                )}
            >
                <span
                    className={cx(
                        'flex items-center gap-1 text-caption font-bold uppercase tracking-wide text-disabled-text',
                        !isPrev && 'flex-row-reverse'
                    )}
                >
                    {isPrev ? (
                        <ArrowLeft className="w-4 h-4 fill-current" />
                    ) : (
                        <ArrowRight className="w-4 h-4 fill-current" />
                    )}
                    {isPrev ? 'Previous' : 'Next'}
                </span>
                <span className="font-semibold text-navy dark:text-white group-hover:text-cyan">
                    {doc.title}
                </span>
            </a>
        </Link>
    )
}

/**
 * The previous/next pager rendered at the foot of every documentation page,
 * derived from the reading order in `allDocs`.
 */
export const PrevNext = ({ slug }: { slug: string }) => {
    const brand = useBrand()
    const { prev, next } = adjacentDocs(brand, slug)
    if (!prev && !next) return null

    return (
        <nav
            aria-label="Pagination"
            className="mt-16 flex flex-col sm:flex-row gap-4"
        >
            {prev ? <PagerCard doc={prev} direction="prev" /> : <span className="flex-1" />}
            {next ? <PagerCard doc={next} direction="next" /> : <span className="flex-1" />}
        </nav>
    )
}
