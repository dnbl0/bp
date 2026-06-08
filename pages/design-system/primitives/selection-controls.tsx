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
    { id: 'radio-cards', title: 'Radio cards' },
    { id: 'segmented', title: 'Segmented control' },
    { id: 'range', title: 'Range slider' },
    { id: 'stepper', title: 'Number stepper' },
    { id: 'api', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

const RadioCardsDemo = () => {
    const [who, setWho] = useState('me')
    const options = [
        { id: 'me', label: 'Just me' },
        { id: 'couple', label: 'Couple' },
        { id: 'family', label: 'Family' },
    ]
    return (
        <fieldset className="w-full">
            <legend className="block text-body-small font-semibold text-navy dark:text-white mb-2">
                Who is this cover for?
            </legend>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {options.map(opt => {
                    const selected = who === opt.id
                    return (
                        <label
                            key={opt.id}
                            htmlFor={`sc-who-${opt.id}`}
                            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border px-3 py-4 text-body-small font-semibold focus-within:ring-2 focus-within:ring-focus-blue ${
                                selected
                                    ? 'border-cyan bg-cyan-50 text-navy dark:bg-cool-grey dark:text-white'
                                    : 'border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey text-grey dark:text-light-grey'
                            }`}
                        >
                            <input
                                id={`sc-who-${opt.id}`}
                                type="radio"
                                name="sc-who"
                                value={opt.id}
                                checked={selected}
                                onChange={() => setWho(opt.id)}
                                className="sr-only"
                            />
                            {opt.label}
                        </label>
                    )
                })}
            </div>
        </fieldset>
    )
}

const SegmentedDemo = () => {
    const [period, setPeriod] = useState('monthly')
    const options = [
        { id: 'monthly', label: 'Monthly' },
        { id: 'annual', label: 'Annually' },
    ]
    return (
        <div
            role="group"
            aria-label="Billing period"
            className="inline-flex gap-1 rounded-lg border border-cool-paper-200 dark:border-charcoal bg-cool-paper-100 dark:bg-cool-grey p-1"
        >
            {options.map(opt => {
                const active = period === opt.id
                return (
                    <button
                        key={opt.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setPeriod(opt.id)}
                        className={`rounded-md px-4 py-1.5 text-body-small font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue ${
                            active
                                ? 'bg-white dark:bg-charcoal text-navy dark:text-white shadow-sm'
                                : 'text-grey dark:text-light-grey hover:text-navy dark:hover:text-white'
                        }`}
                    >
                        {opt.label}
                    </button>
                )
            })}
        </div>
    )
}

const RangeDemo = () => {
    const [excess, setExcess] = useState(500)
    return (
        <div className="w-full max-w-sm">
            <label
                htmlFor="sc-excess"
                className="block text-body-small font-semibold text-navy dark:text-white mb-1"
            >
                Annual excess
            </label>
            <input
                id="sc-excess"
                type="range"
                min={0}
                max={1000}
                step={250}
                value={excess}
                onChange={e => setExcess(Number(e.target.value))}
                className="w-full accent-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue rounded-lg"
            />
            <p className="mt-1 text-caption text-grey dark:text-light-grey">
                Selected: <span className="text-navy dark:text-white font-semibold">${excess}</span>
            </p>
        </div>
    )
}

const StepperDemo = () => {
    const [count, setCount] = useState(2)
    const min = 1
    const max = 8
    return (
        <div className="w-full max-w-xs">
            <label
                id="sc-deps-label"
                className="block text-body-small font-semibold text-navy dark:text-white mb-1"
            >
                Number of dependants
            </label>
            <div
                role="group"
                aria-labelledby="sc-deps-label"
                className="inline-flex items-center rounded-lg border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey"
            >
                <button
                    type="button"
                    aria-label="Decrease"
                    disabled={count <= min}
                    onClick={() => setCount(c => Math.max(min, c - 1))}
                    className="px-3 py-2 text-navy dark:text-white disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue rounded-l-lg"
                >
                    −
                </button>
                <span
                    aria-live="polite"
                    className="min-w-[3rem] px-3 py-2 text-center text-body-small font-semibold text-navy dark:text-white border-x border-cool-paper-200 dark:border-charcoal"
                >
                    {count}
                </span>
                <button
                    type="button"
                    aria-label="Increase"
                    disabled={count >= max}
                    onClick={() => setCount(c => Math.min(max, c + 1))}
                    className="px-3 py-2 text-navy dark:text-white disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue rounded-r-lg"
                >
                    +
                </button>
            </div>
        </div>
    )
}

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Selection controls" toc={toc}>
        <PageHeader
            eyebrow="Primitives"
            title="Selection controls"
            status="in-review"
            intro="The richer choice controls that drive the quote funnels on bupa.com.au — radio cards, segmented pills, range sliders and number steppers — each built on a real input or button so they stay keyboard- and screen-reader-accessible."
        />

        <p className="text-grey dark:text-light-grey">
            This is a proposed primitive identified across bupa.com.au quote
            flows. It is not yet a shipped component — this page is a reference
            spec, built from the design tokens, to align styling and
            accessibility behaviour before adoption.
        </p>

        <Section id="radio-cards" title="Radio cards">
            <p className="text-grey dark:text-light-grey">
                A row of large, selectable cards backed by a real radio group.
                Exactly one is selected; the visually hidden input keeps the
                control fully keyboard-operable.
            </p>
            <Example
                caption="A single-select row of cards"
                code={`const [who, setWho] = useState('me')

<fieldset>
  <legend>Who is this cover for?</legend>
  {options.map(opt => (
    <label key={opt.id} htmlFor={\`who-\${opt.id}\`}>
      <input
        id={\`who-\${opt.id}\`}
        type="radio"
        name="who"
        checked={who === opt.id}
        onChange={() => setWho(opt.id)}
        className="sr-only"
      />
      {opt.label}
    </label>
  ))}
</fieldset>`}
            >
                <RadioCardsDemo />
            </Example>
        </Section>

        <Section id="segmented" title="Segmented control">
            <p className="text-grey dark:text-light-grey">
                A compact pill toggle group for two or three mutually exclusive
                options, such as a billing period.
            </p>
            <Example
                caption="A two-option pill toggle"
                code={`const [period, setPeriod] = useState('monthly')

<div role="group" aria-label="Billing period">
  {options.map(opt => (
    <button
      key={opt.id}
      type="button"
      aria-pressed={period === opt.id}
      onClick={() => setPeriod(opt.id)}
    >
      {opt.label}
    </button>
  ))}
</div>`}
            >
                <SegmentedDemo />
            </Example>
        </Section>

        <Section id="range" title="Range slider">
            <p className="text-grey dark:text-light-grey">
                A styled native <code className="font-mono text-cyan">range</code>{' '}
                input that shows its live value below the track.
            </p>
            <Example
                caption="A slider with a live value read-out"
                code={`const [excess, setExcess] = useState(500)

<label htmlFor="excess">Annual excess</label>
<input
  id="excess"
  type="range"
  min={0}
  max={1000}
  step={250}
  value={excess}
  onChange={e => setExcess(Number(e.target.value))}
/>
<p>Selected: \${excess}</p>`}
            >
                <RangeDemo />
            </Example>
        </Section>

        <Section id="stepper" title="Number stepper">
            <p className="text-grey dark:text-light-grey">
                A − value + control for small whole numbers, clamped between a
                min and max. The buttons disable at the bounds.
            </p>
            <Example
                caption="A bounded number stepper"
                code={`const [count, setCount] = useState(2)
const min = 1, max = 8

<div role="group" aria-labelledby="deps-label">
  <button aria-label="Decrease" disabled={count <= min}
    onClick={() => setCount(c => Math.max(min, c - 1))}>−</button>
  <span aria-live="polite">{count}</span>
  <button aria-label="Increase" disabled={count >= max}
    onClick={() => setCount(c => Math.min(max, c + 1))}>+</button>
</div>`}
            >
                <StepperDemo />
            </Example>
        </Section>

        <Section id="api" title="Props">
            <PropsTable
                rows={[
                    {
                        name: 'value',
                        type: 'string | number',
                        required: true,
                        description:
                            'The current selection. Controlled by the parent for every variant.',
                    },
                    {
                        name: 'onChange',
                        type: '(value) => void',
                        required: true,
                        description:
                            'Called with the next value when the user changes the selection.',
                    },
                    {
                        name: 'options',
                        type: '{ id; label }[]',
                        description:
                            'Choices for radio cards and the segmented control.',
                    },
                    {
                        name: 'min',
                        type: 'number',
                        description:
                            'Lower bound for the range slider and number stepper.',
                    },
                    {
                        name: 'max',
                        type: 'number',
                        description:
                            'Upper bound for the range slider and number stepper.',
                    },
                    {
                        name: 'step',
                        type: 'number',
                        default: '1',
                        description:
                            'Increment for the range slider and number stepper.',
                    },
                    {
                        name: 'label',
                        type: 'string',
                        required: true,
                        description:
                            'Group label, rendered as a legend or aria-label for assistive tech.',
                    },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Use radio cards for a small set (2–4) of equally important, mutually exclusive choices so each option is one tap.">
                    <div className="grid w-full grid-cols-3 gap-3">
                        {['Just me', 'Couple', 'Family'].map((l, i) => (
                            <div
                                key={l}
                                className={`flex items-center justify-center rounded-lg border px-3 py-4 text-body-small font-semibold ${
                                    i === 0
                                        ? 'border-cyan bg-cyan-50 text-navy dark:bg-cool-grey dark:text-white'
                                        : 'border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey text-grey dark:text-light-grey'
                                }`}
                            >
                                {l}
                            </div>
                        ))}
                    </div>
                </Do>
                <Dont note="Don't use a segmented control for many options — once it scrolls or wraps, use a select instead.">
                    <div className="inline-flex gap-1 rounded-lg border border-cool-paper-200 dark:border-charcoal bg-cool-paper-100 dark:bg-cool-grey p-1 text-body-small font-semibold text-grey dark:text-light-grey">
                        <span className="rounded-md px-2 py-1.5">NSW</span>
                        <span className="rounded-md px-2 py-1.5">VIC</span>
                        <span className="rounded-md px-2 py-1.5">QLD</span>
                        <span className="rounded-md px-2 py-1.5">SA</span>
                        <span className="rounded-md px-2 py-1.5">WA</span>
                        <span className="rounded-md px-2 py-1.5">TAS</span>
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Page
