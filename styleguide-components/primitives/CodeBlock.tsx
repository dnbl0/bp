import { useState } from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import vsDark from 'prism-react-renderer/themes/vsDark'
import { CheckCircleIcon } from '../../components/atoms/icons/CheckCircle'
import { ClipboardIcon } from '../../components/atoms/icons/Clipboard'
import { cx } from '../../utils/cx'

interface CodeBlockProps {
    /** The source to display and copy. */
    code: string
    /** Language label shown in the toolbar, e.g. `tsx`. */
    language?: string
}

/**
 * A read-only, syntax-highlighted code panel with copy-to-clipboard, used
 * throughout the docs to show the markup behind a live example.
 */
export const CodeBlock = ({ code, language = 'tsx' }: CodeBlockProps) => {
    const [copied, setCopied] = useState(false)

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(code)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            // Clipboard may be unavailable (e.g. insecure context); fail quietly.
        }
    }

    return (
        <div className="rounded-lg overflow-hidden border border-cool-paper-200 dark:border-charcoal">
            <div className="flex items-center justify-between px-4 py-2 bg-cool-grey text-light-grey text-xs">
                <span className="uppercase tracking-wide">{language}</span>
                <button
                    type="button"
                    onClick={copy}
                    className="flex items-center gap-2 hover:text-white"
                    aria-label="Copy code to clipboard"
                >
                    {copied ? (
                        <CheckCircleIcon className="w-4 h-4 fill-success-green" />
                    ) : (
                        <ClipboardIcon className="w-4 h-4 fill-current" />
                    )}
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
            <Highlight
                {...defaultProps}
                code={code.trim()}
                language={language as Language}
                theme={vsDark}
            >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre
                        className={cx(
                            className,
                            'm-0 p-3 sm:p-4 overflow-x-auto text-xs sm:text-sm leading-relaxed focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue'
                        )}
                        // The panel scrolls horizontally, so it must be reachable
                        // and operable by keyboard, with an accessible name.
                        tabIndex={0}
                        role="region"
                        aria-label={`${language} code sample`}
                        // Keep the docs' charcoal canvas rather than the theme's default.
                        style={{ ...style, background: '#23282d' }}
                    >
                        {tokens.map((line, lineIndex) => (
                            <div key={lineIndex} {...getLineProps({ line })}>
                                {line.map((token, tokenIndex) => (
                                    <span
                                        key={tokenIndex}
                                        {...getTokenProps({ token })}
                                    />
                                ))}
                            </div>
                        ))}
                    </pre>
                )}
            </Highlight>
        </div>
    )
}
