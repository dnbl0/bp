import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { ComponentHero } from '../../../styleguide-components/componentPreviews'
import {
    PageHeader,
    Section,
    Example,
    PropsTable,
    Specifications,
} from '../../../styleguide-components/primitives'
import {
    Disclaimer,
    FootnoteRef,
} from '../../../components/molecules/Disclaimer'
import { disclaimerDefaultSpecs } from '../../../styleguide-components/specs/disclaimer.specs'

const toc = [
    { id: 'example', title: 'Example' },
    { id: 'specifications', title: 'Visual Specifications' },
    { id: 'props', title: 'Props' },
    { id: 'usage', title: 'Usage' },
]

const footnotes = [
    {
        marker: '*',
        text: 'Waiting periods apply. A 2-month waiting period applies to most extras services.',
    },
    {
        marker: '^',
        text: 'Canstar Outstanding Value Health Insurance award, 2025. See canstar.com.au for details.',
    },
    {
        marker: '†',
        text: 'Offer available to new members joining eligible cover before 30 June 2026.',
    },
]

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Disclaimer" toc={toc}>
        <PageHeader
            eyebrow="Components · Molecules"
            title="Disclaimer"
            status="stable"
            intro="The site-wide legal disclaimer block: a list of superscript-marked footnotes that terms and pricing throughout a page reference. Pair each footnote with a matching FootnoteRef marker in the body copy. Long blocks can collapse behind a toggle."
        />

        <ComponentHero name="Disclaimer" />

        <Section id="example" title="Example">
            <Example
                surface="tinted"
                caption="A FootnoteRef in copy points at a marker in the collapsible block below"
                code={`<p>
  Outstanding Value award winner<FootnoteRef marker="^" />.
</p>

<Disclaimer
  footnotes={[
    { marker: '*', text: 'Waiting periods apply…' },
    { marker: '^', text: 'Canstar award, 2025…' },
    { marker: '†', text: 'Offer ends 30 June 2026…' },
  ]}
/>`}
            >
                <div className="w-full">
                    <p className="text-grey dark:text-light-grey mb-2">
                        Cover everyday extras
                        <FootnoteRef marker="*" /> and join an award-winning
                        fund
                        <FootnoteRef marker="^" /> before the offer ends
                        <FootnoteRef marker="†" />.
                    </p>
                    <Disclaimer footnotes={footnotes} defaultOpen />
                </div>
            </Example>
        </Section>

        <Section id="specifications" title="Visual Specifications">
            <p className="text-grey dark:text-light-grey">
                Component visual specifications for sizing, spacing and colors.
            </p>
            <Specifications variant="Default" groups={[disclaimerDefaultSpecs]} withTable>
                <Disclaimer footnotes={footnotes} defaultOpen />
            </Specifications>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                rows={[
                    {
                        name: 'footnotes',
                        type: 'Footnote[]',
                        required: true,
                        description:
                            'The marked footnotes. Each has a marker (e.g. "*", "^", "1") and text.',
                    },
                    {
                        name: 'title',
                        type: 'string',
                        default: "'Important information'",
                        description: 'Heading for the block.',
                    },
                    {
                        name: 'collapsible',
                        type: 'boolean',
                        default: 'true',
                        description:
                            'Hides the footnotes behind a show/hide toggle.',
                    },
                    {
                        name: 'defaultOpen',
                        type: 'boolean',
                        default: 'false',
                        description:
                            'When collapsible, whether the block starts open.',
                    },
                ]}
                label="Disclaimer prop"
            />
            <p className="text-grey dark:text-light-grey mt-4">
                The companion <span className="font-mono">FootnoteRef</span>{' '}
                component takes a single{' '}
                <span className="font-mono">marker</span> prop and renders the
                in-copy superscript reference.
            </p>
        </Section>

        <Section id="usage" title="Usage">
            <ul className="list-disc pl-5 space-y-2 text-grey dark:text-light-grey">
                <li>
                    Keep the <span className="font-mono">marker</span> on each{' '}
                    <span className="font-mono">FootnoteRef</span> identical to
                    the one on its matching footnote.
                </li>
                <li>
                    Place the disclaimer near the foot of the page, after the
                    content that references it.
                </li>
                <li>
                    Use the collapsible variant for long legal blocks so they
                    stay out of the way until a reader needs them.
                </li>
            </ul>
        </Section>
    </DesignSystemLayout>
)

export default Page
