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
    { id: 'modal', title: 'Modal dialog' },
    { id: 'confirm', title: 'Confirmation dialog' },
    { id: 'api', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

const ModalDemo = () => {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <button className="button" onClick={() => setOpen(true)}>
                Open dialog
            </button>
            {open && (
                <div
                    className="fixed inset-0 z-modal flex items-center justify-center bg-black/40 p-4"
                    onClick={() => setOpen(false)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Update your details"
                        className="w-full max-w-md rounded-xl bg-white dark:bg-cool-grey p-6 shadow"
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 className="text-heading font-semibold text-navy dark:text-white">
                            Update your details
                        </h2>
                        <p className="mt-2 text-body-small text-grey dark:text-light-grey">
                            We’ll use these details for your next renewal. You can
                            change them again at any time.
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                className="button button--secondary"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </button>
                            <button className="button" onClick={() => setOpen(false)}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const ConfirmDemo = () => {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <button className="button button--secondary" onClick={() => setOpen(true)}>
                Cancel policy
            </button>
            {open && (
                <div
                    className="fixed inset-0 z-modal flex items-center justify-center bg-black/40 p-4"
                    onClick={() => setOpen(false)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Cancel your policy"
                        className="w-full max-w-md rounded-xl bg-white dark:bg-cool-grey p-6 shadow"
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 className="text-heading font-semibold text-navy dark:text-white">
                            Cancel your policy?
                        </h2>
                        <p className="mt-2 text-body-small text-grey dark:text-light-grey">
                            This permanently ends your cover. You can’t undo this
                            action.
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                className="button button--secondary"
                                onClick={() => setOpen(false)}
                            >
                                Keep policy
                            </button>
                            <button
                                className="button button--secondary text-error-red border-error-red focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
                                onClick={() => setOpen(false)}
                            >
                                Cancel policy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Dialog" toc={toc}>
        <PageHeader
            eyebrow="Primitives"
            title="Dialog"
            status="in-review"
            intro="A centred modal dialog that interrupts the flow to capture a focused decision or short task. The page beneath is dimmed by a scrim and made inert while the dialog is open."
        />

        <p className="text-grey dark:text-light-grey">
            This is a proposed primitive identified from patterns on
            bupa.com.au. It is not yet a shipped component — this page is a
            reference spec for adoption.
        </p>

        <Section id="modal" title="Modal dialog">
            <p className="text-grey dark:text-light-grey">
                The dialog renders a fixed scrim over the viewport with a centred
                panel. Clicking the scrim, Cancel or Confirm closes it.
            </p>
            <Example
                caption="A centred modal opened from a button"
                code={`const [open, setOpen] = useState(false)

<button className="button" onClick={() => setOpen(true)}>
  Open dialog
</button>
{open && (
  <div
    className="fixed inset-0 z-modal flex items-center justify-center bg-black/40 p-4"
    onClick={() => setOpen(false)}
  >
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Update your details"
      className="w-full max-w-md rounded-xl bg-white dark:bg-cool-grey p-6 shadow"
      onClick={e => e.stopPropagation()}
    >
      <h2 className="text-heading font-semibold text-navy dark:text-white">
        Update your details
      </h2>
      <p className="mt-2 text-body-small text-grey dark:text-light-grey">
        We’ll use these details for your next renewal.
      </p>
      <div className="mt-6 flex justify-end gap-3">
        <button className="button button--secondary" onClick={() => setOpen(false)}>
          Cancel
        </button>
        <button className="button" onClick={() => setOpen(false)}>
          Confirm
        </button>
      </div>
    </div>
  </div>
)}`}
            >
                <ModalDemo />
            </Example>
        </Section>

        <Section id="confirm" title="Confirmation dialog">
            <p className="text-grey dark:text-light-grey">
                A destructive-confirm variant restates the consequence and styles
                the confirming action in <code className="font-mono text-cyan">error-red</code>{' '}
                so it never reads as the safe default.
            </p>
            <Example
                caption="A destructive confirmation"
                code={`const [open, setOpen] = useState(false)

<button className="button button--secondary" onClick={() => setOpen(true)}>
  Cancel policy
</button>
{open && (
  <div
    className="fixed inset-0 z-modal flex items-center justify-center bg-black/40 p-4"
    onClick={() => setOpen(false)}
  >
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cancel your policy"
      className="w-full max-w-md rounded-xl bg-white dark:bg-cool-grey p-6 shadow"
      onClick={e => e.stopPropagation()}
    >
      <h2 className="text-heading font-semibold text-navy dark:text-white">
        Cancel your policy?
      </h2>
      <p className="mt-2 text-body-small text-grey dark:text-light-grey">
        This permanently ends your cover. You can’t undo this action.
      </p>
      <div className="mt-6 flex justify-end gap-3">
        <button className="button button--secondary" onClick={() => setOpen(false)}>
          Keep policy
        </button>
        <button
          className="button button--secondary text-error-red border-error-red"
          onClick={() => setOpen(false)}
        >
          Cancel policy
        </button>
      </div>
    </div>
  </div>
)}`}
            >
                <ConfirmDemo />
            </Example>
        </Section>

        <Section id="api" title="Props">
            <PropsTable
                label="Prop"
                rows={[
                    {
                        name: 'open',
                        type: 'boolean',
                        required: true,
                        description:
                            'Whether the dialog is rendered. Controlled by the parent.',
                    },
                    {
                        name: 'onClose',
                        type: '() => void',
                        required: true,
                        description:
                            'Called when the user dismisses via scrim click, Escape or Cancel.',
                    },
                    {
                        name: 'title',
                        type: 'string',
                        required: true,
                        description:
                            'The dialog heading, also exposed as its accessible name.',
                    },
                    {
                        name: 'onConfirm',
                        type: '() => void',
                        description:
                            'Called when the confirming action is pressed.',
                    },
                    {
                        name: 'destructive',
                        type: 'boolean',
                        default: 'false',
                        description:
                            'Styles the confirm action in error-red for irreversible actions.',
                    },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <p className="text-grey dark:text-light-grey">
                Move focus to the first interactive element on open and return it
                to the trigger on close. Trap focus within the panel and close on
                the Escape key.
            </p>
            <DoDontGrid>
                <Do note="Keep dialogs short — one decision or a handful of fields. Move focus to the panel on open and restore it to the trigger on close.">
                    <button className="button">Open dialog</button>
                </Do>
                <Dont note="Don’t stack dialogs or use one for long content — link to a full page instead, and never open without a clear way to dismiss.">
                    <button className="button">Open dialog</button>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Page
