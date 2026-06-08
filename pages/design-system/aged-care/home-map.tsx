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

/** A static still of the map/list interface (the live component needs Google Maps + CMS data). */
const HomeMapMock = () => (
    <div className="w-full max-w-md overflow-hidden rounded-xl border border-cool-paper-200 bg-white shadow-DEFAULT">
        <div className="flex gap-1 border-b border-cool-paper-200 p-2">
            <span className="rounded-md bg-cyan px-3 py-1.5 text-caption font-semibold text-white">
                Map
            </span>
            <span className="rounded-md px-3 py-1.5 text-caption font-semibold text-grey">
                List
            </span>
            <span className="ml-auto rounded-md border border-cool-paper-200 px-3 py-1.5 text-caption text-grey">
                NSW ▾
            </span>
        </div>
        <div className="relative h-40 bg-cool-paper-100">
            <span className="absolute left-10 top-10 flex h-7 w-7 items-center justify-center rounded-full bg-cyan text-caption font-semibold text-white">
                4
            </span>
            <span className="absolute left-28 top-20 flex h-7 w-7 items-center justify-center rounded-full bg-cyan text-caption font-semibold text-white">
                7
            </span>
            <span className="absolute right-12 top-14 flex h-7 w-7 items-center justify-center rounded-full bg-navy text-caption font-semibold text-white">
                2
            </span>
        </div>
    </div>
)

const HomeMap: NextPageWithLayout = () => (
    <DesignSystemLayout title="Home finder map" toc={toc}>
        <PageHeader
            eyebrow="Aged Care · Component"
            title="Home finder map"
            status="stable"
            intro="An interactive map and list of Bupa care-home locations. Families filter by state and region, switch between a map and a list view, and jump straight to a home's detail page."
        />

        <Section id="overview" title="Overview">
            <p className="text-grey dark:text-light-grey">
                The home finder is the primary discovery surface for aged care. It
                renders every care home as a clustered marker on a Google Map, with
                a synchronised list panel for browsing by name. State and region
                buttons reframe the view, and the user's location can centre the
                map when permission is granted.
            </p>
            <p className="mt-3 text-grey dark:text-light-grey">
                Implemented by{' '}
                <code className="font-mono text-cyan">
                    components/molecules/blocks/AgedCareHomeMapBlock/
                </code>{' '}
                — a directory of sub-components (list panel, map panel, tab control,
                state buttons and location hooks).
            </p>
        </Section>

        <Section id="anatomy" title="Anatomy">
            <Anatomy
                parts={[
                    {
                        number: 1,
                        name: 'View toggle',
                        description:
                            'Switches between the map and the list of homes for the current filter.',
                    },
                    {
                        number: 2,
                        name: 'State / region filter',
                        description:
                            'Reframes the map and list to a chosen state or region.',
                    },
                    {
                        number: 3,
                        name: 'Clustered markers',
                        description:
                            'Care homes grouped by proximity; a cluster expands as you zoom in.',
                    },
                ]}
            >
                <HomeMapMock />
            </Anatomy>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                rows={[
                    {
                        name: 'component',
                        type: 'CmsAgedCareHomeMap',
                        required: true,
                        description:
                            'The map block entry from Contentful (headings, copy and configuration).',
                    },
                ]}
            />
            <p className="mt-6 mb-3 text-body-small font-semibold text-navy dark:text-white">
                Page data it consumes
            </p>
            <PropsTable
                label="Source"
                rows={[
                    {
                        name: 'agedCareHomesSummary',
                        type: 'AgedCareHomeSummary[]',
                        description:
                            'Every home with its coordinates, slug, image and address — the markers and list items.',
                    },
                    {
                        name: 'agedCareHomeLocationTags',
                        type: 'AgedCareHomeLocationTag[]',
                        description:
                            'State/region tags, each listing the home IDs it contains — drives the filter buttons.',
                    },
                ]}
            />
        </Section>

        <Section id="usage" title="Usage">
            <ul className="list-disc space-y-2 pl-5 text-grey dark:text-light-grey">
                <li>
                    Summaries and location tags are built once per request by{' '}
                    <code className="font-mono text-cyan">
                        lib/requestAgedCareHomeData
                    </code>{' '}
                    and passed down as global page data.
                </li>
                <li>
                    Requires a Google Maps API key; clustering uses{' '}
                    <code className="font-mono text-cyan">supercluster</code>.
                </li>
                <li>
                    Default to the list view on first paint for accessibility and
                    for users who deny location access.
                </li>
            </ul>
            <p className="mt-4 text-body-small text-grey dark:text-light-grey">
                Reference rendering:
            </p>
            <CodeBlock
                code={`import { AgedCareHomeMapBlock } from '@/components/molecules/blocks/AgedCareHomeMapBlock/AgedCareHomeMapBlock'

<AgedCareHomeMapBlock component={mapBlockEntry} />`}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Keep the map and list in sync so the same homes appear in both views.">
                    <span className="text-body-small text-grey">
                        Map ⇄ List, one filtered set
                    </span>
                </Do>
                <Dont note="Don't make the map the only way to browse — always offer the accessible list.">
                    <span className="text-body-small text-grey">
                        Map-only, no list fallback
                    </span>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default HomeMap
