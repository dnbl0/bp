import { ReactNode } from 'react'

interface AnatomyPart {
    /** The numbered label shown on the part. */
    number: number
    name: string
    description: string
}

interface AnatomyProps {
    /** A rendered component to dissect. */
    children: ReactNode
    parts: AnatomyPart[]
}

/**
 * Spectrum-style "Anatomy" block: a rendered component beside a numbered key
 * describing each of its structural parts.
 */
export const Anatomy = ({ children, parts }: AnatomyProps) => (
    <div className="my-6 grid gap-4 sm:gap-8 md:grid-cols-2 items-start rounded-xl border border-cool-paper-200 dark:border-charcoal p-4 sm:p-8 bg-white dark:bg-cool-grey">
        <div className="flex items-center justify-center min-h-[160px]">{children}</div>
        <ol className="space-y-4">
            {parts.map(part => (
                <li key={part.number} className="flex gap-3">
                    <span className="flex-none w-6 h-6 rounded-full bg-cyan text-white text-body-small font-semibold flex items-center justify-center">
                        {part.number}
                    </span>
                    <span>
                        <span className="block font-semibold text-navy dark:text-white">
                            {part.name}
                        </span>
                        <span className="block text-body-small text-grey dark:text-light-grey">
                            {part.description}
                        </span>
                    </span>
                </li>
            ))}
        </ol>
    </div>
)
