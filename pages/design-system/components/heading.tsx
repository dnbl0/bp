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
    Anatomy,
} from '../../../styleguide-components/primitives'

const toc = [
    { id: 'anatomy', title: 'Anatomy' },
    { id: 'sizes', title: 'Sizes' },
    { id: 'props', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

const Heading: NextPageWithLayout = () => (
    <DesignSystemLayout title="Heading" toc={toc}>
        <PageHeader
            eyebrow="Components · Molecules"
            title="Heading"
            status="stable"
            intro="A standalone section heading authored in the CMS. It exposes three sizes and two weights, and registers a scroll-target anchor so in-page navigation can jump to it."
        />

        <ComponentHero name="HeadingBlock" />

        <Section id="anatomy" title="Anatomy">
            <Anatomy
                parts={[
                    { number: 1, name: 'Eyebrow', description: 'An optional overline label categorising the section.' },
                    { number: 2, name: 'Heading', description: 'The main heading text, sized by its semantic level.' },
                    { number: 3, name: 'Supporting text', description: 'Optional subheading or intro copy beneath the heading.' },
                ]}
            >
                <p className="text-heading-l font-semibold text-navy">Large heading</p>
            </Anatomy>
        </Section>

        <Section id="sizes" title="Sizes">
            <Example
                caption="Small, medium and large at semibold weight"
                code={`<HeadingBlock component={{ text: 'Heading', fontSize: 'Large', fontWeight: 'Semi bold' }} />`}
            >
                <div className="space-y-3">
                    <p className="text-heading-l font-semibold text-navy">Large heading</p>
                    <p className="text-heading-m font-semibold text-navy">Medium heading</p>
                    <p className="text-heading-s font-semibold text-navy">Small heading</p>
                    <p className="text-heading-m font-medium text-navy">Medium, medium weight</p>
                </div>
            </Example>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                label="Field"
                rows={[
                    { name: 'text', type: 'string', required: true, description: 'The heading text.' },
                    { name: 'fontSize', type: "'Small' | 'Medium' | 'Large'", default: 'Small', description: 'Maps to text-heading-s / -m / -l.' },
                    { name: 'fontWeight', type: "'Medium' | 'Semi bold'", default: 'Semi bold', description: 'Maps to font-medium / font-semibold.' },
                    { name: 'anchorId', type: 'string', description: 'Scroll-target id; falls back to a slug of the text.' },
                    { name: 'addTopMargin', type: 'boolean', description: 'Adds mt-12 above the heading.' },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Step heading sizes down with the content hierarchy so larger sizes signal more important sections.">
                    <div className="space-y-2">
                        <p className="text-heading-l font-semibold text-navy">Our homes</p>
                        <p className="text-heading-s font-semibold text-navy">Find a home near you</p>
                    </div>
                </Do>
                <Dont note="Don't size a subsection heading larger than the section it sits under — it breaks the reading order.">
                    <div className="space-y-2">
                        <p className="text-heading-s font-semibold text-navy">Our homes</p>
                        <p className="text-heading-l font-semibold text-navy">Find a home near you</p>
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Heading
