import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { ComponentHero } from '../../../styleguide-components/componentPreviews'
import {
    PageHeader,
    Section,
    Example,
    Anatomy,
    PropsTable,
} from '../../../styleguide-components/primitives'
import { PersonIcon } from '../../../components/atoms/icons/PersonIcon'

const toc = [
    { id: 'examples', title: 'Examples' },
    { id: 'anatomy', title: 'Anatomy' },
    { id: 'props', title: 'Props' },
]

const Testimonial: NextPageWithLayout = () => (
    <DesignSystemLayout title="Testimonial card" toc={toc}>
        <PageHeader
            eyebrow="Components · Molecules"
            title="Testimonial card"
            status="stable"
            intro="A bordered card presenting a customer quote with attribution. The attribution can sit below the quote (default) or beside an avatar above it."
        />

        <ComponentHero name="TestimonialCardBlock" />

        <Section id="examples" title="Examples">
            <Example surface="tinted" caption="Attribution below the quote (default)">
                <div className="p-6 rounded border-[1px] border-cool-paper-200 w-full max-w-md bg-white">
                    <div className="flex flex-col gap-6">
                        <p className="text-grey">
                            “The team made Mum feel at home from day one. We couldn't
                            have asked for more caring staff.”
                        </p>
                        <div className="flex flex-col gap-[6px]">
                            <div className="font-semibold">Sarah J.</div>
                            <div className="font-semibold text-sm text-grey">
                                Daughter of resident
                            </div>
                        </div>
                    </div>
                </div>
            </Example>
            <Example surface="tinted" caption="Attribution beside an avatar, above the quote">
                <div className="p-6 rounded border-[1px] border-cool-paper-200 w-full max-w-md bg-white">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center flex-nowrap">
                            <div className="h-[72px] w-[72px] rounded-full overflow-hidden bg-cool-paper-100 flex items-center justify-center">
                                <PersonIcon className="w-9 h-9 fill-silver" />
                            </div>
                            <div className="ml-4 flex flex-col gap-2 items-start flex-1">
                                <div className="font-semibold">David M.</div>
                                <div className="font-semibold text-sm text-grey">
                                    Resident
                                </div>
                            </div>
                        </div>
                        <p className="text-grey">
                            “I've made new friends and there's always something on. It
                            feels like a community.”
                        </p>
                    </div>
                </div>
            </Example>
        </Section>

        <Section id="anatomy" title="Anatomy">
            <Anatomy
                parts={[
                    { number: 1, name: 'Icon / avatar', description: 'An optional image — a brand icon, or a circular avatar in the top layout.' },
                    { number: 2, name: 'Quote', description: 'The rich-text testimonial body.' },
                    { number: 3, name: 'Attribution', description: 'The person (from) and their relationship/title.' },
                    { number: 4, name: 'Location link', description: 'An optional link to the related care home.' },
                ]}
            >
                <div className="p-4 rounded border-[1px] border-cool-paper-200 w-full max-w-xs bg-white">
                    <p className="text-body-small text-grey">“A short quote.”</p>
                    <div className="mt-4 font-semibold">Name</div>
                    <div className="font-semibold text-sm text-grey">Relationship</div>
                </div>
            </Anatomy>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                label="Field"
                rows={[
                    { name: 'bodyRichText', type: 'RichText', description: 'The testimonial quote.' },
                    { name: 'from', type: 'string', description: 'The name of the person quoted.' },
                    { name: 'title', type: 'string', description: 'Their relationship or role.' },
                    { name: 'icon', type: 'CmsImage', description: 'Optional brand icon or avatar image.' },
                    { name: 'isBottom', type: 'boolean | null', default: 'true', description: 'When true/null, attribution sits below the quote; when false, it sits beside an avatar above it.' },
                    { name: 'locationHref / locationText', type: 'string', description: 'Optional link to the related care home.' },
                ]}
            />
        </Section>
    </DesignSystemLayout>
)

export default Testimonial
