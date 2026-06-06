import { DocStatus } from '../designSystem.config'
import { cx } from '../../utils/cx'

const config: Record<DocStatus, { label: string; className: string }> = {
    stable: { label: 'Stable', className: 'bg-success-green/15 text-dark-green' },
    'in-review': { label: 'In review', className: 'bg-warning-yellow/25 text-grey' },
    planned: { label: 'Planned', className: 'bg-cool-paper-200 text-grey' },
}

/** A small pill communicating the maturity of a component or page. */
export const StatusBadge = ({ status }: { status: DocStatus }) => {
    const { label, className } = config[status]
    return (
        <span
            className={cx(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-caption font-semibold uppercase tracking-wide',
                className
            )}
        >
            {label}
        </span>
    )
}
