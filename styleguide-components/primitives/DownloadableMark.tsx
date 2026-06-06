import { useRef, useState } from 'react'
import { IconEntry, importSnippet } from '../iconRegistry'
import { downloadMark, MarkFormat } from '../downloadMark'

const formats: MarkFormat[] = ['svg', 'png', 'jpeg']

/**
 * A logo card: a preview of the mark on a neutral canvas, its copyable import,
 * and buttons to download it as SVG, PNG or JPEG.
 */
export const DownloadableMark = ({ logo }: { logo: IconEntry }) => {
    const previewRef = useRef<HTMLDivElement>(null)
    const [busy, setBusy] = useState<MarkFormat | null>(null)
    const Mark = logo.Component

    const handleDownload = async (format: MarkFormat) => {
        const svg = previewRef.current?.querySelector('svg')
        if (!svg) return
        setBusy(format)
        try {
            await downloadMark(svg as SVGSVGElement, logo.name, format)
        } catch (error) {
            console.error('Mark export failed', error)
        } finally {
            setBusy(null)
        }
    }

    return (
        <div className="rounded-xl border border-cool-paper-200 dark:border-charcoal overflow-hidden">
            <div ref={previewRef} className="flex items-center justify-center p-10 bg-white">
                <Mark className="h-16 w-auto" />
            </div>
            <div className="p-4 bg-cool-paper-50 dark:bg-cool-grey space-y-3">
                <code className="block font-mono text-caption text-cyan break-all">
                    {importSnippet(logo)}
                </code>
                <div className="flex flex-wrap gap-2">
                    {formats.map(format => (
                        <button
                            key={format}
                            type="button"
                            onClick={() => handleDownload(format)}
                            disabled={busy !== null}
                            className="button button--small button--secondary disabled:opacity-60"
                        >
                            {busy === format ? 'Saving…' : format.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
