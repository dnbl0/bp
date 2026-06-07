import { ReactNode } from 'react'

export interface TokenRow {
    token: string
    value: string
    /** Optional preview rendered in the first column. */
    preview?: ReactNode
    description?: string
}

interface TokenTableProps {
    rows: TokenRow[]
    /** Whether to show the optional preview column. */
    withPreview?: boolean
    /** Whether to show the optional description column. */
    withDescription?: boolean
}

/** A generic table for documenting design tokens (elevation, layering, motion). */
export const TokenTable = ({
    rows,
    withPreview = false,
    withDescription = false,
}: TokenTableProps) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-cool-paper-200 dark:border-charcoal">
        <table className="w-full text-left border-collapse text-body-small">
            <thead>
                <tr className="bg-cool-paper-100 dark:bg-cool-grey text-disabled-text dark:text-light-grey text-caption uppercase tracking-wide">
                    {withPreview && <th className="px-4 py-3 font-semibold">Preview</th>}
                    <th className="px-4 py-3 font-semibold">Token</th>
                    <th className="px-4 py-3 font-semibold">Value</th>
                    {withDescription && (
                        <th className="px-4 py-3 font-semibold">Usage</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {rows.map(row => (
                    <tr
                        key={row.token}
                        className="border-t border-cool-paper-200 dark:border-charcoal align-middle"
                    >
                        {withPreview && (
                            <td className="px-4 py-3 w-24 sm:w-40">{row.preview}</td>
                        )}
                        <td className="px-4 py-3 font-mono break-words text-cyan">
                            {row.token}
                        </td>
                        <td className="px-4 py-3 font-mono text-grey dark:text-light-grey">
                            {row.value}
                        </td>
                        {withDescription && (
                            <td className="px-4 py-3 text-grey dark:text-light-grey">
                                {row.description}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)
