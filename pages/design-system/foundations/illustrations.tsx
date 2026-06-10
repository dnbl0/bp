import Link from 'next/link'
import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Subsection,
} from '../../../styleguide-components/primitives'
import { skinTones, BrandSwatchGrid, BlueSquare } from '../../../styleguide-components/brandPalette'
import { illustration, BrandGallery } from '../../../styleguide-components/brandAssets'

const toc = [
    { id: 'types', title: 'Types of illustration' },
    { id: 'blue-square', title: 'The blue square' },
    { id: 'colour', title: 'Colour' },
    { id: 'keylines', title: 'Keylines' },
    { id: 'people', title: 'People components' },
    { id: 'animation', title: 'Animation' },
]

const types: { title: string; body: string }[] = [
    {
        title: 'People',
        body: 'Built from a component library of heads, upper bodies, legs and accessories that can be modified and combined.',
    },
    {
        title: 'Objects',
        body: 'A library of object illustrations, used individually or combined into an object cluster, built from simple geometric shapes.',
    },
    {
        title: 'Scenes',
        body: 'Combine people and objects into a single illustration that tells one story. Keep scenes simple — less is more.',
    },
    {
        title: 'Explanatory',
        body: 'Fact-based, literal illustrations for processes, instructional and technical subjects. As simple and direct as possible.',
    },
]

const colourRules: { title: string; body: string }[] = [
    {
        title: 'Primary palette',
        body: 'The most prominent colours — illustrations should always include Bupa Blue.',
    },
    {
        title: 'Secondary palette',
        body: "Should never overpower the primary palette. Don’t use colours from more than two different families together.",
    },
    {
        title: 'Neutral palette',
        body: 'Neutral colours can be used freely. Use white to lighten and create clear areas within an illustration.',
    },
    {
        title: 'Skin-tone palette',
        body: 'Specially developed to show diversity. Colours can also be used for objects, clothing, and so on.',
    },
]

const Illustrations: NextPageWithLayout = () => (
    <DesignSystemLayout title="Illustrations" toc={toc}>
        <PageHeader
            eyebrow="Foundations"
            title="Illustrations"
            status="stable"
            intro="Illustration builds upon our distinctive assets — Bupa Blue and the square. It should be used purposefully to help explain products, services and processes."
        />

        <Section id="types" title="Types of illustration">
            <div className="grid gap-4 sm:grid-cols-2">
                {types.map(type => (
                    <div
                        key={type.title}
                        className="rounded-xl border border-cool-paper-200 dark:border-charcoal p-5 bg-white dark:bg-cool-grey"
                    >
                        <h3 className="font-semibold text-navy dark:text-white">
                            {type.title}
                        </h3>
                        <p className="mt-1 text-body-small text-grey dark:text-light-grey">
                            {type.body}
                        </p>
                    </div>
                ))}
            </div>

            <Subsection title="People">
                <BrandGallery images={illustration.people} fit="contain" aspect="aspect-square" />
            </Subsection>
            <Subsection title="Objects">
                <BrandGallery images={illustration.objects} fit="contain" aspect="aspect-square" />
            </Subsection>
            <Subsection title="Scenes">
                <BrandGallery
                    images={illustration.scenes}
                    fit="contain"
                    aspect="aspect-[3/2]"
                    columns="grid-cols-1 sm:grid-cols-2"
                />
            </Subsection>
            <Subsection title="Explanatory">
                <BrandGallery
                    images={illustration.explanatory}
                    fit="contain"
                    aspect="aspect-[3/2]"
                    columns="grid-cols-1 sm:grid-cols-2"
                />
            </Subsection>
        </Section>

        <Section id="blue-square" title="The blue square">
            <p className="text-grey dark:text-light-grey">
                Wherever possible, illustrations should include a Bupa Blue square. It
                can be a key feature or a subtle detail — an object within the
                illustration, or a background shape. The amount of Bupa Blue should be
                adjusted for where the illustration appears: on a blue background it
                needs only a small touch; on a neutral background it needs more.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-6">
                <div className="text-center">
                    <BlueSquare className="w-20 h-20 rounded-sm" />
                    <p className="mt-2 text-caption text-grey dark:text-light-grey">As an object</p>
                </div>
                <div className="text-center">
                    <div className="w-20 h-20 rounded-sm bg-cool-paper-100 dark:bg-charcoal flex items-end justify-end p-2">
                        <BlueSquare className="w-6 h-6 rounded-sm" />
                    </div>
                    <p className="mt-2 text-caption text-grey dark:text-light-grey">As a detail</p>
                </div>
                <div className="text-center">
                    <BlueSquare className="w-20 h-20 rounded-sm">
                        <span className="w-8 h-8 rounded-full bg-white/90" aria-hidden="true" />
                    </BlueSquare>
                    <p className="mt-2 text-caption text-grey dark:text-light-grey">As a background</p>
                </div>
            </div>
        </Section>

        <Section id="colour" title="Colour">
            <p className="text-grey dark:text-light-grey">
                Illustration can use colours from all palettes. Backgrounds should be
                Bupa Blue, Bupa Navy, Bupa Warm Grey or white.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {colourRules.map(rule => (
                    <div
                        key={rule.title}
                        className="rounded-xl border border-cool-paper-200 dark:border-charcoal p-5 bg-white dark:bg-cool-grey"
                    >
                        <h3 className="font-semibold text-navy dark:text-white">
                            {rule.title}
                        </h3>
                        <p className="mt-1 text-body-small text-grey dark:text-light-grey">
                            {rule.body}
                        </p>
                    </div>
                ))}
            </div>
            <Subsection title="Skin-tone palette (illustration only)">
                <BrandSwatchGrid colors={skinTones} />
                <p className="mt-3 text-body-small text-grey dark:text-light-grey">
                    See the full colour system on the{' '}
                    <Link href="/design-system/foundations/color">
                        <a className="font-semibold text-cyan hover:underline">Color</a>
                    </Link>{' '}
                    page.
                </p>
            </Subsection>
        </Section>

        <Section id="keylines" title="Keylines">
            <ul className="space-y-2 text-body-small text-grey dark:text-light-grey">
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>Black, with rounded cap ends and breaks — they needn&apos;t appear on every element.</span>
                </li>
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>Used to define shape or add detail; the keyline does not have to fully outline an object.</span>
                </li>
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>
                        Weight guide: <strong>3px</strong> for 900–500px illustrations,{' '}
                        <strong>2px</strong> for 500–100px. Never less than 2px.
                    </span>
                </li>
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>Design for the smallest version first — small illustrations scale up better than large ones scale down.</span>
                </li>
            </ul>
        </Section>

        <Section id="people" title="People components">
            <p className="text-grey dark:text-light-grey">
                A component library helps when creating people illustrations: heads,
                accessories, bodies, and legs and footwear, designed to combine easily.
                Select the base components, combine them, then recolour and add detail.
            </p>
            <ul className="mt-4 space-y-2 text-body-small text-grey dark:text-light-grey">
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>Body shapes should be proportionally accurate and feel natural.</span>
                </li>
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>
                        Keep detail to a minimum. We don&apos;t show facial features (to avoid
                        misinterpretation), but beards, moustaches and glasses are fine.
                    </span>
                </li>
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>The majority of the library is gender neutral for greater flexibility.</span>
                </li>
                <li className="flex gap-2">
                    <span className="text-cyan flex-none">—</span>
                    <span>Add a keyline to skin or clothing when there is poor contrast against the background.</span>
                </li>
            </ul>
            <Subsection title="Heads">
                <BrandGallery
                    images={illustration.heads}
                    fit="contain"
                    aspect="aspect-square"
                    columns="grid-cols-3 sm:grid-cols-5 lg:grid-cols-7"
                />
            </Subsection>
            <Subsection title="Bodies">
                <BrandGallery
                    images={illustration.bodies}
                    fit="contain"
                    aspect="aspect-square"
                    columns="grid-cols-3 sm:grid-cols-5 lg:grid-cols-7"
                />
            </Subsection>
            <Subsection title="Legs & footwear">
                <BrandGallery
                    images={illustration.legs}
                    fit="contain"
                    aspect="aspect-square"
                    columns="grid-cols-3 sm:grid-cols-5 lg:grid-cols-7"
                />
            </Subsection>
        </Section>

        <Section id="animation" title="Animation">
            <p className="text-grey dark:text-light-grey">
                Animation should be purposeful — used to explain Bupa products, services
                or processes. Keep it simple and easy to understand, focused on message
                and story, free from gimmicks, well crafted, and approachable. Consider
                universal principles such as squash-and-stretch, staging and arcs; a
                &ldquo;pose to pose&rdquo; approach often works best.
            </p>
        </Section>
    </DesignSystemLayout>
)

export default Illustrations
