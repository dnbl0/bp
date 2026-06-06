import { ReactNode, useState } from 'react'
import { cx } from '../../utils/cx'
import { CodeBlock } from './CodeBlock'

interface ExampleProps {
    /** The live, rendered component(s). */
    children: ReactNode
    /** Optional source shown in a collapsible "Show code" panel. */
    code?: string
    /** Short caption describing what the example demonstrates. */
    caption?: string
    /** Alignment of the rendered example within the canvas. */
    align?: 'left' | 'center'
    /** Use a tinted canvas (useful for white/inverse components). */
    surface?: 'paper' | 'tinted' | 'dark'
}

const surfaceClass: Record<NonNullable<ExampleProps['surface']>, string> = {
    paper: 'bg-white',
    tinted: 'bg-cool-paper-100',
    dark: 'bg-navy',
}

/**
 * The canonical "live example" container: a real component rendered on a
 * neutral canvas, with an optional toggle to reveal the copyable source.
 * Modelled on Adobe Spectrum's component example blocks.
 */
export const Example = ({
    children,
    code,
    caption,
    align = 'left',
    surface = 'paper',
}: ExampleProps) => {
    const [showCode, setShowCode] = useState(false)

    return (
        <figure className="my-6 rounded-xl border border-cool-paper-200 dark:border-charcoal overflow-hidden">
            <div
                className={cx(
                    'flex flex-wrap gap-6 p-8',
                    align === 'center' ? 'justify-center items-center' : 'items-start',
                    surfaceClass[surface]
                )}
            >
                {children}
            </div>
            {(caption || code) && (
                <figcaption className="flex items-center justify-between gap-4 px-4 py-2 border-t border-cool-paper-200 dark:border-charcoal bg-cool-paper-50 dark:bg-cool-grey text-body-small">
                    <span className="text-grey dark:text-light-grey">{caption}</span>
                    {code && (
                        <button
                            type="button"
                            onClick={() => setShowCode(prev => !prev)}
                            className="text-cyan font-semibold whitespace-nowrap hover:underline"
                        >
                            {showCode ? 'Hide code' : 'Show code'}
                        </button>
                    )}
                </figcaption>
            )}
            {code && showCode && (
                <div className="p-4 bg-cool-paper-50 dark:bg-cool-grey border-t border-cool-paper-200 dark:border-charcoal">
                    <CodeBlock code={code} />
                </div>
            )}
        </figure>
    )
}
