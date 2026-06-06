import { useId } from 'react'
import { cx } from '../../utils/cx'

export interface ToggleSwitchProps {
    /** Whether the switch is on. Controlled by the parent. */
    checked: boolean
    /** Called with the next checked state when the user toggles. */
    onChange: (checked: boolean) => void
    /** Visible label describing what the switch controls. */
    label: string
    /** Hides the label visually while keeping it for screen readers. */
    hideLabel?: boolean
    /** Disables interaction and dims the control. */
    disabled?: boolean
}

/**
 * A binary on/off control built on a real checkbox input for full keyboard and
 * screen-reader support. Used for choices like monthly/annual payment or
 * including/excluding an extra, where a switch reads more clearly than a
 * checkbox.
 */
export const ToggleSwitch = ({
    checked,
    onChange,
    label,
    hideLabel = false,
    disabled = false,
}: ToggleSwitchProps) => {
    const id = useId()

    return (
        <span className="inline-flex items-center gap-3">
            <label
                htmlFor={id}
                className={cx(
                    'text-sm font-semibold text-grey dark:text-light-grey select-none',
                    hideLabel && 'sr-only',
                    disabled && 'opacity-60'
                )}
            >
                {label}
            </label>
            <span className="relative inline-flex">
                <input
                    id={id}
                    type="checkbox"
                    role="switch"
                    checked={checked}
                    disabled={disabled}
                    onChange={event => onChange(event.target.checked)}
                    className="peer sr-only"
                />
                <span
                    aria-hidden="true"
                    className={cx(
                        'h-6 w-11 rounded-full transition-colors duration-200',
                        'bg-light-grey peer-checked:bg-cyan',
                        'peer-focus-visible:ring-2 peer-focus-visible:ring-focus-blue',
                        'peer-disabled:opacity-60 peer-disabled:cursor-not-allowed'
                    )}
                />
                <span
                    aria-hidden="true"
                    className={cx(
                        'pointer-events-none absolute left-0.5 top-0.5',
                        'h-5 w-5 rounded-full bg-white shadow',
                        'transition-transform duration-200',
                        'peer-checked:translate-x-5'
                    )}
                />
            </span>
        </span>
    )
}

export default ToggleSwitch
