import { ReactNode } from 'react'
import { cx } from '../../utils/cx'

interface CardProps {
    children: ReactNode
    /** Guidance text explaining the example. */
    note: string
}

const Card = ({
    children,
    note,
    variant,
}: CardProps & { variant: 'do' | 'dont' }) => {
    const isDo = variant === 'do'
    return (
        <div className="rounded-xl overflow-hidden border border-cool-paper-200 dark:border-charcoal">
            <div className="flex items-center justify-center p-8 bg-white dark:bg-cool-grey min-h-[140px]">
                {children}
            </div>
            <div
                className={cx(
                    'flex items-start gap-2 px-4 py-3 text-body-small',
                    isDo
                        ? 'bg-success-green/10 text-dark-green'
                        : 'bg-error-red/10 text-error-red'
                )}
            >
                <span className="font-bold flex-none" aria-hidden="true">
                    {isDo ? '✓' : '✕'}
                </span>
                <span>
                    <span className="font-semibold mr-1">{isDo ? 'Do' : "Don't"}.</span>
                    {note}
                </span>
            </div>
        </div>
    )
}

/** A do / don't card. Pair two inside <DoDontGrid> for side-by-side guidance. */
export const Do = (props: CardProps) => <Card {...props} variant="do" />
export const Dont = (props: CardProps) => <Card {...props} variant="dont" />

export const DoDontGrid = ({ children }: { children: ReactNode }) => (
    <div className="my-6 grid gap-6 md:grid-cols-2">{children}</div>
)
