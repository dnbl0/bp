import { ReactNode, useId, useState } from 'react'
import { cx } from '../../utils/cx'

export interface TooltipProps {
    /** The trigger the tooltip describes — usually text or an info icon. */
    children: ReactNode
    /** The tooltip content. Keep it short; it is announced to screen readers. */
    content: ReactNode
    /** Which side of the trigger the bubble appears on. Defaults to `top`. */
    placement?: 'top' | 'bottom'
    /** Accessible label for the trigger when `children` is an icon only. */
    label?: string
}

const placementClass: Record<NonNullable<TooltipProps['placement']>, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
}

/**
 * An accessible hint that reveals supporting copy on hover and on keyboard
 * focus. Used across product pages for fund-rule and pricing explanations.
 * The trigger is a real button so it is reachable by keyboard, and the bubble
 * is wired to it with `aria-describedby`.
 */
export const Tooltip = ({
    children,
    content,
    placement = 'top',
    label,
}: TooltipProps) => {
    const id = useId()
    const [open, setOpen] = useState(false)

    return (
        <span className="relative inline-flex">
            <button
                type="button"
                aria-label={label}
                aria-describedby={open ? id : undefined}
                className={cx(
                    'inline-flex items-center justify-center rounded-full',
                    'text-cyan underline decoration-dotted underline-offset-2',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan'
                )}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
            >
                {children}
            </button>
            <span
                id={id}
                role="tooltip"
                hidden={!open}
                className={cx(
                    'absolute z-tooltip w-56 max-w-xs rounded-lg p-3',
                    'bg-navy text-white text-xs leading-relaxed shadow-lg',
                    'text-left font-normal normal-case tracking-normal',
                    placementClass[placement]
                )}
            >
                {content}
            </span>
        </span>
    )
}

export default Tooltip
