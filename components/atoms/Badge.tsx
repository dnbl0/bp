import { ReactNode } from 'react'
import { cx } from '../../utils/cx'

export type BadgeTone =
    | 'neutral'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'award'

export interface BadgeProps {
    /** The short label shown inside the badge. */
    children: ReactNode
    /** The semantic colour treatment. Defaults to `neutral`. */
    tone?: BadgeTone
    /**
     * Shows a small leading status dot. Ignored for the `award` tone, which is
     * a solid pill intended for recognition marks (e.g. a Canstar award).
     */
    withDot?: boolean
    /** Optional leading icon, rendered before the label. */
    icon?: ReactNode
}

const toneClass: Record<BadgeTone, string> = {
    neutral: 'bg-cool-paper-100 text-grey',
    info: 'bg-cyan-50 text-cyan',
    success: 'bg-teal-50 text-teal',
    warning: 'bg-warning-yellow/20 text-grey',
    error: 'bg-error-red/10 text-error-red',
    award: 'bg-navy text-white',
}

const dotClass: Record<BadgeTone, string> = {
    neutral: 'bg-silver',
    info: 'bg-cyan',
    success: 'bg-teal',
    warning: 'bg-warning-yellow',
    error: 'bg-error-red',
    award: 'bg-white',
}

/**
 * A small, non-interactive label that communicates status, category or
 * recognition. Unlike a Tag, a Badge never links anywhere — reach for Tag when
 * the label is a navigation target.
 */
export const Badge = ({
    children,
    tone = 'neutral',
    withDot = false,
    icon,
}: BadgeProps) => (
    <span
        className={cx(
            'inline-flex items-center gap-1.5 rounded-full',
            'px-2.5 py-0.5 text-xs font-semibold tracking-wide',
            'whitespace-nowrap align-middle',
            toneClass[tone]
        )}
    >
        {withDot && tone !== 'award' && (
            <span
                aria-hidden="true"
                className={cx('h-1.5 w-1.5 rounded-full', dotClass[tone])}
            />
        )}
        {icon && (
            <span aria-hidden="true" className="inline-flex">
                {icon}
            </span>
        )}
        {children}
    </span>
)

export default Badge
