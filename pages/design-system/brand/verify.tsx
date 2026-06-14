import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { PageHeader, Section, Subsection } from '../../../styleguide-components/primitives'
import {
    primaryPalette,
    neutralPalette,
    alertPalette,
    skinTones,
    BrandSwatchGrid,
    SecondaryPaletteGrid,
} from '../../../styleguide-components/brandPalette'
import { typeScale, legacyTypeScale } from '../../../styleguide-components/tokens'

const toc = [
    { id: 'palettes', title: 'Palettes' },
    { id: 'typography', title: 'Typography (live tokens)' },
]

const Verify: NextPageWithLayout = () => (
    <DesignSystemLayout title="Verify brand tokens" toc={toc} wide>
        <PageHeader
            eyebrow="Design QA"
            title="Verify brand tokens"
            status="experimental"
            intro="Visual reference showing the live brand palettes and the responsive type scale sourced from the production theme. Use this page to confirm values match the published brand guidelines."
        />

        <Section id="palettes" title="Palettes">
            <Subsection title="Primary palette (brand book)">
                <BrandSwatchGrid colors={primaryPalette} />
            </Subsection>

            <Subsection title="Secondary palette (brand book)">
                <SecondaryPaletteGrid />
            </Subsection>

            <Subsection title="Neutral palette">
                <BrandSwatchGrid colors={neutralPalette} />
            </Subsection>

            <Subsection title="Alert palette">
                <BrandSwatchGrid colors={alertPalette} />
            </Subsection>

            <Subsection title="Skin tones (illustration only)">
                <BrandSwatchGrid colors={skinTones} />
            </Subsection>
        </Section>

        <Section id="typography" title="Typography (live tokens)">
            <p className="text-body-small text-grey dark:text-light-grey">
                The responsive type scale is read live from <code className="font-mono">styles/base/typography.css</code> and
                the semantic tokens in the theme. Check the rendered sizes below.
            </p>
            <div className="mt-6 space-y-4">
                {typeScale.map(step => (
                    <div key={step.token} className="rounded-xl border border-cool-paper-200 dark:border-charcoal p-4 bg-white dark:bg-cool-grey">
                        <div className="font-mono text-caption text-disabled-text">{step.token} → {step.cssVar}</div>
                        <div className="mt-2" style={{ fontSize: `var(${step.cssVar})`, lineHeight: `var(${step.cssVar.replace('--font-size','--line-height')})` }}>
                            <p className="text-navy font-semibold">The quick brown fox jumps over the lazy dog — {step.token}</p>
                        </div>
                        <div className="mt-2 text-caption text-disabled-text">sizes: {step.sizes.base} / {step.sizes.md} / {step.sizes.lg}</div>
                    </div>
                ))}

                <div className="mt-6">
                    <h4 className="text-body-small font-semibold">Legacy aliases</h4>
                    <div className="mt-2 space-y-2">
                        {legacyTypeScale.map(step => (
                            <div key={step.token} className="rounded-xl border border-cool-paper-100 p-3 bg-white dark:bg-cool-grey">
                                <div className="font-mono text-caption text-disabled-text">{step.token} → {step.cssVar}</div>
                                <div className="mt-1 text-navy">Sample text — {step.token}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    </DesignSystemLayout>
)

export default Verify
