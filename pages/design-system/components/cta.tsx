import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Example,
    PropsTable,
} from '../../../styleguide-components/primitives'
import { ChevronRightIcon } from '../../../components/atoms/icons/ChevronRightIcon'

const toc = [
    { id: 'examples', title: 'Examples' },
    { id: 'props', title: 'Props' },
]

const Cta: NextPageWithLayout = () => (
    <DesignSystemLayout title="CTA" toc={toc}>
        <PageHeader
            eyebrow="Components · Molecules"
            title="CTA"
            status="stable"
            intro="A call-to-action button authored in the CMS. It maps content options — size, variant, icon and alignment — onto the Button class API, so its appearance always matches the Button foundation."
        />

        <Section id="examples" title="Examples">
            <p className="text-grey dark:text-light-grey">
                The CTA renders an anchor styled with the{' '}
                <code className="font-mono text-cyan">.button</code> classes, with an
                optional leading or trailing chevron.
            </p>
            <Example
                caption="Primary CTA with a trailing icon"
                code={`<CtaBlock
  component={{
    text: 'Find a care home',
    href: '/find-a-home',
    size: 'Giant',
    variant: 'Primary',
    iconVariant: 'Right',
    alignment: 'Left',
  }}
/>`}
            >
                <a className="button button--giant" href="#">
                    <span>Find a care home</span>
                    <span>
                        <ChevronRightIcon />
                    </span>
                </a>
            </Example>
            <Example
                caption="Secondary CTA with a leading icon"
                code={`<CtaBlock
  component={{
    text: 'Back to results',
    href: '/search',
    size: 'Standard',
    variant: 'Secondary',
    iconVariant: 'Left',
    alignment: 'Left',
  }}
/>`}
            >
                <a className="button button--secondary" href="#">
                    <span className="rotate-180">
                        <ChevronRightIcon />
                    </span>
                    <span>Back to results</span>
                </a>
            </Example>
        </Section>

        <Section id="props" title="Props">
            <p className="text-grey dark:text-light-grey">
                The component takes a single{' '}
                <code className="font-mono text-cyan">component</code> object sourced
                from Contentful with the following fields:
            </p>
            <PropsTable
                label="Field"
                rows={[
                    { name: 'text', type: 'string', required: true, description: 'The button label. The CTA renders nothing if text or href is missing.' },
                    { name: 'href', type: 'string', required: true, description: 'Destination URL.' },
                    { name: 'size', type: "'Small' | 'Standard' | 'Giant'", default: 'Standard', description: 'Maps to the button size modifier.' },
                    { name: 'variant', type: "'Primary' | 'Secondary' | 'Ghost' | 'Tertiary'", default: 'Primary', description: 'Maps to the button variant modifier.' },
                    { name: 'iconVariant', type: "'Left' | 'Right' | none", description: 'Adds a leading or trailing chevron icon.' },
                    { name: 'alignment', type: "'Left' | 'Center' | 'Right'", default: 'Left', description: 'Horizontal alignment of the button within its container.' },
                ]}
            />
        </Section>
    </DesignSystemLayout>
)

export default Cta
