import { ReactNode } from 'react'
import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { PageHeader, Section } from '../../../styleguide-components/primitives'

const toc = [
    { id: 'purpose', title: 'Our purpose' },
    { id: 'ambition', title: 'Our ambition' },
    { id: 'values', title: 'Our values' },
]

const values: { title: string; body: string }[] = [
    {
        title: 'Caring',
        body: 'We act with empathy and respect for our customers, our communities and each other.',
    },
    {
        title: 'Brave',
        body: 'We make new things possible, taking on the challenges that make a real difference to health.',
    },
    {
        title: 'Responsible',
        body: 'We own our decisions and actions, and do what is right for the long term.',
    },
]

const Statement = ({
    label,
    children,
}: {
    label: string
    children: ReactNode
}) => (
    <div className="rounded-2xl border border-cool-paper-200 dark:border-charcoal bg-cool-paper-50 dark:bg-cool-grey p-6 sm:p-10">
        <p className="bds-eyebrow text-cyan">{label}</p>
        <p className="mt-3 text-heading-m sm:text-heading-l font-bold text-navy dark:text-white leading-tight">
            {children}
        </p>
    </div>
)

const Strategy: NextPageWithLayout = () => (
    <DesignSystemLayout title="Our strategy" toc={toc}>
        <PageHeader
            eyebrow="Brand guidelines"
            title="Our strategy"
            status="stable"
            intro="Our strategy is the foundation of the brand. It sets out the reason we exist (our purpose), what we want to be (our ambition) and how we think and act (our values)."
        />

        <Section id="purpose" title="Our purpose">
            <p className="text-grey dark:text-light-grey">The reason we exist.</p>
            <div className="mt-4">
                <Statement label="Our purpose">
                    Helping people live longer, healthier, happier lives, and making a
                    better world.
                </Statement>
            </div>
        </Section>

        <Section id="ambition" title="Our ambition">
            <p className="text-grey dark:text-light-grey">What we want to be.</p>
            <div className="mt-4">
                <Statement label="Our ambition">
                    To become the world&rsquo;s most customer-centric healthcare company.
                </Statement>
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
                        className="rounded-xl border border-cool-paper-200 dark:border-charcoal p-6 bg-white dark:bg-cool-grey"
                    >
                        <h3 className="text-heading-s font-semibold text-cyan">
                            {value.title}
                        </h3>
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
