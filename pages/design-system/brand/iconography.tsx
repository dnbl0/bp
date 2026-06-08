import Link from 'next/link'
import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Subsection,
} from '../../../styleguide-components/primitives'
import { icons, BrandGallery } from '../../../styleguide-components/brandAssets'

const toc = [
    { id: 'illustrated', title: 'Illustrated icons' },
    { id: 'navigation', title: 'Navigation icons' },
]

const Iconography: NextPageWithLayout = () => (
    <DesignSystemLayout title="Icons" toc={toc}>
        <PageHeader
            eyebrow="Design toolkit"
            title="Icons"
            status="stable"
            intro="We use two distinct icon families. Illustrated icons add a richer tier of hierarchy; navigation icons are functional aids. They share style principles but should never be interchanged."
        />

        <Section id="illustrated" title="Illustrated icons">
            <p className="text-grey dark:text-light-grey">
                Illustrated icons improve hierarchy and structure, particularly in
                digital environments, and let content be visually separated into a
                different “tier”. They serve a functional role and should appear with a
                title or supporting text — they don’t replace system or navigational
                icons.
            </p>
            <Subsection title="Specifications">
                <ul className="space-y-2 text-body-small text-grey dark:text-light-grey">
                    <li className="flex gap-2">
                        <span className="text-cyan flex-none">—</span>
                        <span>
                            Designed for digital use at <strong>64–100px</strong>, meeting
                            similar accessibility standards to AA.
                        </span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-cyan flex-none">—</span>
                        <span>
                            Appear on white, Bupa Warm Grey or Bupa Blue, using colours
                            from the primary and neutral palettes.
                        </span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-cyan flex-none">—</span>
                        <span>
                            Keyline is black and <strong>2px</strong> wide, and should
                            include breaks. Fill fine detail with black (light
                            backgrounds) or white (dark backgrounds).
                        </span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-cyan flex-none">—</span>
                        <span>
                            Where an icon and a label link to the same place, group them
                            into one link. Don’t apply too many breaks to the keyline.
                        </span>
                    </li>
                </ul>
            </Subsection>
            <Subsection title="The illustrated icon set">
                <BrandGallery
                    images={icons.illustrated}
                    fit="contain"
                    aspect="aspect-square"
                    columns="grid-cols-3 sm:grid-cols-4 lg:grid-cols-4"
                />
            </Subsection>
        </Section>

        <Section id="navigation" title="Navigation icons">
            <p className="text-grey dark:text-light-grey">
                Navigation icons aid navigation and message hierarchy and can be used in
                print or digital. They should be consistent, intuitive, simple and
                scalable, and can appear in any colour from the primary palette. Don’t
                use them for decoration — they should be functional.
            </p>
            <Subsection title="Drawing navigation icons">
                <ul className="space-y-2 text-body-small text-grey dark:text-light-grey">
                    <li className="flex gap-2">
                        <span className="text-cyan flex-none">—</span>
                        <span>Lines should be <strong>1px</strong> on the <strong>24px</strong> grid.</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-cyan flex-none">—</span>
                        <span>Keep them simple, balanced and clearly identifiable, consistent in size with the rest of the suite.</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-cyan flex-none">—</span>
                        <span>Solid versions also fit the 24px grid; separating or “reverse” keylines are 1px. Add a square to give open linear icons a solid background.</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-cyan flex-none">—</span>
                        <span>Line weight scales with the icon; the minimum is 1px at actual size.</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-cyan flex-none">—</span>
                        <span>Corners and line caps should reflect real life — square corners on a screen, rounded on a light bulb, or mixed where appropriate.</span>
                    </li>
                </ul>
            </Subsection>
            <Subsection title="The navigation icon collection">
                <BrandGallery
                    images={icons.navigation}
                    fit="contain"
                    aspect="aspect-square"
                    columns="grid-cols-4 sm:grid-cols-6 lg:grid-cols-8"
                />
            </Subsection>
            <p className="mt-4 text-body-small text-grey dark:text-light-grey">
                The design-system inline icon library and its searchable gallery live on{' '}
                <Link href="/design-system/foundations/iconography">
                    <a className="font-semibold text-cyan hover:underline">
                        Foundations → Iconography
                    </a>
                </Link>
                . New navigation icons should be signed off by your local brand and
                legal teams; those used across multiple Market Units must be approved by
                the Group Brand and Legal teams.
            </p>
        </Section>
    </DesignSystemLayout>
)

export default Iconography
