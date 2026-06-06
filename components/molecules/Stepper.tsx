import { Fragment } from 'react'
import { cx } from '../../utils/cx'

export interface StepItem {
    /** The step label, e.g. "Your details". */
    label: string
    /** Optional supporting copy shown beneath the label. */
    description?: string
}

export interface StepperProps {
    /** The ordered steps in the flow. */
    steps: StepItem[]
    /** The current step, 1-indexed. Earlier steps render as complete. */
    current: number
    /** Accessible label for the progress navigation. Defaults to "Progress". */
    label?: string
}

type StepStatus = 'complete' | 'current' | 'upcoming'

const circleClass: Record<StepStatus, string> = {
    complete: 'bg-cyan text-white',
    current: 'bg-white text-cyan border-2 border-cyan',
    upcoming: 'bg-white text-disabled-text border-2 border-light-grey',
}

const labelClass: Record<StepStatus, string> = {
    complete: 'text-navy dark:text-white',
    current: 'text-cyan font-semibold',
    upcoming: 'text-disabled-text',
}

const statusText: Record<StepStatus, string> = {
    complete: ' (completed)',
    current: ' (current step)',
    upcoming: '',
}

const statusFor = (stepNumber: number, current: number): StepStatus => {
    if (stepNumber < current) return 'complete'
    if (stepNumber === current) return 'current'
    return 'upcoming'
}

/**
 * A horizontal progress indicator for multi-step flows such as the get-a-quote
 * funnel. Completed steps show a tick, the current step is highlighted and
 * carries `aria-current="step"`, and upcoming steps are muted. Each step's
 * status is also exposed to screen readers as visually-hidden text.
 */
export const Stepper = ({
    steps,
    current,
    label = 'Progress',
}: StepperProps) => (
    <nav aria-label={label}>
        <ol className="flex items-start list-none m-0 p-0">
            {steps.map((step, index) => {
                const stepNumber = index + 1
                const status = statusFor(stepNumber, current)
                const isLast = index === steps.length - 1

                return (
                    <Fragment key={step.label}>
                        <li
                            aria-current={
                                status === 'current' ? 'step' : undefined
                            }
                            className="flex flex-col items-center text-center"
                        >
                            <span
                                className={cx(
                                    'flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold',
                                    circleClass[status]
                                )}
                            >
                                <span aria-hidden="true">
                                    {status === 'complete' ? '✓' : stepNumber}
                                </span>
                            </span>
                            <span
                                className={cx(
                                    'mt-2 px-1 text-sm',
                                    labelClass[status]
                                )}
                            >
                                {step.label}
                                <span className="sr-only">
                                    {statusText[status]}
                                </span>
                                {step.description && (
                                    <span className="block text-xs font-normal text-disabled-text">
                                        {step.description}
                                    </span>
                                )}
                            </span>
                        </li>
                        {!isLast && (
                            <li
                                aria-hidden="true"
                                className={cx(
                                    'mx-2 mt-[1.125rem] h-0.5 flex-1 rounded-full',
                                    stepNumber < current
                                        ? 'bg-cyan'
                                        : 'bg-light-grey'
                                )}
                            />
                        )}
                    </Fragment>
                )
            })}
        </ol>
    </nav>
)

export default Stepper
