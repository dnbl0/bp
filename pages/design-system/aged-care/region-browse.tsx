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
    { id: 'result-card', title: 'Result card' },
    { id: 'props', title: 'Props' },
    { id: 'usage', title: 'Usage' },
    { id: 'guidelines', title: 'Guidelines' },
]

/** A static still of the region result grid. */
const RegionMock = () => (
    <div className="w-full max-w-md">
        <p className="text-heading-s font-semibold text-navy">
            Aged care homes in Queensland
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3">
            {['Bupa New Farm', 'Bupa Clayfield', 'Bupa Carseldine', 'Bupa Tugun'].map(
                name => (
                    <div
                        key={name}
                        className="overflow-hidden rounded-lg border border-cool-paper-200 bg-white"
                    >
                        <div className="h-14 bg-cool-paper-100" />
                        <div className="p-2.5">
                            <span className="block text-body-small font-semibold text-navy">
                                {name}
                            </span>
                            <span className="mt-1 inline-block text-caption font-semibold text-cyan">
                                Visit page →
                            </span>
                        </div>
                    </div>
                )
            )}
        </div>
        <div className="mt-3 flex items-center justify-between">
            <span className="rounded-lg border border-cool-paper-200 px-3 py-1.5 text-caption font-semibold text-navy">
                Load more
            </span>
            <span className="text-caption text-disabled-text">Showing 6 of 8</span>
        </div>
    </div>
)

const RegionBrowse: NextPageWithLayout = () => (
    <DesignSystemLayout title="Region browse" toc={toc}>
        <PageHeader
            eyebrow="Aged Care · Component"
            title="Region browse"
            status="stable"
            intro="The browse-by-region experience: a state or region page that lists its care homes as a grid of result cards, with a three-column search hero at the top for families who arrive without a specific home in mind."
        />

        <Section id="overview" title="Overview">
            <p className="text-grey dark:text-light-grey">
                Region pages let a family explore all the homes in a state or city.
                A three-column hero offers a search alongside two supporting calls
                to action, and below it a responsive grid presents each home as a
                result card. The grid shows six homes initially and reveals the
                rest with a “Load more” control.
            </p>
            <p className="mt-3 text-grey dark:text-light-grey">
                Implemented by{' '}
                <code className="font-mono text-cyan">
                    components/molecules/sections/RegionListDetailSection.tsx
                </code>{' '}
                and{' '}
                <code className="font-mono text-cyan">ThreeColumnSearchHeroSection.tsx</code>.
                The result card is an{' '}
                <Link href="/design-system/components/image-card">
                    <a className="font-semibold text-cyan hover:underline">
                        Image card ↗
                    </a>
                </Link>{' '}
                in its skeleton variant.
            </p>
        </Section>

        <Section id="anatomy" title="Anatomy">
            <Anatomy
                parts={[
                    {
                        number: 1,
                        name: 'Three-column search hero',
                        description:
                            'A search column plus two CTA columns (4+4+4) at the top of the region page.',
                    },
                    {
                        number: 2,
                        name: 'Region heading',
                        description: 'Names the state or region the homes belong to.',
                    },
                    {
                        number: 3,
                        name: 'Result grid',
                        description:
                            'A responsive three-up grid of care-home result cards.',
                    },
                    {
                        number: 4,
                        name: 'Load more + count',
                        description:
                            'Reveals the remaining homes; shows “Showing 6 of N”.',
                    },
                ]}
            >
                <RegionMock />
            </Anatomy>
        </Section>

        <Section id="result-card" title="Result card">
            <p className="text-grey dark:text-light-grey">
                Each home is mapped to an image card via{' '}
                <code className="font-mono text-cyan">createImageCard</code>: the
                home’s name becomes the heading, the first gallery image becomes
                the thumbnail, and the button is a fixed{' '}
                <strong>“Visit page”</strong> link to the home’s detail page. Keep
                the card minimal — image, name, one action — so a long region list
                stays scannable.
            </p>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                rows={[
                    {
                        name: 'component',
                        type: 'CmsRegionListDetailsSection',
                        required: true,
                        description:
                            'The region entry. Renders nothing when its homes collection is empty.',
                    },
                ]}
            />
            <p className="mt-6 mb-3 text-body-small font-semibold text-navy dark:text-white">
                Key fields
            </p>
            <PropsTable
                label="Field"
                rows={[
                    {
                        name: 'ageCareHomesCollection.items',
                        type: 'CmsAgedCareHomeDetailsTemplate[]',
                        description:
                            'The homes in the region. The first 6 render; the rest appear on “Load more”.',
                    },
                    {
                        name: 'createImageCard(home)',
                        type: 'CmsImageCard',
                        description:
                            'Maps a home → { heading: name, image: gallery[0], buttonText: "Visit page", buttonHref: slug }.',
                    },
                ]}
            />
            <p className="mt-4 text-body-small text-grey dark:text-light-grey">
                The three-column hero (<code className="font-mono text-cyan">ThreeColumnSearchHeroSection</code>)
                takes a <code className="font-mono text-cyan">CmsThreeColumnSearchHomeHeroSection</code>:
                a search column (reusing the same <code className="font-mono text-cyan">LargeSearchInput</code> as the{' '}
                <Link href="/design-system/aged-care/home-search">
                    <a className="font-semibold text-cyan hover:underline">home search hero</a>
                </Link>
                ) plus middle and right CTA columns.
            </p>
        </Section>

        <Section id="usage" title="Usage">
            <ul className="list-disc space-y-2 pl-5 text-grey dark:text-light-grey">
                <li>
                    Used on the state and city pages reached from the{' '}
                    <Link href="/design-system/aged-care/find-a-home">
                        <a className="font-semibold text-cyan hover:underline">
                            find-a-home journey
                        </a>
                    </Link>
                    .
                </li>
                <li>
                    Default to six cards before “Load more” so the page opens fast and
                    isn’t overwhelming.
                </li>
                <li>
                    Keep the result card action consistent (“Visit page”) across every
                    region.
                </li>
            </ul>
            <p className="mt-4 text-body-small text-grey dark:text-light-grey">
                Reference rendering:
            </p>
            <CodeBlock
                code={`import { RegionListDetailSection } from '@/components/molecules/sections/RegionListDetailSection'

<RegionListDetailSection component={regionEntry} />`}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Show a manageable first page of homes with a clear count and Load more.">
                    <span className="text-body-small text-grey">6 cards · Showing 6 of 8</span>
                </Do>
                <Dont note="Don't dump every home in one long, unpaged grid that buries the search hero.">
                    <span className="text-body-small text-grey">All 24 homes at once</span>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default RegionBrowse
