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

/** A static still of the nearby-homes sidebar widget. */
const NearbyMock = () => (
    <div className="w-full max-w-xs rounded-xl border border-cool-paper-200 bg-white p-5 shadow-DEFAULT">
        <p className="text-heading-s font-semibold text-navy">Nearby homes</p>
        <ul className="mt-4 space-y-3">
            {[
                { name: 'Bupa Mosman', km: '3.2 km' },
                { name: 'Bupa Willoughby', km: '5.8 km' },
                { name: 'Bupa Chatswood', km: '7.1 km' },
            ].map(home => (
                <li key={home.name} className="flex items-center gap-3">
                    <span className="h-10 w-10 flex-none rounded-md bg-cool-paper-100" />
                    <span className="min-w-0">
                        <span className="block truncate text-body-small font-semibold text-navy">
                            {home.name}
                        </span>
                        <span className="block text-caption text-grey">
                            {home.km} away
                        </span>
                    </span>
                </li>
            ))}
        </ul>
    </div>
)

const NearbyHomes: NextPageWithLayout = () => (
    <DesignSystemLayout title="Nearby homes" toc={toc}>
        <PageHeader
            eyebrow="Aged Care · Component"
            title="Nearby homes"
            status="stable"
            intro="A compact sidebar widget on a care-home page that surfaces the closest alternative homes by distance, so a family that likes the area but not the specific home can keep exploring."
        />

        <Section id="overview" title="Overview">
            <p className="text-grey dark:text-light-grey">
                Nearby homes keeps a visitor in the funnel when a particular home
                isn't the right fit. It computes the straight-line distance from the
                current home to every other home and lists the closest few with a
                thumbnail, name and distance, each linking to its detail page.
            </p>
            <p className="mt-3 text-grey dark:text-light-grey">
                Implemented by{' '}
                <code className="font-mono text-cyan">
                    components/molecules/blocks/NearbyCardBlock.tsx
                </code>{' '}
                using the{' '}
                <code className="font-mono text-cyan">getDistanceBetweenPoints</code>{' '}
                helper.
            </p>
        </Section>

        <Section id="anatomy" title="Anatomy">
            <Anatomy
                parts={[
                    {
                        number: 1,
                        name: 'Thumbnail',
                        description: 'The nearby home’s lead image, linked to its page.',
                    },
                    {
                        number: 2,
                        name: 'Name',
                        description: 'The home’s name, the primary tap target.',
                    },
                    {
                        number: 3,
                        name: 'Distance',
                        description:
                            'Straight-line distance in kilometres from the current home.',
                    },
                ]}
            >
                <NearbyMock />
            </Anatomy>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                rows={[
                    {
                        name: 'location',
                        type: 'CmsLocation',
                        required: true,
                        description:
                            'The coordinates of the current home, the origin for distance calculations.',
                    },
                    {
                        name: 'nearbyHomes',
                        type: 'CmsAgedCareHomeDetailsTemplateNearbyHomesCollection',
                        required: true,
                        description:
                            'The candidate homes to rank and display, each with a name, image, slug and location.',
                    },
                ]}
            />
        </Section>

        <Section id="usage" title="Usage">
            <ul className="list-disc space-y-2 pl-5 text-grey dark:text-light-grey">
                <li>
                    Lives in the right-hand sidebar of{' '}
                    <code className="font-mono text-cyan">
                        AgedCareHomeDetailsTemplate
                    </code>
                    , below the contact card.
                </li>
                <li>
                    Limit to three or four homes; it is a nudge, not a second
                    search experience.
                </li>
                <li>
                    Distance is straight-line (as the crow flies), not driving
                    distance — label it plainly as “away”.
                </li>
            </ul>
            <p className="mt-4 text-body-small text-grey dark:text-light-grey">
                Reference rendering:
            </p>
            <CodeBlock
                code={`import { NearbyCardBlock } from '@/components/molecules/blocks/NearbyCardBlock'

<NearbyCardBlock location={home.location} nearbyHomes={home.nearbyHomesCollection} />`}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Show a few of the closest homes with clear distances and images.">
                    <span className="text-body-small text-grey">
                        3 homes · 3.2 / 5.8 / 7.1 km
                    </span>
                </Do>
                <Dont note="Don't turn the sidebar into a long, unranked list that competes with the page.">
                    <span className="text-body-small text-grey">
                        20 homes, no distance shown
                    </span>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default NearbyHomes
