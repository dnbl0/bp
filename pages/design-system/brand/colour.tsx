import Link from 'next/link'
import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    BrandHero,
    PullQuote,
    Section,
    Subsection,
    Do,
    Dont,
    DoDontGrid,
} from '../../../styleguide-components/primitives'
import {
    primaryPalette,
    neutralPalette,
    alertPalette,
    skinTones,
    BrandSwatchGrid,
    SecondaryPaletteGrid,
} from '../../../styleguide-components/brandPalette'
import { photography, BrandFigure } from '../../../styleguide-components/brandAssets'
import { colourStepRules } from '../../../styleguide-components/brand/content'

const toc = [
    { id: 'primary', title: 'Primary palette' },
    { id: 'secondary', title: 'Secondary palette' },
    { id: 'accessibility', title: 'Accessibility system' },
    { id: 'neutral', title: 'Neutral palette' },
    { id: 'alert', title: 'Alert palette' },
    { id: 'skin-tone', title: 'Skin-tone palette' },
    { id: 'usage', title: 'Using colour' },
]

const Colour: NextPageWithLayout = () => (
    <DesignSystemLayout title="Colour" toc={toc}>
        <BrandHero
            eyebrow="Design toolkit"
            title="Colour"
            intro="Blue is the glue that binds together our visual identity. Bupa Blue should be clearly visible on all our communications; the other colours play a functional, supporting role."
        />

        <div className="rounded-xl border border-cool-paper-200 dark:border-charcoal bg-cool-paper-50 dark:bg-cool-grey p-4 text-body-small text-grey dark:text-light-grey">
            These are the published brand-book values. For the live theme tokens used
            in code, see{' '}
            <Link href="/design-system/foundations/color">
                <a className="font-semibold text-cyan hover:underline">
                    Foundations → Color
                </a>
            </Link>
            . A few brand values differ slightly from the current production theme —
            notably Bupa Navy (<code className="font-mono text-cyan">#0d1846</code> here
            vs the theme’s <code className="font-mono">#00335B</code>) and Bupa Warm
            Grey (<code className="font-mono text-cyan">#f1efeb</code> vs{' '}
            <code className="font-mono">#f0efeb</code>).
        </div>

        <PullQuote cite="Design principle">Blue is the glue.</PullQuote>

        <Section id="primary" title="Primary palette">
            <p className="text-grey dark:text-light-grey">
                Our defining colours, led by Bupa Blue, Bupa Navy and Bupa Warm Grey —
                these should be our most prominent colours. For large areas of colour,
                use a primary colour at 100%. Bupa Blue meets AA accessibility standards
                on a Bupa White or Bupa Black background only.
            </p>
            <div className="mt-6">
                <BrandSwatchGrid colors={primaryPalette} />
            </div>
        </Section>

        <Section id="secondary" title="Secondary palette">
            <p className="text-grey dark:text-light-grey">
                The secondary palette supplements the primary palette. It includes six
                core colours and a defined system of light <strong>tints</strong> (rows
                1–4) and dark <strong>shades</strong> (rows 6–9) around each{' '}
                <strong>core</strong> colour (row 5, ringed below). Use these colours
                purposefully — as accents — to emphasise content or actions, clarify
                information and help people navigate. Other colours should never
                overpower our blue.
            </p>
            <div className="mt-6">
                <SecondaryPaletteGrid />
            </div>
            <p className="mt-4 text-body-small text-grey dark:text-light-grey">
                Core colours: Bupa Blue <code className="font-mono">#0079c8</code>,
                Bupa Fuchsia <code className="font-mono">#d02670</code>, Bupa Orange{' '}
                <code className="font-mono">#db3907</code>, Bupa Green{' '}
                <code className="font-mono">#1b883c</code>, Bupa Teal{' '}
                <code className="font-mono">#007d79</code> and Bupa Purple{' '}
                <code className="font-mono">#8a3ff5</code>.
            </p>
        </Section>

        <Section id="accessibility" title="Accessibility system">
            <p className="text-grey dark:text-light-grey">
                A simple step system helps you choose accessible colour combinations
                within a family. To find an accessible pairing, move{' '}
                <strong>five steps lighter or darker</strong> within the same colour
                family. White text meets standards on core colours and dark shades;
                Bupa Black text meets standards on light tints.
            </p>
            <div className="mt-6 overflow-x-auto">
                <table className="w-full text-body-small border-collapse">
                    <thead>
                        <tr className="border-b border-cool-paper-200 dark:border-charcoal text-left">
                            <th className="p-3 font-semibold text-grey dark:text-light-grey">
                                Background step
                            </th>
                            <th className="p-3 font-semibold text-grey dark:text-light-grey">
                                Accessible foreground
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {colourStepRules.map(rule => (
                            <tr
                                key={rule.row}
                                className="border-b border-cool-paper-100 dark:border-charcoal"
                            >
                                <td className="p-3 font-semibold text-navy dark:text-white">
                                    {rule.row}
                                </td>
                                <td className="p-3 text-grey dark:text-light-grey">
                                    {rule.pairing}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="mt-4 text-body-small text-grey dark:text-light-grey">
                Please don’t mix text and background colours from different colour
                families.
            </p>
        </Section>

        <Section id="neutral" title="Neutral palette">
            <p className="text-grey dark:text-light-grey">
                A backdrop and technical support. Bupa Text Grey is for text in digital
                applications; Bupa Black for text in print. Bupa Ink replaces Bupa Warm
                Grey in digital “dark mode”. The warm and cool greys give a range of
                background options across print and digital.
            </p>
            <div className="mt-6">
                <BrandSwatchGrid colors={neutralPalette} />
            </div>
        </Section>

        <Section id="alert" title="Alert palette">
            <p className="text-grey dark:text-light-grey">
                Provides instruction. These colours can be assigned as required by
                Market Units to communicate state.
            </p>
            <div className="mt-6">
                <BrandSwatchGrid colors={alertPalette} />
            </div>
        </Section>

        <Section id="skin-tone" title="Skin-tone palette">
            <p className="text-grey dark:text-light-grey">
                A skin-tone palette helps show diversity in illustration. This palette
                should be used for <strong>illustration only</strong>.
            </p>
            <div className="mt-6">
                <BrandSwatchGrid colors={skinTones} />
            </div>
        </Section>

        <Section id="usage" title="Using colour">
            <p className="text-grey dark:text-light-grey">
                Primary palette colours should be the most prominent. Lighter neutral
                colours work well as backgrounds. Secondary palette colours are used in
                small areas to emphasise, inform and navigate.
            </p>
            <DoDontGrid>
                <Do note="Lead with Bupa Blue, then use a single core secondary colour to highlight a call to action.">
                    <button className="button button--giant bg-cyan text-white">
                        Get a quote
                    </button>
                </Do>
                <Dont note="Don’t let secondary colours overpower the primary palette, or mix warm and cool greys in one application.">
                    <button className="button button--giant bg-fuchsia text-white">
                        Get a quote
                    </button>
                </Dont>
            </DoDontGrid>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <BrandFigure
                    image={photography.colourExample}
                    caption="Primary colours make information easier to find; secondary colours create hierarchy."
                />
                <BrandFigure
                    image={photography.usingColour}
                    caption="Secondary palette colours used in small areas to emphasise, inform and navigate."
                />
            </div>
        </Section>
    </DesignSystemLayout>
)

export default Colour
