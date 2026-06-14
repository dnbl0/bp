import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { PulseLogo } from '../components/atoms/icons/PulseLogo'
import { BurgerIcon } from '../components/atoms/icons/BurgerIcon'
import { CloseIcon } from '../components/atoms/icons/CloseIcon'
import { GitHubIcon } from '../components/atoms/icons/GitHubIcon'
import { FigmaIcon } from '../components/atoms/icons/FigmaIcon'
import { cx } from '../utils/cx'
import {
    BASE_PATH,
    SITE_TITLE,
    githubEditUrl,
    figmaDesignUrl,
} from './designSystem.config'
import { Brand, brandForPath, brandGuidelines, switcherBrands, hrefForItem } from './brands'
import { BrandProvider } from './BrandContext'
import { BrandSwitcher } from './BrandSwitcher'
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
    /**
     * Widen the content column and hide the "On this page" rail — useful for
     * gallery-style pages like the component overview.
     */
    wide?: boolean
    /** Hide the left nav sidebar entirely — used for the homepage. */
    noSidebar?: boolean
    /** Replace the default sticky header with a custom element. */
    customHeader?: ReactNode
}

const THEME_KEY = 'bds-theme'

// The layout remounts on every client-side navigation, which would otherwise
// snap the scrollable sidebar back to the top and force the user to scroll
// down to their place again. Stashing the offset in a module-level variable
// (the module isn't reloaded during SPA navigation) lets us restore it as the
// fresh sidebar mounts, while the page content still resets to the top.
let sidebarScrollTop = 0

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

/** Theme-toggle glyphs — line icons matched to the rest of the icon set. */
const SunIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
    >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
)

const MoonIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
    >
        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
    </svg>
)

const Sidebar = ({
    brand,
    currentPath,
    onNavigate,
}: {
    brand: Brand
    currentPath: string
    onNavigate: () => void
}) => (
    <nav className="pl-0 pr-3 lg:pl-16 py-6 space-y-8" aria-label="Design system">
        {/*
            Brand navigation. The header brand switcher and the brand-guidelines
            label are hidden below `lg` to keep the bar uncluttered on narrow
            screens, so we surface brand switching here in the drawer instead —
            mirroring how the page nav itself moves into the drawer on mobile.
        */}
        <div className="lg:hidden">
            <p className="pl-4 mb-2 text-caption font-bold uppercase tracking-wide text-disabled-text">
                Brands
            </p>
            <ul className="space-y-0.5">
                {[...switcherBrands, brandGuidelines].map(item => {
                    const active = item.id === brand.id
                    return (
                        <li key={item.id}>
                            <Link href={item.basePath}>
                                <a
                                    onClick={onNavigate}
                                    aria-current={active ? 'page' : undefined}
                                    className={cx(
                                        'block pl-4 pr-3 py-2 rounded-lg text-body-small',
                                        active
                                            ? 'bg-cyan-50 dark:bg-charcoal text-cyan font-semibold'
                                            : 'text-grey dark:text-light-grey hover:bg-cool-paper-100 dark:hover:bg-charcoal'
                                    )}
                                >
                                    {item.label}
                                </a>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
        {brand.navSections.map(section => {
            const headingId = `bds-nav-${section.title
                .toLowerCase()
                .replace(/\s+/g, '-')}`
            return (
            <div key={section.title}>
                <p
                    id={headingId}
                    className="pl-4 mb-2 text-caption font-bold uppercase tracking-wide text-disabled-text"
                >
                    {section.title}
                </p>
                <ul className="space-y-0.5" aria-labelledby={headingId}>
                    {section.items.map(item => {
                        const href = hrefForItem(brand, item)
                        const cleanPath = currentPath.split(/[?#]/)[0]
                        const active = cleanPath === href
                            || (item.children?.length
                                ? cleanPath.startsWith(href + '/')
                                : false)

                        return (
                            <li key={href}>
                                <Link href={href}>
                                    <a
                                        onClick={onNavigate}
                                        aria-current={active ? 'page' : undefined}
                                        className={cx(
                                            'flex items-center justify-between gap-2 pl-4 pr-3 py-2 rounded-lg text-body-small',
                                            active
                                                ? 'bg-cyan-50 dark:bg-charcoal text-cyan font-semibold'
                                                : 'text-grey dark:text-light-grey hover:bg-cool-paper-100 dark:hover:bg-charcoal'
                                        )}
                                    >
                                        <span className="flex items-center gap-1.5">
                                            {item.title}
                                            {item.inherited && (
                                                <span
                                                    aria-hidden="true"
                                                    title="Shared from the Bupa core"
                                                    className="text-disabled-text"
                                                >
                                                    ↗
                                                </span>
                                            )}
                                        </span>
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
            )
        })}
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
    wide = false,
    noSidebar = false,
    customHeader,
}: DesignSystemLayoutProps) => {
    const router = useRouter()
    const brand = brandForPath(router.asPath)
    const [dark, toggleTheme] = useTheme()
    const [mobileNavOpen, setMobileNavOpen] = useState(false)
    const closeMobileNav = () => setMobileNavOpen(false)
    const activeId = useScrollSpy(toc.map(entry => entry.id))
    // Restore the saved sidebar scroll offset as the new aside mounts. A ref
    // callback runs during commit, before paint, so there's no visible jump.
    const restoreSidebarScroll = useCallback((node: HTMLElement | null) => {
        if (node) node.scrollTop = sidebarScrollTop
    }, [])
    // Strip the active brand's base path, leading slash and any query/hash to
    // recover the brand-relative page slug (e.g. `components/button`), used by
    // breadcrumbs and the prev/next pager.
    const slug = router.asPath
        .replace(brand.basePath, '')
        .split(/[?#]/)[0]
        .replace(/^\//, '')
    // The path of the page file under pages/design-system, used for the GitHub
    // edit link. For a sub-brand this includes the brand segment.
    const editPath = brand.isCore
        ? slug
        : slug
          ? `${brand.id}/${slug}`
          : `${brand.id}/index`

    return (
        <BrandProvider value={brand}>
        <div className={cx('bds-root', dark && 'dark')}>
            <Head>
                <title>{`${title} · ${brand.title}`}</title>
                <meta name="robots" content="noindex" />
                <meta name="description" content={brand.tagline} />
            </Head>
            <div className="min-h-screen bg-white dark:bg-grey text-grey dark:text-light-grey">
                {/* Top bar */}
                {customHeader ?? (
                <header className="sticky top-0 z-header bg-white dark:bg-grey border-b border-cool-paper-200 dark:border-charcoal">
                    <div className="flex items-stretch">
                        {/*
                            Logo zone. On desktop this is exactly the sidebar's
                            width (w-80) so the content zone beside it starts at the
                            same x as the page content — letting the first nav item
                            sit directly above the breadcrumb and heading.
                        */}
                        <div
                            className={cx(
                                'flex items-center gap-4 flex-none px-4 py-3',
                                noSidebar ? 'lg:px-16' : 'lg:w-80 lg:px-16'
                            )}
                        >
                            {/* Mobile burger */}
                            <button
                                type="button"
                                className="flex h-9 w-9 flex-none items-center justify-center rounded-lg hover:bg-cool-paper-100 dark:hover:bg-charcoal lg:hidden"
                                onClick={() => setMobileNavOpen(open => !open)}
                                aria-label="Toggle navigation"
                                aria-expanded={mobileNavOpen}
                            >
                                {mobileNavOpen ? (
                                    <CloseIcon className="h-6 w-6 fill-navy dark:fill-white" />
                                ) : (
                                    <BurgerIcon className="h-6 w-6 fill-navy dark:fill-white" />
                                )}
                            </button>

                            {/* Logo */}
                            <Link href={BASE_PATH}>
                                <a className="flex-none flex items-center outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-lg">
                                    <PulseLogo className="h-10 w-10 rounded-md" />
                                </a>
                            </Link>
                        </div>

                        {/*
                            Content-aligned zone. Mirrors the body wrapper
                            (mx-auto max-w-[1400px] + lg:px-12) so the nav's left
                            edge tracks the page content's left edge at every width.
                            The -ml-3 cancels the first link's px-3 so its text — not
                            its hover padding — aligns with the content below.
                        */}
                        <div className="flex-1 min-w-0">
                            <div className="mx-auto flex w-full max-w-[1400px] items-center gap-6 px-4 lg:px-12 py-3">
                                {/* Nav links */}
                                <nav className="hidden lg:flex items-center gap-1 lg:-ml-3" aria-label="Main">
                                    {([
                                        { label: 'Getting Started', href: `${BASE_PATH}/getting-started` },
                                        { label: 'Foundations',     href: `${BASE_PATH}/foundations/tokens` },
                                        { label: 'Components',      href: `${BASE_PATH}/components` },
                                        { label: 'Accessibility',   href: `${BASE_PATH}/foundations/accessibility` },
                                        { label: 'Brand Toolkit',   href: `${BASE_PATH}/brand/colour` },
                                    ] as const).map(link => (
                                        <Link key={link.href} href={link.href}>
                                            <a className="px-3 py-1.5 text-[14px] font-semibold text-navy dark:text-white whitespace-nowrap rounded-lg hover:bg-cool-paper-100 dark:hover:bg-charcoal transition-colors">
                                                {link.label}
                                            </a>
                                        </Link>
                                    ))}
                                </nav>

                                {/* Right: search + theme toggle */}
                                <div className="flex items-center gap-3 flex-none ml-auto">
                                    <div className="w-56 lg:w-72">
                                        <Search onNavigate={closeMobileNav} />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={toggleTheme}
                                        aria-pressed={dark}
                                        aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
                                        className="flex h-9 w-9 flex-none items-center justify-center rounded-lg text-navy transition-colors hover:bg-cool-paper-100 dark:text-white dark:hover:bg-charcoal"
                                    >
                                        {dark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                )}

                <div className="flex">
                    {/* Sidebar */}
                    {!noSidebar && (
                    <aside
                        ref={restoreSidebarScroll}
                        onScroll={event => {
                            sidebarScrollTop = event.currentTarget.scrollTop
                        }}
                        className={cx(
                            'fixed lg:sticky top-16 z-fixed lg:z-ground h-[calc(100vh-4rem)] w-80 flex-none overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] bg-[#f8f8f8] dark:bg-grey border-r border-cool-paper-200 dark:border-charcoal transition-transform lg:translate-x-0',
                            mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
                        )}
                    >
                        <Sidebar
                            brand={brand}
                            currentPath={router.asPath}
                            onNavigate={closeMobileNav}
                        />
                    </aside>
                    )}

                    {mobileNavOpen && (
                        <div
                            className="fixed inset-0 top-16 z-dropdown bg-black/40 lg:hidden"
                            onClick={closeMobileNav}
                            aria-hidden="true"
                        />
                    )}

                    {/*
                        Content + on-this-page rail are capped and centred in
                        the space to the right of the sidebar, so reading lines
                        stay comfortable on wide screens while the sidebar hugs
                        the viewport's left edge (no dead space beside it).
                    */}
                    <div className="mx-auto flex w-full min-w-0 max-w-[1400px] flex-1">
                    {/* Content */}
                    <main className={cx('flex-1 min-w-0', noSidebar ? 'p-0' : 'px-6 lg:px-12 py-10')}>
                        <div className={cx('bds-prose', noSidebar ? 'w-full' : (wide ? 'max-w-6xl' : 'max-w-3xl'))}>
                            <Breadcrumbs slug={slug} />
                            {children}
                            <PrevNext slug={slug} />
                            {/* Edit links footer */}
                            <div className="mt-12 pt-6 border-t border-cool-paper-200 dark:border-charcoal flex flex-wrap gap-6">
                                <a
                                    href={githubEditUrl(editPath)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-body-small text-grey dark:text-light-grey hover:text-navy dark:hover:text-white transition-colors"
                                    aria-label="Edit this page on GitHub"
                                >
                                    <GitHubIcon className="w-4 h-4 fill-current" />
                                    <span>Edit this page</span>
                                </a>
                                <a
                                    href={figmaDesignUrl()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-body-small text-grey dark:text-light-grey hover:text-navy dark:hover:text-white transition-colors"
                                    aria-label="View the design system in Figma"
                                >
                                    <FigmaIcon className="w-4 h-4 fill-current" />
                                    <span>View in Figma</span>
                                </a>
                            </div>
                        </div>
                    </main>

                    {/* On this page */}
                    {toc.length > 0 && !wide && (
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
        </div>
        </BrandProvider>
    )
}
