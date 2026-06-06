import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { PageHeader, Section } from '../../../styleguide-components/primitives'
import {
    legacyTypeScale,
    typeScale,
    TypeStep,
} from '../../../styleguide-components/tokens'

const toc = [
    { id: 'typeface', title: 'Typeface' },
    { id: 'scale', title: 'Type scale' },
    { id: 'legacy', title: 'Legacy aliases' },
    { id: 'weights', title: 'Weights' },
]

const weights = [
    { name: 'Light', className: 'font-light', value: 300 },
    { name: 'Regular', className: 'font-normal', value: 400 },
    { name: 'Medium', className: 'font-medium', value: 500 },
    { name: 'Semibold', className: 'font-semibold', value: 600 },
    { name: 'Bold', className: 'font-bold', value: 700 },
]

const ScaleRow = ({ step }: { step: TypeStep }) => (
    <div className="py-5 border-t border-cool-paper-200 dark:border-charcoal grid gap-4 md:grid-cols-[1fr_auto] items-baseline">
        <div
            className="text-navy dark:text-white font-semibold truncate"
            style={{
                fontSize: `var(${step.cssVar})`,
                lineHeight: `var(${step.cssVar.replace('font-size', 'line-height')})`,
            }}
        >
            The quick brown fox
        </div>
        <dl className="flex flex-wrap gap-x-6 gap-y-1 text-caption font-mono text-grey dark:text-light-grey">
            <span>
                <span className="text-cyan">{`text-${step.token}`}</span>
            </span>
            <span>{step.cssVar}</span>
            <span>
                {step.sizes.base} / {step.sizes.md} / {step.sizes.lg}
            </span>
        </dl>
    </div>
)

const Typography: NextPageWithLayout = () => (
    <DesignSystemLayout title="Typography" toc={toc}>
        <PageHeader
            eyebrow="Foundations"
            title="Typography"
            status="stable"
            intro="Montserrat carries all text. The type scale is responsive — each step grows at the md and lg breakpoints — and is defined as CSS custom properties consumed by semantic Tailwind classes."
        />

        <Section id="typeface" title="Typeface">
            <div className="rounded-xl border border-cool-paper-200 dark:border-charcoal p-8 bg-white dark:bg-cool-grey">
                <p className="font-sans text-heading-xl text-navy dark:text-white">
                    Montserrat
                </p>
                <p className="mt-2 font-sans text-grey dark:text-light-grey">
                    AaBbCcDdEeFfGgHhIiJjKkLlMm 0123456789 — the brand sans-serif,
                    loaded locally from <code className="font-mono text-cyan">/fonts/montserrat</code>.
                </p>
            </div>
        </Section>

        <Section id="scale" title="Type scale">
            <p className="text-grey dark:text-light-grey">
                Prefer the semantic names below. Sizes are shown as base / md / lg.
                Each example renders at the size for your current viewport width.
            </p>
            <div className="mt-4">
                {typeScale.map(step => (
                    <ScaleRow key={step.token} step={step} />
                ))}
            </div>
        </Section>

        <Section id="legacy" title="Legacy aliases">
            <p className="text-grey dark:text-light-grey">
                Numeric aliases (<code className="font-mono text-cyan">text-2xl</code>,{' '}
                <code className="font-mono text-cyan">text-base</code>, …) remain for
                backwards compatibility. Use the semantic names for new work.
            </p>
            <div className="mt-4 overflow-x-auto rounded-lg border border-cool-paper-200 dark:border-charcoal">
                <table className="w-full text-left text-body-small">
                    <thead>
                        <tr className="bg-cool-paper-100 dark:bg-cool-grey text-navy dark:text-light-grey">
                            <th className="px-4 py-3 font-semibold">Token</th>
                            <th className="px-4 py-3 font-semibold">CSS variable</th>
                            <th className="px-4 py-3 font-semibold">base / md / lg</th>
                        </tr>
                    </thead>
                    <tbody>
                        {legacyTypeScale.map(step => (
                            <tr
                                key={step.token}
                                className="border-t border-cool-paper-200 dark:border-charcoal"
                            >
                                <td className="px-4 py-3 font-mono text-cyan">{`text-${step.token}`}</td>
                                <td className="px-4 py-3 font-mono text-grey dark:text-light-grey">
                                    {step.cssVar}
                                </td>
                                <td className="px-4 py-3 font-mono text-grey dark:text-light-grey">
                                    {step.sizes.base} / {step.sizes.md} / {step.sizes.lg}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Section>

        <Section id="weights" title="Weights">
            <div className="space-y-3">
                {weights.map(weight => (
                    <div
                        key={weight.value}
                        className="flex items-baseline justify-between border-b border-cool-paper-200 dark:border-charcoal pb-3"
                    >
                        <span className={`${weight.className} text-heading-s text-navy dark:text-white`}>
                            {weight.name}
                        </span>
                        <span className="font-mono text-caption text-grey dark:text-light-grey">
                            {weight.className} · {weight.value}
                        </span>
                    </div>
                ))}
            </div>
        </Section>
    </DesignSystemLayout>
)

export default Typography
