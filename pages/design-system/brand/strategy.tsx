import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { BrandHero, BigStatement, Section } from '../../../styleguide-components/primitives'
import { BlueSquare } from '../../../styleguide-components/brandPalette'
import { purpose, ambition, values } from '../../../styleguide-components/brand/content'

const toc = [
    { id: 'purpose', title: 'Our purpose' },
    { id: 'ambition', title: 'Our ambition' },
    { id: 'values', title: 'Our values' },
]

const Strategy: NextPageWithLayout = () => (
    <DesignSystemLayout title="Our strategy" toc={toc}>
        <BrandHero
            eyebrow="Brand guidelines"
            title="Our strategy"
            intro="Our strategy is the foundation of the brand: the reason we exist, what we want to be, and how we think and act."
        />

        <Section id="purpose" title="Our purpose">
            <p className="text-grey dark:text-light-grey">The reason we exist.</p>
            <div className="mt-4">
                <BigStatement label="Our purpose" tone="blue">
                    {purpose}
                </BigStatement>
            </div>
        </Section>

        <Section id="ambition" title="Our ambition">
            <p className="text-grey dark:text-light-grey">What we want to be.</p>
            <div className="mt-4">
                <BigStatement label="Our ambition">{ambition}</BigStatement>
            </div>
        </Section>

        <Section id="values" title="Our values">
            <p className="text-grey dark:text-light-grey">
                How we think and act. Our three values guide every decision we make.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {values.map(value => (
                    <div
                        key={value.title}
                        className="flex flex-col rounded-2xl border border-cool-paper-200 dark:border-charcoal p-6 bg-white dark:bg-cool-grey"
                    >
                        <BlueSquare className="w-10 h-10 flex-none rounded-md" />
                        <h3 className="mt-4 text-heading-s font-bold text-navy dark:text-white">
                            {value.title}
                        </h3>
                        <p className="mt-1 text-body-small font-semibold text-cyan">
                            {value.tagline}
                        </p>
                        <p className="mt-2 text-body-small text-grey dark:text-light-grey">
                            {value.body}
                        </p>
                    </div>
                ))}
            </div>
        </Section>
    </DesignSystemLayout>
)

export default Strategy
