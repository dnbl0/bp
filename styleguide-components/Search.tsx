import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { SearchIcon } from '../components/atoms/icons/SearchIcon'
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
 * The design system's live search. Filters the page index by title, summary
 * and section keywords with lightweight fuzzy matching, and supports a ⌘K
 * shortcut plus full keyboard navigation of the results.
 */
export const Search = ({ onNavigate }: { onNavigate: () => void }) => {
    const router = useRouter()
    const brand = useBrand()
    const inputRef = useRef<HTMLInputElement>(null)
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

    // ⌘K / Ctrl-K focuses the search from anywhere on the page.
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault()
                inputRef.current?.focus()
            }
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [])

    const close = () => {
        setQuery('')
        onNavigate()
    }

    const go = (doc: NavItem) => {
        router.push(hrefForItem(brand, doc))
        inputRef.current?.blur()
        close()
    }

    const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Escape') {
            setQuery('')
            inputRef.current?.blur()
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
            if (doc) go(doc)
        }
    }

    return (
        <div className="relative w-full max-w-md">
            <div className="flex items-center gap-2 px-3 h-10 rounded-lg bg-cool-paper-100 dark:bg-cool-grey border border-cool-paper-200 dark:border-charcoal focus-within:border-cyan">
                <SearchIcon className="w-5 h-5 fill-grey dark:fill-light-grey" />
                <input
                    ref={inputRef}
                    type="search"
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                    onKeyDown={onInputKeyDown}
                    placeholder={`Search ${brand.label}`}
                    aria-label={`Search ${brand.label}`}
                    role="combobox"
                    aria-expanded={results.length > 0}
                    aria-controls="bds-search-results"
                    aria-activedescendant={
                        results.length ? `bds-search-result-${active}` : undefined
                    }
                    className="w-full bg-transparent outline-none text-body-small text-grey dark:text-white placeholder:text-disabled-text"
                />
                <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 h-6 rounded border border-cool-paper-200 dark:border-charcoal text-caption text-disabled-text font-sans">
                    ⌘K
                </kbd>
            </div>
            {results.length > 0 && (
                <ul
                    id="bds-search-results"
                    role="listbox"
                    className="absolute z-dropdown mt-2 w-full max-h-96 overflow-y-auto rounded-lg bg-white dark:bg-cool-grey border border-cool-paper-200 dark:border-charcoal shadow"
                >
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
                                    onClick={close}
                                    className={cx(
                                        'block px-4 py-2',
                                        index === active
                                            ? 'bg-cool-paper-100 dark:bg-charcoal'
                                            : 'hover:bg-cool-paper-100 dark:hover:bg-charcoal'
                                    )}
                                >
                                    <span className="block font-semibold text-navy dark:text-white text-body-small">
                                        {doc.title}
                                    </span>
                                    {doc.summary && (
                                        <span className="block text-caption text-grey dark:text-light-grey truncate">
                                            {doc.summary}
                                        </span>
                                    )}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
