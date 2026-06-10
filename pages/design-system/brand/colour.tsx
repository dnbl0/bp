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
            <p className="text-body-small text-grey dark:text-light-grey mb-4">
                Led by Bupa Blue, Bupa Navy and Bupa Warm Grey — these should always be the most prominent colours in any communication.
            </p>
            <BrandSwatchGrid colors={primaryPalette} />
        </Section>

        <Section id="secondary" title="Secondary palette">
            <p className="text-body-small text-grey dark:text-light-grey mb-4">
                Six core colours (row 5, ringed below) with light <strong>tints</strong> (rows 1–4) and dark <strong>shades</strong> (rows 6–9). Use as accents only — never let secondary colours overpower Bupa Blue.
            </p>
            <SecondaryPaletteGrid />
        </Section>

        <Section id="accessibility" title="Accessibility system">
            <p className="text-body-small text-grey dark:text-light-grey mb-4">
                Move <strong>five steps</strong> lighter or darker within a colour family for an accessible pairing. Don&apos;t mix text and background colours from different families.
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
        </Section>

        <Section id=”neutral” title=”Neutral palette”>
            <p className=”text-body-small text-grey dark:text-light-grey mb-4”>
                Text Grey for digital body copy, Black for print, Ink for dark mode. Warm and cool greys for backgrounds.
            </p>
            <BrandSwatchGrid colors={neutralPalette} />
        </Section>

        <Section id=”alert” title=”Alert palette”>
            <p className=”text-body-small text-grey dark:text-light-grey mb-4”>
                State colours assigned by Market Units to communicate success, warning and error.
            </p>
            <BrandSwatchGrid colors={alertPalette} />
        </Section>

        <Section id=”skin-tone” title=”Skin-tone palette”>
            <p className=”text-body-small text-grey dark:text-light-grey mb-4”>
                For <strong>illustration only</strong> — developed to show diversity across people, objects and clothing.
            </p>
            <BrandSwatchGrid colors={skinTones} />
        </Section>

        <Section id=”usage” title=”Using colour”>
            <p className=”text-body-small text-grey dark:text-light-grey mb-4”>
                Lead with primary palette colours. Use secondary colours in small areas only to emphasise, inform and navigate.
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
