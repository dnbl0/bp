import Link from 'next/link'
import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    Do,
    Dont,
    DoDontGrid,
    PageHeader,
    Section,
} from '../../../styleguide-components/primitives'

const toc = [
    { id: 'overview', title: 'Overview' },
    { id: 'flow', title: 'The flow' },
    { id: 'components', title: 'Components used' },
    { id: 'guidelines', title: 'Guidelines' },
]

const flow = [
    {
        title: 'Region search',
        body: 'A hero with an integrated search and a row of state/region buttons frames the country down to a place.',
    },
    {
        title: 'Browse results',
        body: 'The home finder map and list present the homes in that region, switchable and filterable.',
    },
    {
        title: 'Shortlist',
        body: 'A family opens promising homes in new tabs, comparing photos, services and pricing.',
    },
    {
        title: 'Decide',
        body: 'On a care-home page, the contact card and pricing calculator convert interest into an enquiry.',
    },
]

const FindAHome: NextPageWithLayout = () => (
    <DesignSystemLayout title="Find a care home" toc={toc}>
        <PageHeader
            eyebrow="Aged Care · Pattern"
            title="Find a care home"
            status="in-review"
            intro="The discovery journey that takes a family from “I need care near me” to a shortlist of Bupa care homes, and the components that carry each step."
        />

        <Section id="overview" title="Overview">
            <p className="text-grey dark:text-light-grey">
                Finding a care home is high-stakes and often urgent. This pattern
                keeps the path short and reassuring: start from a place, see what's
                available, and move into evaluation without dead ends. The entry
                point is the{' '}
                <code className="font-mono text-cyan">
                    aged-care-homes/aged-care-australia-by-region
                </code>{' '}
                page, which pairs a search hero with region shortcuts.
            </p>
        </Section>

        <Section id="flow" title="The flow">
            <ol className="mt-2 space-y-4">
                {flow.map((step, index) => (
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

        <Section id="components" title="Components used">
            <p className="text-grey dark:text-light-grey">
                This journey is assembled from existing pieces — it introduces no
                new components, only a sequence:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-grey dark:text-light-grey">
                <li>
                    <Link href="/design-system/aged-care/navigator">
                        <a className="font-semibold text-cyan hover:underline">
                            Care navigator
                        </a>
                    </Link>{' '}
                    — for families unsure what level of care they need.
                </li>
                <li>
                    <Link href="/design-system/aged-care/home-map">
                        <a className="font-semibold text-cyan hover:underline">
                            Home finder map
                        </a>
                    </Link>{' '}
                    — the core browse-by-region surface.
                </li>
                <li>
                    <Link href="/design-system/aged-care/home-page">
                        <a className="font-semibold text-cyan hover:underline">
                            Care home page
                        </a>
                    </Link>{' '}
                    — the evaluation destination.
                </li>
                <li>
                    Shared search, hero and CTA components from the{' '}
                    <Link href="/design-system/components">
                        <a className="font-semibold text-cyan hover:underline">
                            core component library
                        </a>
                    </Link>
                    .
                </li>
            </ul>
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Offer both paths — a direct region search and the guided navigator — from the same entry point.">
                    <span className="text-body-small text-grey">
                        “Search by region” + “Help me choose”
                    </span>
                </Do>
                <Dont note="Don't force every visitor through the navigator before they can see any homes.">
                    <span className="text-body-small text-grey">
                        Mandatory quiz before results
                    </span>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default FindAHome
