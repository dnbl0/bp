import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    Anatomy,
    Do,
    Dont,
    DoDontGrid,
    PageHeader,
    PropsTable,
    Section,
} from '../../../styleguide-components/primitives'

const toc = [
    { id: 'overview', title: 'Overview' },
    { id: 'anatomy', title: 'Anatomy' },
    { id: 'blocks', title: 'Blocks' },
    { id: 'guidelines', title: 'Guidelines' },
]

/** A static wireframe of the care-home detail page layout. */
const HomePageMock = () => (
    <div className="w-full max-w-md rounded-xl border border-cool-paper-200 bg-white p-4 shadow-DEFAULT">
        <div className="h-6 w-2/3 rounded bg-cool-paper-200" />
        <div className="mt-3 h-24 rounded-lg bg-cool-paper-100" />
        <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="col-span-2 space-y-2">
                <div className="h-3 w-full rounded bg-cool-paper-100" />
                <div className="h-3 w-5/6 rounded bg-cool-paper-100" />
                <div className="h-16 rounded-lg border border-cool-paper-200" />
                <div className="h-3 w-full rounded bg-cool-paper-100" />
                <div className="h-3 w-4/6 rounded bg-cool-paper-100" />
            </div>
            <div className="space-y-2">
                <div className="h-14 rounded-lg bg-cyan-50 border border-cyan/30" />
                <div className="h-10 rounded-lg border border-cool-paper-200" />
                <div className="h-10 rounded-lg border border-cool-paper-200" />
            </div>
        </div>
    </div>
)

const HomePage: NextPageWithLayout = () => (
    <DesignSystemLayout title="Care home page" toc={toc}>
        <PageHeader
            eyebrow="Aged Care · Pattern"
            title="Care home page"
            status="stable"
            intro="The anatomy of a Bupa care-home detail page: how the gallery, contact card, pricing, testimonials and nearby homes compose into a single template that families use to evaluate a home."
        />

        <Section id="overview" title="Overview">
            <p className="text-grey dark:text-light-grey">
                The care-home page is the destination of the whole aged-care
                journey — where a family decides whether a home is right for them.
                It is a two-column template: a primary content column of flexible
                CMS blocks, and a sticky sidebar of conversion-focused cards. A
                floating in-page navigation lets long pages stay scannable.
            </p>
            <p className="mt-3 text-grey dark:text-light-grey">
                Implemented by{' '}
                <code className="font-mono text-cyan">
                    components/molecules/templates/AgedCareHomeDetailsTemplate.tsx
                </code>
                .
            </p>
        </Section>

        <Section id="anatomy" title="Anatomy">
            <Anatomy
                parts={[
                    {
                        number: 1,
                        name: 'Name & gallery',
                        description:
                            'The home name, recognition tags and a photo gallery at the top of the page.',
                    },
                    {
                        number: 2,
                        name: 'Primary content',
                        description:
                            'Flexible CMS blocks: accordions, headings, the pricing calculator and CTAs.',
                    },
                    {
                        number: 3,
                        name: 'Sidebar',
                        description:
                            'Contact card, GM/testimonial card, nearby homes and an optional social embed.',
                    },
                ]}
            >
                <HomePageMock />
            </Anatomy>
        </Section>

        <Section id="blocks" title="Blocks">
            <p className="-mt-2 mb-4 text-grey dark:text-light-grey">
                The template composes shared and aged-care-specific blocks. The
                sidebar order is deliberate: contact first, social proof second,
                alternatives last.
            </p>
            <PropsTable
                label="Region"
                rows={[
                    {
                        name: 'Primary content',
                        type: 'Block[]',
                        description:
                            'Accordions, headings, the pricing block, CTAs and rich text from primaryContentCollection.',
                    },
                    {
                        name: 'Sidebar · Contact',
                        type: 'ContactCardBlock',
                        description:
                            'Phone, hours, address and a primary call-to-action with optional Calendly booking.',
                    },
                    {
                        name: 'Sidebar · Testimonial',
                        type: 'GM profile / quote',
                        description: 'A general-manager profile or resident testimonial for social proof.',
                    },
                    {
                        name: 'Sidebar · Nearby',
                        type: 'NearbyCardBlock',
                        description: 'The closest alternative homes by distance.',
                    },
                    {
                        name: 'Floating navigation',
                        type: 'FloatingNav',
                        description: 'Anchored in-page navigation for long detail pages.',
                    },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Keep the contact card and a clear primary action visible in the sidebar as the page scrolls.">
                    <span className="text-body-small text-grey">
                        Sticky contact + “Book a tour”
                    </span>
                </Do>
                <Dont note="Don't push pricing and contact below a long wall of prose — families look for them first.">
                    <span className="text-body-small text-grey">
                        Contact only in the footer
                    </span>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default HomePage
