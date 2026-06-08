import { cx } from '../../utils/cx'

export interface Criterion {
    /** Success-criterion number, e.g. "1.4.3". */
    id: string
    /** Official name, e.g. "Contrast (Minimum)". */
    title: string
    /** Conformance level. */
    level: 'A' | 'AA'
    /** Added in WCAG 2.2 (flagged with a marker). */
    isNew?: boolean
}

/**
 * A reference list of the WCAG success criteria a guideline page "owns". Gives
 * each accessibility page an at-a-glance, auditable mapping back to the
 * standard — the pattern used by USWDS and Carbon. Render inside a Section
 * titled "Success criteria".
 */
export const CriteriaList = ({ items }: { items: Criterion[] }) => (
    <ul className="grid gap-2 sm:grid-cols-2">
        {items.map(criterion => (
            <li
                key={criterion.id}
                className="flex items-start gap-3 rounded-lg border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey px-3 py-2"
            >
                <span className="font-mono text-caption text-cyan flex-none mt-0.5">
                    {criterion.id}
                </span>
                <span className="min-w-0 flex-1">
                    <span className="block text-body-small font-semibold text-navy dark:text-white">
                        {criterion.title}
                    </span>
                    <span className="mt-1 flex flex-wrap items-center gap-1.5">
                        <span
                            className={cx(
                                'inline-flex items-center px-1.5 h-5 rounded text-caption font-semibold',
                                criterion.level === 'AA'
                                    ? 'bg-cyan-50 text-navy dark:bg-charcoal dark:text-cyan'
                                    : 'bg-cool-paper-100 text-grey dark:bg-grey dark:text-light-grey'
                            )}
                        >
                            Level {criterion.level}
                        </span>
                        {criterion.isNew && (
                            <span className="inline-flex items-center px-1.5 h-5 rounded text-caption font-semibold bg-success-green/15 text-dark-green">
                                New in 2.2
                            </span>
                        )}
                    </span>
                </span>
            </li>
        ))}
    </ul>
)
