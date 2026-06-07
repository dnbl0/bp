import { ReactNode, useState } from 'react'
import { cx } from '../../utils/cx'
import { CodeBlock } from './CodeBlock'

interface ExampleProps {
    /** The live, rendered component(s). */
    children: ReactNode
    /** Optional source shown in the "Code" tab. */
    code?: string
    /** Language label for the code panel, e.g. `tsx`, `bash`, `css`. */
    language?: string
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

const Tab = ({
    active,
    onClick,
    children,
}: {
    active: boolean
    onClick: () => void
    children: ReactNode
}) => (
    <button
        type="button"
        onClick={onClick}
        aria-selected={active}
        role="tab"
        className={cx(
            'px-3 py-1 rounded-md text-body-small font-semibold',
            active
                ? 'bg-white dark:bg-charcoal text-navy dark:text-white shadow-sm'
                : 'text-grey dark:text-light-grey hover:text-navy dark:hover:text-white'
        )}
    >
        {children}
    </button>
)

/**
 * The canonical "live example" container: a real component rendered on a
 * neutral canvas, with a Preview/Code tab pair revealing the copyable,
 * syntax-highlighted source. Modelled on Adobe Spectrum's example blocks.
 */
export const Example = ({
    children,
    code,
    language = 'tsx',
    caption,
    align = 'left',
    surface = 'paper',
}: ExampleProps) => {
    const [tab, setTab] = useState<'preview' | 'code'>('preview')
    const showingCode = code != null && tab === 'code'

    return (
        <figure className="my-6 rounded-xl border border-cool-paper-200 dark:border-charcoal overflow-hidden">
            {!showingCode && (
                <div
                    className={cx(
                        'flex flex-wrap gap-4 sm:gap-6 p-4 sm:p-8 overflow-x-auto',
                        align === 'center'
                            ? 'justify-center items-center'
                            : 'items-start',
                        surfaceClass[surface]
                    )}
                >
                    {children}
                </div>
            )}
            {showingCode && (
                <div className="p-2 sm:p-4 bg-cool-paper-50 dark:bg-cool-grey">
                    <CodeBlock code={code} language={language} />
                </div>
            )}
            {(caption || code) && (
                <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2 border-t border-cool-paper-200 dark:border-charcoal bg-cool-paper-50 dark:bg-cool-grey text-body-small">
                    <span className="min-w-0 text-grey dark:text-light-grey">{caption}</span>
                    {code && (
                        <div
                            role="tablist"
                            aria-label="Example view"
                            className="flex-none flex items-center gap-1 p-1 rounded-lg bg-cool-paper-100 dark:bg-grey"
                        >
                            <Tab
                                active={tab === 'preview'}
                                onClick={() => setTab('preview')}
                            >
                                Preview
                            </Tab>
                            <Tab active={tab === 'code'} onClick={() => setTab('code')}>
                                Code
                            </Tab>
                        </div>
                    )}
                </figcaption>
            )}
        </figure>
    )
}
