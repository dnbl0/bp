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
const GUTTER_LEFT = 48
const GUTTER_BOTTOM = 40
const GUTTER_TOP = 28

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
    const paddingBands = geometrySource.filter(
        d => d.type === 'padding' && d.direction && isActive(d)
    )
    const radiusDim = geometrySource.find(d => d.type === 'border-radius' && isActive(d))

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
                    <div
                        className="relative inline-block rounded-xl border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey"
                        style={{
                            paddingLeft: GUTTER_LEFT,
                            paddingBottom: GUTTER_BOTTOM,
                            paddingTop: GUTTER_TOP,
                            paddingRight: 24,
                        }}
                    >
                        <div ref={previewRef} data-spec-preview className="relative inline-block">
                            {children}
                        </div>

                        {size && size.w > 0 && (
                            <svg
                                aria-hidden="true"
                                className="absolute pointer-events-none overflow-visible"
                                style={{ left: GUTTER_LEFT, top: GUTTER_TOP }}
                                width={size.w}
                                height={size.h}
                            >
                                <defs>
                                    <marker id="spec-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                                        <path d="M1,1 L4,4 L1,7" fill="none" stroke="#475569" strokeWidth="1" />
                                    </marker>
                                    <marker id="spec-arrow-start" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                                        <path d="M7,1 L4,4 L7,7" fill="none" stroke="#475569" strokeWidth="1" />
                                    </marker>
                                </defs>

                                {/* Component bounding box */}
                                <rect
                                    x={0} y={0} width={size.w} height={size.h}
                                    fill="none" stroke="#0079c8" strokeWidth="1" strokeDasharray="4,3" opacity="0.7"
                                />

                                {/* Padding bands, drawn to scale inside the measured box */}
                                {paddingBands.map((dim, i) => {
                                    const pad = parsePx(displayValue(dim).value)
                                    if (!pad) return null
                                    const p = Math.min(pad, Math.min(size.w, size.h) / 2)
                                    const fill = specTypeColor.padding
                                    const dirs = dim.direction === 'all'
                                        ? ['top', 'right', 'bottom', 'left']
                                        : [dim.direction as string]
                                    return (
                                        <g key={`pad-${i}`}>
                                            {dirs.map(d => {
                                                const r =
                                                    d === 'left' ? { x: 0, y: 0, w: p, h: size.h }
                                                    : d === 'right' ? { x: size.w - p, y: 0, w: p, h: size.h }
                                                    : d === 'top' ? { x: 0, y: 0, w: size.w, h: p }
                                                    : { x: 0, y: size.h - p, w: size.w, h: p }
                                                return (
                                                    <rect key={d} x={r.x} y={r.y} width={r.w} height={r.h}
                                                        fill={fill} opacity="0.14" />
                                                )
                                            })}
                                        </g>
                                    )
                                })}

                                {/* Height dimension arrow (left gutter) */}
                                <line
                                    x1={-20} y1={0} x2={-20} y2={size.h}
                                    stroke="#475569" strokeWidth="1"
                                    markerStart="url(#spec-arrow-start)" markerEnd="url(#spec-arrow)"
                                />
                                <text x={-26} y={size.h / 2} fontSize="11" fontWeight="600" fill="#475569"
                                    textAnchor="middle" transform={`rotate(-90, -26, ${size.h / 2})`}>
                                    {Math.round(size.h)}px
                                </text>

                                {/* Width dimension arrow (bottom gutter) */}
                                <line
                                    x1={0} y1={size.h + 20} x2={size.w} y2={size.h + 20}
                                    stroke="#475569" strokeWidth="1"
                                    markerStart="url(#spec-arrow-start)" markerEnd="url(#spec-arrow)"
                                />
                                <text x={size.w / 2} y={size.h + 34} fontSize="11" fontWeight="600" fill="#475569" textAnchor="middle">
                                    {Math.round(size.w)}px
                                </text>

                                {/* Corner radius indicator (top-right) */}
                                {radiusDim && (() => {
                                    const rad = parsePx(displayValue(radiusDim).value)
                                    if (rad == null) return null
                                    const r = Math.min(rad, size.w / 2, size.h / 2)
                                    return (
                                        <g>
                                            <path
                                                d={`M ${size.w - r} 0 A ${r} ${r} 0 0 1 ${size.w} ${r}`}
                                                fill="none" stroke={specTypeColor['border-radius']} strokeWidth="2"
                                            />
                                            <text x={size.w + 6} y={r + 12} fontSize="11" fontWeight="600" fill={specTypeColor['border-radius']}>
                                                {displayValue(radiusDim).value}
                                            </text>
                                        </g>
                                    )
                                })()}
                            </svg>
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
