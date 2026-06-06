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
    { id: 'text-input', title: 'Text input' },
    { id: 'textarea', title: 'Textarea' },
    { id: 'select', title: 'Select' },
    { id: 'checkbox', title: 'Checkbox' },
    { id: 'radio', title: 'Radio' },
    { id: 'states', title: 'States' },
    { id: 'api', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

const fieldClass =
    'w-full rounded-lg border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey px-3 py-2 text-navy dark:text-white placeholder:text-disabled-text focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue focus-visible:border-cyan'

const labelClass =
    'block text-body-small font-semibold text-navy dark:text-white mb-1'

const helperClass = 'mt-1 text-caption text-grey dark:text-light-grey'

const TextInputDemo = () => (
    <div className="w-full max-w-sm">
        <label htmlFor="fc-email" className={labelClass}>
            Email address
        </label>
        <input
            id="fc-email"
            type="email"
            className={fieldClass}
            placeholder="you@example.com"
            aria-describedby="fc-email-help"
        />
        <p id="fc-email-help" className={helperClass}>
            We&apos;ll only use this to send your quote.
        </p>
    </div>
)

const TextareaDemo = () => (
    <div className="w-full max-w-sm">
        <label htmlFor="fc-notes" className={labelClass}>
            Anything else we should know?
        </label>
        <textarea
            id="fc-notes"
            rows={3}
            className={fieldClass}
            placeholder="Add any details here"
        />
    </div>
)

const SelectDemo = () => (
    <div className="w-full max-w-sm">
        <label htmlFor="fc-state" className={labelClass}>
            State or territory
        </label>
        <select id="fc-state" className={fieldClass} defaultValue="">
            <option value="" disabled>
                Select a state
            </option>
            <option>New South Wales</option>
            <option>Victoria</option>
            <option>Queensland</option>
        </select>
    </div>
)

const CheckboxDemo = () => {
    const [agree, setAgree] = useState(false)
    return (
        <label
            htmlFor="fc-agree"
            className="flex items-start gap-3 cursor-pointer max-w-sm"
        >
            <input
                id="fc-agree"
                type="checkbox"
                checked={agree}
                onChange={e => setAgree(e.target.checked)}
                className="mt-1 h-5 w-5 rounded border-cool-paper-200 text-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
            />
            <span className="text-body-small text-navy dark:text-white">
                I agree to receive my quote by email.
            </span>
        </label>
    )
}

const RadioDemo = () => {
    const [cover, setCover] = useState('hospital')
    return (
        <fieldset className="max-w-sm">
            <legend className={labelClass}>Cover type</legend>
            <div className="space-y-2">
                {[
                    { id: 'hospital', label: 'Hospital' },
                    { id: 'extras', label: 'Extras' },
                    { id: 'combined', label: 'Combined' },
                ].map(opt => (
                    <label
                        key={opt.id}
                        htmlFor={`fc-cover-${opt.id}`}
                        className="flex items-center gap-3 cursor-pointer"
                    >
                        <input
                            id={`fc-cover-${opt.id}`}
                            type="radio"
                            name="fc-cover"
                            value={opt.id}
                            checked={cover === opt.id}
                            onChange={() => setCover(opt.id)}
                            className="h-5 w-5 border-cool-paper-200 text-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
                        />
                        <span className="text-body-small text-navy dark:text-white">
                            {opt.label}
                        </span>
                    </label>
                ))}
            </div>
        </fieldset>
    )
}

const StatesDemo = () => (
    <div className="grid gap-6 sm:grid-cols-3 w-full">
        <div>
            <label htmlFor="fc-focus" className={labelClass}>
                Focus
            </label>
            <input
                id="fc-focus"
                type="text"
                autoFocus
                defaultValue="Tabbed into"
                className={`${fieldClass} ring-2 ring-focus-blue border-cyan`}
            />
        </div>
        <div>
            <label htmlFor="fc-error" className={labelClass}>
                Error
            </label>
            <input
                id="fc-error"
                type="text"
                defaultValue="not-an-email"
                aria-invalid="true"
                aria-describedby="fc-error-msg"
                className={`${fieldClass} border-error-red focus-visible:ring-error-red`}
            />
            <p id="fc-error-msg" className="mt-1 text-caption text-error-red">
                Enter a valid email address.
            </p>
        </div>
        <div>
            <label htmlFor="fc-disabled" className={labelClass}>
                Disabled
            </label>
            <input
                id="fc-disabled"
                type="text"
                disabled
                defaultValue="Not editable"
                className={`${fieldClass} opacity-60 cursor-not-allowed`}
            />
        </div>
    </div>
)

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Form controls" toc={toc}>
        <PageHeader
            eyebrow="Primitives"
            title="Form controls"
            status="in-review"
            intro="The base text, choice and selection inputs that make up every form on bupa.com.au — each with a label, consistent 8px-radius field, focus ring and error treatment."
        />

        <p className="text-grey dark:text-light-grey">
            This is a proposed primitive identified across bupa.com.au quote and
            contact forms. It is not yet a shipped component — this page is a
            reference spec, built from the design tokens, to align the styling
            and accessibility behaviour before adoption.
        </p>

        <Section id="text-input" title="Text input">
            <Example
                caption="A labelled text field with helper text"
                code={`<label htmlFor="email">Email address</label>
<input
  id="email"
  type="email"
  placeholder="you@example.com"
  aria-describedby="email-help"
/>
<p id="email-help">We'll only use this to send your quote.</p>`}
            >
                <TextInputDemo />
            </Example>
        </Section>

        <Section id="textarea" title="Textarea">
            <Example
                caption="A multi-line text field"
                code={`<label htmlFor="notes">Anything else we should know?</label>
<textarea id="notes" rows={3} placeholder="Add any details here" />`}
            >
                <TextareaDemo />
            </Example>
        </Section>

        <Section id="select" title="Select">
            <Example
                caption="A native select with a placeholder option"
                code={`<label htmlFor="state">State or territory</label>
<select id="state" defaultValue="">
  <option value="" disabled>Select a state</option>
  <option>New South Wales</option>
  <option>Victoria</option>
  <option>Queensland</option>
</select>`}
            >
                <SelectDemo />
            </Example>
        </Section>

        <Section id="checkbox" title="Checkbox">
            <Example
                caption="A controlled checkbox with an associated label"
                code={`const [agree, setAgree] = useState(false)

<label htmlFor="agree">
  <input
    id="agree"
    type="checkbox"
    checked={agree}
    onChange={e => setAgree(e.target.checked)}
  />
  I agree to receive my quote by email.
</label>`}
            >
                <CheckboxDemo />
            </Example>
        </Section>

        <Section id="radio" title="Radio">
            <Example
                caption="A radio group inside a fieldset/legend"
                code={`const [cover, setCover] = useState('hospital')

<fieldset>
  <legend>Cover type</legend>
  {options.map(opt => (
    <label key={opt.id} htmlFor={\`cover-\${opt.id}\`}>
      <input
        id={\`cover-\${opt.id}\`}
        type="radio"
        name="cover"
        checked={cover === opt.id}
        onChange={() => setCover(opt.id)}
      />
      {opt.label}
    </label>
  ))}
</fieldset>`}
            >
                <RadioDemo />
            </Example>
        </Section>

        <Section id="states" title="States">
            <p className="text-grey dark:text-light-grey">
                Every field shares the same focus, error and disabled treatment.
                Focus shows a 2px focus-blue ring for keyboard users; errors
                recolour the border and add a red message wired up with{' '}
                <code className="font-mono text-cyan">aria-describedby</code>.
            </p>
            <Example
                caption="Focus, error and disabled states"
                code={`{/* Focus */}
<input className="... focus-visible:ring-2 focus-visible:ring-focus-blue" />

{/* Error */}
<input aria-invalid="true" aria-describedby="err" className="... border-error-red" />
<p id="err" className="text-error-red">Enter a valid email address.</p>

{/* Disabled */}
<input disabled className="... opacity-60 cursor-not-allowed" />`}
            >
                <StatesDemo />
            </Example>
        </Section>

        <Section id="api" title="Props">
            <PropsTable
                rows={[
                    {
                        name: 'label',
                        type: 'string',
                        required: true,
                        description:
                            'Visible label, associated to the control with htmlFor/id.',
                    },
                    {
                        name: 'type',
                        type: "'text' | 'email' | 'tel' | …",
                        default: "'text'",
                        description:
                            'Native input type. Use the most specific type for better mobile keyboards.',
                    },
                    {
                        name: 'helperText',
                        type: 'string',
                        description:
                            'Supporting hint shown below the field and linked via aria-describedby.',
                    },
                    {
                        name: 'error',
                        type: 'string',
                        description:
                            'Error message. Sets aria-invalid and recolours the field red when present.',
                    },
                    {
                        name: 'disabled',
                        type: 'boolean',
                        description: 'Disables interaction and dims the control.',
                    },
                    {
                        name: 'required',
                        type: 'boolean',
                        description:
                            'Marks the field as required for validation and assistive tech.',
                    },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Keep the label visible above the field and link errors with aria-describedby so screen readers announce them.">
                    <div className="w-full max-w-xs">
                        <label htmlFor="fc-do" className={labelClass}>
                            Email address
                        </label>
                        <input
                            id="fc-do"
                            type="email"
                            defaultValue="bad-email"
                            aria-invalid="true"
                            aria-describedby="fc-do-msg"
                            className={`${fieldClass} border-error-red`}
                        />
                        <p
                            id="fc-do-msg"
                            className="mt-1 text-caption text-error-red"
                        >
                            Enter a valid email address.
                        </p>
                    </div>
                </Do>
                <Dont note="Don't rely on placeholder text as the label — it disappears on input and fails contrast and accessibility checks.">
                    <div className="w-full max-w-xs">
                        <input
                            type="email"
                            placeholder="Email address"
                            className={fieldClass}
                        />
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Page
