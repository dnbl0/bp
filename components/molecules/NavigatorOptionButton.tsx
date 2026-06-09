import { cx } from '../../utils/cx'

export type NavigatorOptionDirection = 'vertical' | 'horizontal'
export type NavigatorOptionState = 'default' | 'selected'

interface NavigatorOptionButtonProps {
    heading: string
    description?: string
    icon?: React.ReactNode
    direction?: NavigatorOptionDirection
    state?: NavigatorOptionState
    onClick?: () => void
    className?: string
}

/**
 * A single selectable option within a navigator step.
 *
 * Vertical layout (default): icon centred above heading + description — used in the
 * 2/3/4-column option grid on desktop and as full-width stacked cards on mobile.
 *
 * Horizontal layout: icon pinned to the left — used in smaller compact grids.
 *
 * Selected state adds a cyan border and light-blue background; a filled checkbox
 * appears in the top-left corner.
 */
export const NavigatorOptionButton = ({
    heading,
    description,
    icon,
    direction = 'vertical',
    state = 'default',
    onClick,
    className,
}: NavigatorOptionButtonProps) => {
    const isSelected = state === 'selected'
    const isVertical = direction === 'vertical'

    return (
        <button
            type="button"
            onClick={onClick}
            className={cx(
                'relative border-2 rounded cursor-pointer transition-colors',
                isVertical
                    ? 'flex flex-col items-center justify-center gap-4 p-[26px] text-center'
                    : 'flex flex-row items-center gap-4 px-[18px] py-[10px] text-left',
                isSelected
                    ? 'border-cyan bg-cyan-50'
                    : 'border-lighter-grey bg-white hover:bg-cool-paper-100',
                className,
            )}
        >
            {/* Selected checkbox indicator */}
            {isSelected && (
                <span className="absolute top-[14px] left-[14px] flex h-4 w-4 items-center justify-center rounded-sm bg-cyan">
                    <svg
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        aria-hidden="true"
                    >
                        <path
                            d="M1 3.5L3.8 6.5L9 1"
                            stroke="white"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            )}

            {/* Icon */}
            {icon && (
                <span
                    className={cx(
                        'shrink-0',
                        isVertical ? 'h-[57px] w-[57px]' : 'h-[40px] w-[40px]',
                        'flex items-center justify-center',
                    )}
                    aria-hidden="true"
                >
                    {icon}
                </span>
            )}

            {/* Text */}
            <span className={cx('flex flex-col', isVertical ? 'items-center gap-2' : 'items-start gap-1')}>
                <span className="font-bold text-body leading-6 text-grey">{heading}</span>
                {description && (
                    <span className="text-body-small leading-[21px] text-navy">{description}</span>
                )}
            </span>
        </button>
    )
}
