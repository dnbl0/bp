import Link from 'next/link'
import { NextPageWithLayout } from '../../types/nextLayout'
import { DesignSystemLayout } from '../../styleguide-components/DesignSystemLayout'
import {
    hrefFor,
    navSections,
} from '../../styleguide-components/designSystem.config'
import { brands } from '../../styleguide-components/brands'
import { StatusBadge } from '../../styleguide-components/primitives/StatusBadge'

/* ---- Icons ---------------------------------------------------------------- */

const iconProps = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
}

const PlayIcon    = () => <svg {...iconProps}><circle cx="12" cy="12" r="9" /><path d="M10 9l5 3-5 3V9z" /></svg>
const LayersIcon  = () => <svg {...iconProps}><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></svg>
const GridIcon    = () => <svg {...iconProps}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
const PatternsIcon= () => <svg {...iconProps}><circle cx="8" cy="8" r="5" /><rect x="12" y="12" width="9" height="9" rx="1.5" /></svg>
const SlidersIcon = () => <svg {...iconProps}><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></svg>
const BookIcon    = () => <svg {...iconProps}><path d="M4 5a2 2 0 012-2h12v16H6a2 2 0 00-2 2V5z" /><path d="M4 19a2 2 0 012-2h12" /></svg>
const ChevronRight= () => <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>

/* -------------------------------------------------------------------------- */

const sectionItems = (title: string) =>
    navSections.find(s => s.title === title)?.items ?? []

const subBrands = brands.filter(brand => !brand.isCore)

const brandIconMap: Record<string, string> = {
    'health-care':        '/brand-assets/bupa-brand-icons/health-care/health-care.png',
    'dental':             '/brand-assets/bupa-brand-icons/dental/dental.png',
    'aged-care':          '/brand-assets/bupa-brand-icons/aged-care/aged-care.png',
    'corporate-business': '/brand-assets/bupa-brand-icons/corporate/corporate.png',
    'vision':             '/brand-assets/bupa-brand-icons/optical/optical.png',
}

const pillars = [
    {
        title: 'Getting started',
        href: hrefFor('getting-started'),
        icon: <PlayIcon />,
        meta: null,
    },
    {
        title: 'Foundations',
        href: hrefFor('foundations/tokens'),
        icon: <LayersIcon />,
        meta: `${sectionItems('Foundations').length} pages`,
    },
    {
        title: 'Components',
        href: hrefFor('components'),
        icon: <GridIcon />,
        meta: `${sectionItems('Components').filter(i => i.slug !== 'components').length} components`,
    },
    {
        title: 'Patterns',
        href: hrefFor('patterns'),
        icon: <PatternsIcon />,
        meta: `${sectionItems('Patterns').length + sectionItems('Composite patterns').length} patterns`,
    },
    {
        title: 'Primitives',
        href: hrefFor('primitives/form-controls'),
        icon: <SlidersIcon />,
        meta: `${sectionItems('Primitives').length} primitives`,
    },
    {
        title: 'Resources',
        href: hrefFor('resources'),
        icon: <BookIcon />,
        meta: null,
    },
]

const DesignSystemHome: NextPageWithLayout = () => (
    <DesignSystemLayout title="Introduction" wide>

        {/* ── Hero ── */}
        <section className="py-4 sm:py-10 border-b border-cool-paper-200 dark:border-charcoal">
            <p className="bds-eyebrow text-cyan mb-3">Design system</p>
            <h1 className="text-[2.5rem] sm:text-[3.25rem] leading-[1.06] tracking-[-0.025em] font-bold text-navy dark:text-white">
                Bupa Design System
            </h1>
            <p className="mt-4 max-w-xl text-body text-grey dark:text-light-grey">
                The shared design language behind every Bupa brand — tokens, components and patterns, all generated from production code.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
                <Link href={hrefFor('getting-started')}>
                    <a className="button">Get started</a>
                </Link>
                <Link href={hrefFor('components')}>
                    <a className="button button--secondary">Browse components</a>
                </Link>
            </div>
        </section>

        {/* ── Explore ── */}
        <section className="mt-10">
            <h2 className="text-caption font-semibold uppercase tracking-widest text-disabled-text mb-4">Explore</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {pillars.map(pillar => (
                    <Link key={pillar.title} href={pillar.href}>
                        <a className="group flex items-center gap-4 rounded-xl border border-cool-paper-200 dark:border-charcoal px-5 py-4 bg-white dark:bg-cool-grey hover:border-cyan hover:shadow-depth-hover transition-all">
                            <span className="flex-none flex items-center justify-center w-9 h-9 rounded-lg bg-cyan-50 dark:bg-charcoal text-cyan">
                                {pillar.icon}
                            </span>
                            <span className="flex-1 min-w-0">
                                <span className="block font-semibold text-navy dark:text-white group-hover:text-cyan transition-colors">
                                    {pillar.title}
                                </span>
                                {pillar.meta && (
                                    <span className="block text-caption text-disabled-text mt-0.5">
                                        {pillar.meta}
                                    </span>
                                )}
                            </span>
                            <span className="flex-none text-disabled-text group-hover:text-cyan transition-colors">
                                <ChevronRight />
                            </span>
                        </a>
                    </Link>
                ))}
            </div>
        </section>

        {/* ── Brands ── */}
        <section className="mt-12 mb-4">
            <h2 className="text-caption font-semibold uppercase tracking-widest text-disabled-text mb-4">Brands</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {subBrands.map(brand => (
                    <Link key={brand.id} href={brand.basePath}>
                        <a className="group flex items-center gap-4 rounded-xl border border-cool-paper-200 dark:border-charcoal px-5 py-4 bg-white dark:bg-cool-grey hover:border-cyan hover:shadow-depth-hover transition-all">
                            {brandIconMap[brand.id] ? (
                                <img
                                    src={brandIconMap[brand.id]}
                                    alt=""
                                    className="flex-none w-9 h-9 rounded-lg object-contain"
                                />
                            ) : (
                                <span className="flex-none w-9 h-9 rounded-lg bg-cyan-50 dark:bg-charcoal" />
                            )}
                            <span className="flex-1 min-w-0">
                                <span className="block font-semibold text-navy dark:text-white group-hover:text-cyan transition-colors">
                                    {brand.label}
                                </span>
                            </span>
                            <span className="flex items-center gap-2">
                                <StatusBadge status={brand.status} />
                                <span className="flex-none text-disabled-text group-hover:text-cyan transition-colors">
                                    <ChevronRight />
                                </span>
                            </span>
                        </a>
                    </Link>
                ))}
            </div>
        </section>

    </DesignSystemLayout>
)

export default DesignSystemHome
