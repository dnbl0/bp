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
    { id: 'date', title: 'Date input' },
    { id: 'dob', title: 'Date of birth' },
    { id: 'file', title: 'File upload' },
    { id: 'api', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

const fieldClass =
    'w-full rounded-lg border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey px-3 py-2 text-navy dark:text-white placeholder:text-disabled-text focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue focus-visible:border-cyan'

const labelClass =
    'block text-body-small font-semibold text-navy dark:text-white mb-1'

const helperClass = 'mt-1 text-caption text-grey dark:text-light-grey'

const DateDemo = () => (
    <div className="w-full max-w-sm">
        <label htmlFor="dfi-start" className={labelClass}>
            Cover start date
        </label>
        <input
            id="dfi-start"
            type="date"
            className={fieldClass}
            aria-describedby="dfi-start-help"
        />
        <p id="dfi-start-help" className={helperClass}>
            Your cover can start from today or any date in the next 90 days.
        </p>
    </div>
)

const DobDemo = () => (
    <div className="w-full max-w-sm">
        <label htmlFor="dfi-dob" className={labelClass}>
            Date of birth
        </label>
        <input
            id="dfi-dob"
            type="date"
            className={fieldClass}
            aria-describedby="dfi-dob-help"
        />
        <p id="dfi-dob-help" className={helperClass}>
            Used to calculate your premium and any Lifetime Health Cover
            loading.
        </p>
    </div>
)

const FileUploadDemo = () => {
    const [file, setFile] = useState<string | null>(null)
    return (
        <div className="w-full max-w-sm">
            {!file && (
                <label
                    htmlFor="dfi-file"
                    className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-cool-paper-200 dark:border-charcoal bg-cool-paper-50 dark:bg-cool-grey px-4 py-6 text-center focus-within:ring-2 focus-within:ring-focus-blue"
                >
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-8 w-8 text-cyan"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 16V4" />
                        <path d="m7 9 5-5 5 5" />
                        <path d="M5 16v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3" />
                    </svg>
                    <span className="text-body-small text-grey dark:text-light-grey">
                        Drag a file here, or
                    </span>
                    <span className="button button--secondary button--small">
                        Choose file
                    </span>
                    <input
                        id="dfi-file"
                        type="file"
                        className="sr-only"
                        onChange={e =>
                            setFile(e.target.files?.[0]?.name ?? null)
                        }
                    />
                </label>
            )}
            {file && (
                <div className="flex items-center justify-between gap-3 rounded-lg border border-cyan bg-cyan-50 dark:bg-cool-grey px-3 py-2">
                    <span className="truncate text-body-small text-navy dark:text-white">
                        {file}
                    </span>
                    <button
                        type="button"
                        aria-label={`Remove ${file}`}
                        onClick={() => setFile(null)}
                        className="shrink-0 rounded-md px-2 py-1 text-caption font-semibold text-error-red focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
                    >
                        Remove
                    </button>
                </div>
            )}
        </div>
    )
}

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Date & file inputs" toc={toc}>
        <PageHeader
            eyebrow="Primitives"
            title="Date & file inputs"
            status="in-review"
            intro="Specialised inputs for dates and document uploads on bupa.com.au — a styled native date picker, a date-of-birth field, and a drag-and-drop file dropzone with a selected-file chip — all matching the standard field styling and keyboard behaviour."
        />

        <p className="text-grey dark:text-light-grey">
            This is a proposed primitive identified across bupa.com.au quote and
            claims forms. It is not yet a shipped component — this page is a
            reference spec, built from the design tokens, to align styling and
            accessibility behaviour before adoption.
        </p>

        <Section id="date" title="Date input">
            <p className="text-grey dark:text-light-grey">
                A native <code className="font-mono text-cyan">date</code> input
                styled to match the standard text field, with a label and helper
                text.
            </p>
            <Example
                caption="A labelled date field with helper text"
                code={`<label htmlFor="start">Cover start date</label>
<input
  id="start"
  type="date"
  aria-describedby="start-help"
/>
<p id="start-help">
  Your cover can start from today or any date in the next 90 days.
</p>`}
            >
                <DateDemo />
            </Example>
        </Section>

        <Section id="dob" title="Date of birth">
            <p className="text-grey dark:text-light-grey">
                For date of birth, prefer a single native date input on mobile
                for its built-in picker. Where a manual entry is needed, split
                into day / month / year fields with the same field styling and a
                shared label.
            </p>
            <Example
                caption="A date-of-birth field"
                code={`<label htmlFor="dob">Date of birth</label>
<input
  id="dob"
  type="date"
  aria-describedby="dob-help"
/>
<p id="dob-help">
  Used to calculate your premium and any Lifetime Health Cover loading.
</p>`}
            >
                <DobDemo />
            </Example>
        </Section>

        <Section id="file" title="File upload">
            <p className="text-grey dark:text-light-grey">
                A drag-and-drop dropzone wrapping a real{' '}
                <code className="font-mono text-cyan">file</code> input. Once a
                file is chosen it collapses to a removable chip.
            </p>
            <Example
                caption="A dropzone and the selected-file chip"
                code={`const [file, setFile] = useState<string | null>(null)

{!file && (
  <label htmlFor="file">
    {/* upload icon */}
    <span>Drag a file here, or</span>
    <span className="button button--secondary button--small">Choose file</span>
    <input
      id="file"
      type="file"
      className="sr-only"
      onChange={e => setFile(e.target.files?.[0]?.name ?? null)}
    />
  </label>
)}
{file && (
  <div>
    <span>{file}</span>
    <button type="button" aria-label={\`Remove \${file}\`} onClick={() => setFile(null)}>
      Remove
    </button>
  </div>
)}`}
            >
                <FileUploadDemo />
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
                        name: 'value',
                        type: 'string',
                        description:
                            'Current value — an ISO date string, or the selected file name.',
                    },
                    {
                        name: 'onChange',
                        type: '(value) => void',
                        required: true,
                        description:
                            'Called with the next date or selected file when the user changes it.',
                    },
                    {
                        name: 'min / max',
                        type: 'string',
                        description:
                            'Earliest / latest selectable date for the date input (ISO format).',
                    },
                    {
                        name: 'accept',
                        type: 'string',
                        description:
                            'Comma-separated file types the upload will accept, e.g. ".pdf,.jpg".',
                    },
                    {
                        name: 'helperText',
                        type: 'string',
                        description:
                            'Supporting hint shown below the field and linked via aria-describedby.',
                    },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Use a native date input so users get the platform date picker, and explain the allowed range in helper text.">
                    <div className="w-full max-w-xs">
                        <label htmlFor="dfi-do" className={labelClass}>
                            Cover start date
                        </label>
                        <input id="dfi-do" type="date" className={fieldClass} />
                        <p className={helperClass}>
                            Any date in the next 90 days.
                        </p>
                    </div>
                </Do>
                <Dont note="Don't ask for a date as free text — formats are ambiguous and fail validation.">
                    <div className="w-full max-w-xs">
                        <label htmlFor="dfi-dont" className={labelClass}>
                            Cover start date
                        </label>
                        <input
                            id="dfi-dont"
                            type="text"
                            placeholder="dd/mm/yyyy"
                            className={fieldClass}
                        />
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Page
