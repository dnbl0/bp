import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { SearchIcon } from '../components/atoms/icons/SearchIcon'
import { CloseIcon } from '../components/atoms/icons/CloseIcon'
import { cx } from '../utils/cx'
import { NavItem } from './designSystem.config'
import { useBrand } from './BrandContext'
import { hrefForItem } from './brands'

const MAX_RESULTS = 12

/** True when every character of `term` appears in `text`, in order. */
const isSubsequence = (term: string, text: string): boolean => {
    let i = 0
    for (let j = 0; j < text.length && i < term.length; j++) {
        if (text[j] === term[i]) i++
    }
    return i === term.length
}

/**
 * Ranks a doc against the query: title matches outrank summary/keyword
 * matches, exact substrings outrank fuzzy subsequence matches. Returns 0 when
 * the doc does not match at all.
 */
const score = (doc: NavItem, term: string): number => {
    const title = doc.title.toLowerCase()
    const haystack = `${doc.title} ${doc.summary ?? ''} ${(
        doc.keywords ?? []
    ).join(' ')}`.toLowerCase()

    if (title.startsWith(term)) return 100
    if (title.includes(term)) return 80
    if (haystack.includes(term)) return 50
    if (isSubsequence(term, haystack)) return 20
    return 0
}

/**
 * The design system's live search. The header shows a trigger; activating it
 * (click, focus or ⌘K) opens a responsive overlay — a full-screen sheet on
 * mobile, a centred command-palette panel on desktop — with fuzzy matching and
 * full keyboard navigation. Modelled on Adobe Spectrum / command-palette search.
 */
export const Search = ({ onNavigate }: { onNavigate: () => void }) => {
    const router = useRouter()
    const brand = useBrand()
    const inputRef = useRef<HTMLInputElement>(null)
    const triggerRef = useRef<HTMLButtonElement>(null)
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [active, setActive] = useState(0)

    const results = useMemo(() => {
        const term = query.trim().toLowerCase()
        if (!term) return []
        return brand.allDocs
            .map(doc => ({ doc, rank: score(doc, term) }))
            .filter(entry => entry.rank > 0)
            .sort((a, b) => b.rank - a.rank || a.doc.title.localeCompare(b.doc.title))
            .slice(0, MAX_RESULTS)
            .map(entry => entry.doc)
    }, [query, brand])

    // Reset the highlighted result whenever the result set changes.
    useEffect(() => setActive(0), [results.length, query])

    // ⌘K / Ctrl-K toggles the overlay from anywhere on the page.
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault()
                setOpen(prev => !prev)
            }
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [])

    // While the overlay is open, focus the field and lock background scroll.
    useEffect(() => {
        if (!open) return
        inputRef.current?.focus()
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = previousOverflow
        }
    }, [open])

    /** Close the overlay, clear the query and return focus to the trigger. */
    const close = () => {
        setOpen(false)
        setQuery('')
        setActive(0)
        triggerRef.current?.focus()
    }

    /** Dismiss after a navigation (focus moves to the destination page). */
    const dismiss = () => {
        setOpen(false)
        setQuery('')
        setActive(0)
        onNavigate()
    }

    const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Escape') {
            close()
            return
        }
        if (!results.length) return
        if (event.key === 'ArrowDown') {
            event.preventDefault()
            setActive(prev => (prev + 1) % results.length)
        } else if (event.key === 'ArrowUp') {
            event.preventDefault()
            setActive(prev => (prev - 1 + results.length) % results.length)
        } else if (event.key === 'Enter') {
            event.preventDefault()
            const doc = results[active]
            if (doc) {
                router.push(hrefForItem(brand, doc))
                dismiss()
            }
        }
    }

    return (
        <>
            {/* Trigger — looks like a search field, opens the overlay. */}
            <button
                ref={triggerRef}
                type="button"
                onClick={() => setOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-label={`Search ${brand.label}`}
                className="w-full flex items-center gap-2 px-3 h-10 rounded-lg bg-cool-paper-100 dark:bg-cool-grey border border-cool-paper-200 dark:border-charcoal hover:border-cyan text-left transition-colors"
            >
                <SearchIcon className="w-5 h-5 flex-none fill-grey dark:fill-light-grey" />
                <span className="flex-1 truncate text-body-small text-disabled-text">
                    Search
                </span>
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Search the design system"
                >
                    {/* Scrim */}
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={close}
                        aria-hidden="true"
                    />

                    {/* Panel: full-screen sheet on mobile, centred palette on desktop */}
                    <div className="absolute inset-0 flex flex-col overflow-hidden bg-white dark:bg-grey border-cool-paper-200 dark:border-charcoal sm:inset-x-0 sm:bottom-auto sm:top-20 sm:mx-auto sm:max-w-xl sm:max-h-[70vh] sm:rounded-xl sm:border sm:shadow-lg">
                        {/* Input row */}
                        <div className="flex items-center gap-2 px-4 h-14 flex-none border-b border-cool-paper-200 dark:border-charcoal">
                            <SearchIcon className="w-5 h-5 flex-none fill-grey dark:fill-light-grey" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={event => setQuery(event.target.value)}
                                onKeyDown={onInputKeyDown}
                                placeholder={`Search ${brand.label}`}
                                aria-label={`Search ${brand.label}`}
                                role="combobox"
                                aria-expanded={results.length > 0}
                                aria-controls="bds-search-results"
                                aria-activedescendant={
                                    results.length
                                        ? `bds-search-result-${active}`
                                        : undefined
                                }
                                className="flex-1 min-w-0 bg-transparent outline-none text-base text-grey dark:text-white placeholder:text-disabled-text"
                            />
                            <button
                                type="button"
                                onClick={close}
                                aria-label="Close search"
                                className="flex-none w-8 h-8 -mr-1 rounded-lg flex items-center justify-center hover:bg-cool-paper-100 dark:hover:bg-charcoal"
                            >
                                <CloseIcon className="w-5 h-5 fill-grey dark:fill-light-grey" />
                            </button>
                        </div>

                        {/* Results */}
                        <ul
                            id="bds-search-results"
                            role="listbox"
                            aria-label="Search results"
                            className="flex-1 overflow-y-auto overscroll-contain py-2"
                        >
                            {query && results.length === 0 && (
                                <li className="px-4 py-8 text-center text-body-small text-grey dark:text-light-grey">
                                    No results for{' '}
                                    <span className="font-semibold text-navy dark:text-white">
                                        “{query}”
                                    </span>
                                </li>
                            )}
                            {!query && (
                                <li className="px-4 py-8 text-center text-body-small text-disabled-text">
                                    Start typing to search foundations, components
                                    and patterns.
                                </li>
                            )}
                            {results.map((doc, index) => (
                                <li
                                    key={doc.slug || 'overview'}
                                    id={`bds-search-result-${index}`}
                                    role="option"
                                    aria-selected={index === active}
                                >
                                    <Link href={hrefForItem(brand, doc)}>
                                        <a
                                            onMouseEnter={() => setActive(index)}
                                            onClick={dismiss}
                                            className={cx(
                                                'block px-4 py-3',
                                                index === active
                                                    ? 'bg-cool-paper-100 dark:bg-charcoal'
                                                    : 'hover:bg-cool-paper-100 dark:hover:bg-charcoal'
                                            )}
                                        >
                                            <span className="block font-semibold text-navy dark:text-white text-body-small">
                                                {doc.title}
                                            </span>
                                            {doc.summary && (
                                                <span className="block text-caption text-grey dark:text-light-grey">
                                                    {doc.summary}
                                                </span>
                                            )}
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Keyboard hints (desktop) */}
                        <div className="hidden sm:flex flex-none items-center gap-4 px-4 py-2 border-t border-cool-paper-200 dark:border-charcoal text-caption text-disabled-text">
                            <span>↑↓ to navigate</span>
                            <span>↵ to open</span>
                            <span>esc to close</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
