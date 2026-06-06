import { useState } from 'react'
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
 * A read-only code panel with copy-to-clipboard, used throughout the docs to
 * show the markup behind a live example.
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
            <pre className={cx('m-0 p-4 overflow-x-auto bg-charcoal text-white text-sm leading-relaxed')}>
                <code>{code}</code>
            </pre>
        </div>
    )
}
