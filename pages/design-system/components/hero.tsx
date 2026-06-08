import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { ComponentHero } from '../../../styleguide-components/componentPreviews'
import {
    PageHeader,
    Section,
    Example,
    Anatomy,
    PropsTable,
    Do,
    Dont,
    DoDontGrid,
    Specifications,
} from '../../../styleguide-components/primitives'
import { ImagePlaceholderIcon } from '../../../components/atoms/icons/ImagePlaceholderIcon'
import { ChevronRightIcon } from '../../../components/atoms/icons/ChevronRightIcon'
import { heroDefaultSpecs } from '../../../styleguide-components/specs/hero.specs'

const HeroDemo = () => (
    <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-cyan rounded-lg overflow-hidden">
            <div className="p-8 flex flex-col gap-4 justify-center text-white">
                <h2 className="text-heading-l font-bold text-white">
                    Aged care that feels like home
                </h2>
                <p className="text-white/90">
                    Compassionate residential care across Australia, tailored to each
                    resident's needs.
                </p>
                <div className="flex">
                    <a className="button button--inverse" href="#">
                        <span>Find a care home</span>
                        <span>
                            <ChevronRightIcon />
                        </span>
                    </a>
                </div>
            </div>
            <div className="hidden md:flex items-center justify-center bg-cyan-400 min-h-[220px]">
                <ImagePlaceholderIcon className="w-16 h-16 fill-white/70" />
            </div>
        </div>
    </div>
)

const toc = [
    { id: 'example', title: 'Example' },
    { id: 'anatomy', title: 'Anatomy' },
    { id: 'specifications', title: 'Visual Specifications' },
    { id: 'props', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

const Hero: NextPageWithLayout = () => (
    <DesignSystemLayout title="Hero banner" toc={toc}>
        <PageHeader
            eyebrow="Components · Molecules"
            title="Hero banner"
            status="stable"
            intro="A full-width banner that opens a page on a cyan field. On wide screens the image sits on the right half; on small screens it stacks above the text. A foreground slot can overlap the band for cards or search."
        />

        <ComponentHero name="HeroBanner" />

        <Section id="example" title="Example">
            <Example
                surface="paper"
                code={`<div className="w-full">
    <div className="grid grid-cols-1 md:grid-cols-2 bg-cyan rounded-lg overflow-hidden">
        <div className="p-8 flex flex-col gap-4 justify-center text-white">
            <h2 className="text-heading-l font-bold text-white">
                Aged care that feels like home
            </h2>
            <p className="text-white/90">
                Compassionate residential care across Australia, tailored to each
                resident's needs.
            </p>
            <div className="flex">
                <a className="button button--inverse" href="#">
                    <span>Find a care home</span>
                    <span>
                        <ChevronRightIcon />
                    </span>
                </a>
            </div>
        </div>
        <div className="hidden md:flex items-center justify-center bg-cyan-400 min-h-[220px]">
            <ImagePlaceholderIcon className="w-16 h-16 fill-white/70" />
        </div>
    </div>
</div>`}
            >
                <HeroDemo />
            </Example>
        </Section>

        <Section id="anatomy" title="Anatomy">
            <Anatomy
                parts={[
                    { number: 1, name: 'Background', description: 'The cyan field; on wide screens the image fills the right half.' },
                    { number: 2, name: 'Banner text', description: 'Heading, body and primary action, constrained to the left columns.' },
                    { number: 3, name: 'Foreground', description: 'An optional slot that overlaps the band for cards or a search panel.' },
                ]}
            >
                <div className="w-full max-w-xs grid grid-cols-2 bg-cyan rounded overflow-hidden">
                    <div className="p-3 space-y-2">
                        <div className="h-2 bg-white/70 rounded w-3/4" />
                        <div className="h-2 bg-white/40 rounded" />
                    </div>
                    <div className="bg-cyan-400 min-h-[64px]" />
                </div>
            </Anatomy>
        </Section>

        <Section id="specifications" title="Visual Specifications">
            <p className="text-grey dark:text-light-grey">
                Component visual specifications for sizing, spacing and colors.
            </p>
            <Specifications variant="Default" groups={heroDefaultSpecs} withTable>
                <HeroDemo />
            </Specifications>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                rows={[
                    { name: 'bannerText', type: 'ReactNode', description: 'Heading, copy and actions rendered in the left columns.' },
                    { name: 'foreground', type: 'ReactNode', description: 'Optional content that overlaps the bottom of the band.' },
                    { name: 'image', type: 'CmsAsset', description: 'Background image; right half on wide screens, stacked on small screens.' },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Use one hero per page and keep the headline to a short, scannable line.">
                    <div className="w-full max-w-xs grid grid-cols-2 bg-cyan rounded overflow-hidden">
                        <div className="p-3 flex flex-col justify-center gap-1 text-white">
                            <span className="text-sm font-bold">Aged care that feels like home</span>
                        </div>
                        <div className="bg-cyan-400 min-h-[64px]" />
                    </div>
                </Do>
                <Dont note="Don't pack the banner with a long, multi-sentence headline that buries the action.">
                    <div className="w-full max-w-xs grid grid-cols-2 bg-cyan rounded overflow-hidden">
                        <div className="p-3 flex flex-col justify-center gap-1 text-white">
                            <span className="text-sm font-bold">
                                Aged care that feels like home for every resident across every region we proudly serve nationwide
                            </span>
                        </div>
                        <div className="bg-cyan-400 min-h-[64px]" />
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Hero
