import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Example,
    PropsTable,
} from '../../../styleguide-components/primitives'
import { Tabs } from '../../../components/molecules/Tabs'

const toc = [
    { id: 'example', title: 'Example' },
    { id: 'props', title: 'Props' },
    { id: 'accessibility', title: 'Accessibility' },
]

const demoItems = [
    {
        id: 'hospital',
        label: 'Hospital',
        content:
            'Hospital cover pays towards the cost of treatment as an in-patient in hospital.',
    },
    {
        id: 'extras',
        label: 'Extras',
        content:
            'Extras cover helps with everyday health services like dental, optical and physio.',
    },
    {
        id: 'combined',
        label: 'Combined',
        content:
            'Combined cover bundles hospital and extras into a single policy.',
    },
]

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Tabs" toc={toc}>
        <PageHeader
            eyebrow="Components · Molecules"
            title="Tabs"
            status="stable"
            intro="An accessible tabbed panel for organising dense product information — cover details, eligibility, FAQs — without lengthening the page. Follows the WAI-ARIA tabs pattern with full arrow-key navigation."
        />

        <Section id="example" title="Example">
            <Example
                caption="Use the arrow keys to move between tabs"
                code={`<Tabs
  label="Cover types"
  items={[
    { id: 'hospital', label: 'Hospital', content: '…' },
    { id: 'extras', label: 'Extras', content: '…' },
    { id: 'combined', label: 'Combined', content: '…' },
  ]}
/>`}
            >
                <div className="w-full">
                    <Tabs label="Cover types" items={demoItems} />
                </div>
            </Example>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                rows={[
                    {
                        name: 'items',
                        type: 'TabItem[]',
                        required: true,
                        description:
                            'The tabs to render. Each TabItem has an id, label and content.',
                    },
                    {
                        name: 'defaultTabId',
                        type: 'string',
                        description:
                            'The id of the tab selected on first render. Defaults to the first tab.',
                    },
                    {
                        name: 'label',
                        type: 'string',
                        description:
                            'Accessible label for the tab list, announced by screen readers.',
                    },
                ]}
            />
        </Section>

        <Section id="accessibility" title="Accessibility">
            <ul className="list-disc pl-5 space-y-2 text-grey dark:text-light-grey">
                <li>
                    Tabs use a roving tab index: only the active tab is in the
                    tab order, and Arrow Left/Right, Home and End move between
                    tabs.
                </li>
                <li>
                    Each tab is wired to its panel with{' '}
                    <span className="font-mono">aria-controls</span> and{' '}
                    <span className="font-mono">aria-labelledby</span>.
                </li>
                <li>
                    Inactive panels are{' '}
                    <span className="font-mono">hidden</span>, so their content
                    is removed from the accessibility tree and tab order.
                </li>
            </ul>
        </Section>
    </DesignSystemLayout>
)

export default Page
