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
import { ChevronRightIcon } from '../../../components/atoms/icons/ChevronRightIcon'
import { ImagePlaceholderIcon } from '../../../components/atoms/icons/ImagePlaceholderIcon'

const DemoCard = ({ skeleton = false }: { skeleton?: boolean }) => (
    <div className="rounded px-6 overflow-hidden flex flex-col flex-1 max-w-xs pb-6 gap-6 shadow-depth-default hover:shadow-depth-hover bg-white cursor-pointer">
        <div className="-mx-6 h-[200px] bg-cool-paper-100 flex items-center justify-center">
            <ImagePlaceholderIcon className="w-12 h-12 fill-silver" />
        </div>
        <h3 className="text-heading-s font-semibold text-navy">Respite care</h3>
        {!skeleton && (
            <p className="text-grey">
                Short-term care that gives carers a break while your loved one is
                looked after.
            </p>
        )}
        <div className="flex">
            <a
                className={skeleton ? 'button button--ghost px-0 pb-0' : 'button button--secondary'}
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
    { id: 'types', title: 'Types' },
    { id: 'props', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

const ImageCard: NextPageWithLayout = () => (
    <DesignSystemLayout title="Image card" toc={toc}>
        <PageHeader
            eyebrow="Components · Molecules"
            title="Image card"
            status="stable"
            intro="An image-led content card with a heading, optional body and a call to action. It lifts on hover via the elevation tokens, and the whole card is clickable when a link is set."
        />

        <ComponentHero name="ImageCardBlock" />

        <Section id="types" title="Types">
            <p className="text-grey dark:text-light-grey">
                The <code className="font-mono text-cyan">default</code> type shows
                image, heading, body and a secondary button. The{' '}
                <code className="font-mono text-cyan">skeleton</code> type (used in
                region list/detail) drops the body and uses a ghost button.
            </p>
            <Example
                surface="tinted"
                caption="Default and skeleton"
                code={`<div className="rounded px-6 overflow-hidden flex flex-col flex-1 max-w-xs pb-6 gap-6 shadow-depth-default hover:shadow-depth-hover bg-white cursor-pointer">
    <div className="-mx-6 h-[200px] bg-cool-paper-100 flex items-center justify-center">
        <ImagePlaceholderIcon className="w-12 h-12 fill-silver" />
    </div>
    <h3 className="text-heading-s font-semibold text-navy">Respite care</h3>
    <p className="text-grey">
        Short-term care that gives carers a break while your loved one is
        looked after.
    </p>
    <div className="flex">
        <a className="button button--secondary" href="#">
            <span>Learn more</span>
            <span>
                <ChevronRightIcon />
            </span>
        </a>
    </div>
</div>`}
            >
                <DemoCard />
                <DemoCard skeleton />
            </Example>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                label="Field"
                rows={[
                    { name: 'image', type: 'CmsImage', description: 'Full-bleed image at the top of the card.' },
                    { name: 'heading', type: 'string', description: 'Card heading.' },
                    { name: 'body', type: 'string', description: 'Supporting copy (omitted in the skeleton type).' },
                    { name: 'buttonText / buttonHref', type: 'string', description: 'Call to action; the whole card navigates to buttonHref.' },
                    { name: 'cardBlockType', type: "'default' | 'skeleton'", default: 'default', description: 'Switches the layout and button style.' },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Keep headings short and let the whole card link to a single destination.">
                    <div className="rounded px-4 overflow-hidden flex flex-col pb-4 gap-3 shadow-depth-default bg-white cursor-pointer max-w-[10rem]">
                        <div className="-mx-4 h-16 bg-cool-paper-100 flex items-center justify-center">
                            <ImagePlaceholderIcon className="w-8 h-8 fill-silver" />
                        </div>
                        <h3 className="text-sm font-semibold text-navy">Respite care</h3>
                    </div>
                </Do>
                <Dont note="Don't stack multiple competing links inside a single card.">
                    <div className="rounded px-4 overflow-hidden flex flex-col pb-4 gap-2 shadow-depth-default bg-white cursor-pointer max-w-[10rem]">
                        <div className="-mx-4 h-16 bg-cool-paper-100 flex items-center justify-center">
                            <ImagePlaceholderIcon className="w-8 h-8 fill-silver" />
                        </div>
                        <h3 className="text-sm font-semibold text-navy">Respite care</h3>
                        <a className="button button--tertiary px-0" href="#">
                            <span>Learn more</span>
                        </a>
                        <a className="button button--tertiary px-0" href="#">
                            <span>Book a tour</span>
                        </a>
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default ImageCard
