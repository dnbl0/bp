import { ReactNode } from 'react'
import { cx } from '../../utils/cx'

/**
 * The shared container surface for the documentation UI — the single source of
 * truth for the bordered boxes that wrap demo content, examples and callouts.
 *
 * It replaces the drift of ad-hoc `rounded(-lg/-xl/-2xl) border (border-lighter-grey
 * | border-cool-paper-200) p-(4|5|6|8) bg-(white|cool-paper-50)` markup that had
 * spread across the docs pages. Every container now resolves to one radius
 * (`rounded-xl`), one border token (`cool-paper-200`) and a fixed padding scale.
 *
 * Use {@link Card} instead for navigation / info / feature *tiles* (icon, title,
 * description, CTA). `Panel` is for neutral surfaces that wrap arbitrary content.
 */
export interface PanelProps {
    children: ReactNode
    /** Padding step. Defaults to `md` (p-5). `xl` is responsive (p-4 → sm:p-8). */
    padding?: 'sm' | 'md' | 'lg' | 'xl' | 'none'
    /** Surface tone: plain white (`default`) or the tinted callout (`tinted`). */
    tone?: 'default' | 'tinted'
    className?: string
}

const paddingClass: Record<NonNullable<PanelProps['padding']>, string> = {
    none: '',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
    xl: 'p-4 sm:p-8',
}

const toneClass: Record<NonNullable<PanelProps['tone']>, string> = {
    default: 'bg-white dark:bg-cool-grey',
    tinted: 'bg-cool-paper-50 dark:bg-cool-grey',
}

/** A standardized bordered container surface. See {@link PanelProps}. */
export const Panel = ({
    children,
    padding = 'md',
    tone = 'default',
    className,
}: PanelProps) => (
    <div
        className={cx(
            'rounded-xl border border-cool-paper-200 dark:border-charcoal',
            paddingClass[padding],
            toneClass[tone],
            className
        )}
    >
        {children}
    </div>
)
