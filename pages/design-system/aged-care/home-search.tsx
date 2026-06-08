import Link from 'next/link'
import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    Anatomy,
    CodeBlock,
    Do,
    Dont,
    DoDontGrid,
    PageHeader,
    PropsTable,
    Section,
} from '../../../styleguide-components/primitives'

const toc = [
    { id: 'overview', title: 'Overview' },
    { id: 'anatomy', title: 'Anatomy' },
    { id: 'props', title: 'Props' },
    { id: 'usage', title: 'Usage' },
    { id: 'guidelines', title: 'Guidelines' },
]

/** A static still of the home-search hero (the live component needs CMS + Google Places). */
const HomeSearchMock = () => (
    <div className="w-full max-w-md overflow-hidden rounded-xl border border-cool-paper-200 bg-navy p-5 shadow-DEFAULT">
        <p className="text-caption font-semibold uppercase tracking-wide text-cyan-200">
            Find a Bupa care home
        </p>
        <p className="mt-1 text-heading-s font-semibold text-white">
            Caring for what matters most
        </p>
        <div className="mt-4 rounded-lg bg-white p-4">
            <p className="text-body-small font-medium text-navy">
                Search by suburb, postcode or home name
            </p>
            <div className="mt-2 flex">
                <span className="flex-1 rounded-l-lg border-2 border-r-0 border-cool-paper-200 px-3 py-2 text-body-small text-disabled-text">
                    e.g. Mosman, 2088
                </span>
                <span className="rounded-r-lg bg-cyan px-4 py-2 text-body-small font-semibold text-white">
                    Search
                </span>
            </div>
            <ul className="mt-1 rounded-b-lg border-x border-b border-cool-paper-200 text-body-small">
                <li className="px-3 py-1.5 text-caption font-semibold uppercase tracking-wide text-disabled-text">
                    Homes
                </li>
                <li className="bg-cool-paper-100 px-3 py-1.5 text-navy">Bupa Mosman</li>
                <li className="px-3 py-1.5 text-caption font-semibold uppercase tracking-wide text-disabled-text">
                    Places · Your location
                </li>
            </ul>
        </div>
    </div>
)

const HomeSearch: NextPageWithLayout = () => (
    <DesignSystemLayout title="Home search hero" toc={toc}>
        <PageHeader
            eyebrow="Aged Care · Component"
            title="Home search hero"
            status="stable"
            intro="The hero with an integrated search that opens the find-a-home journey. A family types a suburb, postcode or home name and is taken to matching results — or straight to a home when the name matches exactly."
        />

        <Section id="overview" title="Overview">
            <p className="text-grey dark:text-light-grey">
                This is the primary discovery entry point on the aged-care
                homepage and listing pages. It pairs a full-width hero banner with
                an elevated white search card. The input offers a type-ahead
                dropdown grouped into <strong>Homes</strong>, <strong>Places</strong>{' '}
                (Google Places autocomplete) and <strong>Your location</strong>{' '}
                (geolocation), with full keyboard navigation.
            </p>
            <p className="mt-3 text-grey dark:text-light-grey">
                Implemented by{' '}
                <code className="font-mono text-cyan">
                    components/molecules/sections/SearchHomeHeroSection/
                </code>{' '}
                (with <code className="font-mono text-cyan">LargeSearchInput</code>,{' '}
                <code className="font-mono text-cyan">LocationSearchOptions</code> and the{' '}
                <code className="font-mono text-cyan">usePlacesAutocomplete</code> hook). It
                builds on the shared{' '}
                <Link href="/design-system/components/group-search">
                    <a className="font-semibold text-cyan hover:underline">
                        search components ↗
                    </a>
                </Link>
                .
            </p>
        </Section>

        <Section id="anatomy" title="Anatomy">
            <Anatomy
                parts={[
                    {
                        number: 1,
                        name: 'Hero banner',
                        description:
                            'A full-width background image with the heading and subheading overlaid.',
                    },
                    {
                        number: 2,
                        name: 'Search card',
                        description:
                            'An elevated white card with a call-to-action heading above the input.',
                    },
                    {
                        number: 3,
                        name: 'Large search input',
                        description:
                            'The query field with a submit button; the field is the focus of the page.',
                    },
                    {
                        number: 4,
                        name: 'Type-ahead dropdown',
                        description:
                            'Suggestions grouped into Homes, Places and Your location, navigable by keyboard.',
                    },
                ]}
            >
                <HomeSearchMock />
            </Anatomy>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                rows={[
                    {
                        name: 'component',
                        type: 'CmsSearchHomeHeroSection',
                        required: true,
                        description:
                            'The hero entry from Contentful. The section renders nothing unless searchInputPlaceholder, searchEndpoint and searchButtonText are all set.',
                    },
                ]}
            />
            <p className="mt-6 mb-3 text-body-small font-semibold text-navy dark:text-white">
                Key content fields
            </p>
            <PropsTable
                label="Field"
                rows={[
                    { name: 'heading', type: 'string', description: 'Hero heading (rendered at headerStyle, default H1).' },
                    { name: 'subheading', type: 'string', description: 'Supporting line beneath the heading.' },
                    { name: 'searchCallToAction', type: 'string', description: 'The prompt above the input, e.g. “Find a Bupa care home”.' },
                    { name: 'searchInputPlaceholder', type: 'string', description: 'Placeholder text inside the field. Required.' },
                    { name: 'searchButtonText', type: 'string', description: 'Label on the submit button. Required.' },
                    { name: 'searchEndpoint', type: 'string', description: 'Where the search submits to (the results/map page). Required.' },
                    { name: 'image', type: 'CmsAsset', description: 'The hero background image.' },
                    { name: 'anchorId', type: 'string', description: 'Scroll-target id for in-page navigation.' },
                ]}
            />
        </Section>

        <Section id="usage" title="Usage">
            <ul className="list-disc space-y-2 pl-5 text-grey dark:text-light-grey">
                <li>
                    Submitting routes to <code className="font-mono text-cyan">searchEndpoint</code>{' '}
                    with <code className="font-mono text-cyan">q</code>/type params and the{' '}
                    <code className="font-mono text-cyan">#aged-care-home-map</code> anchor; an
                    exact home-name match routes straight to that home’s page.
                </li>
                <li>
                    Home suggestions come from global page data
                    (<code className="font-mono text-cyan">agedCareHomesSummary</code>); place
                    suggestions from the Google Places API.
                </li>
                <li>
                    Keep the call-to-action specific (“Find a Bupa care home”), not generic
                    (“Search”), so the field’s purpose is unmistakable.
                </li>
            </ul>
            <p className="mt-4 text-body-small text-grey dark:text-light-grey">
                Reference rendering:
            </p>
            <CodeBlock
                code={`import { SearchHomeHeroSection } from '@/components/molecules/sections/SearchHomeHeroSection'

<SearchHomeHeroSection component={heroEntry} />`}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Group suggestions (Homes, Places, Your location) so people can search the way they think.">
                    <span className="text-body-small text-grey">
                        Homes · Places · Your location
                    </span>
                </Do>
                <Dont note="Don't require an exact home name — accept suburbs and postcodes, which is how families search.">
                    <span className="text-body-small text-grey">
                        “Enter exact home name”
                    </span>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default HomeSearch
