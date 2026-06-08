import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Do,
    Dont,
    DoDontGrid,
} from '../../../styleguide-components/primitives'
import { photography, BrandFigure } from '../../../styleguide-components/brandAssets'

const toc = [
    { id: 'anatomy', title: 'Shape, colour & placement' },
    { id: 'examples', title: 'Placement examples' },
    { id: 'dos', title: 'Do & don’t' },
]

/** A stand-in “image” canvas with a corner message box. */
const ImageMock = ({
    children,
    align = 'bottom-left',
    box = 'bg-cyan',
}: {
    children: React.ReactNode
    align?: 'bottom-left' | 'top-left' | 'bottom-right'
    box?: string
}) => {
    const position =
        align === 'top-left'
            ? 'top-4 left-4'
            : align === 'bottom-right'
              ? 'bottom-4 right-4'
              : 'bottom-4 left-4'
    return (
        <div className="relative w-full h-56 rounded-lg overflow-hidden bg-gradient-to-br from-cool-grey to-grey">
            <div className={`absolute ${position} ${box} text-white p-4 max-w-[60%]`}>
                {children}
            </div>
        </div>
    )
}

const MessageBoxes: NextPageWithLayout = () => (
    <DesignSystemLayout title="Message boxes" toc={toc}>
        <PageHeader
            eyebrow="Design toolkit"
            title="Message boxes"
            status="stable"
            intro="Message boxes help with the legibility of text over images, or create impact. They are one of our most distinctive square assets."
        />

        <Section id="anatomy" title="Shape, colour & placement">
            <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-cool-paper-200 dark:border-charcoal p-5 bg-white dark:bg-cool-grey">
                    <h3 className="font-semibold text-navy dark:text-white">Shape</h3>
                    <p className="mt-1 text-body-small text-grey dark:text-light-grey">
                        Always square.
                    </p>
                </div>
                <div className="rounded-xl border border-cool-paper-200 dark:border-charcoal p-5 bg-white dark:bg-cool-grey">
                    <h3 className="font-semibold text-navy dark:text-white">Colour</h3>
                    <p className="mt-1 text-body-small text-grey dark:text-light-grey">
                        Bupa Blue or Bupa Navy only.
                    </p>
                </div>
                <div className="rounded-xl border border-cool-paper-200 dark:border-charcoal p-5 bg-white dark:bg-cool-grey">
                    <h3 className="font-semibold text-navy dark:text-white">Placement</h3>
                    <p className="mt-1 text-body-small text-grey dark:text-light-grey">
                        Always in a corner — flush, or slightly inset. The inset should
                        generally mirror the inset distance of the Bupa logo.
                    </p>
                </div>
            </div>
        </Section>

        <Section id="examples" title="Placement examples">
            <div className="grid gap-6 sm:grid-cols-2">
                <figure>
                    <ImageMock align="bottom-left" box="bg-cyan">
                        <p className="font-bold leading-snug">Helping you take care of your health</p>
                        <p className="mt-2 text-caption opacity-90">bupa.com</p>
                    </ImageMock>
                    <figcaption className="mt-2 text-caption text-grey dark:text-light-grey">
                        Bupa Blue box, slightly inset in the corner.
                    </figcaption>
                </figure>
                <BrandFigure
                    image={photography.messageBox}
                    caption="A square message box placed in a corner over a real photograph. On a full-bleed image, boxes can bleed off up to three sides."
                />
            </div>
        </Section>

        <Section id="dos" title="Do & don’t">
            <DoDontGrid>
                <Do note="Place the box in a corner over a calm area of the image, in Bupa Blue or Navy.">
                    <ImageMock align="bottom-left" box="bg-cyan">
                        <p className="font-bold leading-snug">Short, clear message</p>
                    </ImageMock>
                </Do>
                <Dont note="Don’t cover an important part of the image, or use a colour other than Bupa Blue or Navy.">
                    <ImageMock align="bottom-left" box="bg-fuchsia">
                        <p className="font-bold leading-snug">Off-brand colour, central crop</p>
                    </ImageMock>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default MessageBoxes
