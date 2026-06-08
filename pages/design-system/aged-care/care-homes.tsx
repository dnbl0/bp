import Link from 'next/link'
import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { ArrowRight } from '../../../components/atoms/icons/ArrowRight'
import {
    Do,
    Dont,
    DoDontGrid,
    PageHeader,
    Section,
    StatusBadge,
} from '../../../styleguide-components/primitives'
import { useBrand } from '../../../styleguide-components/BrandContext'
import { hrefForSlug } from '../../../styleguide-components/brands'

const toc = [
    { id: 'overview', title: 'Overview' },
    { id: 'journey', title: 'The journey' },
    { id: 'components', title: 'Components' },
    { id: 'patterns', title: 'Patterns' },
    { id: 'guidance', title: 'Guidance' },
]

const journey = [
    {
        title: 'Discover',
        body: 'A prospective resident or their family lands from search or a campaign and looks for care near them.',
    },
    {
        title: 'Find & compare',
        body: 'The home-finder map and the care navigator narrow a region and a level of need down to a shortlist.',
    },
    {
        title: 'Evaluate',
        body: 'The care-home page presents photos, services, pricing and testimonials so a family can judge fit.',
    },
    {
        title: 'Enquire',
        body: 'The contact card and Calendly booking turn an interested visitor into a tour or a phone enquiry.',
    },
]

const components = [
    {
        title: 'Care navigator',
        slug: 'navigator',
        body: 'A guided, multi-step needs assessment that recommends an aged-care pathway.',
    },
    {
        title: 'Home finder map',
        slug: 'home-map',
        body: 'An interactive map and list of care-home locations with state and region filtering.',
    },
    {
        title: 'Pricing calculator',
        slug: 'pricing',
        body: 'The accommodation and care cost estimator with RAD/DAP breakdowns.',
    },
    {
        title: 'Nearby homes',
        slug: 'nearby-homes',
        body: 'A sidebar widget surfacing the closest care homes by distance.',
    },
    {
        title: 'Home search hero',
        slug: 'home-search',
        body: 'The hero with integrated search that opens the find-a-home journey.',
    },
    {
        title: 'Region browse',
        slug: 'region-browse',
        body: 'The browse-by-region grid of result cards with a three-column search hero.',
    },
    {
        title: 'Contact card',
        slug: 'contact-card',
        body: 'The conversion card: phone, hours, address and booking actions.',
    },
    {
        title: 'Header actions',
        slug: 'header-actions',
        body: 'The aged-care CTA cluster in the global header.',
    },
]

const patterns = [
    {
        title: 'Care home page',
        slug: 'home-page',
        body: 'The anatomy of a care-home detail page and how the blocks compose.',
    },
    {
        title: 'Find a care home',
        slug: 'find-a-home',
        body: 'The discovery journey from a region search to a shortlisted home.',
    },
]

const CardGrid = ({
    items,
}: {
    items: { title: string; slug: string; body: string }[]
}) => {
    const brand = useBrand()
    return (
        <div className="grid gap-5 sm:grid-cols-2">
            {items.map(item => (
                <Link key={item.slug} href={hrefForSlug(brand, item.slug)}>
                    <a className="group flex flex-col rounded-xl border border-cool-paper-200 dark:border-charcoal p-6 bg-white dark:bg-cool-grey hover:border-cyan hover:shadow-depth-hover transition-all">
                        <span className="text-heading-s font-semibold text-navy dark:text-white group-hover:text-cyan">
                            {item.title}
                        </span>
                        <span className="mt-2 flex-1 text-body-small text-grey dark:text-light-grey">
                            {item.body}
                        </span>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-body-small font-semibold text-cyan">
                            Read more
                            <ArrowRight className="w-4 h-4 fill-current transition-transform group-hover:translate-x-1" />
                        </span>
                    </a>
                </Link>
            ))}
        </div>
    )
}

const CareHomes: NextPageWithLayout = () => (
    <DesignSystemLayout title="Care homes" toc={toc}>
        <PageHeader
            eyebrow="Aged Care · Overview"
            title="Care homes"
            status="stable"
            intro="The care-home experience end to end — how a family discovers, compares, evaluates and enquires about a Bupa aged-care home, and the brand-specific components and patterns that support each step."
        />

        <Section id="overview" title="Overview">
            <p className="text-grey dark:text-light-grey">
                Aged Care is the most content-rich Bupa sub-brand. Where the core
                system provides the shared foundations and base components, this
                section documents the pieces that only exist for the care-home
                experience: a needs <Link href="/design-system/aged-care/navigator"><a className="font-semibold text-cyan hover:underline">navigator</a></Link>, a
                location <Link href="/design-system/aged-care/home-map"><a className="font-semibold text-cyan hover:underline">map</a></Link>, a{' '}
                <Link href="/design-system/aged-care/pricing"><a className="font-semibold text-cyan hover:underline">pricing calculator</a></Link> and the{' '}
                <Link href="/design-system/aged-care/home-page"><a className="font-semibold text-cyan hover:underline">care-home page</a></Link> template
                that ties them together. Everything here is built from the same
                tokens and accessibility rules as the rest of Bupa.
            </p>
        </Section>

        <Section id="journey" title="The journey">
            <ol className="mt-2 space-y-4">
                {journey.map((step, index) => (
                    <li key={step.title} className="flex gap-4">
                        <span className="flex-none w-8 h-8 rounded-full bg-cyan text-white font-semibold flex items-center justify-center">
                            {index + 1}
                        </span>
                        <div>
                            <p className="font-semibold text-navy dark:text-white">
                                {step.title}
                            </p>
                            <p className="text-body-small text-grey dark:text-light-grey">
                                {step.body}
                            </p>
                        </div>
                    </li>
                ))}
            </ol>
        </Section>

        <Section id="components" title="Components">
            <p className="-mt-2 mb-5 text-grey dark:text-light-grey">
                The brand-specific building blocks behind the care-home
                experience. These are integration-heavy, CMS-driven components —
                each page documents its anatomy, props and usage rather than a
                live demo.
            </p>
            <CardGrid items={components} />
        </Section>

        <Section id="patterns" title="Patterns">
            <p className="-mt-2 mb-5 text-grey dark:text-light-grey">
                How the components compose into complete pages and journeys.
            </p>
            <CardGrid items={patterns} />
        </Section>

        <Section id="guidance" title="Guidance">
            <DoDontGrid>
                <Do note="Lead every care-home journey with location and level of need — the two things a family knows first.">
                    <span className="text-body-small text-grey">
                        Region + need → shortlist
                    </span>
                </Do>
                <Dont note="Don't hide pricing or its conditions; cost is the top question for aged care and must be transparent.">
                    <span className="text-body-small text-grey">
                        Pricing buried below the fold
                    </span>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default CareHomes
