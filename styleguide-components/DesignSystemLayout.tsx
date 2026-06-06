import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { SquareBupaLogo } from '../components/atoms/icons/SquareBupaLogo'
import { BurgerIcon } from '../components/atoms/icons/BurgerIcon'
import { CloseIcon } from '../components/atoms/icons/CloseIcon'
import { cx } from '../utils/cx'
import {
    BASE_PATH,
    SITE_TAGLINE,
    SITE_TITLE,
    hrefFor,
    navSections,
} from './designSystem.config'
import { StatusBadge } from './primitives/StatusBadge'
import { Breadcrumbs } from './primitives/Breadcrumbs'
import { PrevNext } from './primitives/PrevNext'
import { Search } from './Search'

export interface TocEntry {
    id: string
    title: string
}

interface DesignSystemLayoutProps {
    children: ReactNode
    /** Page title used in the document <title>. */
    title: string
    /** Anchors for the "On this page" rail. */
    toc?: TocEntry[]
}

const THEME_KEY = 'bds-theme'

/** Highlights the heading currently in view for the "on this page" rail. */
const useScrollSpy = (ids: string[]): string => {
    const [active, setActive] = useState('')

    useEffect(() => {
        if (ids.length === 0) return
        const observer = new IntersectionObserver(
            entries => {
                const visible = entries
                    .filter(entry => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
                if (visible[0]) setActive(visible[0].target.id)
            },
            { rootMargin: '-80px 0px -70% 0px' }
        )
        ids.forEach(id => {
            const element = document.getElementById(id)
            if (element) observer.observe(element)
        })
        return () => observer.disconnect()
    }, [ids])

    return active
}

const useTheme = (): [boolean, () => void] => {
    const [dark, setDark] = useState(false)

    useEffect(() => {
        const stored = window.localStorage.getItem(THEME_KEY)
        const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches
        setDark(stored ? stored === 'dark' : prefers)
    }, [])

    const toggle = () => {
        setDark(prev => {
            const next = !prev
            window.localStorage.setItem(THEME_KEY, next ? 'dark' : 'light')
            return next
        })
    }

    return [dark, toggle]
}

const Sidebar = ({
    currentPath,
    onNavigate,
}: {
    currentPath: string
    onNavigate: () => void
}) => (
    <nav className="px-4 py-6 space-y-8" aria-label="Design system">
        {navSections.map(section => (
            <div key={section.title}>
                <p className="px-3 mb-2 text-caption font-bold uppercase tracking-wide text-disabled-text">
                    {section.title}
                </p>
                <ul className="space-y-0.5">
                    {section.items.map(item => {
                        const href = hrefFor(item.slug)
                        const active = currentPath === href
                        return (
                            <li key={href}>
                                <Link href={href}>
                                    <a
                                        onClick={onNavigate}
                                        aria-current={active ? 'page' : undefined}
                                        className={cx(
                                            'flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-body-small',
                                            active
                                                ? 'bg-cyan-50 dark:bg-charcoal text-cyan font-semibold'
                                                : 'text-grey dark:text-light-grey hover:bg-cool-paper-100 dark:hover:bg-charcoal'
                                        )}
                                    >
                                        {item.title}
                                        {item.status && item.status !== 'stable' && (
                                            <StatusBadge status={item.status} />
                                        )}
                                    </a>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        ))}
    </nav>
)

/**
 * The application shell for the design system documentation: a fixed sidebar,
 * a top bar with live search and a light/dark toggle, and an optional
 * "On this page" rail. Modelled on the Adobe Spectrum documentation site.
 */
export const DesignSystemLayout = ({
    children,
    title,
    toc = [],
}: DesignSystemLayoutProps) => {
    const router = useRouter()
    const [dark, toggleTheme] = useTheme()
    const [mobileNavOpen, setMobileNavOpen] = useState(false)
    const closeMobileNav = () => setMobileNavOpen(false)
    const activeId = useScrollSpy(toc.map(entry => entry.id))
    // Strip the base path, leading slash and any query/hash to recover the
    // page slug used throughout the config (e.g. `components/button`).
    const slug = router.asPath
        .replace(BASE_PATH, '')
        .split(/[?#]/)[0]
        .replace(/^\//, '')

    return (
        <div className={cx(dark && 'dark')}>
            <Head>
                <title>{`${title} · ${SITE_TITLE}`}</title>
                <meta name="robots" content="noindex" />
                <meta name="description" content={SITE_TAGLINE} />
            </Head>
            <div className="min-h-screen bg-white dark:bg-grey text-grey dark:text-light-grey">
                {/* Top bar */}
                <header className="sticky top-0 z-header flex items-center gap-4 h-16 px-4 lg:px-6 bg-white dark:bg-grey border-b border-cool-paper-200 dark:border-charcoal">
                    <button
                        type="button"
                        className="lg:hidden"
                        onClick={() => setMobileNavOpen(open => !open)}
                        aria-label="Toggle navigation"
                    >
                        {mobileNavOpen ? (
                            <CloseIcon className="w-6 h-6 fill-navy dark:fill-white" />
                        ) : (
                            <BurgerIcon className="w-6 h-6 fill-navy dark:fill-white" />
                        )}
                    </button>
                    <Link href={BASE_PATH}>
                        <a className="flex items-center gap-3">
                            <SquareBupaLogo className="w-8 h-8" />
                            <span className="hidden sm:block font-bold text-navy dark:text-white">
                                {SITE_TITLE}
                            </span>
                        </a>
                    </Link>
                    <div className="flex-1 flex justify-center">
                        <Search onNavigate={closeMobileNav} />
                    </div>
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label="Toggle light and dark theme"
                        className="flex-none w-10 h-10 rounded-lg flex items-center justify-center hover:bg-cool-paper-100 dark:hover:bg-charcoal text-xl"
                    >
                        <span aria-hidden="true">{dark ? '☀' : '☾'}</span>
                    </button>
                </header>

                <div className="mx-auto max-w-[1600px] flex">
                    {/* Sidebar */}
                    <aside
                        className={cx(
                            'fixed lg:sticky top-16 z-fixed lg:z-ground h-[calc(100vh-4rem)] w-72 flex-none overflow-y-auto bg-white dark:bg-grey border-r border-cool-paper-200 dark:border-charcoal transition-transform lg:translate-x-0',
                            mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
                        )}
                    >
                        <Sidebar currentPath={router.asPath} onNavigate={closeMobileNav} />
                    </aside>

                    {mobileNavOpen && (
                        <div
                            className="fixed inset-0 top-16 z-dropdown bg-black/40 lg:hidden"
                            onClick={closeMobileNav}
                            aria-hidden="true"
                        />
                    )}

                    {/* Content */}
                    <main className="flex-1 min-w-0 px-6 lg:px-12 py-10">
                        <div className="mx-auto max-w-3xl">
                            <Breadcrumbs slug={slug} />
                            {children}
                            <PrevNext slug={slug} />
                        </div>
                    </main>

                    {/* On this page */}
                    {toc.length > 0 && (
                        <aside className="hidden xl:block w-56 flex-none py-10 pr-6">
                            <div className="sticky top-24">
                                <p className="mb-3 text-caption font-bold uppercase tracking-wide text-disabled-text">
                                    On this page
                                </p>
                                <ul className="space-y-2 border-l border-cool-paper-200 dark:border-charcoal">
                                    {toc.map(entry => {
                                        const active = activeId === entry.id
                                        return (
                                            <li key={entry.id}>
                                                <a
                                                    href={`#${entry.id}`}
                                                    aria-current={active ? 'location' : undefined}
                                                    className={cx(
                                                        'block pl-4 -ml-px border-l text-body-small',
                                                        active
                                                            ? 'border-cyan text-cyan font-semibold'
                                                            : 'border-transparent text-grey dark:text-light-grey hover:border-cyan hover:text-cyan'
                                                    )}
                                                >
                                                    {entry.title}
                                                </a>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </aside>
                    )}
                </div>
            </div>
        </div>
    )
}
