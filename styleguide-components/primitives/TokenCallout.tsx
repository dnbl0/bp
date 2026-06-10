import { ReactNode, useRef, useState, useEffect, useCallback } from 'react'
import { cx } from '../../utils/cx'
import { resolveToken } from '../tokenResolver'

export interface CalloutAnnotation {
    /**
     * Matches a `data-callout="…"` attribute on an element inside the
     * composition. Explicit hooks avoid brittle DOM walking.
     */
    target: string
    /** The token applied to that element, e.g. `text-heading-l`, `p-3`. */
    token: string
    /** Which gutter the label sits in. Defaults to the nearer horizontal side. */
    side?: 'left' | 'right'
    /** Optional human note shown under the token chip. */
    note?: string
}

interface TokenCalloutProps {
    children: ReactNode
    annotations: CalloutAnnotation[]
}

interface Placed extends CalloutAnnotation {
    side: 'left' | 'right'
    /** Target anchor point, relative to the framed container. */
    x: number
    y: number
    /** Vertical centre of the label chip, relative to the container. */
    labelY: number
}

const GUTTER = 180
const CHIP_GAP = 14

/** Token chip — mirrors the mono token styling used across the docs. */
const Chip = ({ token, note }: { token: string; note?: string }) => {
    const resolved = resolveToken(token)
    return (
        <span className="inline-flex flex-col">
            <span
                title={resolved.resolved ? `Resolves to ${resolved.value}` : undefined}
                className="inline-flex items-center gap-1.5 rounded-md bg-cool-paper-100 dark:bg-charcoal px-2 py-1 font-mono text-body-small text-cyan whitespace-nowrap"
            >
                {token}
                {resolved.resolved && (
                    <span
                        aria-hidden="true"
                        className="text-caption text-success-green"
                        title={`Resolves to ${resolved.value}`}
                    >
                        ●
                    </span>
                )}
            </span>
            {note && (
                <span className="mt-1 text-caption text-grey dark:text-light-grey">
                    {note}
                </span>
            )}
        </span>
    )
}

/**
 * Annotates a live composition with leader-line callouts: each label sits in a
 * side gutter, shows the token applied to one element, and draws a line to that
 * element. Modelled on the Atlassian "tokens in context" diagrams. The overlay
 * re-measures on resize; below `sm` it collapses to a plain labelled list so the
 * mapping still reads on mobile.
 */
export const TokenCallout = ({ children, annotations }: TokenCalloutProps) => {
    const frameRef = useRef<HTMLDivElement>(null)
    const previewRef = useRef<HTMLDivElement>(null)
    const [placed, setPlaced] = useState<Placed[]>([])
    const [frame, setFrame] = useState({ w: 0, h: 0 })

    const measure = useCallback(() => {
        const frameEl = frameRef.current
        const preview = previewRef.current
        if (!frameEl || !preview) return
        const frameRect = frameEl.getBoundingClientRect()
        setFrame({ w: frameRect.width, h: frameRect.height })

        const next: Placed[] = []
        annotations.forEach(ann => {
            const el = preview.querySelector<HTMLElement>(
                `[data-callout="${ann.target}"]`
            )
            if (!el) return
            const r = el.getBoundingClientRect()
            const cy = r.top + r.height / 2 - frameRect.top
            const side =
                ann.side ??
                (r.left + r.width / 2 - frameRect.left < frameRect.width / 2
                    ? 'left'
                    : 'right')
            const x =
                side === 'left'
                    ? r.left - frameRect.left
                    : r.right - frameRect.left
            next.push({ ...ann, side, x, y: cy, labelY: cy })
        })

        // De-overlap labels within each gutter by nudging them apart in order.
        ;(['left', 'right'] as const).forEach(side => {
            const group = next
                .filter(p => p.side === side)
                .sort((a, b) => a.labelY - b.labelY)
            let lastY = -Infinity
            const minStep = 28 + CHIP_GAP
            group.forEach(p => {
                if (p.labelY < lastY + minStep) p.labelY = lastY + minStep
                lastY = p.labelY
            })
        })

        setPlaced(next)
    }, [annotations])

    useEffect(() => {
        measure()
        const timer = setTimeout(measure, 120)
        window.addEventListener('resize', measure)
        return () => {
            clearTimeout(timer)
            window.removeEventListener('resize', measure)
        }
    }, [measure])

    return (
        <div className="my-8">
            {/* Annotated view — hidden on small screens where gutters are too tight */}
            <div className="hidden sm:block">
                <div
                    ref={frameRef}
                    className="relative rounded-xl border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey"
                    style={{ paddingLeft: GUTTER, paddingRight: GUTTER }}
                >
                    <div ref={previewRef} className="py-8">
                        {children}
                    </div>

                    {/* Leader lines */}
                    <svg
                        aria-hidden="true"
                        className="absolute inset-0 pointer-events-none"
                        width={frame.w || '100%'}
                        height={frame.h || '100%'}
                    >
                        {placed.map((p, i) => {
                            const chipX =
                                p.side === 'left'
                                    ? GUTTER - 12
                                    : frame.w - (GUTTER - 12)
                            return (
                                <g key={i} stroke="#475569" strokeWidth="1.25">
                                    <line
                                        x1={chipX}
                                        y1={p.labelY}
                                        x2={p.x}
                                        y2={p.y}
                                    />
                                    <circle
                                        cx={p.x}
                                        cy={p.y}
                                        r="3"
                                        fill="#475569"
                                        stroke="none"
                                    />
                                </g>
                            )
                        })}
                    </svg>

                    {/* Label chips, absolutely placed in the gutters */}
                    {placed.map((p, i) => (
                        <div
                            key={i}
                            className={cx(
                                'absolute flex',
                                p.side === 'left'
                                    ? 'justify-end pr-3'
                                    : 'justify-start pl-3'
                            )}
                            style={{
                                top: p.labelY,
                                transform: 'translateY(-50%)',
                                ...(p.side === 'left'
                                    ? { left: 0, width: GUTTER }
                                    : { right: 0, width: GUTTER }),
                            }}
                        >
                            <Chip token={p.token} note={p.note} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile fallback: composition above a plain token list */}
            <div className="sm:hidden">
                <div className="rounded-xl border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey p-4">
                    {children}
                </div>
                <ul className="mt-4 space-y-2">
                    {annotations.map((ann, i) => (
                        <li key={i} className="flex items-center gap-2 text-body-small">
                            <Chip token={ann.token} note={ann.note} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
