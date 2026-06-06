import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Example,
    PropsTable,
} from '../../../styleguide-components/primitives'
import { Badge } from '../../../components/atoms/Badge'

const toc = [
    { id: 'examples', title: 'Examples' },
    { id: 'props', title: 'Props' },
    { id: 'guidance', title: 'Guidance' },
]

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Badge" toc={toc}>
        <PageHeader
            eyebrow="Components · Atoms"
            title="Badge"
            status="stable"
            intro="A small, non-interactive label that communicates status, category or recognition — for example a “New” flag, an availability state, or a Canstar award mark. Unlike a Tag, a Badge never links anywhere."
        />

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
    </DesignSystemLayout>
)

export default Page
