export interface PropRow {
    name: string
    type: string
    default?: string
    required?: boolean
    description: string
}

interface PropsTableProps {
    rows: PropRow[]
    /** Heading for the first column. Defaults to "Prop". */
    label?: string
}

/**
 * A table documenting a component's props / options, used in the "Options"
 * section of every component page.
 */
export const PropsTable = ({ rows, label = 'Prop' }: PropsTableProps) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-cool-paper-200 dark:border-charcoal">
        <table className="w-full text-left border-collapse text-body-small">
            <thead>
                <tr className="bg-cool-paper-100 dark:bg-cool-grey text-disabled-text dark:text-light-grey text-caption uppercase tracking-wide">
                    <th className="px-4 py-3 font-semibold">{label}</th>
                    <th className="px-4 py-3 font-semibold">Type</th>
                    <th className="px-4 py-3 font-semibold">Default</th>
                    <th className="px-4 py-3 font-semibold">Description</th>
                </tr>
            </thead>
            <tbody>
                {rows.map(row => (
                    <tr
                        key={row.name}
                        className="border-t border-cool-paper-200 dark:border-charcoal align-top"
                    >
                        <td className="px-4 py-3 font-mono whitespace-nowrap text-cyan">
                            {row.name}
                            {row.required && (
                                <span className="ml-1 text-error-red" title="Required">
                                    *
                                </span>
                            )}
                        </td>
                        <td className="px-4 py-3 font-mono text-fuchsia">{row.type}</td>
                        <td className="px-4 py-3 font-mono text-grey dark:text-light-grey">
                            {row.default ?? '—'}
                        </td>
                        <td className="px-4 py-3 text-grey dark:text-light-grey">
                            {row.description}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)
