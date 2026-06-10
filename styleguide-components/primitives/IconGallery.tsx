import { useMemo, useState } from 'react'
import { IconEntry, importSnippet } from '../iconRegistry'

/**
 * A searchable grid of icons. Clicking an icon copies its import statement to
 * the clipboard, mirroring the icon explorer on the Spectrum docs.
 */
export const IconGallery = ({ icons }: { icons: IconEntry[] }) => {
    const [query, setQuery] = useState('')
    const [copied, setCopied] = useState<string | null>(null)

    const filtered = useMemo(() => {
        const term = query.trim().toLowerCase()
        if (!term) return icons
        return icons.filter(icon => icon.name.toLowerCase().includes(term))
    }, [icons, query])

    const copy = async (icon: IconEntry) => {
        try {
            await navigator.clipboard.writeText(importSnippet(icon))
            setCopied(icon.name)
            setTimeout(() => setCopied(null), 1500)
        } catch {
            // Clipboard may be unavailable; ignore.
        }
    }

    return (
        <div className="my-6">
            <input
                type="search"
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder={`Filter ${icons.length} icons`}
                aria-label="Filter icons"
                className="w-full max-w-sm mb-6 px-3 h-10 rounded-lg bg-cool-paper-100 dark:bg-cool-grey border border-cool-paper-200 dark:border-charcoal outline-none focus:border-cyan text-body-small text-grey dark:text-white"
            />
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                {filtered.map(icon => {
                    const Icon = icon.Component
                    return (
                        <button
                            type="button"
                            key={icon.name}
                            onClick={() => copy(icon)}
                            className="group flex flex-col items-center gap-3 rounded-xl border border-cool-paper-200 dark:border-charcoal p-4 bg-white dark:bg-cool-grey hover:border-cyan"
                            title="Copy import"
                        >
                            <span className="h-8 flex items-center justify-center text-navy dark:text-white">
                                <Icon className="w-7 h-7 object-contain" aria-hidden="true" />
                            </span>
                            <span className="text-caption font-mono text-grey dark:text-light-grey text-center break-all">
                                {copied === icon.name ? 'Copied!' : icon.name}
                            </span>
                        </button>
                    )
                })}
            </div>
            {filtered.length === 0 && (
                <p className="text-grey dark:text-light-grey">
                    No icons match “{query}”.
                </p>
            )}
        </div>
    )
}
