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
} from '../../../styleguide-components/primitives'
import { ComparisonTable } from '../../../components/molecules/ComparisonTable'

const toc = [
    { id: 'example', title: 'Example' },
    { id: 'props', title: 'Props' },
    { id: 'guidance', title: 'Guidance' },
    { id: 'guidelines', title: 'Guidelines' },
]

const columns = [
    { key: 'basic', label: 'Basic' },
    { key: 'mid', label: 'Mid', highlight: true },
    { key: 'top', label: 'Top' },
]

const rows = [
    { feature: 'Ambulance', values: { basic: true, mid: true, top: true } },
    { feature: 'Dental', values: { basic: false, mid: true, top: true } },
    { feature: 'Optical', values: { basic: false, mid: true, top: true } },
    {
        feature: 'Major dental',
        note: '12-month wait',
        values: { basic: false, mid: false, top: true },
    },
    {
        feature: 'Annual limit',
        values: { basic: '$500', mid: '$1,000', top: '$2,000' },
    },
]

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Comparison table" toc={toc}>
        <PageHeader
            eyebrow="Components · Molecules"
            title="Comparison table"
            status="stable"
            intro="A responsive feature-comparison matrix for placing products side by side — for example levels of hospital or extras cover. Booleans render as an accessible tick or dash; any other value renders verbatim, and one column can be highlighted as the recommended option."
        />

        <ComponentHero name="ComparisonTable" />

        <Section id="example" title="Example">
            <Example
                caption="The recommended column is highlighted"
                code={`<ComparisonTable
  caption="Compare extras cover"
  columns={[
    { key: 'basic', label: 'Basic' },
    { key: 'mid', label: 'Mid', highlight: true },
    { key: 'top', label: 'Top' },
  ]}
  rows={[
    { feature: 'Dental', values: { basic: false, mid: true, top: true } },
    { feature: 'Annual limit', values: { basic: '$500', mid: '$1,000', top: '$2,000' } },
  ]}
/>`}
            >
                <div className="w-full">
                    <ComparisonTable
                        caption="Compare extras cover"
                        columns={columns}
                        rows={rows}
                    />
                </div>
            </Example>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                rows={[
                    {
                        name: 'columns',
                        type: 'ComparisonColumn[]',
                        required: true,
                        description:
                            'The columns being compared. Each has a key, label and optional highlight flag.',
                    },
                    {
                        name: 'rows',
                        type: 'ComparisonRow[]',
                        required: true,
                        description:
                            'The feature rows. Each has a feature name, optional note and a values map keyed by column key.',
                    },
                    {
                        name: 'caption',
                        type: 'string',
                        required: true,
                        description:
                            'Accessible caption describing what the table compares; visually hidden.',
                    },
                ]}
            />
        </Section>

        <Section id="guidance" title="Guidance">
            <ul className="list-disc pl-5 space-y-2 text-grey dark:text-light-grey">
                <li>
                    A boolean cell renders an accessible tick (included) or dash
                    (not included); strings and numbers render as written.
                </li>
                <li>
                    Highlight at most one column — the recommended or most
                    popular option.
                </li>
                <li>
                    On narrow screens the table scrolls horizontally; keep
                    column counts modest so it stays readable.
                </li>
            </ul>
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Highlight just one column so the recommended option reads clearly at a glance.">
                    <div className="w-full">
                        <ComparisonTable
                            caption="Highlight one column"
                            columns={[
                                { key: 'basic', label: 'Basic' },
                                { key: 'mid', label: 'Mid', highlight: true },
                            ]}
                            rows={[
                                { feature: 'Dental', values: { basic: false, mid: true } },
                            ]}
                        />
                    </div>
                </Do>
                <Dont note="Don't highlight several columns at once — it removes the visual hierarchy that points to the recommended plan.">
                    <div className="w-full">
                        <ComparisonTable
                            caption="Too many highlights"
                            columns={[
                                { key: 'basic', label: 'Basic', highlight: true },
                                { key: 'mid', label: 'Mid', highlight: true },
                            ]}
                            rows={[
                                { feature: 'Dental', values: { basic: true, mid: true } },
                            ]}
                        />
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Page
