import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Example,
    PropsTable,
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
]

const ImageCard: NextPageWithLayout = () => (
    <DesignSystemLayout title="Image card" toc={toc}>
        <PageHeader
            eyebrow="Components · Molecules"
            title="Image card"
            status="stable"
            intro="An image-led content card with a heading, optional body and a call to action. It lifts on hover via the elevation tokens, and the whole card is clickable when a link is set."
        />

        <Section id="types" title="Types">
            <p className="text-grey dark:text-light-grey">
                The <code className="font-mono text-cyan">default</code> type shows
                image, heading, body and a secondary button. The{' '}
                <code className="font-mono text-cyan">skeleton</code> type (used in
                region list/detail) drops the body and uses a ghost button.
            </p>
            <Example surface="tinted" caption="Default and skeleton">
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
    </DesignSystemLayout>
)

export default ImageCard
