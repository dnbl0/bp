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
    { id: 'launcher', title: 'Launcher' },
    { id: 'panel', title: 'Chat panel' },
    { id: 'api', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

const ChatIcon = () => (
    <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8 8.38 8.38 0 0 1 8.5-8.5 8.5 8.5 0 0 1 8.5 8.5z" />
    </svg>
)

const CloseIcon = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M18 6 6 18M6 6l12 12" />
    </svg>
)

const SendIcon = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="m22 2-7 20-4-9-9-4 20-7z" />
    </svg>
)

const HelpWidgetDemo = () => {
    const [open, setOpen] = useState(false)
    return (
        <div className="relative h-72 w-full max-w-sm rounded-lg border border-cool-paper-200 dark:border-charcoal bg-cool-paper-50 dark:bg-grey">
            <p className="p-4 text-body-small text-grey dark:text-light-grey">
                Page content sits behind the widget.
            </p>

            {open && (
                <div
                    role="dialog"
                    aria-label="Chat with Bupa"
                    className="absolute bottom-20 right-4 left-4 sm:left-auto sm:w-72 rounded-xl bg-white dark:bg-cool-grey shadow border border-cool-paper-200 dark:border-charcoal overflow-hidden"
                >
                    <div className="flex items-center justify-between gap-2 bg-cyan px-4 py-3">
                        <span className="text-body-small font-semibold text-white">
                            Chat with Bupa
                        </span>
                        <button
                            type="button"
                            aria-label="Close chat"
                            onClick={() => setOpen(false)}
                            className="text-white rounded-full p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
                        >
                            <CloseIcon />
                        </button>
                    </div>

                    <div className="flex flex-col gap-2 p-3">
                        <p className="self-start max-w-[80%] rounded-lg bg-cool-paper-100 dark:bg-grey px-3 py-2 text-body-small text-navy dark:text-white">
                            Hi, I’m the Bupa virtual assistant. How can I help?
                        </p>
                        <p className="self-end max-w-[80%] rounded-lg bg-cyan-50 px-3 py-2 text-body-small text-navy">
                            I’d like to check what my extras cover.
                        </p>
                    </div>

                    <form
                        className="flex items-center gap-2 border-t border-cool-paper-200 dark:border-charcoal p-3"
                        onSubmit={e => e.preventDefault()}
                    >
                        <input
                            type="text"
                            aria-label="Type your message"
                            placeholder="Type your message"
                            className="min-w-0 flex-1 rounded-lg border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-grey px-3 py-2 text-body-small text-navy dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
                        />
                        <button
                            type="submit"
                            aria-label="Send message"
                            className="button button--small flex-none"
                        >
                            <SendIcon />
                        </button>
                    </form>
                </div>
            )}

            <button
                type="button"
                aria-label={open ? 'Close chat' : 'Open chat'}
                aria-expanded={open}
                onClick={() => setOpen(o => !o)}
                className="absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-cyan text-white shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
            >
                {open ? <CloseIcon /> : <ChatIcon />}
            </button>
        </div>
    )
}

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Help widget" toc={toc}>
        <PageHeader
            eyebrow="Composite patterns"
            title="Help widget"
            status="in-review"
            intro="A floating launcher that opens an inline chat panel for live-chat or a virtual assistant. It stays anchored to a corner so help is always one tap away without taking over the page."
        />

        <p className="text-grey dark:text-light-grey">
            This is a proposed pattern identified from the bupa.com.au audit. It
            is not yet a shipped component — this page is a reference spec for
            adoption.
        </p>

        <Section id="launcher" title="Launcher">
            <p className="text-grey dark:text-light-grey">
                A round button anchored to the bottom-right corner toggles the
                panel. In production it is fixed to the viewport; here it is
                contained within the demo box. The icon swaps to a close glyph
                while open.
            </p>
            <Example
                caption="The launcher toggles an inline chat panel"
                code={`const [open, setOpen] = useState(false)

<button
  type="button"
  aria-label={open ? 'Close chat' : 'Open chat'}
  aria-expanded={open}
  onClick={() => setOpen(o => !o)}
  className="absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-cyan text-white shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
>
  {open ? <CloseIcon /> : <ChatIcon />}
</button>`}
            >
                <HelpWidgetDemo />
            </Example>
        </Section>

        <Section id="panel" title="Chat panel">
            <p className="text-grey dark:text-light-grey">
                The panel carries a coloured header with a title and a clear
                close control, a scrollable stream of messages, and a composer.
                Bot bubbles align left on a neutral fill; the person’s replies
                align right in{' '}
                <code className="font-mono text-cyan">bg-cyan-50</code> so the two
                voices read distinctly.
            </p>
            <Example
                caption="Header, distinct message bubbles and a composer"
                code={`<div role="dialog" aria-label="Chat with Bupa" className="rounded-xl bg-white dark:bg-cool-grey shadow border border-cool-paper-200 dark:border-charcoal overflow-hidden">
  <div className="flex items-center justify-between gap-2 bg-cyan px-4 py-3">
    <span className="text-body-small font-semibold text-white">Chat with Bupa</span>
    <button type="button" aria-label="Close chat" onClick={() => setOpen(false)} className="text-white rounded-full p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue">
      <CloseIcon />
    </button>
  </div>

  <div className="flex flex-col gap-2 p-3">
    <p className="self-start max-w-[80%] rounded-lg bg-cool-paper-100 dark:bg-grey px-3 py-2 text-body-small text-navy dark:text-white">
      Hi, I’m the Bupa virtual assistant. How can I help?
    </p>
    <p className="self-end max-w-[80%] rounded-lg bg-cyan-50 px-3 py-2 text-body-small text-navy">
      I’d like to check what my extras cover.
    </p>
  </div>

  <form className="flex items-center gap-2 border-t border-cool-paper-200 dark:border-charcoal p-3" onSubmit={e => e.preventDefault()}>
    <input type="text" aria-label="Type your message" placeholder="Type your message" className="min-w-0 flex-1 rounded-lg border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-grey px-3 py-2 text-body-small text-navy dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue" />
    <button type="submit" aria-label="Send message" className="button button--small flex-none">
      <SendIcon />
    </button>
  </form>
</div>`}
            >
                <HelpWidgetDemo />
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
                            'Whether the chat panel is shown. Controlled by the parent.',
                    },
                    {
                        name: 'onToggle',
                        type: '(open: boolean) => void',
                        required: true,
                        description:
                            'Called with the next open state when the launcher is pressed.',
                    },
                    {
                        name: 'title',
                        type: 'string',
                        default: "'Chat with Bupa'",
                        description:
                            'Panel heading, also exposed as the dialog’s accessible name.',
                    },
                    {
                        name: 'mode',
                        type: "'bot' | 'human'",
                        default: "'bot'",
                        description:
                            'Sets the greeting and label so people know whether they’re talking to an assistant or an agent.',
                    },
                    {
                        name: 'onSend',
                        type: '(message: string) => void',
                        description:
                            'Called with the composed message when the send button or Enter is pressed.',
                    },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <p className="text-grey dark:text-light-grey">
                Keep focus inside the panel while it is open, move focus to the
                input on open, and return it to the launcher on close. The
                launcher must stay reachable by keyboard and never trap pointer
                events over the rest of the page.
            </p>
            <DoDontGrid>
                <Do note="Set expectations up front — say whether it’s a bot or a person, and always offer a clear, labelled close control.">
                    <button
                        type="button"
                        aria-label="Open chat"
                        className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan text-white shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
                    >
                        <ChatIcon />
                    </button>
                </Do>
                <Dont note="Don’t let the widget cover key content or auto-expand over what someone is reading — keep it collapsed until invited.">
                    <div className="relative h-24 w-40 rounded-lg bg-cool-paper-100 dark:bg-grey">
                        <div className="absolute inset-2 rounded-lg bg-cyan/90" />
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Page
