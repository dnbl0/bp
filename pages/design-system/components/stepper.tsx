import { useState } from 'react'
import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Example,
    PropsTable,
} from '../../../styleguide-components/primitives'
import { Stepper } from '../../../components/molecules/Stepper'

const toc = [
    { id: 'example', title: 'Example' },
    { id: 'props', title: 'Props' },
    { id: 'accessibility', title: 'Accessibility' },
]

const steps = [
    { label: 'Your details' },
    { label: 'Choose cover' },
    { label: 'Add extras' },
    { label: 'Review & pay' },
]

const StepperDemo = () => {
    const [current, setCurrent] = useState(2)
    return (
        <div className="flex w-full flex-col gap-6">
            <Stepper steps={steps} current={current} label="Get a quote" />
            <div className="flex items-center justify-center gap-3">
                <button
                    type="button"
                    onClick={() => setCurrent(c => Math.max(1, c - 1))}
                    disabled={current <= 1}
                    className="rounded-md border border-cyan px-4 py-1.5 text-sm font-semibold text-cyan disabled:opacity-50"
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={() =>
                        setCurrent(c => Math.min(steps.length, c + 1))
                    }
                    disabled={current >= steps.length}
                    className="rounded-md bg-cyan px-4 py-1.5 text-sm font-semibold text-white disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Stepper" toc={toc}>
        <PageHeader
            eyebrow="Components · Molecules"
            title="Stepper"
            status="stable"
            intro="A horizontal progress indicator for multi-step flows such as the get-a-quote funnel. Completed steps show a tick, the current step is highlighted, and upcoming steps are muted."
        />

        <Section id="example" title="Example">
            <Example
                caption="Move through the flow to see step states update"
                code={`const [current, setCurrent] = useState(2)

<Stepper
  label="Get a quote"
  current={current}
  steps={[
    { label: 'Your details' },
    { label: 'Choose cover' },
    { label: 'Add extras' },
    { label: 'Review & pay' },
  ]}
/>`}
            >
                <StepperDemo />
            </Example>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                rows={[
                    {
                        name: 'steps',
                        type: 'StepItem[]',
                        required: true,
                        description:
                            'The ordered steps. Each StepItem has a label and an optional description.',
                    },
                    {
                        name: 'current',
                        type: 'number',
                        required: true,
                        description:
                            'The current step, 1-indexed. Earlier steps render as complete, later ones as upcoming.',
                    },
                    {
                        name: 'label',
                        type: 'string',
                        default: "'Progress'",
                        description:
                            'Accessible label for the progress navigation.',
                    },
                ]}
            />
        </Section>

        <Section id="accessibility" title="Accessibility">
            <ul className="list-disc pl-5 space-y-2 text-grey dark:text-light-grey">
                <li>
                    The steps are an ordered list inside a labelled{' '}
                    <span className="font-mono">nav</span>, so the sequence and
                    its length are announced.
                </li>
                <li>
                    The active step carries{' '}
                    <span className="font-mono">
                        aria-current=&quot;step&quot;
                    </span>
                    , and each step appends a visually-hidden status (completed
                    / current) so meaning is not conveyed by colour alone.
                </li>
                <li>
                    The connectors and tick glyphs are{' '}
                    <span className="font-mono">aria-hidden</span> decoration.
                </li>
            </ul>
        </Section>
    </DesignSystemLayout>
)

export default Page
