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
import { ChevronDownIcon } from '../../../components/atoms/icons/ChevronDownIcon'
import { CallBackIcon } from '../../../components/atoms/icons/CallBackIcon'
import { promotionCardDefaultSpecs } from '../../../styleguide-components/specs/promotion-card.specs'

const toc = [
    { id: 'example', title: 'Example' },
    { id: 'specifications', title: 'Visual Specifications' },
    { id: 'props', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

const PromotionCard: NextPageWithLayout = () => (
    <DesignSystemLayout title="Promotion card" toc={toc}>
        <PageHeader
            eyebrow="Components · Molecules"
            title="Promotion card"
            status="stable"
            intro="A light cyan, cyan-bordered card for campaigns and offers. It pairs an optional icon with a heading, markdown body and a tertiary action, laying out as a row on wider screens."
        />

        <ComponentHero name="PromotionCardBlock" />

        <Section id="example" title="Example">
            <Example
                surface="tinted"
                code={`<div className="text-navy p-6 rounded flex flex-wrap gap-6 bg-cyan-50 border border-cyan md:items-end flex-col md:flex-row max-w-lg">
    <div className="shrink-0">
        <CallBackIcon className="w-12 h-12 fill-cyan" />
    </div>
    <div className="flex flex-col gap-y-3 flex-1 min-w-[11rem]">
        <h2 className="text-heading-s font-medium">
            Not sure where to start?
        </h2>
        <p className="text-body text-grey">
            Request a call back and our team will help you understand your
            options.
        </p>
        <a className="button button--tertiary px-0" href="#">
            <span>Request a call back</span>
            <span className="-rotate-90">
                <ChevronDownIcon className="fill-current" />
            </span>
        </a>
    </div>
</div>`}
            >
                <div className="text-navy p-6 rounded flex flex-wrap gap-6 bg-cyan-50 border border-cyan md:items-end flex-col md:flex-row max-w-lg">
                    <div className="shrink-0">
                        <CallBackIcon className="w-12 h-12 fill-cyan" />
                    </div>
                    <div className="flex flex-col gap-y-3 flex-1 min-w-[11rem]">
                        <h2 className="text-heading-s font-medium">
                            Not sure where to start?
                        </h2>
                        <p className="text-body text-grey">
                            Request a call back and our team will help you understand your
                            options.
                        </p>
                        <a className="button button--tertiary px-0" href="#">
                            <span>Request a call back</span>
                            <span className="-rotate-90">
                                <ChevronDownIcon className="fill-current" />
                            </span>
                        </a>
                    </div>
                </div>
            </Example>
        </Section>

        <Section id="specifications" title="Visual Specifications">
            <p className="text-grey dark:text-light-grey">
                Component visual specifications for sizing, spacing and colors.
            </p>
            <Specifications variant="Default" groups={[promotionCardDefaultSpecs]} withTable>
                <div className="text-navy p-6 rounded flex flex-wrap gap-6 bg-cyan-50 border border-cyan md:items-end flex-col md:flex-row max-w-lg">
                    <div className="shrink-0">
                        <CallBackIcon className="w-12 h-12 fill-cyan" />
                    </div>
                    <div className="flex flex-col gap-y-3 flex-1 min-w-[11rem]">
                        <h2 className="text-heading-s font-medium">
                            Not sure where to start?
                        </h2>
                        <p className="text-body text-grey">
                            Request a call back and our team will help you understand your
                            options.
                        </p>
                        <a className="button button--tertiary px-0" href="#">
                            <span>Request a call back</span>
                            <span className="-rotate-90">
                                <ChevronDownIcon className="fill-current" />
                            </span>
                        </a>
                    </div>
                </div>
            </Specifications>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                label="Field"
                rows={[
                    { name: 'heading', type: 'string', description: 'Card heading (a headingOverride prop can replace it).' },
                    { name: 'body', type: 'string (markdown)', description: 'Body content rendered through MarkdownBlock.' },
                    { name: 'buttonText / buttonHref', type: 'string', description: 'The action link.' },
                    { name: 'icon / iconSize', type: 'CmsImage / number', description: 'Optional leading icon and its size.' },
                    { name: 'iconPosition', type: "'top' | 'center' | 'bottom'", description: 'Vertical alignment of the icon within the card.' },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Use one promotion card to surface a single offer with a clear tertiary action.">
                    <div className="text-navy p-4 rounded flex gap-3 bg-cyan-50 border border-cyan items-center max-w-[12rem]">
                        <CallBackIcon className="w-8 h-8 fill-cyan shrink-0" />
                        <div className="flex flex-col gap-y-1">
                            <h2 className="text-sm font-medium">Not sure where to start?</h2>
                            <a className="button button--tertiary px-0" href="#">
                                <span>Request a call back</span>
                            </a>
                        </div>
                    </div>
                </Do>
                <Dont note="Don't reuse the campaign cyan styling for routine content — it dilutes its promotional signal.">
                    <div className="text-navy p-4 rounded flex gap-3 bg-cyan-50 border border-cyan items-center max-w-[12rem]">
                        <CallBackIcon className="w-8 h-8 fill-cyan shrink-0" />
                        <div className="flex flex-col gap-y-1">
                            <h2 className="text-sm font-medium">Opening hours</h2>
                            <p className="text-body text-grey">Mon–Fri, 9am–5pm.</p>
                        </div>
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default PromotionCard
