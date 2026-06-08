import Link from 'next/link'
import { ReactNode } from 'react'
import { ArrowRight } from '../components/atoms/icons/ArrowRight'
import { core, hrefForItem, hrefForSlug } from './brands'
import { useBrand } from './BrandContext'
import {
    Do,
    Dont,
    DoDontGrid,
    PageHeader,
    Section,
    StatusBadge,
} from './primitives'

/*
    Shared scaffolding for the sub-brand documentation. Each sub-brand currently
    ships a landing page and one representative page; both are placeholders built
    on the shared foundations, to be filled in as each brand's content lands.
*/

const FoundationsCard = () => (
    <Link href={hrefForSlug(core, 'foundations/tokens')}>
        <a className="group flex flex-col rounded-xl border border-cool-paper-200 dark:border-charcoal p-6 bg-white dark:bg-cool-grey hover:border-cyan hover:shadow-depth-hover transition-all">
            <span className="text-heading-s font-semibold text-navy dark:text-white group-hover:text-cyan">
                Shared foundations ↗
            </span>
            <span className="mt-2 flex-1 text-body-small text-grey dark:text-light-grey">
                Colour, typography, spacing, elevation and motion are inherited
                from the Bupa core — this brand does not redefine them.
            </span>
            <span className="mt-4 inline-flex items-center gap-1.5 text-body-small font-semibold text-cyan">
                Open the core foundations
                <ArrowRight className="w-4 h-4 fill-current transition-transform group-hover:translate-x-1" />
            </span>
        </a>
    </Link>
)

/**
 * The landing page shared by every sub-brand. Reads the active brand from
 * context (resolved from the URL by DesignSystemLayout) and surfaces the
 * brand's own representative page alongside the shared foundations.
 */
export const SubBrandLanding = () => {
    const brand = useBrand()
    // The brand's own page that is not the landing itself.
    const ownPage = brand.pagingDocs.find(doc => doc.slug !== '')

    return (
        <>
            <header className="mb-12">
                <p className="text-body-small font-semibold uppercase tracking-wide text-cyan">
                    Sub-brand
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                    <h1 className="text-heading-xl font-bold text-navy dark:text-white">
                        {brand.title}
                    </h1>
                    <StatusBadge status={brand.status} />
                </div>
                <p className="mt-4 max-w-2xl text-heading-s text-grey dark:text-light-grey">
                    {brand.tagline} This space holds the brand-specific
                    components, patterns and guidance that sit on top of the
                    shared Bupa foundations.
                </p>
            </header>

            <Section id="explore" title="Explore">
                <div className="grid gap-5 sm:grid-cols-2">
                    {ownPage && (
                        <Link href={hrefForItem(brand, ownPage)}>
                            <a className="group flex flex-col rounded-xl border border-cool-paper-200 dark:border-charcoal p-6 bg-white dark:bg-cool-grey hover:border-cyan hover:shadow-depth-hover transition-all">
                                <span className="flex items-center justify-between gap-2">
                                    <span className="text-heading-s font-semibold text-navy dark:text-white group-hover:text-cyan">
                                        {ownPage.title}
                                    </span>
                                    {ownPage.status && (
                                        <StatusBadge status={ownPage.status} />
                                    )}
                                </span>
                                <span className="mt-2 flex-1 text-body-small text-grey dark:text-light-grey">
                                    {ownPage.summary}
                                </span>
                                <span className="mt-4 inline-flex items-center gap-1.5 text-body-small font-semibold text-cyan">
                                    Read more
                                    <ArrowRight className="w-4 h-4 fill-current transition-transform group-hover:translate-x-1" />
                                </span>
                            </a>
                        </Link>
                    )}
                    <FoundationsCard />
                </div>
            </Section>

            <Section id="inherits" title="Built on the Bupa core">
                <p className="text-grey dark:text-light-grey">
                    {brand.label} inherits every foundation — colour,
                    typography, spacing, iconography, accessibility — from the{' '}
                    <Link href={core.basePath}>
                        <a className="font-semibold text-cyan hover:underline">
                            Bupa core
                        </a>
                    </Link>
                    . Only the content unique to this brand lives here, so the
                    look and feel stays consistent across every Bupa experience.
                    Use the brand menu in the header to move between brands.
                </p>
            </Section>
        </>
    )
}

/**
 * A placeholder for a sub-brand's representative page. Establishes the standard
 * page furniture (header, sections, do/don't) so the brand-aware sidebar,
 * breadcrumbs, prev/next and search can be verified end-to-end before the real
 * content is written.
 */
export const SubBrandPlaceholder = ({
    title,
    intro,
    children,
}: {
    title: string
    intro: ReactNode
    children?: ReactNode
}) => {
    const brand = useBrand()
    return (
        <>
            <PageHeader
                eyebrow={brand.label}
                title={title}
                status={brand.status}
                intro={intro}
            />

            <Section id="overview" title="Overview">
                <p className="text-grey dark:text-light-grey">
                    This page is a placeholder. The {brand.label} team will
                    document the brand-specific guidance here, composed from the
                    shared components and foundations. Until then, it
                    demonstrates that the brand-aware navigation, breadcrumbs and
                    search all work within {brand.title}.
                </p>
            </Section>

            <Section id="guidance" title="Guidance">
                <DoDontGrid>
                    <Do note="Reuse the shared foundations and components, adding only what is unique to this brand.">
                        <span className="text-body-small text-grey">
                            Shared foundations + brand content
                        </span>
                    </Do>
                    <Dont note="Redefine colour, type or spacing per brand — that breaks the single source of truth.">
                        <span className="text-body-small text-grey">
                            Forked tokens per brand
                        </span>
                    </Dont>
                </DoDontGrid>
            </Section>

            {children}
        </>
    )
}
