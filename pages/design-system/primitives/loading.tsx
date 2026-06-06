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
    { id: 'skeleton', title: 'Skeleton' },
    { id: 'spinner', title: 'Spinner' },
    { id: 'progress', title: 'Progress bar' },
    { id: 'api', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

const SkeletonCard = () => (
    <div
        className="w-64 rounded-lg border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey p-4 animate-pulse"
        role="status"
        aria-label="Loading content"
    >
        <div className="h-32 w-full rounded-lg bg-cool-paper-200 dark:bg-charcoal" />
        <div className="mt-4 h-4 w-3/4 rounded-full bg-cool-paper-200 dark:bg-charcoal" />
        <div className="mt-2 h-4 w-1/2 rounded-full bg-cool-paper-200 dark:bg-charcoal" />
    </div>
)

const Spinner = () => (
    <div
        className="h-8 w-8 rounded-full border-2 border-cool-paper-200 dark:border-charcoal border-t-cyan animate-spin"
        role="status"
        aria-label="Loading"
    />
)

const ProgressBarDemo = () => {
    const [value, setValue] = useState(60)
    return (
        <div className="flex w-72 flex-col items-stretch gap-3">
            <div
                className="h-2 w-full overflow-hidden rounded-full bg-cool-paper-200 dark:bg-charcoal"
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Loading ${value}%`}
            >
                <div
                    className="h-full rounded-full bg-cyan transition-all"
                    style={{ width: `${value}%` }}
                />
            </div>
            <div className="flex items-center justify-between text-body-small text-grey dark:text-light-grey">
                <span>{value}%</span>
                <button
                    type="button"
                    className="button button--small button--secondary"
                    onClick={() => setValue(v => Math.min(100, v + 20))}
                >
                    Advance
                </button>
            </div>
        </div>
    )
}

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Loading" toc={toc}>
        <PageHeader
            eyebrow="Primitives"
            title="Loading"
            status="in-review"
            intro="Pending-state affordances that reassure people something is happening while content or an action resolves. Three forms cover the common cases: skeletons for page and card loads, a spinner for indeterminate in-place waits, and a progress bar for measurable tasks."
        />

        <p className="text-grey dark:text-light-grey">
            A proposed primitive identified from bupa.com.au, not yet a shipped
            component — this page is a reference spec built from the design
            tokens to guide adoption.
        </p>

        <Section id="skeleton" title="Skeleton">
            <p className="text-grey dark:text-light-grey">
                Grey rounded placeholders mimic the final layout — here a card's
                image and two text lines — with a subtle{' '}
                <code className="font-mono text-cyan">animate-pulse</code> to
                signal activity without distracting motion.
            </p>
            <Example
                caption="A card skeleton with a pulsing placeholder"
                code={`<div
  className="w-64 rounded-lg border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey p-4 animate-pulse"
  role="status"
  aria-label="Loading content"
>
  <div className="h-32 w-full rounded-lg bg-cool-paper-200 dark:bg-charcoal" />
  <div className="mt-4 h-4 w-3/4 rounded-full bg-cool-paper-200 dark:bg-charcoal" />
  <div className="mt-2 h-4 w-1/2 rounded-full bg-cool-paper-200 dark:bg-charcoal" />
</div>`}
            >
                <SkeletonCard />
            </Example>
        </Section>

        <Section id="spinner" title="Spinner">
            <p className="text-grey dark:text-light-grey">
                A bordered circle with one coloured edge, rotated with{' '}
                <code className="font-mono text-cyan">animate-spin</code>. Use it
                for short, indeterminate waits where a skeleton would be overkill.
            </p>
            <Example
                align="center"
                caption="An indeterminate spinner"
                code={`<div
  className="h-8 w-8 rounded-full border-2 border-cool-paper-200 dark:border-charcoal border-t-cyan animate-spin"
  role="status"
  aria-label="Loading"
/>`}
            >
                <Spinner />
            </Example>
        </Section>

        <Section id="progress" title="Progress bar">
            <p className="text-grey dark:text-light-grey">
                A determinate bar — a neutral track with a cyan fill — for tasks
                with measurable progress such as uploads or multi-step forms.
                Press <span className="font-mono">Advance</span> to move it on.
            </p>
            <Example
                align="center"
                caption="A determinate progress bar at 60%"
                code={`const [value, setValue] = useState(60)

<div
  className="h-2 w-full overflow-hidden rounded-full bg-cool-paper-200 dark:bg-charcoal"
  role="progressbar"
  aria-valuenow={value}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label={\`Loading \${value}%\`}
>
  <div
    className="h-full rounded-full bg-cyan transition-all"
    style={{ width: \`\${value}%\` }}
  />
</div>`}
            >
                <ProgressBarDemo />
            </Example>
        </Section>

        <Section id="api" title="Props">
            <PropsTable
                label="Prop"
                rows={[
                    {
                        name: 'variant',
                        type: "'skeleton' | 'spinner' | 'progress'",
                        default: "'spinner'",
                        description:
                            'Which pending-state affordance to render.',
                    },
                    {
                        name: 'value',
                        type: 'number',
                        description:
                            'Completion 0–100 for the progress variant. Omit for an indeterminate spinner.',
                    },
                    {
                        name: 'lines',
                        type: 'number',
                        default: '2',
                        description:
                            'Number of placeholder text lines rendered by the skeleton variant.',
                    },
                    {
                        name: 'label',
                        type: 'string',
                        required: true,
                        description:
                            'Accessible label announced to assistive tech, e.g. "Loading results".',
                    },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Use a skeleton when you know the shape of the content that's loading, so the layout doesn't jump when it arrives.">
                    <SkeletonCard />
                </Do>
                <Dont note="Don't use a spinner for a full page or card load — a skeleton preserves layout and feels faster; reserve the spinner for short in-place waits.">
                    <Spinner />
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Page
