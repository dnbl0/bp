import Head from 'next/head'
import { CSSProperties, useMemo, useState } from 'react'
import { cx } from '../../utils/cx'
import {
    MaterialSymbolStyle,
    materialSymbolsHref,
    symbolCategories,
    symbolStyles,
} from '../materialSymbols'

/**
 * A faithful re-creation of the Google Fonts icon explorer
 * (https://fonts.google.com/icons), built on the real Material Symbols
 * variable font. The control rail drives the four font axes — Fill, Weight,
 * Grade and Optical size — and the style switch picks between the Outlined,
 * Rounded and Sharp families. Clicking any icon copies its usage snippet.
 */
export const MaterialSymbolsExplorer = () => {
    const [query, setQuery] = useState('')
    const [style, setStyle] = useState<MaterialSymbolStyle>('outlined')
    const [category, setCategory] = useState('all')
    const [fill, setFill] = useState(0)
    const [weight, setWeight] = useState(400)
    const [grade, setGrade] = useState(0)
    const [opticalSize, setOpticalSize] = useState(24)
    const [copied, setCopied] = useState<string | null>(null)

    const activeStyle =
        symbolStyles.find(option => option.id === style) ?? symbolStyles[0]

    // font-variation-settings is the canonical way to drive the variable axes;
    // opsz also tracks the rendered font-size, matching Google's preview.
    const axisStyle: CSSProperties = {
        fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opticalSize}`,
        fontSize: 40,
    }

    const visible = useMemo(() => {
        const term = query.trim().toLowerCase().replace(/\s+/g, '_')
        const pool =
            category === 'all'
                ? symbolCategories.flatMap(group => group.icons)
                : symbolCategories.find(group => group.id === category)?.icons ?? []
        const deduped = Array.from(new Set(pool))
        if (!term) return deduped
        return deduped.filter(name => name.includes(term))
    }, [category, query])

    const copy = async (name: string) => {
        const snippet = `<span class="${activeStyle.className}">${name}</span>`
        try {
            await navigator.clipboard.writeText(snippet)
            setCopied(name)
            setTimeout(() => setCopied(null), 1500)
        } catch {
            // Clipboard may be unavailable; ignore.
        }
    }

    return (
        <div className="my-8">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link rel="stylesheet" href={materialSymbolsHref} />
            </Head>

            {/* Search bar — spans the full width, mirroring Google's layout. */}
            <div className="relative">
                <span
                    aria-hidden="true"
                    className={cx(activeStyle.className, 'absolute left-4 top-1/2 -translate-y-1/2 text-grey dark:text-light-grey')}
                    style={{ fontSize: 24 }}
                >
                    search
                </span>
                <input
                    type="search"
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                    placeholder="Search icons"
                    aria-label="Search icons"
                    className="w-full h-14 pl-12 pr-4 rounded-full bg-cool-paper-100 dark:bg-cool-grey border border-cool-paper-200 dark:border-charcoal outline-none focus:border-cyan text-body text-grey dark:text-white"
                />
            </div>

            <div className="mt-6 flex flex-col lg:flex-row gap-8">
                {/* Customisation rail */}
                <aside className="lg:w-64 flex-none lg:sticky lg:top-24 self-start space-y-8">
                    <div>
                        <p className="mb-3 text-caption font-bold uppercase tracking-wide text-disabled-text">
                            Style
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                            {symbolStyles.map(option => {
                                const active = option.id === style
                                return (
                                    <button
                                        key={option.id}
                                        type="button"
                                        onClick={() => setStyle(option.id)}
                                        aria-pressed={active}
                                        className={cx(
                                            'flex flex-col items-center gap-1 rounded-xl border p-3 transition-colors',
                                            active
                                                ? 'border-cyan bg-cyan-50 dark:bg-charcoal text-cyan'
                                                : 'border-cool-paper-200 dark:border-charcoal text-grey dark:text-light-grey hover:border-cyan'
                                        )}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={option.className}
                                            style={{ fontSize: 28 }}
                                        >
                                            home
                                        </span>
                                        <span className="text-caption">{option.label}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <p className="text-caption font-bold uppercase tracking-wide text-disabled-text">
                            Customise
                        </p>

                        {/* Fill toggle */}
                        <div className="flex items-center justify-between">
                            <span className="text-body-small font-semibold text-navy dark:text-white">
                                Fill
                            </span>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={fill === 1}
                                aria-label="Fill"
                                onClick={() => setFill(value => (value === 1 ? 0 : 1))}
                                className={cx(
                                    'relative h-6 w-11 rounded-full transition-colors',
                                    fill === 1
                                        ? 'bg-cyan'
                                        : 'bg-cool-paper-200 dark:bg-charcoal'
                                )}
                            >
                                <span
                                    className={cx(
                                        'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
                                        fill === 1 ? 'translate-x-[22px]' : 'translate-x-0.5'
                                    )}
                                />
                            </button>
                        </div>

                        <Slider
                            label="Weight"
                            min={100}
                            max={700}
                            step={100}
                            value={weight}
                            onChange={setWeight}
                        />
                        <Slider
                            label="Grade"
                            min={-25}
                            max={200}
                            step={25}
                            value={grade}
                            onChange={setGrade}
                        />
                        <Slider
                            label="Optical size"
                            min={20}
                            max={48}
                            step={1}
                            value={opticalSize}
                            onChange={setOpticalSize}
                            suffix="px"
                        />
                    </div>

                    <div>
                        <p className="mb-3 text-caption font-bold uppercase tracking-wide text-disabled-text">
                            Category
                        </p>
                        <ul className="space-y-0.5">
                            {[{ id: 'all', label: 'All' }, ...symbolCategories].map(group => {
                                const active = group.id === category
                                return (
                                    <li key={group.id}>
                                        <button
                                            type="button"
                                            onClick={() => setCategory(group.id)}
                                            aria-current={active ? 'true' : undefined}
                                            className={cx(
                                                'w-full text-left px-3 py-1.5 rounded-lg text-body-small transition-colors',
                                                active
                                                    ? 'bg-cyan-50 dark:bg-charcoal text-cyan font-semibold'
                                                    : 'text-grey dark:text-light-grey hover:bg-cool-paper-100 dark:hover:bg-charcoal'
                                            )}
                                        >
                                            {group.label}
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </aside>

                {/* Icon grid */}
                <div className="flex-1 min-w-0">
                    <p className="mb-4 text-body-small text-grey dark:text-light-grey">
                        {visible.length} icons — click any icon to copy its HTML snippet.
                    </p>
                    {visible.length === 0 ? (
                        <p className="text-grey dark:text-light-grey">
                            No icons match “{query}”.
                        </p>
                    ) : (
                        <div className="grid gap-3 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                            {visible.map(name => (
                                <button
                                    key={name}
                                    type="button"
                                    onClick={() => copy(name)}
                                    title={`Copy ${name}`}
                                    className="group flex flex-col items-center justify-start gap-2 rounded-xl border border-cool-paper-200 dark:border-charcoal p-3 bg-white dark:bg-cool-grey hover:border-cyan hover:shadow-sm transition-all"
                                >
                                    <span className="h-12 flex items-center justify-center text-navy dark:text-white">
                                        <span
                                            aria-hidden="true"
                                            className={activeStyle.className}
                                            style={axisStyle}
                                        >
                                            {name}
                                        </span>
                                    </span>
                                    <span className="w-full truncate text-caption text-grey dark:text-light-grey text-center">
                                        {copied === name ? 'Copied!' : name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const Slider = ({
    label,
    min,
    max,
    step,
    value,
    onChange,
    suffix = '',
}: {
    label: string
    min: number
    max: number
    step: number
    value: number
    onChange: (value: number) => void
    suffix?: string
}) => (
    <label className="block">
        <span className="flex items-center justify-between mb-2">
            <span className="text-body-small font-semibold text-navy dark:text-white">
                {label}
            </span>
            <span className="text-caption font-mono text-grey dark:text-light-grey">
                {value}
                {suffix}
            </span>
        </span>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={event => onChange(Number(event.target.value))}
            className="w-full accent-cyan"
        />
    </label>
)
