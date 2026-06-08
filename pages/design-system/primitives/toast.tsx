import { useEffect, useState } from 'react'
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
    { id: 'example', title: 'Stacking toasts' },
    { id: 'variants', title: 'Variants' },
    { id: 'api', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

type Variant = 'success' | 'error' | 'info'

interface ToastItem {
    id: number
    variant: Variant
    message: string
}

const accent: Record<Variant, string> = {
    success: 'border-success-green text-success-green',
    error: 'border-error-red text-error-red',
    info: 'border-cyan text-cyan',
}

const Toast = ({
    toast,
    onDismiss,
}: {
    toast: ToastItem
    onDismiss: (id: number) => void
}) => {
    useEffect(() => {
        const timer = setTimeout(() => onDismiss(toast.id), 4000)
        return () => clearTimeout(timer)
    }, [toast.id, onDismiss])

    return (
        <div
            role="status"
            aria-live="polite"
            className={`flex items-start gap-3 rounded-lg border-l-4 bg-white dark:bg-cool-grey px-4 py-3 shadow ${accent[toast.variant]}`}
        >
            <span className="text-body-small text-navy dark:text-white">
                {toast.message}
            </span>
            <button
                onClick={() => onDismiss(toast.id)}
                aria-label="Dismiss notification"
                className="ml-auto text-grey dark:text-light-grey focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue rounded"
            >
                ✕
            </button>
        </div>
    )
}

const ToastDemo = () => {
    const [toasts, setToasts] = useState<ToastItem[]>([])
    const dismiss = (id: number) =>
        setToasts(current => current.filter(t => t.id !== id))
    const push = (variant: Variant, message: string) =>
        setToasts(current => [...current, { id: Date.now(), variant, message }])

    return (
        <div>
            <div className="flex flex-wrap gap-3">
                <button
                    className="button button--secondary"
                    onClick={() => push('success', 'Your details were saved.')}
                >
                    Success
                </button>
                <button
                    className="button button--secondary"
                    onClick={() => push('error', 'We couldn’t save your details.')}
                >
                    Error
                </button>
                <button
                    className="button button--secondary"
                    onClick={() => push('info', 'Your session expires in 5 minutes.')}
                >
                    Info
                </button>
            </div>
            <div className="fixed bottom-4 right-4 z-modal flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2">
                {toasts.map(toast => (
                    <Toast key={toast.id} toast={toast} onDismiss={dismiss} />
                ))}
            </div>
        </div>
    )
}

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Toast" toc={toc}>
        <PageHeader
            eyebrow="Primitives"
            title="Toast"
            status="in-review"
            intro="Transient notifications that confirm an action or surface a brief system message, then dismiss themselves. They stack in a fixed region and never block the page."
        />

        <p className="text-grey dark:text-light-grey">
            This is a proposed primitive identified from patterns on
            bupa.com.au. It is not yet a shipped component — this page is a
            reference spec for adoption.
        </p>

        <Section id="example" title="Stacking toasts">
            <p className="text-grey dark:text-light-grey">
                Toasts collect in a fixed bottom-right stack. Each auto-dismisses
                after four seconds, and the timer is cleared on unmount. They can
                also be dismissed manually.
            </p>
            <Example
                caption="Pushing toasts onto a stack"
                code={`const [toasts, setToasts] = useState<ToastItem[]>([])
const dismiss = (id: number) =>
  setToasts(current => current.filter(t => t.id !== id))
const push = (variant: Variant, message: string) =>
  setToasts(current => [...current, { id: Date.now(), variant, message }])

// Each toast clears its own timer on unmount
useEffect(() => {
  const timer = setTimeout(() => onDismiss(toast.id), 4000)
  return () => clearTimeout(timer)
}, [toast.id, onDismiss])

<div className="fixed bottom-4 right-4 z-modal flex w-80 flex-col gap-2">
  {toasts.map(toast => (
    <Toast key={toast.id} toast={toast} onDismiss={dismiss} />
  ))}
</div>`}
            >
                <ToastDemo />
            </Example>
        </Section>

        <Section id="variants" title="Variants">
            <p className="text-grey dark:text-light-grey">
                Three variants colour the accent border:{' '}
                <code className="font-mono text-cyan">success</code> (success-green),{' '}
                <code className="font-mono text-cyan">error</code> (error-red) and{' '}
                <code className="font-mono text-cyan">info</code> (cyan).
            </p>
            <Example
                caption="The three toast variants"
                code={`<div role="status" aria-live="polite"
  className="border-l-4 border-success-green text-success-green …">
  Your details were saved.
</div>
<div role="status" aria-live="polite"
  className="border-l-4 border-error-red text-error-red …">
  We couldn’t save your details.
</div>
<div role="status" aria-live="polite"
  className="border-l-4 border-cyan text-cyan …">
  Your session expires in 5 minutes.
</div>`}
            >
                <div className="flex w-full max-w-sm flex-col gap-2">
                    <div className="flex items-start gap-3 rounded-lg border-l-4 border-success-green bg-white dark:bg-cool-grey px-4 py-3 shadow">
                        <span className="text-body-small text-navy dark:text-white">
                            Your details were saved.
                        </span>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg border-l-4 border-error-red bg-white dark:bg-cool-grey px-4 py-3 shadow">
                        <span className="text-body-small text-navy dark:text-white">
                            We couldn’t save your details.
                        </span>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg border-l-4 border-cyan bg-white dark:bg-cool-grey px-4 py-3 shadow">
                        <span className="text-body-small text-navy dark:text-white">
                            Your session expires in 5 minutes.
                        </span>
                    </div>
                </div>
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
                        description: 'The notification text shown to the user.',
                    },
                    {
                        name: 'variant',
                        type: "'success' | 'error' | 'info'",
                        default: "'info'",
                        description: 'Sets the accent colour and intent of the toast.',
                    },
                    {
                        name: 'duration',
                        type: 'number',
                        default: '4000',
                        description:
                            'Milliseconds before the toast auto-dismisses. Use 0 to persist.',
                    },
                    {
                        name: 'onDismiss',
                        type: '(id: number) => void',
                        required: true,
                        description:
                            'Removes the toast, called on timeout or manual dismiss.',
                    },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Use toasts for brief, non-critical confirmations like “Saved”. Keep the message to one line and let it self-dismiss.">
                    <div className="flex items-start gap-3 rounded-lg border-l-4 border-success-green bg-white dark:bg-cool-grey px-4 py-3 shadow">
                        <span className="text-body-small text-navy dark:text-white">
                            Your details were saved.
                        </span>
                    </div>
                </Do>
                <Dont note="Don’t put errors that need a decision or long text in a toast — use an inline message or a dialog the user must acknowledge.">
                    <div className="flex items-start gap-3 rounded-lg border-l-4 border-error-red bg-white dark:bg-cool-grey px-4 py-3 shadow">
                        <span className="text-body-small text-navy dark:text-white">
                            Payment failed. Retry now?
                        </span>
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Page
