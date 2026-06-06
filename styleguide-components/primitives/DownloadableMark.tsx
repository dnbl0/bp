import { useEffect, useRef, useState } from 'react'
import { IconEntry, importSnippet } from '../iconRegistry'
import { downloadMark, MarkFormat } from '../downloadMark'

/**
 * A logo card: a preview of the mark on a neutral canvas, its copyable import,
 * and buttons to download it. Vector marks offer SVG/PNG/JPEG; raster (image)
 * marks offer PNG/JPEG.
 */
export const DownloadableMark = ({ logo }: { logo: IconEntry }) => {
    const previewRef = useRef<HTMLDivElement>(null)
    const [busy, setBusy] = useState<MarkFormat | null>(null)
    const [isVector, setIsVector] = useState(true)
    const Mark = logo.Component

    useEffect(() => {
        const el = previewRef.current?.querySelector('svg, img')
        setIsVector(el?.tagName.toLowerCase() === 'svg')
    }, [])

    const handleDownload = async (format: MarkFormat) => {
        const el = previewRef.current?.querySelector('svg, img') as
            | SVGSVGElement
            | HTMLImageElement
            | null
        if (!el) return
        setBusy(format)
        try {
            await downloadMark(el, logo.name, format)
        } catch (error) {
            console.error('Mark export failed', error)
        } finally {
            setBusy(null)
        }
    }

    // Raster (image) marks can't be exported as SVG.
    const formats: MarkFormat[] = isVector ? ['svg', 'png', 'jpeg'] : ['png', 'jpeg']

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
