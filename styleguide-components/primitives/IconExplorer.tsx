/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from 'react'
import { IconEntry, importSnippet } from '../iconRegistry'
import { BupaIconItem } from '../brandAssets'

type Category = 'all' | 'icon' | 'logo' | 'bupa'

interface Props {
    systemIcons: IconEntry[]
    bupaIcons: BupaIconItem[]
}

const SIZES = [16, 24, 32, 48]

const CopyIcon = () => (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="9" y="9" width="13" height="13" rx="2" />
        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
)

const CheckIcon = () => (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 6L9 17l-5-5" />
    </svg>
)

const CloseIcon = () => (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 6L6 18M6 6l12 12" />
    </svg>
)

export const IconExplorer = ({ systemIcons, bupaIcons }: Props) => {
    const [query, setQuery] = useState('')
    const [category, setCategory] = useState<Category>('all')
    const [selectedSystem, setSelectedSystem] = useState<IconEntry | null>(null)
    const [selectedBupa, setSelectedBupa] = useState<BupaIconItem | null>(null)
    const [copied, setCopied] = useState(false)

    const categories: { id: Category; label: string; count: number }[] = [
        { id: 'all',   label: 'All',         count: systemIcons.length + bupaIcons.length },
        { id: 'icon',  label: 'System icons', count: systemIcons.filter(i => i.category === 'icon').length },
        { id: 'logo',  label: 'Logos',        count: systemIcons.filter(i => i.category === 'logo').length },
        { id: 'bupa',  label: 'Bupa icon set', count: bupaIcons.length },
    ]

    const term = query.trim().toLowerCase()

    const filteredSystem = useMemo(() => {
        const byCategory = category === 'bupa'
            ? []
            : category === 'all'
                ? systemIcons
                : systemIcons.filter(i => i.category === category)
        return term ? byCategory.filter(i => i.name.toLowerCase().includes(term)) : byCategory
    }, [systemIcons, category, term])

    const filteredBupa = useMemo(() => {
        if (category !== 'all' && category !== 'bupa') return []
        return term ? bupaIcons.filter(i => i.name.toLowerCase().includes(term)) : bupaIcons
    }, [bupaIcons, category, term])

    const totalFiltered = filteredSystem.length + filteredBupa.length

    const copyImport = async (icon: IconEntry) => {
        try {
            await navigator.clipboard.writeText(importSnippet(icon))
            setCopied(true)
            setTimeout(() => setCopied(false), 1800)
        } catch { /* ignore */ }
    }

    const selectSystem = (icon: IconEntry) => {
        setSelectedSystem(icon)
        setSelectedBupa(null)
        setCopied(false)
    }

    const selectBupa = (icon: BupaIconItem) => {
        setSelectedBupa(icon)
        setSelectedSystem(null)
        setCopied(false)
    }

    const hasSelection = selectedSystem !== null || selectedBupa !== null

    const closePanel = () => {
        setSelectedSystem(null)
        setSelectedBupa(null)
        setCopied(false)
    }

    // Close on Escape and lock body scroll while the drawer is open
    useEffect(() => {
        if (!hasSelection) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closePanel()
        }
        window.addEventListener('keydown', onKey)
        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            window.removeEventListener('keydown', onKey)
            document.body.style.overflow = prevOverflow
        }
    }, [hasSelection])

    return (
        <div className="mt-6">
            {/* Search + filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <div className="relative flex-1 max-w-sm">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-disabled-text" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        type="search"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search icons…"
                        aria-label="Search icons"
                        className="w-full pl-9 pr-3 h-10 rounded-lg bg-cool-paper-100 dark:bg-cool-grey border border-cool-paper-200 dark:border-charcoal outline-none focus:border-cyan text-body-small text-grey dark:text-white placeholder:text-disabled-text"
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => setCategory(cat.id)}
                            className={`px-3 h-10 rounded-lg text-body-small font-medium border transition-colors ${
                                category === cat.id
                                    ? 'bg-cyan text-white border-cyan'
                                    : 'bg-white dark:bg-cool-grey border-cool-paper-200 dark:border-charcoal text-grey dark:text-light-grey hover:border-cyan'
                            }`}
                        >
                            {cat.label}
                            <span className={`ml-1.5 text-caption ${category === cat.id ? 'text-white/70' : 'text-disabled-text'}`}>
                                {cat.count}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="w-full">
                    {filteredSystem.length === 0 && filteredBupa.length === 0 && (
                        <p className="text-body-small text-grey dark:text-light-grey py-8 text-center">
                            No icons match &ldquo;{query}&rdquo;.
                        </p>
                    )}

                    {filteredSystem.length > 0 && (
                        <>
                            {(category === 'all') && (
                                <p className="text-caption font-semibold uppercase tracking-widest text-disabled-text mb-3">
                                    System icons
                                </p>
                            )}
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 mb-6">
                                {filteredSystem.map(icon => {
                                    const Icon = icon.Component
                                    const isSelected = selectedSystem?.name === icon.name
                                    return (
                                        <button
                                            key={icon.name}
                                            type="button"
                                            onClick={() => selectSystem(icon)}
                                            className={`group flex flex-col items-center gap-2 rounded-xl p-3 transition-colors text-left ${
                                                isSelected
                                                    ? 'bg-cyan-50 dark:bg-charcoal border border-cyan'
                                                    : 'border border-transparent hover:bg-cool-paper-100 dark:hover:bg-charcoal hover:border-cool-paper-200 dark:hover:border-charcoal'
                                            }`}
                                        >
                                            <span className="w-8 h-8 flex items-center justify-center">
                                                <Icon className="w-7 h-7 object-contain" aria-hidden="true" />
                                            </span>
                                            <span className={`text-caption font-mono leading-tight text-center break-all line-clamp-2 ${isSelected ? 'text-cyan' : 'text-grey dark:text-light-grey'}`}>
                                                {icon.name}
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>
                        </>
                    )}

                    {filteredBupa.length > 0 && (
                        <>
                            {(category === 'all') && (
                                <p className="text-caption font-semibold uppercase tracking-widest text-disabled-text mb-3">
                                    Bupa icon set
                                </p>
                            )}
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1">
                                {filteredBupa.map(icon => {
                                    const isSelected = selectedBupa?.name === icon.name
                                    return (
                                        <button
                                            key={icon.name}
                                            type="button"
                                            onClick={() => selectBupa(icon)}
                                            className={`group flex flex-col items-center gap-2 rounded-xl p-3 transition-colors text-left ${
                                                isSelected
                                                    ? 'bg-cyan-50 dark:bg-charcoal border border-cyan'
                                                    : 'border border-transparent hover:bg-cool-paper-100 dark:hover:bg-charcoal hover:border-cool-paper-200 dark:hover:border-charcoal'
                                            }`}
                                        >
                                            <span className="w-8 h-8 flex items-center justify-center">
                                                <img src={icon.src} alt="" className="w-7 h-7 object-contain" />
                                            </span>
                                            <span className={`text-caption leading-tight text-center break-all line-clamp-2 ${isSelected ? 'text-cyan font-medium' : 'text-grey dark:text-light-grey'}`}>
                                                {icon.name}
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>
                        </>
                    )}

                    {totalFiltered > 0 && (
                        <p className="mt-4 text-caption text-disabled-text">
                            {totalFiltered} icon{totalFiltered !== 1 ? 's' : ''}
                        </p>
                    )}
                </div>

            {/* Slideout detail drawer */}
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-40 bg-navy/40 backdrop-blur-sm transition-opacity duration-300 ${
                    hasSelection ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={closePanel}
                aria-hidden="true"
            />

            {/* Drawer */}
            <aside
                role="dialog"
                aria-modal="true"
                aria-label="Icon details"
                className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-white dark:bg-cool-grey border-l border-cool-paper-200 dark:border-charcoal shadow-2xl transition-transform duration-300 ease-out ${
                    hasSelection ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between px-5 h-14 bg-white dark:bg-cool-grey border-b border-cool-paper-200 dark:border-charcoal">
                    <p className="text-body-small font-semibold text-navy dark:text-white">Icon details</p>
                    <button
                        type="button"
                        onClick={closePanel}
                        aria-label="Close details"
                        className="flex items-center justify-center w-9 h-9 rounded-lg text-grey dark:text-light-grey hover:bg-cool-paper-100 dark:hover:bg-charcoal transition-colors"
                    >
                        <CloseIcon />
                    </button>
                </div>

                {selectedSystem && (
                    <div className="p-5">
                            {/* Large preview */}
                            <div className="flex items-center justify-center rounded-xl bg-cool-paper-50 dark:bg-charcoal p-6 mb-4">
                                <selectedSystem.Component className="w-12 h-12 object-contain" aria-hidden="true" />
                            </div>

                            {/* Name */}
                            <p className="font-semibold text-navy dark:text-white mb-1">{selectedSystem.name}</p>
                            <p className="text-caption text-disabled-text mb-4 font-mono">{selectedSystem.category}</p>

                            {/* Size previews */}
                            <p className="text-caption font-semibold uppercase tracking-wide text-disabled-text mb-2">Sizes</p>
                            <div className="flex items-end gap-3 mb-5">
                                {SIZES.map(size => (
                                    <div key={size} className="flex flex-col items-center gap-1">
                                        <selectedSystem.Component
                                            className="object-contain"
                                            aria-hidden="true"
                                            style={{ width: size, height: size } as React.CSSProperties}
                                        />
                                        <span className="text-caption text-disabled-text font-mono">{size}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Import snippet */}
                            <p className="text-caption font-semibold uppercase tracking-wide text-disabled-text mb-2">Import</p>
                            <div className="rounded-lg bg-cool-paper-100 dark:bg-charcoal p-3 mb-3">
                                <code className="text-caption font-mono text-navy dark:text-white break-all leading-relaxed">
                                    {importSnippet(selectedSystem)}
                                </code>
                            </div>
                            <button
                                type="button"
                                onClick={() => copyImport(selectedSystem)}
                                className={`flex items-center gap-2 w-full justify-center rounded-lg px-3 py-2 text-body-small font-medium transition-colors ${
                                    copied
                                        ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-700'
                                        : 'bg-cyan text-white hover:bg-cyan/90'
                                }`}
                            >
                                {copied ? <><CheckIcon /> Copied!</> : <><CopyIcon /> Copy import</>}
                            </button>
                        </div>
                    )}

                    {selectedBupa && (
                        <div className="p-5">
                            {/* Large preview */}
                            <div className="flex items-center justify-center rounded-xl bg-cool-paper-50 dark:bg-charcoal p-6 mb-4">
                                <img src={selectedBupa.src} alt="" className="w-12 h-12 object-contain" />
                            </div>

                            {/* Name */}
                            <p className="font-semibold text-navy dark:text-white mb-1 capitalize">{selectedBupa.name}</p>
                            <p className="text-caption text-disabled-text mb-4">Bupa icon set · PNG</p>

                            {/* Size previews */}
                            <p className="text-caption font-semibold uppercase tracking-wide text-disabled-text mb-2">Sizes</p>
                            <div className="flex items-end gap-3 mb-5">
                                {SIZES.map(size => (
                                    <div key={size} className="flex flex-col items-center gap-1">
                                        <img
                                            src={selectedBupa.src}
                                            alt=""
                                            className="object-contain"
                                            style={{ width: size, height: size }}
                                        />
                                        <span className="text-caption text-disabled-text font-mono">{size}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Path */}
                            <p className="text-caption font-semibold uppercase tracking-wide text-disabled-text mb-2">Asset path</p>
                            <div className="rounded-lg bg-cool-paper-100 dark:bg-charcoal p-3">
                                <code className="text-caption font-mono text-navy dark:text-white break-all leading-relaxed">
                                    {selectedBupa.src}
                                </code>
                            </div>
                        </div>
                    )}
            </aside>
        </div>
    )
}
