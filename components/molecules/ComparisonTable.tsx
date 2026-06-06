import { ReactNode } from 'react'
import { cx } from '../../utils/cx'

/** A cell value: a boolean renders a tick/cross, anything else renders as-is. */
export type ComparisonValue = boolean | string | number | ReactNode

export interface ComparisonColumn {
    /** Stable key matching the keys used in each row's `values`. */
    key: string
    /** The column heading, e.g. a plan or product name. */
    label: string
    /** Visually emphasises this column as the recommended option. */
    highlight?: boolean
}

export interface ComparisonRow {
    /** The feature being compared, shown in the row header. */
    feature: string
    /** Optional supporting note shown beneath the feature name. */
    note?: string
    /** Cell values keyed by column key. */
    values: Record<string, ComparisonValue>
}

export interface ComparisonTableProps {
    /** The columns being compared, in display order. */
    columns: ComparisonColumn[]
    /** The feature rows. */
    rows: ComparisonRow[]
    /** Accessible caption describing what the table compares. */
    caption: string
}

const Tick = () => (
    <span className="text-success-green" aria-label="Included" role="img">
        ✓
    </span>
)

const Cross = () => (
    <span className="text-disabled-text" aria-label="Not included" role="img">
        —
    </span>
)

const renderValue = (value: ComparisonValue): ReactNode => {
    if (value === true) return <Tick />
    if (value === false) return <Cross />
    return value
}

/**
 * A responsive feature-comparison matrix for placing products side by side
 * (for example comparing levels of hospital or extras cover). Booleans render
 * as an accessible tick or dash; any other value renders verbatim. One column
 * can be highlighted as the recommended option.
 */
export const ComparisonTable = ({
    columns,
    rows,
    caption,
}: ComparisonTableProps) => (
    <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
            <caption className="sr-only">{caption}</caption>
            <thead>
                <tr>
                    <th
                        scope="col"
                        className="p-3 text-left font-semibold text-navy dark:text-white"
                    >
                        <span className="sr-only">Feature</span>
                    </th>
                    {columns.map(column => (
                        <th
                            key={column.key}
                            scope="col"
                            className={cx(
                                'p-3 text-center font-semibold',
                                column.highlight
                                    ? 'bg-cyan-50 text-cyan rounded-t-lg'
                                    : 'text-navy dark:text-white'
                            )}
                        >
                            {column.label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, rowIndex) => (
                    <tr
                        key={row.feature}
                        className={cx(
                            rowIndex % 2 === 1 &&
                                'bg-cool-paper-100 dark:bg-charcoal'
                        )}
                    >
                        <th
                            scope="row"
                            className="p-3 text-left font-semibold text-grey dark:text-light-grey"
                        >
                            {row.feature}
                            {row.note && (
                                <span className="block text-xs font-normal text-disabled-text">
                                    {row.note}
                                </span>
                            )}
                        </th>
                        {columns.map(column => (
                            <td
                                key={column.key}
                                className={cx(
                                    'p-3 text-center text-grey dark:text-light-grey',
                                    column.highlight && 'bg-cyan-50/60'
                                )}
                            >
                                {renderValue(row.values[column.key])}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)

export default ComparisonTable
