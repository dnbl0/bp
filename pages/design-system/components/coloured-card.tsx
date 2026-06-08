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
import { ChevronRightIcon } from '../../../components/atoms/icons/ChevronRightIcon'
import { cx } from '../../../utils/cx'
import { colouredCardDefaultSpecs } from '../../../styleguide-components/specs/coloured-card.specs'

const DemoCard = ({
    bg = 'bg-cyan',
    white = false,
}: {
    bg?: string
    white?: boolean
}) => (
    <div
        className={cx(
            'p-6 rounded flex flex-col gap-6 flex-1 max-w-sm',
            white ? 'border border-lighter-grey' : 'text-white',
            bg
        )}
    >
        <h3 className={cx('font-semibold text-heading-s', white && 'text-navy')}>
            Support at home
        </h3>
        <p className={white ? 'text-grey' : 'text-white'}>
            Flexible care that helps you stay independent in your own home for longer.
        </p>
        <div className="flex">
            <a
                className={cx('button button--secondary', !white && 'button--inverse')}
                href="#"
            >
                <span>Learn more</span>
                <span>
                    <ChevronRightIcon />
                </span>
            </a>
        </div>
    </div>
)

const toc = [
    { id: 'colours', title: 'Colours' },
    { id: 'layouts', title: 'Body positions' },
    { id: 'specifications', title: 'Visual Specifications' },
    { id: 'props', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

const ColouredCard: NextPageWithLayout = () => (
    <DesignSystemLayout title="Coloured card" toc={toc}>
        <PageHeader
            eyebrow="Components · Molecules"
            title="Coloured card"
            status="stable"
            intro="A card with a configurable background colour, used to group an icon, heading, body and a call to action. On coloured backgrounds the text and button switch to inverse styling; the white variant gains a border."
        />

        <ComponentHero name="ColouredCardBlock" />

        <Section id="colours" title="Colours">
            <p className="text-grey dark:text-light-grey">
                The background is chosen from the CMS colour list (mapped to theme
                colours). Inverse button styling is applied automatically on
                non-white backgrounds.
            </p>
            <Example
                surface="tinted"
                caption="Cyan, teal and white backgrounds"
                code={`<DemoCard bg="bg-cyan" />
<DemoCard bg="bg-teal" />
<DemoCard bg="bg-white" white />`}
            >
                <DemoCard bg="bg-cyan" />
                <DemoCard bg="bg-teal" />
                <DemoCard bg="bg-white" white />
            </Example>
        </Section>

        <Section id="layouts" title="Body positions">
            <p className="text-grey dark:text-light-grey">
                The body can sit below the icon/heading (default), or beside it on the
                left or right at the <code className="font-mono text-cyan">md</code>{' '}
                breakpoint and up.
            </p>
            <Example
                surface="tinted"
                caption="Default bottom layout"
                code={`<DemoCard bg="bg-purple" />`}
            >
                <DemoCard bg="bg-purple" />
            </Example>
        </Section>

        <Section id="specifications" title="Visual Specifications">
            <p className="text-grey dark:text-light-grey">
                Component visual specifications for sizing, spacing and colors.
            </p>
            <Specifications variant="Default" groups={colouredCardDefaultSpecs} withTable>
                <DemoCard bg="bg-cyan" />
            </Specifications>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                label="Field"
                rows={[
                    { name: 'heading', type: 'string', description: 'Card heading, styled by headingSize.' },
                    { name: 'headingSize', type: 'string', description: 'Header style applied to the heading.' },
                    { name: 'body / bodyRichText', type: 'string / RichText', description: 'Plain or rich-text body. Plain body takes precedence.' },
                    { name: 'bodyPosition', type: "'left' | 'right' | 'bottom'", default: 'bottom', description: 'Where the body sits relative to the icon/heading.' },
                    { name: 'icon / iconSize', type: 'CmsImage / number', description: 'Optional icon image and its size.' },
                    { name: 'buttonText / buttonHref', type: 'string', description: 'Optional secondary button; both are required to render it.' },
                    { name: 'backgroundColour', type: 'string', default: 'cyan', description: 'CMS colour name mapped to a theme background. "white" gains a border and dark text.' },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Pick a background with enough contrast and let the inverse button styling carry the call to action.">
                    <DemoCard bg="bg-cyan" />
                </Do>
                <Dont note="Don't place more than one button or competing action inside a single card — keep one clear next step.">
                    <DemoCard bg="bg-white" white />
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default ColouredCard
