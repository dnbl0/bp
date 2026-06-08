import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { ComponentHero } from '../../../styleguide-components/componentPreviews'
import {
    PageHeader,
    Section,
    Example,
    PropsTable,
    Do,
    Dont,
    DoDontGrid,
    Specifications,
    Anatomy,
} from '../../../styleguide-components/primitives'
import { Badge } from '../../../components/atoms/Badge'
import {
    badgeDefaultSpecs,
    badgeSuccessSpecs,
    badgeWarningSpecs,
    badgeErrorSpecs,
} from '../../../styleguide-components/specs/badge.specs'

const toc = [
    { id: 'anatomy', title: 'Anatomy' },
    { id: 'examples', title: 'Examples' },
    { id: 'props', title: 'Props' },
    { id: 'specifications', title: 'Visual Specifications' },
    { id: 'guidance', title: 'Guidance' },
    { id: 'guidelines', title: 'Guidelines' },
]

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Badge" toc={toc}>
        <PageHeader
            eyebrow="Components · Atoms"
            title="Badge"
            status="stable"
            intro="A small, non-interactive label that communicates status, category or recognition — for example a “New” flag, an availability state, or a Canstar award mark. Unlike a Tag, a Badge never links anywhere."
        />

        <ComponentHero name="Badge" />

        <Section id="anatomy" title="Anatomy">
            <Anatomy
                parts={[
                    { number: 1, name: 'Container', description: 'The compact pill that holds the badge content.' },
                    { number: 2, name: 'Status dot', description: 'An optional leading dot reinforcing the semantic tone.' },
                    { number: 3, name: 'Label', description: 'One or two words of status or category text.' },
                ]}
            >
                <Badge tone="success" withDot>
                    Active
                </Badge>
            </Anatomy>
        </Section>

        <Section id="examples" title="Examples">
            <Example
                caption="The semantic tones"
                code={`<Badge tone="neutral">Draft</Badge>
<Badge tone="info" withDot>In progress</Badge>
<Badge tone="success" withDot>Active</Badge>
<Badge tone="warning" withDot>Pending</Badge>
<Badge tone="error" withDot>Expired</Badge>
<Badge tone="award">Canstar 2025</Badge>`}
            >
                <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="neutral">Draft</Badge>
                    <Badge tone="info" withDot>
                        In progress
                    </Badge>
                    <Badge tone="success" withDot>
                        Active
                    </Badge>
                    <Badge tone="warning" withDot>
                        Pending
                    </Badge>
                    <Badge tone="error" withDot>
                        Expired
                    </Badge>
                    <Badge tone="award">Canstar 2025</Badge>
                </div>
            </Example>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                rows={[
                    {
                        name: 'children',
                        type: 'ReactNode',
                        required: true,
                        description: 'The short label shown inside the badge.',
                    },
                    {
                        name: 'tone',
                        type: "'neutral' | 'info' | 'success' | 'warning' | 'error' | 'award'",
                        description:
                            'The semantic colour treatment. Defaults to "neutral".',
                    },
                    {
                        name: 'withDot',
                        type: 'boolean',
                        description:
                            'Shows a small leading status dot. Ignored for the "award" tone.',
                    },
                    {
                        name: 'icon',
                        type: 'ReactNode',
                        description:
                            'Optional leading icon rendered before the label.',
                    },
                ]}
            />
        </Section>

        <Section id="specifications" title="Visual Specifications">
            <p className="text-grey dark:text-light-grey">
                Badge sizing and color specifications vary by tone. Click "Show specs" to see detailed measurements.
            </p>

            <h3 className="text-heading-sm font-semibold mt-8 mb-4">Neutral</h3>
            <Specifications variant="Neutral" groups={badgeDefaultSpecs} withTable>
                <Badge tone="neutral">Draft</Badge>
            </Specifications>

            <h3 className="text-heading-sm font-semibold mt-8 mb-4">Success</h3>
            <Specifications variant="Success" groups={badgeSuccessSpecs} withTable>
                <Badge tone="success" withDot>Active</Badge>
            </Specifications>

            <h3 className="text-heading-sm font-semibold mt-8 mb-4">Warning</h3>
            <Specifications variant="Warning" groups={badgeWarningSpecs} withTable>
                <Badge tone="warning" withDot>Pending</Badge>
            </Specifications>

            <h3 className="text-heading-sm font-semibold mt-8 mb-4">Error</h3>
            <Specifications variant="Error" groups={badgeErrorSpecs} withTable>
                <Badge tone="error" withDot>Expired</Badge>
            </Specifications>
        </Section>

        <Section id="guidance" title="Guidance">
            <ul className="list-disc pl-5 space-y-2 text-grey dark:text-light-grey">
                <li>
                    Use a Badge for read-only status or recognition that does
                    not navigate; reach for Tag or Button when the label is a
                    link or action.
                </li>
                <li>
                    Keep the label to one or two words so the pill stays
                    compact.
                </li>
                <li>
                    Don’t rely on colour alone — keep the wording meaningful on
                    its own for colour-blind and screen-reader users.
                </li>
                <li>
                    Use the <span className="font-mono">award</span> tone
                    sparingly, for genuine recognition marks such as a Canstar
                    award.
                </li>
            </ul>
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Keep labels to one or two words and match the tone to its meaning so status reads at a glance.">
                    <Badge tone="success" withDot>
                        Active
                    </Badge>
                </Do>
                <Dont note="Don't pack a sentence into a badge — use body text for anything longer than a couple of words.">
                    <Badge tone="warning" withDot>
                        Your application is currently pending review
                    </Badge>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Page
