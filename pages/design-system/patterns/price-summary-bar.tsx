import { useState } from 'react'
import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Example,
    PropsTable,
    Do,
    Dont,
    DoDontGrid,
} from '../../../styleguide-components/primitives'

const toc = [
    { id: 'bar', title: 'Summary bar' },
    { id: 'api', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

type Frequency = 'fortnightly' | 'monthly'

// Base figure expressed per fortnight; monthly is derived (26 / 12 fortnights).
const FORTNIGHTLY = 46

const formatPrice = (frequency: Frequency) => {
    const value =
        frequency === 'fortnightly'
            ? FORTNIGHTLY
            : Math.round((FORTNIGHTLY * 26) / 12)
    return `$${value}`
}

const PriceSummaryBarDemo = () => {
    const [frequency, setFrequency] = useState<Frequency>('fortnightly')
    const options: Frequency[] = ['fortnightly', 'monthly']
    return (
        <div className="w-full rounded-xl border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey p-4 shadow">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-caption text-grey dark:text-light-grey">
                        Your estimated cost
                    </p>
                    <p className="text-heading-l font-bold text-navy dark:text-white">
                        {formatPrice(frequency)}
                        <span className="ml-1 text-caption font-normal text-grey dark:text-light-grey">
                            /{frequency === 'fortnightly' ? 'fortnight' : 'month'}
                        </span>
                    </p>
                </div>
                <div
                    role="radiogroup"
                    aria-label="Payment frequency"
                    className="flex items-center gap-1 rounded-lg bg-cool-paper-100 dark:bg-charcoal p-1"
                >
                    {options.map(option => {
                        const active = frequency === option
                        return (
                            <button
                                key={option}
                                type="button"
                                role="radio"
                                aria-checked={active}
                                onClick={() => setFrequency(option)}
                                className={
                                    'rounded-md px-3 py-1 text-body-small font-semibold capitalize focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue ' +
                                    (active
                                        ? 'bg-white dark:bg-cool-grey text-navy dark:text-white shadow'
                                        : 'text-grey dark:text-light-grey')
                                }
                            >
                                {option}
                            </button>
                        )
                    })}
                </div>
                <button className="button">Continue</button>
            </div>
        </div>
    )
}

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Price summary bar" toc={toc}>
        <PageHeader
            eyebrow="Composite patterns"
            title="Price summary bar"
            status="in-review"
            intro="A persistent running-total bar that follows the member through a quote or checkout funnel. It states the current estimate, lets them switch the billing frequency, and keeps the next step one tap away."
        />

        <p className="text-grey dark:text-light-grey">
            This is a proposed pattern identified from the bupa.com.au audit. It
            is not yet a shipped component — this page is a reference spec for
            adoption.
        </p>

        <Section id="bar" title="Summary bar">
            <p className="text-grey dark:text-light-grey">
                In production the bar sticks to the bottom of the viewport. It is
                rendered inline here so the demo stays inside the example canvas.
                The frequency toggle is a segmented control that recomputes the
                displayed figure.
            </p>
            <Example
                caption="A running total with a frequency toggle and primary CTA"
                code={`const [frequency, setFrequency] = useState<Frequency>('fortnightly')
const options: Frequency[] = ['fortnightly', 'monthly']

<div className="w-full rounded-xl border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey p-4 shadow">
  <div className="flex flex-wrap items-center justify-between gap-4">
    <div>
      <p className="text-caption text-grey dark:text-light-grey">
        Your estimated cost
      </p>
      <p className="text-heading-l font-bold text-navy dark:text-white">
        {formatPrice(frequency)}
        <span className="ml-1 text-caption font-normal text-grey dark:text-light-grey">
          /{frequency === 'fortnightly' ? 'fortnight' : 'month'}
        </span>
      </p>
    </div>
    <div
      role="radiogroup"
      aria-label="Payment frequency"
      className="flex items-center gap-1 rounded-lg bg-cool-paper-100 dark:bg-charcoal p-1"
    >
      {options.map(option => {
        const active = frequency === option
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setFrequency(option)}
            className={
              'rounded-md px-3 py-1 text-body-small font-semibold capitalize focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue ' +
              (active
                ? 'bg-white dark:bg-cool-grey text-navy dark:text-white shadow'
                : 'text-grey dark:text-light-grey')
            }
          >
            {option}
          </button>
        )
      })}
    </div>
    <button className="button">Continue</button>
  </div>
</div>`}
            >
                <PriceSummaryBarDemo />
            </Example>
        </Section>

        <Section id="api" title="Props">
            <PropsTable
                label="Prop"
                rows={[
                    {
                        name: 'label',
                        type: 'string',
                        default: "'Your estimated cost'",
                        description: 'Text describing what the figure represents.',
                    },
                    {
                        name: 'amount',
                        type: 'number',
                        required: true,
                        description:
                            'The base amount per fortnight; the monthly figure is derived from it.',
                    },
                    {
                        name: 'frequency',
                        type: "'fortnightly' | 'monthly'",
                        required: true,
                        description:
                            'The selected billing frequency. Controlled by the parent.',
                    },
                    {
                        name: 'onFrequencyChange',
                        type: '(frequency: Frequency) => void',
                        required: true,
                        description:
                            'Called when the member switches the frequency segment.',
                    },
                    {
                        name: 'onContinue',
                        type: '() => void',
                        required: true,
                        description: 'Called when the primary CTA is pressed.',
                    },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Keep the bar persistent for the whole funnel, always show the frequency next to the figure, and update the total instantly as choices change.">
                    <div className="w-full rounded-lg border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey px-4 py-2 text-body-small">
                        <span className="font-semibold text-navy dark:text-white">
                            $46
                        </span>
                        <span className="ml-1 text-grey dark:text-light-grey">
                            /fortnight
                        </span>
                    </div>
                </Do>
                <Dont note="Don't hide the price behind a tap or drop the frequency — a number with no period leaves the member unsure what they're committing to.">
                    <div className="w-full rounded-lg border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey px-4 py-2 text-body-small text-grey dark:text-light-grey">
                        See total →
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Page
