import { ReactNode, useId, useState } from 'react'
import { cx } from '../../utils/cx'

export interface Footnote {
    /**
     * The marker shown in superscript both at the reference and in the list,
     * e.g. `*`, `^`, `1`. Match this to the marker used in body copy.
     */
    marker: string
    /** The footnote text. */
    text: ReactNode
}

export interface DisclaimerProps {
    /** The numbered/symboled footnotes shown in the disclaimer. */
    footnotes: Footnote[]
    /** Heading for the block. Defaults to "Important information". */
    title?: string
    /**
     * When true, the footnotes are hidden behind a show/hide toggle. Long
     * legal blocks on product pages use this to stay out of the way until
     * needed. Defaults to true.
     */
    collapsible?: boolean
    /** When `collapsible`, whether the block starts open. Defaults to false. */
    defaultOpen?: boolean
}

/**
 * The site-wide legal disclaimer block: a list of superscript-marked footnotes
 * that terms and pricing throughout a page reference. Pair each footnote with a
 * matching `FootnoteRef` marker in the body copy. Long blocks can collapse
 * behind a toggle so they do not dominate the page.
 */
export const Disclaimer = ({
    footnotes,
    title = 'Important information',
    collapsible = true,
    defaultOpen = false,
}: DisclaimerProps) => {
    const regionId = useId()
    const [open, setOpen] = useState(defaultOpen)

    if (footnotes.length === 0) return null

    const list = (
        <ol
            id={regionId}
            hidden={collapsible && !open}
            className="list-none m-0 p-0 space-y-2 text-xs leading-relaxed text-grey dark:text-light-grey"
        >
            {footnotes.map(footnote => (
                <li key={footnote.marker} className="flex gap-2">
                    <span className="font-semibold text-navy dark:text-white shrink-0">
                        {footnote.marker}
                    </span>
                    <span>{footnote.text}</span>
                </li>
            ))}
        </ol>
    )

    return (
        <section
            aria-label={title}
            className="border-t border-light-grey pt-4 mt-8"
        >
            {collapsible ? (
                <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={regionId}
                    onClick={() => setOpen(value => !value)}
                    className={cx(
                        'flex w-full items-center justify-between gap-2 text-left',
                        'text-sm font-semibold text-navy dark:text-white',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded'
                    )}
                >
                    <span>{title}</span>
                    <span aria-hidden="true" className="text-cyan">
                        {open ? '−' : '+'}
                    </span>
                </button>
            ) : (
                <h2 className="text-sm font-semibold text-navy dark:text-white mb-2">
                    {title}
                </h2>
            )}
            <div className={cx(collapsible && 'mt-3')}>{list}</div>
        </section>
    )
}

/**
 * The in-copy superscript reference that points at a {@link Disclaimer}
 * footnote. Render it immediately after the term it qualifies.
 */
export const FootnoteRef = ({ marker }: { marker: string }) => (
    <sup className="text-cyan font-semibold">{marker}</sup>
)

export default Disclaimer
