import { ReactNode, useRef, useState, useEffect } from 'react'
import { cx } from '../../utils/cx'
import { resolveToken, resolveColor } from '../tokenResolver'

export interface SpecDimension {
    label: string
    token?: string
    value: string
    direction?: 'top' | 'right' | 'bottom' | 'left' | 'all'
    type: 'padding' | 'margin' | 'width' | 'height' | 'gap' | 'border-radius' | 'font-size' | 'line-height' | 'color' | 'shadow'
}

export interface SpecGroup {
    title: string
    description?: string
    dimensions: SpecDimension[]
}

interface SpecificationsProps {
    children: ReactNode
    groups: SpecGroup[]
    variant?: string
    withTable?: boolean
    showAnnotations?: boolean
}

const specTypeLabel: Record<SpecDimension['type'], string> = {
    padding: 'Spacing',
    margin: 'Spacing',
    gap: 'Spacing',
    width: 'Sizing',
    height: 'Sizing',
    'font-size': 'Typography',
    'line-height': 'Typography',
    'border-radius': 'Visual',
    color: 'Visual',
    shadow: 'Visual',
}

const specTypeColor: Record<SpecDimension['type'], string> = {
    padding: '#00838f',
    margin: '#ef6c00',
    gap: '#00838f',
    width: '#2e7d32',
    height: '#2e7d32',
    'font-size': '#6a1b9a',
    'line-height': '#6a1b9a',
    'border-radius': '#c62828',
    color: '#c62828',
    shadow: '#c62828',
}

/** Deterministic display order for the reference table. */
const CATEGORY_ORDER = ['Spacing', 'Sizing', 'Typography', 'Visual']
const ALL_TYPES: SpecDimension['type'][] = [
    'padding', 'margin', 'gap', 'width', 'height',
    'font-size', 'line-height', 'border-radius', 'color', 'shadow',
]

// Gutters around the preview that give the dimension arrows room to draw.
const GUTTER_LEFT = 60
const GUTTER_BOTTOM = 56
const GUTTER_TOP = 44
const GUTTER_RIGHT = 72

// Redline palette — calm, distinct roles (slate dimensions, teal spacing,
// violet radius) so the diagram reads like a Figma/Material spec sheet.
const REDLINE = {
    box: '#0079c8',
    dim: '#475569',
    pad: '#0d9488',
    radius: '#7c3aed',
}

const parsePx = (value: string): number | null => {
    const match = value.match(/(-?\d+(?:\.\d+)?)px/)
    return match ? parseFloat(match[1]) : null
}

const parseHex = (value: string): string | null => {
    const match = value.match(/#[0-9a-fA-F]{3,8}\b/)
    return match ? match[0] : null
}

/** The authoritative value for a dimension: resolved token, else authored. */
const displayValue = (dim: SpecDimension): { value: string; live: boolean } => {
    const resolved = resolveToken(dim.token)
    return resolved.resolved
        ? { value: resolved.value, live: true }
        : { value: dim.value, live: false }
}

/** The hex for a colour/shadow row, for the swatch chip. */
const swatchHex = (dim: SpecDimension): string | null =>
    resolveColor(dim.token) ?? parseHex(dim.value)

/**
 * Annotates a rendered component with visual design specifications:
 * true-to-scale redlines (padding bands, height/width dimension arrows, corner
 * radius) drawn over the live component, plus a reference table that pairs each
 * token with its resolved value. Modelled on Material 3 spec sheets and the
 * Atlassian token tables.
 */
export const Specifications = ({
    children,
    groups,
    variant = 'Default',
    withTable = true,
    showAnnotations = true,
}: SpecificationsProps) => {
    const previewRef = useRef<HTMLDivElement>(null)
    const [showSpecs, setShowSpecs] = useState(showAnnotations)
    const [activeTypes, setActiveTypes] = useState<Set<string>>(new Set(ALL_TYPES))
    const [size, setSize] = useState<{ w: number; h: number } | null>(null)

    useEffect(() => {
        if (!showSpecs) {
            setSize(null)
            return
        }
        const measure = () => {
            const el = previewRef.current
            if (!el) return
            const rect = el.getBoundingClientRect()
            setSize({ w: rect.width, h: rect.height })
        }
        measure()
        const timer = setTimeout(measure, 100)
        window.addEventListener('resize', measure)
        return () => {
            clearTimeout(timer)
            window.removeEventListener('resize', measure)
        }
    }, [showSpecs])

    const allDimensions = groups.flatMap(g => g.dimensions)

    // Which spec categories are actually present, in canonical order.
    const presentCategories = CATEGORY_ORDER.filter(cat =>
        allDimensions.some(d => specTypeLabel[d.type] === cat)
    )

    const toggleCategory = (cat: string) => {
        const types = ALL_TYPES.filter(t => specTypeLabel[t] === cat)
        const allOn = types.every(t => activeTypes.has(t))
        const next = new Set(activeTypes)
        types.forEach(t => (allOn ? next.delete(t) : next.add(t)))
        setActiveTypes(next)
    }

    const isActive = (dim: SpecDimension) => activeTypes.has(dim.type)

    // Redlines describe the component's geometry, which is shared across states,
    // so they are drawn from the first (base) group only — otherwise per-state
    // padding/radius would stack on top of each other.
    const geometrySource = groups[0]?.dimensions ?? []
    const spacingOn = activeTypes.has('padding')
    const radiusOn = activeTypes.has('border-radius')

    const padDims = geometrySource.filter(d => d.type === 'padding')
    const horizPad = padDims.find(
        d => d.direction === 'left' || d.direction === 'right' || /\(h\)/i.test(d.label)
    )
    const vertPad = padDims.find(
        d => d.direction === 'top' || d.direction === 'bottom' || /\(v\)/i.test(d.label)
    )
    const allPad = padDims.find(d => d.direction === 'all')
    const pxOf = (d?: SpecDimension) => (d ? parsePx(displayValue(d).value) : null)
    const padX = spacingOn ? pxOf(horizPad) ?? pxOf(allPad) : null
    const padY = spacingOn ? pxOf(vertPad) ?? pxOf(allPad) : null
    const radiusDim = geometrySource.find(d => d.type === 'border-radius')
    const radiusPx = radiusOn ? pxOf(radiusDim) : null

    // Which legend keys to show beneath the diagram.
    const legend = [
        (padX || padY) && { color: REDLINE.pad, label: 'Padding' },
        { color: REDLINE.dim, label: 'Dimensions' },
        radiusPx != null && { color: REDLINE.radius, label: 'Corner radius' },
    ].filter(Boolean) as { color: string; label: string }[]

    // When a component documents more than one group (its states), the table
    // becomes a state × property matrix so each value stays tied to its state.
    const multiState = groups.length > 1

    return (
        <div className="my-8">
            {/* Controls */}
            <div className="flex flex-col gap-4 mb-6">
                <button
                    type="button"
                    onClick={() => setShowSpecs(s => !s)}
                    aria-pressed={showSpecs}
                    className="self-start px-4 py-2 rounded-lg text-body-small font-semibold bg-cyan-50 dark:bg-charcoal text-cyan hover:bg-cyan-100 dark:hover:bg-charcoal/80 transition-colors"
                >
                    {showSpecs ? 'Hide specs' : 'Show specs'}
                </button>

                {showSpecs && presentCategories.length > 1 && (
                    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter specification categories">
                        {presentCategories.map(cat => {
                            const types = ALL_TYPES.filter(t => specTypeLabel[t] === cat)
                            const allOn = types.every(t => activeTypes.has(t))
                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => toggleCategory(cat)}
                                    aria-pressed={allOn}
                                    className={cx(
                                        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-body-small font-medium transition-colors',
                                        allOn
                                            ? 'bg-cyan-50 dark:bg-charcoal text-cyan'
                                            : 'bg-cool-paper-100 dark:bg-grey text-grey dark:text-light-grey hover:bg-cool-paper-200 dark:hover:bg-grey/80'
                                    )}
                                >
                                    <span aria-hidden="true">{allOn ? '✓' : '○'}</span> {cat}
                                </button>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Annotated preview — redlines drawn to scale over the live component.
                Hidden on small screens (too cramped); the table carries the data. */}
            {showSpecs && (
                <div className="hidden sm:block overflow-x-auto mb-6">
                    <div className="inline-block">
                        <div
                            className="relative inline-block rounded-xl border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey"
                            style={{
                                paddingLeft: GUTTER_LEFT,
                                paddingBottom: GUTTER_BOTTOM,
                                paddingTop: GUTTER_TOP,
                                paddingRight: GUTTER_RIGHT,
                            }}
                        >
                            <div ref={previewRef} data-spec-preview className="relative inline-block">
                                {children}
                            </div>

                            {size && size.w > 0 && (() => {
                                const W = size.w
                                const H = size.h
                                const r = radiusPx != null ? Math.min(radiusPx, W / 2, H / 2) : 0
                                const px = padX ? Math.min(padX, W / 2 - 2) : 0
                                const py = padY ? Math.min(padY, H / 2 - 2) : 0
                                const DIM = 26 // offset of dimension lines into the gutter
                                return (
                                    <svg
                                        aria-hidden="true"
                                        className="absolute pointer-events-none overflow-visible"
                                        style={{ left: GUTTER_LEFT, top: GUTTER_TOP }}
                                        width={W}
                                        height={H}
                                    >
                                        <defs>
                                            <marker id="spec-arrow" markerWidth="9" markerHeight="9" refX="5" refY="4.5" orient="auto">
                                                <path d="M1.5,1.5 L5,4.5 L1.5,7.5" fill="none" stroke={REDLINE.dim} strokeWidth="1.2" />
                                            </marker>
                                            <marker id="spec-arrow-start" markerWidth="9" markerHeight="9" refX="5" refY="4.5" orient="auto">
                                                <path d="M8.5,1.5 L5,4.5 L8.5,7.5" fill="none" stroke={REDLINE.dim} strokeWidth="1.2" />
                                            </marker>
                                            <marker id="pad-arrow" markerWidth="8" markerHeight="8" refX="4.5" refY="4" orient="auto">
                                                <path d="M1.5,1.5 L4.5,4 L1.5,6.5" fill="none" stroke={REDLINE.pad} strokeWidth="1.1" />
                                            </marker>
                                            <marker id="pad-arrow-start" markerWidth="8" markerHeight="8" refX="4.5" refY="4" orient="auto">
                                                <path d="M7.5,1.5 L4.5,4 L7.5,6.5" fill="none" stroke={REDLINE.pad} strokeWidth="1.1" />
                                            </marker>
                                        </defs>

                                        {/* Padding frame: tinted bands between the component edge and
                                            the content box, drawn to scale */}
                                        {(px > 0 || py > 0) && (
                                            <g>
                                                {px > 0 && <rect x={0} y={0} width={px} height={H} fill={REDLINE.pad} opacity="0.16" />}
                                                {px > 0 && <rect x={W - px} y={0} width={px} height={H} fill={REDLINE.pad} opacity="0.16" />}
                                                {py > 0 && <rect x={px} y={0} width={W - 2 * px} height={py} fill={REDLINE.pad} opacity="0.16" />}
                                                {py > 0 && <rect x={px} y={H - py} width={W - 2 * px} height={py} fill={REDLINE.pad} opacity="0.16" />}
                                                {/* Content box */}
                                                <rect
                                                    x={px} y={py} width={W - 2 * px} height={H - 2 * py}
                                                    fill="none" stroke={REDLINE.pad} strokeWidth="1" strokeDasharray="3,2" opacity="0.7"
                                                />
                                                {/* Horizontal padding measure (in the left band) */}
                                                {px >= 14 && (
                                                    <>
                                                        <line x1={0} y1={H / 2} x2={px} y2={H / 2} stroke={REDLINE.pad} strokeWidth="1"
                                                            markerStart="url(#pad-arrow-start)" markerEnd="url(#pad-arrow)" />
                                                        <text x={px / 2} y={H / 2 - 5} fontSize="10" fontWeight="600" fill={REDLINE.pad} textAnchor="middle">
                                                            {Math.round(padX as number)}
                                                        </text>
                                                    </>
                                                )}
                                                {/* Vertical padding measure (in the top band) */}
                                                {py >= 14 && (
                                                    <>
                                                        <line x1={W / 2} y1={0} x2={W / 2} y2={py} stroke={REDLINE.pad} strokeWidth="1"
                                                            markerStart="url(#pad-arrow-start)" markerEnd="url(#pad-arrow)" />
                                                        <text x={W / 2 + 7} y={py / 2 + 3} fontSize="10" fontWeight="600" fill={REDLINE.pad} textAnchor="start">
                                                            {Math.round(padY as number)}
                                                        </text>
                                                    </>
                                                )}
                                            </g>
                                        )}

                                        {/* Component bounding box — hugs the real rounded corners */}
                                        <rect
                                            x={0} y={0} width={W} height={H} rx={r} ry={r}
                                            fill="none" stroke={REDLINE.box} strokeWidth="1.5" strokeDasharray="5,3" opacity="0.8"
                                        />

                                        {/* Height dimension (left gutter) with extension lines */}
                                        <line x1={0} y1={0} x2={-DIM} y2={0} stroke={REDLINE.dim} strokeWidth="0.75" opacity="0.5" />
                                        <line x1={0} y1={H} x2={-DIM} y2={H} stroke={REDLINE.dim} strokeWidth="0.75" opacity="0.5" />
                                        <line x1={-DIM} y1={0} x2={-DIM} y2={H} stroke={REDLINE.dim} strokeWidth="1"
                                            markerStart="url(#spec-arrow-start)" markerEnd="url(#spec-arrow)" />
                                        <text x={-DIM - 8} y={H / 2} fontSize="11" fontWeight="700" fill={REDLINE.dim}
                                            textAnchor="middle" transform={`rotate(-90, ${-DIM - 8}, ${H / 2})`}>
                                            {Math.round(H)}px
                                        </text>

                                        {/* Width dimension (bottom gutter) with extension lines */}
                                        <line x1={0} y1={H} x2={0} y2={H + DIM} stroke={REDLINE.dim} strokeWidth="0.75" opacity="0.5" />
                                        <line x1={W} y1={H} x2={W} y2={H + DIM} stroke={REDLINE.dim} strokeWidth="0.75" opacity="0.5" />
                                        <line x1={0} y1={H + DIM} x2={W} y2={H + DIM} stroke={REDLINE.dim} strokeWidth="1"
                                            markerStart="url(#spec-arrow-start)" markerEnd="url(#spec-arrow)" />
                                        <text x={W / 2} y={H + DIM + 15} fontSize="11" fontWeight="700" fill={REDLINE.dim} textAnchor="middle">
                                            {Math.round(W)}px
                                        </text>

                                        {/* Corner radius callout (top-right) */}
                                        {radiusPx != null && (
                                            <g>
                                                <path
                                                    d={`M ${W - r} 0 A ${r} ${r} 0 0 1 ${W} ${r}`}
                                                    fill="none" stroke={REDLINE.radius} strokeWidth="2.5"
                                                />
                                                <line
                                                    x1={W - r * 0.3} y1={r * 0.3} x2={W + 16} y2={-14}
                                                    stroke={REDLINE.radius} strokeWidth="0.75" opacity="0.6"
                                                />
                                                <text x={W + 19} y={-11} fontSize="11" fontWeight="700" fill={REDLINE.radius} textAnchor="start">
                                                    R {Math.round(radiusPx)}px
                                                </text>
                                            </g>
                                        )}
                                    </svg>
                                )
                            })()}
                        </div>

                        {/* Legend */}
                        {legend.length > 0 && (
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-3 px-1 text-caption text-grey dark:text-light-grey">
                                {legend.map(item => (
                                    <span key={item.label} className="inline-flex items-center gap-1.5">
                                        <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: item.color, opacity: item.label === 'Padding' ? 0.4 : 1 }} aria-hidden="true" />
                                        {item.label}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {!showSpecs && children}

            {/* Reference table */}
            {withTable && (
                <div className="overflow-x-auto mt-6 rounded-xl border border-cool-paper-200 dark:border-charcoal">
                    <table className="w-full text-body-small border-collapse">
                        <caption className="sr-only">{variant} specifications</caption>
                        <thead>
                            <tr className="border-b border-cool-paper-200 dark:border-charcoal bg-cool-paper-50 dark:bg-charcoal/40">
                                {multiState && (
                                    <th scope="col" className="text-left p-3 font-semibold text-grey dark:text-light-grey">State</th>
                                )}
                                <th scope="col" className="text-left p-3 font-semibold text-grey dark:text-light-grey">Category</th>
                                <th scope="col" className="text-left p-3 font-semibold text-grey dark:text-light-grey">Property</th>
                                <th scope="col" className="text-left p-3 font-semibold text-grey dark:text-light-grey">Token</th>
                                <th scope="col" className="text-left p-3 font-semibold text-grey dark:text-light-grey">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groups.map((group, gi) => {
                                // Active dimensions for this state, in category order.
                                const rows = CATEGORY_ORDER.flatMap(cat =>
                                    group.dimensions.filter(
                                        d => specTypeLabel[d.type] === cat && isActive(d)
                                    )
                                )
                                return rows.map((dim, idx) => {
                                    const cat = specTypeLabel[dim.type]
                                    const { value, live } = displayValue(dim)
                                    const hex = dim.type === 'color' || dim.type === 'shadow' ? swatchHex(dim) : null
                                    return (
                                        <tr
                                            key={`${gi}-${idx}-${dim.label}`}
                                            className={cx(
                                                'hover:bg-cool-paper-50 dark:hover:bg-charcoal/30',
                                                multiState && idx === 0 && gi > 0
                                                    ? 'border-t-2 border-cool-paper-200 dark:border-charcoal'
                                                    : 'border-b border-cool-paper-100 dark:border-charcoal/60 last:border-0'
                                            )}
                                        >
                                            {multiState && idx === 0 && (
                                                <th
                                                    scope="rowgroup"
                                                    rowSpan={rows.length}
                                                    className="text-left align-top p-3 font-semibold text-navy dark:text-white whitespace-nowrap border-t-2 border-cool-paper-200 dark:border-charcoal"
                                                >
                                                    {group.title}
                                                </th>
                                            )}
                                            <td className="p-3 whitespace-nowrap">
                                                <span className="inline-flex items-center gap-1.5 text-grey dark:text-light-grey">
                                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: specTypeColor[dim.type] }} aria-hidden="true" />
                                                    {cat}
                                                </span>
                                            </td>
                                            <td className="p-3 text-grey dark:text-light-grey">{dim.label}</td>
                                            <td className="p-3 font-mono text-cyan whitespace-nowrap">{dim.token || '—'}</td>
                                            <td className="p-3 font-mono text-grey dark:text-light-grey whitespace-nowrap">
                                                <span className="inline-flex items-center gap-2">
                                                    {hex && (
                                                        <span
                                                            className="inline-block w-3.5 h-3.5 rounded border border-cool-paper-300 dark:border-charcoal flex-none"
                                                            style={{ backgroundColor: hex }}
                                                            aria-hidden="true"
                                                        />
                                                    )}
                                                    {value || '—'}
                                                    {live && (
                                                        <span
                                                            title="Resolved live from the design tokens"
                                                            className="text-caption text-success-green"
                                                            aria-label="resolved from tokens"
                                                        >
                                                            ●
                                                        </span>
                                                    )}
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
