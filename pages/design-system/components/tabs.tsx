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
} from '../../../styleguide-components/primitives'
import { Tabs } from '../../../components/molecules/Tabs'
import { tabsDefaultSpecs } from '../../../styleguide-components/specs/tabs.specs'

const toc = [
    { id: 'example', title: 'Example' },
    { id: 'specifications', title: 'Visual Specifications' },
    { id: 'props', title: 'Props' },
    { id: 'accessibility', title: 'Accessibility' },
    { id: 'guidelines', title: 'Guidelines' },
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

        <ComponentHero name="Tabs" />

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

        <Section id="specifications" title="Visual Specifications">
            <p className="text-grey dark:text-light-grey">
                Component visual specifications for sizing, spacing and colors.
            </p>
            <Specifications variant="Default" groups={[tabsDefaultSpecs]} withTable>
                <div className="w-full">
                    <Tabs label="Cover types" items={demoItems} />
                </div>
            </Specifications>
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

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Keep tab labels to one or two words so the whole set stays on one row.">
                    <div className="w-full">
                        <Tabs
                            label="Cover types"
                            items={[
                                { id: 'hospital', label: 'Hospital', content: 'Hospital cover.' },
                                { id: 'extras', label: 'Extras', content: 'Extras cover.' },
                            ]}
                        />
                    </div>
                </Do>
                <Dont note="Don't bury content a user must always see inside a non-default tab.">
                    <div className="w-full">
                        <Tabs
                            label="Cover types"
                            items={[
                                { id: 'a', label: 'Overview', content: 'Overview.' },
                                { id: 'b', label: 'Important pricing you must read', content: 'Hidden price.' },
                            ]}
                        />
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Page
