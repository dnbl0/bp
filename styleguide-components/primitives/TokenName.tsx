import { resolveToken } from '../tokenResolver'

export interface TokenSegment {
    /** The literal slice of the token name, e.g. `text`, `heading`, `l`. */
    text: string
    /** Short title for the segment, e.g. "Property". */
    label: string
    /** What this segment controls, shown in the key beneath. */
    description: string
}

interface TokenNameProps {
    segments: TokenSegment[]
    /** Separator used to join the segments. Tailwind utilities use `-`. */
    separator?: string
    /**
     * Optional caption beneath the breakdown. When omitted and the joined token
     * resolves against the live theme, the resolved value is shown instead.
     */
    caption?: string
}

/**
 * Tints applied to successive segments, mirroring the Atlassian token-anatomy
 * diagram. Cycles if a token has more parts than there are tints.
 */
const SEGMENT_TINTS = [
    'bg-cyan-50 text-navy dark:bg-cyan/25 dark:text-white',
    'bg-cool-paper-200 text-navy dark:bg-charcoal dark:text-white',
    'bg-teal-50 text-navy dark:bg-teal/25 dark:text-white',
    'bg-focus-blue text-navy dark:bg-focus-blue/30 dark:text-white',
]

/**
 * Breaks a single design-token name into its constituent parts, each tinted and
 * numbered, with a key explaining what every segment controls. Modelled on the
 * Atlassian "anatomy of a token" diagram, but documents the real Tailwind
 * utility naming this system uses (e.g. `text-heading-l`, `bg-cyan-50`, `p-3`).
 */
export const TokenName = ({
    segments,
    separator = '-',
    caption,
}: TokenNameProps) => {
    const fullToken = segments.map(s => s.text).join(separator)
    const resolved = resolveToken(fullToken)
    const subtitle =
        caption ?? (resolved.resolved ? `Resolves to ${resolved.value}` : undefined)

    return (
        <div className="my-6 rounded-xl border border-cool-paper-200 dark:border-charcoal p-4 sm:p-8 bg-white dark:bg-cool-grey">
            {/* The token, broken into tinted segments */}
            <div className="flex flex-wrap items-center gap-y-3 font-mono text-body sm:text-heading-s">
                {segments.map((segment, i) => (
                    <span key={i} className="flex items-center">
                        <span
                            className={`relative rounded-md px-2 py-1 ${
                                SEGMENT_TINTS[i % SEGMENT_TINTS.length]
                            }`}
                        >
                            {segment.text}
                            <span
                                aria-hidden="true"
                                className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-cyan text-white text-caption font-sans font-semibold flex items-center justify-center"
                            >
                                {i + 1}
                            </span>
                        </span>
                        {i < segments.length - 1 && (
                            <span className="px-0.5 text-grey dark:text-light-grey">
                                {separator}
                            </span>
                        )}
                    </span>
                ))}
            </div>

            {subtitle && (
                <p className="mt-4 text-body-small text-grey dark:text-light-grey">
                    {subtitle}
                </p>
            )}

            {/* Numbered key */}
            <ol className="mt-6 space-y-4 border-t border-cool-paper-200 dark:border-charcoal pt-6">
                {segments.map((segment, i) => (
                    <li key={i} className="flex gap-3">
                        <span className="flex-none w-6 h-6 rounded-full bg-cyan text-white text-body-small font-semibold flex items-center justify-center">
                            {i + 1}
                        </span>
                        <span>
                            <span className="block font-semibold text-navy dark:text-white">
                                {segment.label}
                                <span className="ml-2 font-mono text-body-small text-cyan">
                                    {segment.text}
                                </span>
                            </span>
                            <span className="block text-body-small text-grey dark:text-light-grey">
                                {segment.description}
                            </span>
                        </span>
                    </li>
                ))}
            </ol>
        </div>
    )
}
