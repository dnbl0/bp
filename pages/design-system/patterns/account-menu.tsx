import { useEffect, useRef, useState } from 'react'
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
    { id: 'logged-out', title: 'Logged out' },
    { id: 'logged-in', title: 'Logged in' },
    { id: 'api', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

const LoggedOutDemo = () => (
    <div className="flex items-center gap-3">
        <a href="#" className="button">
            Log in
        </a>
        <a href="#" className="button button--secondary">
            Join
        </a>
    </div>
)

const menuItems = ['My cover', 'Claims', 'Settings']

const AccountMenuDemo = () => {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false)
        }
        const onClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node))
                setOpen(false)
        }
        document.addEventListener('keydown', onKey)
        document.addEventListener('mousedown', onClick)
        return () => {
            document.removeEventListener('keydown', onKey)
            document.removeEventListener('mousedown', onClick)
        }
    }, [])

    return (
        <div ref={ref} className="relative inline-block">
            <button
                type="button"
                aria-expanded={open}
                aria-haspopup="menu"
                aria-label="Account menu for Jamie Lee"
                onClick={() => setOpen(!open)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan text-body-small font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
            >
                JL
            </button>
            {open && (
                <ul
                    role="menu"
                    aria-label="Account"
                    className="absolute right-0 z-dropdown mt-1 min-w-[200px] rounded-xl border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey p-2 shadow"
                >
                    <li role="none" className="px-3 py-2">
                        <p className="text-body-small font-semibold text-navy dark:text-white">
                            Jamie Lee
                        </p>
                        <p className="text-caption text-grey dark:text-light-grey">
                            Member no. 1234 5678
                        </p>
                    </li>
                    <li role="none">
                        <div className="my-1 border-t border-cool-paper-200 dark:border-charcoal" />
                    </li>
                    {menuItems.map(label => (
                        <li key={label} role="none">
                            <a
                                href="#"
                                role="menuitem"
                                className="block rounded-md px-3 py-2 text-body-small text-navy dark:text-white hover:bg-cool-paper-100 dark:hover:bg-grey focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                    <li role="none">
                        <div className="my-1 border-t border-cool-paper-200 dark:border-charcoal" />
                    </li>
                    <li role="none">
                        <a
                            href="#"
                            role="menuitem"
                            className="block rounded-md px-3 py-2 text-body-small font-semibold text-error-red hover:bg-error-red/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
                        >
                            Log out
                        </a>
                    </li>
                </ul>
            )}
        </div>
    )
}

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Account menu" toc={toc}>
        <PageHeader
            eyebrow="Composite patterns"
            title="Account menu"
            status="in-review"
            intro="The member authentication control in the header. It shows a log in and join pair to signed-out visitors, and an avatar that opens a menu of member shortcuts once signed in. Its state is the clearest signal of whether a member is logged in."
        />

        <p className="text-grey dark:text-light-grey">
            This is a proposed pattern identified from the bupa.com.au audit. It
            is not yet a shipped component — this page is a reference spec for
            adoption.
        </p>

        <Section id="logged-out" title="Logged out">
            <p className="text-grey dark:text-light-grey">
                Signed-out visitors see a primary{' '}
                <code className="font-mono text-cyan">Log in</code> paired with a
                secondary <code className="font-mono text-cyan">Join</code>, so
                returning members and new members each have an obvious path.
            </p>
            <Example
                caption="Log in and join for signed-out visitors"
                code={`<div className="flex items-center gap-3">
  <a href="#" className="button">Log in</a>
  <a href="#" className="button button--secondary">Join</a>
</div>`}
            >
                <LoggedOutDemo />
            </Example>
        </Section>

        <Section id="logged-in" title="Logged in">
            <p className="text-grey dark:text-light-grey">
                Once signed in, the control becomes an initials avatar that opens
                a <code className="font-mono text-cyan">menu</code> of{' '}
                <code className="font-mono text-cyan">menuitem</code> shortcuts.
                It closes on Escape or an outside click, and Log out sits last,
                separated and coloured in error-red.
            </p>
            <Example
                caption="An avatar that opens the member menu"
                code={`const [open, setOpen] = useState(false)

<button
  type="button"
  aria-expanded={open}
  aria-haspopup="menu"
  aria-label="Account menu for Jamie Lee"
  onClick={() => setOpen(!open)}
  className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan text-body-small font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
>
  JL
</button>
{open && (
  <ul role="menu" aria-label="Account"
    className="absolute right-0 z-dropdown mt-1 min-w-[200px] rounded-xl border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey p-2 shadow">
    {['My cover', 'Claims', 'Settings'].map(label => (
      <li key={label} role="none">
        <a href="#" role="menuitem"
          className="block rounded-md px-3 py-2 text-body-small text-navy dark:text-white hover:bg-cool-paper-100 dark:hover:bg-grey focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue">
          {label}
        </a>
      </li>
    ))}
    <li role="none"><div className="my-1 border-t border-cool-paper-200 dark:border-charcoal" /></li>
    <li role="none">
      <a href="#" role="menuitem"
        className="block rounded-md px-3 py-2 text-body-small font-semibold text-error-red hover:bg-error-red/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue">
        Log out
      </a>
    </li>
  </ul>
)}`}
            >
                <AccountMenuDemo />
            </Example>
        </Section>

        <Section id="api" title="Props">
            <PropsTable
                label="Prop"
                rows={[
                    {
                        name: 'isLoggedIn',
                        type: 'boolean',
                        required: true,
                        description:
                            'Switches between the logged-out buttons and the logged-in avatar.',
                    },
                    {
                        name: 'member',
                        type: '{ name: string; initials: string }',
                        description:
                            'Member identity used for the avatar initials and menu header.',
                    },
                    {
                        name: 'items',
                        type: 'MenuItem[]',
                        description:
                            'Shortcuts shown in the menu, e.g. My cover, Claims and Settings.',
                    },
                    {
                        name: 'open',
                        type: 'boolean',
                        description:
                            'Whether the menu is open. Controlled by the parent.',
                    },
                    {
                        name: 'onOpenChange',
                        type: '(open: boolean) => void',
                        description:
                            'Called when the avatar is clicked or the menu is dismissed.',
                    },
                    {
                        name: 'onLogout',
                        type: '() => void',
                        description:
                            'Called when the destructive Log out item is chosen.',
                    },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <p className="text-grey dark:text-light-grey">
                The control is the primary signal of auth state, so the
                logged-out and logged-in forms must look unmistakably different.
                Keep Log out visually separated from navigation items so it is
                never chosen by accident.
            </p>
            <DoDontGrid>
                <Do note="Signal auth state clearly — show the member's avatar when signed in, and place Log out last, separated and coloured as destructive.">
                    <AccountMenuDemo />
                </Do>
                <Dont note="Don't bury Log out among the navigation items or style it like the others — a mis-tap signs the member out unexpectedly.">
                    <a
                        href="#"
                        className="block rounded-md px-3 py-2 text-body-small text-navy dark:text-white"
                    >
                        Log out
                    </a>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Page
