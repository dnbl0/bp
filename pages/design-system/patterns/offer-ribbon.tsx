import { useState, useEffect } from 'react'
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
    { id: 'countdown', title: 'Countdown ribbon' },
    { id: 'static', title: 'Static ribbon' },
    { id: 'api', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

interface Remaining {
    days: number
    hours: number
    mins: number
    secs: number
    expired: boolean
}

const getRemaining = (target: number): Remaining => {
    const diff = Math.max(0, target - Date.now())
    return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        mins: Math.floor((diff / 60000) % 60),
        secs: Math.floor((diff / 1000) % 60),
        expired: diff <= 0,
    }
}

const pad = (value: number) => String(value).padStart(2, '0')

// A fixed target so the demo always counts down: 3 days out from mount.
const TARGET = Date.now() + 3 * 86400000 + 5 * 3600000 + 42 * 60000

const CountdownRibbonDemo = () => {
    const [remaining, setRemaining] = useState<Remaining>(() =>
        getRemaining(TARGET)
    )
    const [dismissed, setDismissed] = useState(false)

    useEffect(() => {
        const id = setInterval(() => setRemaining(getRemaining(TARGET)), 1000)
        return () => clearInterval(id)
    }, [])

    if (dismissed) {
        return (
            <button
                className="button button--secondary"
                onClick={() => setDismissed(false)}
            >
                Show offer
            </button>
        )
    }

    return (
        <div className="flex w-full flex-col sm:flex-row sm:flex-wrap items-start sm:items-center sm:justify-between gap-2 sm:gap-4 rounded-lg bg-cyan px-4 sm:px-5 py-3 text-white shadow">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-body-small font-semibold">
                    6 weeks free on new hospital and extras cover.
                </span>
                <span
                    className="flex items-center gap-1 text-caption"
                    aria-live="polite"
                >
                    <span className="opacity-90">Ends in</span>
                    <span className="font-mono font-semibold tabular-nums">
                        {pad(remaining.days)}:{pad(remaining.hours)}:
                        {pad(remaining.mins)}:{pad(remaining.secs)}
                    </span>
                </span>
            </div>
            <button
                type="button"
                aria-label="Dismiss offer"
                onClick={() => setDismissed(true)}
                className="flex-none rounded-md px-2 text-heading leading-none text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
            >
                ×
            </button>
        </div>
    )
}

const StaticRibbonDemo = () => {
    const [dismissed, setDismissed] = useState(false)
    if (dismissed) {
        return (
            <button
                className="button button--secondary"
                onClick={() => setDismissed(false)}
            >
                Show offer
            </button>
        )
    }
    return (
        <div className="flex w-full flex-col sm:flex-row sm:flex-wrap items-start sm:items-center sm:justify-between gap-2 sm:gap-4 rounded-lg bg-cyan px-4 sm:px-5 py-3 text-white shadow">
            <span className="text-body-small font-semibold">
                6 weeks free on new cover — offer ends 30 Jun.
            </span>
            <button
                type="button"
                aria-label="Dismiss offer"
                onClick={() => setDismissed(true)}
                className="flex-none rounded-md px-2 text-heading leading-none text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
            >
                ×
            </button>
        </div>
    )
}

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Offer ribbon" toc={toc}>
        <PageHeader
            eyebrow="Composite patterns"
            title="Offer ribbon"
            status="in-review"
            intro="A full-width promotional banner that surfaces a time-limited offer at the top of a page or funnel. It carries a short piece of offer copy, an optional live countdown to the deadline, and a way to dismiss it."
        />

        <p className="text-grey dark:text-light-grey">
            This is a proposed pattern identified from the bupa.com.au audit. It
            is not yet a shipped component — this page is a reference spec for
            adoption.
        </p>

        <Section id="countdown" title="Countdown ribbon">
            <p className="text-grey dark:text-light-grey">
                The countdown recomputes from a fixed deadline every second and
                renders <code className="font-mono text-cyan">days:hours:mins:secs</code>.
                The interval is cleared when the ribbon unmounts. The dismiss
                control removes the banner.
            </p>
            <Example
                caption="A promo banner counting down to a fixed deadline"
                code={`const [remaining, setRemaining] = useState(() => getRemaining(TARGET))
const [dismissed, setDismissed] = useState(false)

useEffect(() => {
  const id = setInterval(() => setRemaining(getRemaining(TARGET)), 1000)
  return () => clearInterval(id)
}, [])

{!dismissed && (
  <div className="flex w-full flex-wrap items-center justify-between gap-4 rounded-lg bg-cyan px-5 py-3 text-white shadow">
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="text-body-small font-semibold">
        6 weeks free on new hospital and extras cover.
      </span>
      <span className="flex items-center gap-1 text-caption" aria-live="polite">
        <span className="opacity-90">Ends in</span>
        <span className="font-mono font-semibold tabular-nums">
          {pad(remaining.days)}:{pad(remaining.hours)}:{pad(remaining.mins)}:{pad(remaining.secs)}
        </span>
      </span>
    </div>
    <button
      type="button"
      aria-label="Dismiss offer"
      onClick={() => setDismissed(true)}
      className="flex-none rounded-md px-2 text-heading leading-none text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
    >
      ×
    </button>
  </div>
)}`}
            >
                <CountdownRibbonDemo />
            </Example>
        </Section>

        <Section id="static" title="Static ribbon">
            <p className="text-grey dark:text-light-grey">
                Where a live timer would feel like pressure, state the deadline
                as plain text instead. The banner is otherwise identical and
                still dismissible.
            </p>
            <Example
                caption="A static deadline variant without a timer"
                code={`<div className="flex w-full flex-wrap items-center justify-between gap-4 rounded-lg bg-cyan px-5 py-3 text-white shadow">
  <span className="text-body-small font-semibold">
    6 weeks free on new cover — offer ends 30 Jun.
  </span>
  <button
    type="button"
    aria-label="Dismiss offer"
    onClick={() => setDismissed(true)}
    className="flex-none rounded-md px-2 text-heading leading-none text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
  >
    ×
  </button>
</div>`}
            >
                <StaticRibbonDemo />
            </Example>
        </Section>

        <Section id="api" title="Props">
            <PropsTable
                label="Prop"
                rows={[
                    {
                        name: 'message',
                        type: 'string',
                        required: true,
                        description:
                            'The offer copy. Keep it to a single short sentence.',
                    },
                    {
                        name: 'deadline',
                        type: 'Date',
                        description:
                            'Target date. When set, a live countdown is shown; otherwise the banner is static.',
                    },
                    {
                        name: 'onDismiss',
                        type: '() => void',
                        required: true,
                        description:
                            'Called when the member dismisses the ribbon via the close control.',
                    },
                    {
                        name: 'dismissible',
                        type: 'boolean',
                        default: 'true',
                        description:
                            'Whether the close control is shown. A member can always remove the banner.',
                    },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Count down to a real deadline, always provide a dismiss control, and keep white text on bg-cyan for sufficient contrast.">
                    <div className="flex w-full items-center justify-between gap-3 rounded-lg bg-cyan px-3 py-2 text-white">
                        <span className="text-caption font-semibold">
                            Offer ends 30 Jun
                        </span>
                        <span aria-hidden="true" className="text-body-small">
                            ×
                        </span>
                    </div>
                </Do>
                <Dont note="Don't fake urgency with a timer that resets on every visit, omit a way to dismiss, or use low-contrast text that fails to read on the banner.">
                    <div className="flex w-full items-center justify-between gap-3 rounded-lg bg-cyan px-3 py-2">
                        <span className="text-caption font-semibold text-light-grey">
                            Hurry — almost gone!
                        </span>
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Page
