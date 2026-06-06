import { ReactNode } from 'react'
import { DocStatus } from '../designSystem.config'
import { StatusBadge } from './StatusBadge'

interface PageHeaderProps {
    /** Section label shown above the title, e.g. "Foundations". */
    eyebrow?: string
    title: string
    status?: DocStatus
    /** Lead paragraph introducing the page. */
    intro?: ReactNode
}

/** The standard heading block at the top of every documentation page. */
export const PageHeader = ({ eyebrow, title, status, intro }: PageHeaderProps) => (
    <header className="mb-8 pb-8 border-b border-cool-paper-200 dark:border-charcoal">
        {eyebrow && (
            <p className="text-body-small font-semibold uppercase tracking-wide text-cyan">
                {eyebrow}
            </p>
        )}
        <div className="mt-1 flex flex-wrap items-center gap-3">
            <h1 className="text-heading-xl font-bold text-navy dark:text-white">
                {title}
            </h1>
            {status && <StatusBadge status={status} />}
        </div>
        {intro && (
            <p className="mt-4 max-w-3xl text-heading-s text-grey dark:text-light-grey">
                {intro}
            </p>
        )}
    </header>
)

/** A titled content section within a documentation page, with an anchor. */
export const Section = ({
    id,
    title,
    children,
}: {
    id: string
    title: string
    children: ReactNode
}) => (
    <section id={id} className="scroll-mt-24 mt-12 first:mt-0">
        <h2 className="text-heading-l font-bold text-navy dark:text-white">
            <a href={`#${id}`} className="no-underline hover:underline">
                {title}
            </a>
        </h2>
        <div className="mt-4">{children}</div>
    </section>
)
