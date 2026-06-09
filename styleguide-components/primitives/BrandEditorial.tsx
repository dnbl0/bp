/*
    Editorial primitives for the Bupa Brand Guidelines section.

    Unlike the reference-documentation primitives (PageHeader, Section, …) these
    are tuned for a marketing voice: a bold display hero, oversized brand
    statements and pull-quotes, and the copy-comparison patterns used to teach
    tone of voice. They lean on the brand's own design language — the blue
    square and "blue is the glue" — so the brand pages practise what they
    preach. Copy passed in is transcribed from the Bupa Brand Guidelines 2023
    (v1); these components only handle presentation.
*/
import { ReactNode } from 'react'
import { cx } from '../../utils/cx'
import { DocStatus } from '../designSystem.config'
import { StatusBadge } from './StatusBadge'

interface BrandHeroProps {
    /** Small label above the title, e.g. "Brand guidelines". */
    eyebrow?: string
    title: ReactNode
    /** Lead paragraph introducing the page. */
    intro?: ReactNode
    status?: DocStatus
}

/**
 * The bold, full-width header for a brand page. A navy panel with the blue
 * square motif and oversized display type — the marketing counterpart to the
 * understated documentation PageHeader.
 */
export const BrandHero = ({ eyebrow, title, intro, status }: BrandHeroProps) => (
    <header className="relative mb-12 overflow-hidden rounded-3xl bg-navy text-white">
        {/* The square motif — "start with a square / blue is the glue". */}
        <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rotate-12 rounded-3xl bg-cyan/25"
        />
        <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-20 h-24 w-24 bg-cyan/15"
        />
        <div className="relative p-8 sm:p-12 lg:p-16">
            {eyebrow && (
                <p className="bds-eyebrow text-cyan">{eyebrow}</p>
            )}
            <h1 className="mt-4 max-w-3xl text-[2.5rem] sm:text-[3.25rem] lg:text-[4rem] font-bold leading-[1.03] tracking-[-0.03em] [text-wrap:balance]">
                {title}
            </h1>
            {intro && (
                <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-white/80 [text-wrap:pretty]">
                    {intro}
                </p>
            )}
            {status && (
                <div className="mt-6">
                    <StatusBadge status={status} />
                </div>
            )}
        </div>
    </header>
)

/**
 * An oversized brand statement — for the kind of single, confident line the
 * brand book leads with (purpose, ambition, a principle's tagline). `tone`
 * picks a neutral card or a full Bupa Blue fill.
 */
export const BigStatement = ({
    label,
    children,
    tone = 'neutral',
}: {
    label?: string
    children: ReactNode
    tone?: 'neutral' | 'blue'
}) => (
    <div
        className={cx(
            'rounded-3xl p-8 sm:p-12',
            tone === 'blue'
                ? 'bg-cyan text-white'
                : 'border border-cool-paper-200 dark:border-charcoal bg-cool-paper-50 dark:bg-cool-grey'
        )}
    >
        {label && (
            <p
                className={cx(
                    'bds-eyebrow',
                    tone === 'blue' ? 'text-white/80' : 'text-cyan'
                )}
            >
                {label}
            </p>
        )}
        <p
            className={cx(
                'mt-4 text-[1.75rem] sm:text-[2.5rem] font-bold leading-[1.1] tracking-[-0.02em] [text-wrap:balance]',
                tone === 'blue' ? 'text-white' : 'text-navy dark:text-white'
            )}
        >
            {children}
        </p>
    </div>
)

/** A large pull-quote with the brand's blue rule, for quoting the brand book. */
export const PullQuote = ({
    children,
    cite,
}: {
    children: ReactNode
    cite?: string
}) => (
    <figure className="my-8 border-l-4 border-cyan pl-6">
        <blockquote className="text-[1.5rem] sm:text-[1.875rem] font-semibold leading-snug tracking-[-0.01em] text-navy dark:text-white [text-wrap:balance]">
            {children}
        </blockquote>
        {cite && (
            <figcaption className="mt-3 bds-eyebrow text-disabled-text">
                {cite}
            </figcaption>
        )}
    </figure>
)

/**
 * A before/after copy comparison — the brand book's core device for teaching
 * tone of voice. The "after" column is styled in brand blue to mark it as the
 * preferred version.
 */
export const BeforeAfter = ({
    label,
    before,
    after,
}: {
    label?: string
    before: ReactNode
    after: ReactNode
}) => (
    <div>
        {label && (
            <h3 className="text-body-small font-bold uppercase tracking-wide text-disabled-text">
                {label}
            </h3>
        )}
        <div className={cx('grid gap-4 md:grid-cols-2', label && 'mt-3')}>
            <div className="rounded-xl border border-cool-paper-200 dark:border-charcoal p-5 bg-white dark:bg-cool-grey">
                <p className="text-caption font-semibold uppercase tracking-wide text-disabled-text">
                    Before
                </p>
                <p className="mt-2 text-body-small text-grey dark:text-light-grey">
                    {before}
                </p>
            </div>
            <div className="rounded-xl border border-cyan/40 p-5 bg-cyan-50 dark:bg-charcoal">
                <p className="text-caption font-semibold uppercase tracking-wide text-cyan">
                    After
                </p>
                <p className="mt-2 text-body-small text-navy dark:text-white">
                    {after}
                </p>
            </div>
        </div>
    </div>
)

/** A "swap office-speak for everyday words" vocabulary table. */
export const WordSwapTable = ({
    swaps,
}: {
    swaps: { before: string; after: string }[]
}) => (
    <div className="overflow-x-auto">
        <table className="w-full text-body-small border-collapse">
            <thead>
                <tr className="border-b border-cool-paper-200 dark:border-charcoal text-left">
                    <th className="p-3 font-semibold text-grey dark:text-light-grey">
                        Before
                    </th>
                    <th className="p-3 font-semibold text-grey dark:text-light-grey">
                        After
                    </th>
                </tr>
            </thead>
            <tbody>
                {swaps.map(swap => (
                    <tr
                        key={swap.before}
                        className="border-b border-cool-paper-100 dark:border-charcoal"
                    >
                        <td className="p-3 text-grey dark:text-light-grey line-through decoration-error-red/50">
                            {swap.before}
                        </td>
                        <td className="p-3 font-semibold text-navy dark:text-white">
                            {swap.after}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)

export interface Principle {
    title: string
    /** The principle's headline statement. */
    lead: string
    /** Supporting "how we apply it" points. */
    points: string[]
}

/**
 * A design or tone principle, presented as a numbered editorial card with a
 * blue square marker. Promoted from the Design principles page so the same
 * treatment can be reused for tone-of-voice principles.
 */
export const PrincipleCard = ({
    principle,
    index,
}: {
    principle: Principle
    index?: number
}) => (
    <div className="flex flex-col rounded-2xl border border-cool-paper-200 dark:border-charcoal p-6 sm:p-8 bg-white dark:bg-cool-grey">
        <div className="flex items-start gap-4">
            <span
                aria-hidden="true"
                className="flex h-12 w-12 flex-none items-center justify-center rounded-md bg-cyan text-white text-heading-s font-bold"
            >
                {index !== undefined ? index : ''}
            </span>
            <div>
                <h3 className="text-heading-s sm:text-heading-m font-bold text-navy dark:text-white tracking-[-0.01em]">
                    {principle.title}
                </h3>
                <p className="mt-2 text-body text-grey dark:text-light-grey">
                    {principle.lead}
                </p>
            </div>
        </div>
        <ul className="mt-5 space-y-2 border-t border-cool-paper-200 dark:border-charcoal pt-5">
            {principle.points.map(point => (
                <li
                    key={point}
                    className="flex gap-2 text-body-small text-grey dark:text-light-grey"
                >
                    <span aria-hidden="true" className="flex-none text-cyan">
                        —
                    </span>
                    <span>{point}</span>
                </li>
            ))}
        </ul>
    </div>
)
