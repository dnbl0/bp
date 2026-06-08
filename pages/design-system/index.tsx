import Link from 'next/link'
import { ReactNode } from 'react'
import { NextPageWithLayout } from '../../types/nextLayout'
import { DesignSystemLayout } from '../../styleguide-components/DesignSystemLayout'
import {
    SITE_TAGLINE,
    hrefFor,
    navSections,
} from '../../styleguide-components/designSystem.config'
import { brands } from '../../styleguide-components/brands'
import { StatusBadge } from '../../styleguide-components/primitives/StatusBadge'

/* ---- Inline pillar icons (self-contained, inherit currentColor) ---------- */

const iconProps = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
}

const PlayIcon = () => (
    <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M10 9l5 3-5 3V9z" />
    </svg>
)
const LayersIcon = () => (
    <svg {...iconProps}>
        <path d="M12 3l9 5-9 5-9-5 9-5z" />
        <path d="M3 13l9 5 9-5" />
    </svg>
)
const GridIcon = () => (
    <svg {...iconProps}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
)
const PatternsIcon = () => (
    <svg {...iconProps}>
        <circle cx="8" cy="8" r="5" />
        <rect x="12" y="12" width="9" height="9" rx="1.5" />
    </svg>
)
const SlidersIcon = () => (
    <svg {...iconProps}>
        <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
        <circle cx="16" cy="7" r="2" />
        <circle cx="8" cy="17" r="2" />
    </svg>
)
const BookIcon = () => (
    <svg {...iconProps}>
        <path d="M4 5a2 2 0 012-2h12v16H6a2 2 0 00-2 2V5z" />
        <path d="M4 19a2 2 0 012-2h12" />
    </svg>
)

const ArrowIcon = () => (
    <svg
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
)

/* -------------------------------------------------------------------------- */

const sectionItems = (title: string) =>
    navSections.find(section => section.title === title)?.items ?? []

/** The sub-brands surfaced on the home page, sourced from the brand registry. */
const subBrands = brands.filter(brand => !brand.isCore)

const principles = [
    {
        title: 'Single source of truth',
        body: 'Tokens are read live from the production Tailwind theme, so the documentation can never drift from the shipped product.',
    },
    {
        title: 'Built from real components',
        body: 'Every example renders the actual React component in its real runtime — what you see is what ships.',
    },
    {
        title: 'Accessible by default',
        body: 'Colour, type and focus styles are designed to meet WCAG AA, with guidance baked into each page.',
    },
    {
        title: 'Composable',
        body: 'Atoms compose into molecules, blocks and sections following an atomic-design hierarchy.',
    },
]

interface Pillar {
    title: string
    href: string
    description: string
    icon: ReactNode
    meta?: string
}

const pillars: Pillar[] = [
    {
        title: 'Getting started',
        href: hrefFor('getting-started'),
        description:
            'Install, run the docs locally, and learn how to compose pages from tokens and components.',
        icon: <PlayIcon />,
    },
    {
        title: 'Foundations',
        href: hrefFor('foundations/tokens'),
        description:
            'Colour, typography, spacing, elevation, motion and the full design-token reference.',
        icon: <LayersIcon />,
        meta: `${sectionItems('Foundations').length} pages`,
    },
    {
        title: 'Components',
        href: hrefFor('components'),
        description:
            'The production component library, documented and grouped by atomic-design layer.',
        icon: <GridIcon />,
        meta: `${sectionItems('Components').filter(item => item.slug !== 'components').length} components`,
    },
    {
        title: 'Patterns',
        href: hrefFor('patterns'),
        description:
            'Composition patterns plus the larger composite patterns seen across bupa.com.au.',
        icon: <PatternsIcon />,
        meta: `${sectionItems('Patterns').length + sectionItems('Composite patterns').length} patterns`,
    },
    {
        title: 'Primitives',
        href: hrefFor('primitives/form-controls'),
        description:
            'Proposed form controls and UI primitives identified from the wider Bupa site.',
        icon: <SlidersIcon />,
        meta: `${sectionItems('Primitives').length} primitives`,
    },
    {
        title: 'Resources',
        href: hrefFor('resources'),
        description:
            'Figma UI kit, Contentful authoring and how to contribute to the system.',
        icon: <BookIcon />,
    },
]

const DesignSystemHome: NextPageWithLayout = () => (
    <DesignSystemLayout title="Introduction" wide>
        {/* Hero */}
        <section className="py-2 sm:py-6">
            <p className="bds-eyebrow text-cyan">Design system</p>
            <h1 className="mt-3 max-w-3xl text-[2.25rem] sm:text-[3rem] leading-[1.08] tracking-[-0.02em] font-bold text-navy dark:text-white">
                Bupa Design System
            </h1>
            <p className="mt-5 max-w-2xl bds-lead text-grey dark:text-light-grey">
                {SITE_TAGLINE} Living documentation for the foundations, components
                and patterns shared across every Bupa brand — generated from the
                same code that ships to production.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
                <Link href={hrefFor('getting-started')}>
                    <a className="button">Get started</a>
                </Link>
                <Link href={hrefFor('components')}>
                    <a className="button button--secondary">Browse components</a>
                </Link>
            </div>
        </section>

        {/* Pillars */}
        <section className="mt-12">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pillars.map(pillar => (
                    <Link key={pillar.title} href={pillar.href}>
                        <a className="group flex flex-col rounded-2xl border border-cool-paper-200 dark:border-charcoal p-6 bg-white dark:bg-cool-grey hover:border-cyan hover:shadow-depth-hover transition-all">
                            <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-50 dark:bg-charcoal text-cyan">
                                {pillar.icon}
                            </span>
                            <span className="mt-5 flex items-center gap-2 text-heading-s font-semibold text-navy dark:text-white group-hover:text-cyan">
                                {pillar.title}
                                <span className="text-cyan opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                                    <ArrowIcon />
                                </span>
                            </span>
                            <span className="mt-2 flex-1 text-body-small text-grey dark:text-light-grey">
                                {pillar.description}
                            </span>
                            {pillar.meta && (
                                <span className="mt-5 text-caption font-semibold uppercase tracking-wide text-disabled-text">
                                    {pillar.meta}
                                </span>
                            )}
                        </a>
                    </Link>
                ))}
            </div>
        </section>

        {/* Brands */}
        <section className="mt-16">
            <h2 className="bds-h2 text-navy dark:text-white">Brands</h2>
            <p className="mt-2 max-w-2xl text-body-small text-grey dark:text-light-grey">
                Each line of business has its own space for brand-specific
                components, patterns and guidance — all built on the shared
                foundations above. Switch between them any time from the brand
                menu in the header.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {subBrands.map(brand => (
                    <Link key={brand.id} href={brand.basePath}>
                        <a className="group flex flex-col rounded-2xl border border-cool-paper-200 dark:border-charcoal p-6 bg-white dark:bg-cool-grey hover:border-cyan hover:shadow-depth-hover transition-all">
                            <span className="flex items-center justify-between gap-2">
                                <span className="flex items-center gap-2 text-heading-s font-semibold text-navy dark:text-white group-hover:text-cyan">
                                    {brand.label}
                                    <span className="text-cyan opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                                        <ArrowIcon />
                                    </span>
                                </span>
                                <StatusBadge status={brand.status} />
                            </span>
                            <span className="mt-2 flex-1 text-body-small text-grey dark:text-light-grey">
                                {brand.tagline}
                            </span>
                        </a>
                    </Link>
                ))}
            </div>
        </section>

        {/* Principles */}
        <section className="mt-16">
            <h2 className="bds-h2 text-navy dark:text-white">Principles</h2>
            <p className="mt-2 max-w-2xl text-body-small text-grey dark:text-light-grey">
                Four ideas keep the system honest, accessible and easy to build with.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {principles.map(principle => (
                    <div
                        key={principle.title}
                        className="rounded-xl border border-cool-paper-200 dark:border-charcoal p-6 bg-white dark:bg-cool-grey"
                    >
                        <h3 className="text-heading-s font-semibold text-navy dark:text-white">
                            {principle.title}
                        </h3>
                        <p className="mt-2 text-body-small text-grey dark:text-light-grey">
                            {principle.body}
                        </p>
                    </div>
                ))}
            </div>
        </section>

        {/* Built from code */}
        <section className="mt-16 mb-4 rounded-2xl border border-cool-paper-200 dark:border-charcoal bg-cool-paper-50 dark:bg-cool-grey p-6 sm:p-8">
            <h2 className="bds-h2 text-navy dark:text-white">Built from code</h2>
            <p className="mt-3 max-w-3xl text-grey dark:text-light-grey">
                Design tokens are sourced directly from{' '}
                <code className="font-mono text-cyan">tailwind.config.js</code> and the
                CSS custom properties in{' '}
                <code className="font-mono text-cyan">styles/base/typography.css</code>.
                Components are imported from the same{' '}
                <code className="font-mono text-cyan">components/</code> directory used
                by the site, so editing those sources updates this documentation
                automatically — there is nothing to keep in sync by hand.
            </p>
        </section>
    </DesignSystemLayout>
)

export default DesignSystemHome
