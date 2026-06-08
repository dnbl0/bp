import { ReactNode, useRef, useState, useEffect } from 'react'
import { cx } from '../../utils/cx'

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
    width: 'Sizing',
    height: 'Sizing',
    gap: 'Spacing',
    'border-radius': 'Visual',
    'font-size': 'Typography',
    'line-height': 'Typography',
    color: 'Visual',
    shadow: 'Visual',
}

const specTypeColor: Record<SpecDimension['type'], string> = {
    padding: '#00b4d8',
    margin: '#f77f00',
    width: '#06a77d',
    height: '#06a77d',
    gap: '#00b4d8',
    'border-radius': '#d62828',
    'font-size': '#773344',
    'line-height': '#773344',
    color: '#d62828',
    shadow: '#d62828',
}

/**
 * Component that annotates a rendered component with visual design specifications.
 * Shows dimension lines, callouts, and a reference table with token names + pixel values.
 */
export const Specifications = ({
    children,
    groups,
    variant = 'Default',
    withTable = true,
    showAnnotations = true,
}: SpecificationsProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [showSpecs, setShowSpecs] = useState(showAnnotations)
    const [activeCategories, setActiveCategories] = useState<Set<string>>(
        new Set(['padding', 'margin', 'width', 'height', 'gap', 'border-radius', 'font-size', 'line-height', 'color', 'shadow'])
    )
    const [svgDimensions, setSvgDimensions] = useState<{
        width: number
        height: number
        offsetX: number
        offsetY: number
    } | null>(null)

    useEffect(() => {
        if (!containerRef.current || !showSpecs) {
            setSvgDimensions(null)
            return
        }

        const measure = () => {
            const container = containerRef.current
            if (!container) return

            const rect = container.getBoundingClientRect()
            const preview = container.querySelector('[data-spec-preview]') as HTMLElement
            if (!preview) return

            const previewRect = preview.getBoundingClientRect()
            const offsetX = previewRect.left - rect.left
            const offsetY = previewRect.top - rect.top

            setSvgDimensions({
                width: previewRect.width,
                height: previewRect.height,
                offsetX,
                offsetY,
            })
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
    const filteredDimensions = allDimensions.filter(d => activeCategories.has(d.type))

    const groupsByType = Array.from(activeCategories).reduce((acc, type) => {
        const dims = filteredDimensions.filter(d => d.type === type)
        if (dims.length > 0) {
            const key = specTypeLabel[type as SpecDimension['type']]
            if (!acc[key]) acc[key] = []
            acc[key].push(...dims)
        }
        return acc
    }, {} as Record<string, SpecDimension[]>)

    const toggleCategory = (type: SpecDimension['type']) => {
        const newCategories = new Set(activeCategories)
        if (newCategories.has(type)) {
            newCategories.delete(type)
        } else {
            newCategories.add(type)
        }
        setActiveCategories(newCategories)
    }

    const specTypes = Array.from(
        new Set(allDimensions.map(d => d.type))
    ) as SpecDimension['type'][]

    const categoryNames = Array.from(
        new Set(specTypes.map(t => specTypeLabel[t]))
    ).sort()

    return (
        <div className="my-8">
            {/* Controls */}
            <div className="flex flex-col gap-4 mb-6">
                <button
                    type="button"
                    onClick={() => setShowSpecs(!showSpecs)}
                    className="self-start px-4 py-2 rounded-lg text-body-small font-semibold bg-cyan-50 dark:bg-charcoal text-cyan hover:bg-cyan-100 dark:hover:bg-charcoal/80 transition-colors"
                >
                    {showSpecs ? '✓ Show specs' : 'Show specs'}
                </button>

                {showSpecs && (
                    <div className="flex flex-wrap gap-2">
                        {categoryNames.map(category => {
                            const typesInCategory = specTypes.filter(
                                t => specTypeLabel[t] === category
                            )
                            const allChecked = typesInCategory.every(t =>
                                activeCategories.has(t)
                            )

                            return (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => {
                                        if (allChecked) {
                                            const newCategories = new Set(activeCategories)
                                            typesInCategory.forEach(t =>
                                                newCategories.delete(t)
                                            )
                                            setActiveCategories(newCategories)
                                        } else {
                                            const newCategories = new Set(activeCategories)
                                            typesInCategory.forEach(t =>
                                                newCategories.add(t)
                                            )
                                            setActiveCategories(newCategories)
                                        }
                                    }}
                                    className={cx(
                                        'px-3 py-1.5 rounded-lg text-body-small font-medium transition-colors',
                                        allChecked
                                            ? 'bg-cyan-50 dark:bg-charcoal text-cyan'
                                            : 'bg-cool-paper-100 dark:bg-grey text-grey dark:text-light-grey hover:bg-cool-paper-200 dark:hover:bg-grey/80'
                                    )}
                                >
                                    {allChecked ? '✓' : '○'} {category}
                                </button>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Annotated component preview */}
            {showSpecs && svgDimensions && (
                <div ref={containerRef} className="relative mb-6">
                    <div data-spec-preview>
                        {children}
                    </div>

                    {/* SVG overlay */}
                    <svg
                        className="absolute top-0 left-0 pointer-events-none"
                        width={svgDimensions.width + svgDimensions.offsetX * 2}
                        height={svgDimensions.height + svgDimensions.offsetY * 2}
                        style={{
                            transform: `translate(${-svgDimensions.offsetX}px, ${-svgDimensions.offsetY}px)`,
                        }}
                    >
                        {/* Component bounding box */}
                        <rect
                            x={svgDimensions.offsetX}
                            y={svgDimensions.offsetY}
                            width={svgDimensions.width}
                            height={svgDimensions.height}
                            fill="none"
                            stroke="#0079c8"
                            strokeWidth="2"
                            opacity="0.5"
                        />

                        {/* Dimension annotations */}
                        {filteredDimensions.slice(0, 6).map((dim, i) => {
                            const color = specTypeColor[dim.type]
                            const x = svgDimensions.offsetX + 20 + i * 140
                            const y = svgDimensions.offsetY - 30

                            return (
                                <g key={`${dim.label}-${i}`}>
                                    {/* Leader line */}
                                    <line
                                        x1={x}
                                        y1={y}
                                        x2={x}
                                        y2={svgDimensions.offsetY}
                                        stroke={color}
                                        strokeWidth="1"
                                        strokeDasharray="3,3"
                                        opacity="0.6"
                                    />

                                    {/* Dot at component */}
                                    <circle
                                        cx={x}
                                        cy={svgDimensions.offsetY}
                                        r="3"
                                        fill={color}
                                        opacity="0.8"
                                    />

                                    {/* Badge background */}
                                    <rect
                                        x={x - 50}
                                        y={y - 24}
                                        width="100"
                                        height="20"
                                        rx="4"
                                        fill="white"
                                        stroke={color}
                                        strokeWidth="1"
                                    />

                                    {/* Badge text */}
                                    <text
                                        x={x}
                                        y={y - 8}
                                        textAnchor="middle"
                                        fontSize="11"
                                        fontWeight="600"
                                        fill={color}
                                    >
                                        {dim.token || dim.label.slice(0, 8)}
                                    </text>
                                </g>
                            )
                        })}
                    </svg>
                </div>
            )}

            {!showSpecs && children}

            {/* Reference table */}
            {withTable && (
                <div className="overflow-x-auto mt-6">
                    <table className="w-full text-body-small border-collapse">
                        <thead>
                            <tr className="border-b border-cool-paper-200 dark:border-charcoal">
                                <th className="text-left p-3 font-semibold text-grey dark:text-light-grey">Type</th>
                                <th className="text-left p-3 font-semibold text-grey dark:text-light-grey">Specification</th>
                                <th className="text-left p-3 font-semibold text-grey dark:text-light-grey">Token</th>
                                <th className="text-left p-3 font-semibold text-grey dark:text-light-grey">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(groupsByType).map(([category, dims]) =>
                                dims.map((dim, idx) => (
                                    <tr
                                        key={`${category}-${idx}`}
                                        className="border-b border-cool-paper-100 dark:border-charcoal hover:bg-cool-paper-50 dark:hover:bg-charcoal/30"
                                    >
                                        <td className="p-3">
                                            <span className="inline-block px-2 py-1 rounded text-caption font-semibold text-white bg-opacity-70" style={{ backgroundColor: specTypeColor[dim.type] }}>
                                                {category}
                                            </span>
                                        </td>
                                        <td className="p-3 text-grey dark:text-light-grey">{dim.label}</td>
                                        <td className="p-3 font-mono text-cyan">{dim.token || '—'}</td>
                                        <td className="p-3 font-mono text-grey dark:text-light-grey">{dim.value}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    {filteredDimensions.length === 0 && (
                        <p className="p-4 text-centre text-grey dark:text-light-grey text-body-small">
                            Select a spec category above to view specifications.
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}
