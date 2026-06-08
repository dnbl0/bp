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
    { id: 'mega', title: 'Mega menu' },
    { id: 'simple', title: 'Simple dropdown' },
    { id: 'api', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

type MenuItem = { label: string; href: string }
type MenuGroup = { heading: string; items: MenuItem[] }

const navItems: {
    id: string
    label: string
    groups: MenuGroup[]
    promo?: { title: string; body: string; cta: string }
}[] = [
    {
        id: 'health',
        label: 'Health insurance',
        groups: [
            {
                heading: 'Cover for you',
                items: [
                    { label: 'Hospital cover', href: '#' },
                    { label: 'Extras cover', href: '#' },
                    { label: 'Combined cover', href: '#' },
                ],
            },
            {
                heading: 'Life stage',
                items: [
                    { label: 'Singles', href: '#' },
                    { label: 'Couples', href: '#' },
                    { label: 'Families', href: '#' },
                ],
            },
            {
                heading: 'Manage',
                items: [
                    { label: 'Make a claim', href: '#' },
                    { label: 'Update details', href: '#' },
                    { label: 'Renew cover', href: '#' },
                ],
            },
        ],
        promo: {
            title: 'Switch and save',
            body: 'Compare your cover and get 6 weeks free on new combined policies.',
            cta: 'Get a quote',
        },
    },
    {
        id: 'provider',
        label: 'Find a provider',
        groups: [
            {
                heading: 'By type',
                items: [
                    { label: 'Dentists', href: '#' },
                    { label: 'Optical', href: '#' },
                    { label: 'Physio', href: '#' },
                ],
            },
            {
                heading: 'Members First',
                items: [
                    { label: 'How it works', href: '#' },
                    { label: 'Find a clinic', href: '#' },
                ],
            },
        ],
    },
    {
        id: 'about',
        label: 'About',
        groups: [
            {
                heading: 'Bupa',
                items: [
                    { label: 'Who we are', href: '#' },
                    { label: 'Newsroom', href: '#' },
                    { label: 'Careers', href: '#' },
                ],
            },
        ],
    },
]

const MegaMenuDemo = () => {
    const [open, setOpen] = useState<string | null>(null)
    const navRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(null)
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [])

    return (
        <div
            ref={navRef}
            className="relative w-full"
            onMouseLeave={() => setOpen(null)}
        >
            <nav
                aria-label="Primary"
                className="flex items-center gap-1 rounded-lg border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey px-2 py-1"
            >
                {navItems.map(item => (
                    <button
                        key={item.id}
                        type="button"
                        aria-expanded={open === item.id}
                        aria-haspopup="true"
                        onMouseEnter={() => setOpen(item.id)}
                        onFocus={() => setOpen(item.id)}
                        onClick={() => setOpen(open === item.id ? null : item.id)}
                        className="rounded-md px-3 py-2 text-body-small font-semibold text-navy dark:text-white hover:bg-cool-paper-100 dark:hover:bg-grey focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
                    >
                        {item.label}
                    </button>
                ))}
            </nav>

            {navItems.map(
                item =>
                    open === item.id && (
                        <div
                            key={item.id}
                            role="region"
                            aria-label={item.label}
                            className="absolute left-0 right-0 z-dropdown mt-1 rounded-xl border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey p-3 sm:p-6 shadow"
                        >
                            <div className="flex flex-wrap gap-3 sm:gap-8">
                                {item.groups.map(group => (
                                    <div key={group.heading} className="min-w-[120px] sm:min-w-[140px]">
                                        <h3 className="text-caption font-semibold uppercase tracking-wide text-disabled-text dark:text-light-grey">
                                            {group.heading}
                                        </h3>
                                        <ul className="mt-3 space-y-2">
                                            {group.items.map(link => (
                                                <li key={link.label}>
                                                    <a
                                                        href={link.href}
                                                        className="text-body-small text-grey dark:text-light-grey hover:text-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue rounded"
                                                    >
                                                        {link.label}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                                {item.promo && (
                                    <div className="ml-auto max-w-xs rounded-lg bg-cyan-50 dark:bg-grey p-4">
                                        <h3 className="text-heading-s font-semibold text-navy dark:text-white">
                                            {item.promo.title}
                                        </h3>
                                        <p className="mt-2 text-body-small text-grey dark:text-light-grey">
                                            {item.promo.body}
                                        </p>
                                        <button className="button button--small mt-3">
                                            {item.promo.cta}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
            )}
        </div>
    )
}

const SimpleDropdownDemo = () => {
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
                aria-haspopup="true"
                onClick={() => setOpen(!open)}
                className="rounded-md px-3 py-2 text-body-small font-semibold text-navy dark:text-white hover:bg-cool-paper-100 dark:hover:bg-grey focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
            >
                About ▾
            </button>
            {open && (
                <ul
                    className="absolute left-0 z-dropdown mt-1 min-w-[140px] sm:min-w-[180px] rounded-xl border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey p-2 shadow"
                >
                    {['Who we are', 'Newsroom', 'Careers'].map(label => (
                        <li key={label}>
                            <a
                                href="#"
                                className="block rounded-md px-3 py-2 text-body-small text-grey dark:text-light-grey hover:bg-cool-paper-100 dark:hover:bg-grey focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Mega menu" toc={toc}>
        <PageHeader
            eyebrow="Composite patterns"
            title="Mega menu"
            status="in-review"
            intro="A full-width flyout panel that reveals grouped destinations under a top-level navigation item. Best for broad sections with many links that benefit from being organised into labelled columns."
        />

        <p className="text-grey dark:text-light-grey">
            This is a proposed pattern identified from the bupa.com.au audit. It
            is not yet a shipped component — this page is a reference spec for
            adoption.
        </p>

        <Section id="mega" title="Mega menu">
            <p className="text-grey dark:text-light-grey">
                Hovering, focusing or clicking a top-level trigger opens a panel
                of 2–4 link columns under bold group headings, with an optional
                featured promo card. Triggers are real buttons, and Escape closes
                the panel.
            </p>
            <Example
                caption="A multi-column flyout opened from the nav bar"
                code={`const [open, setOpen] = useState<string | null>(null)

<nav aria-label="Primary" className="flex items-center gap-1 ...">
  {navItems.map(item => (
    <button
      key={item.id}
      type="button"
      aria-expanded={open === item.id}
      aria-haspopup="true"
      onMouseEnter={() => setOpen(item.id)}
      onFocus={() => setOpen(item.id)}
      onClick={() => setOpen(open === item.id ? null : item.id)}
      className="... text-navy dark:text-white hover:bg-cool-paper-100 dark:hover:bg-grey focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
    >
      {item.label}
    </button>
  ))}
</nav>

{open === item.id && (
  <div role="region" aria-label={item.label}
    className="absolute left-0 right-0 z-dropdown mt-1 rounded-xl border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey p-6 shadow">
    <div className="flex flex-wrap gap-8">
      {item.groups.map(group => (
        <div key={group.heading}>
          <h3 className="text-caption font-semibold uppercase tracking-wide text-disabled-text dark:text-light-grey">
            {group.heading}
          </h3>
          <ul className="mt-3 space-y-2">
            {group.items.map(link => (
              <li key={link.label}>
                <a href={link.href} className="text-body-small text-grey dark:text-light-grey hover:text-cyan">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {item.promo && (
        <div className="ml-auto max-w-xs rounded-lg bg-cyan-50 dark:bg-grey p-4">
          <h3 className="text-heading-s font-semibold text-navy dark:text-white">{item.promo.title}</h3>
          <p className="mt-2 text-body-small text-grey dark:text-light-grey">{item.promo.body}</p>
          <button className="button button--small mt-3">{item.promo.cta}</button>
        </div>
      )}
    </div>
  </div>
)}`}
            >
                <MegaMenuDemo />
            </Example>
        </Section>

        <Section id="simple" title="Simple dropdown">
            <p className="text-grey dark:text-light-grey">
                When a section has only a handful of links, fall back to a
                single-column dropdown. It shares the same trigger semantics and
                closes on Escape or an outside click.
            </p>
            <Example
                caption="A single-column dropdown fallback"
                code={`const [open, setOpen] = useState(false)

<button
  type="button"
  aria-expanded={open}
  aria-haspopup="true"
  onClick={() => setOpen(!open)}
  className="... focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
>
  About ▾
</button>
{open && (
  <ul className="absolute left-0 z-dropdown mt-1 min-w-[180px] rounded-xl border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey p-2 shadow">
    {['Who we are', 'Newsroom', 'Careers'].map(label => (
      <li key={label}>
        <a href="#" className="block rounded-md px-3 py-2 text-body-small text-grey dark:text-light-grey hover:bg-cool-paper-100 dark:hover:bg-grey">
          {label}
        </a>
      </li>
    ))}
  </ul>
)}`}
            >
                <SimpleDropdownDemo />
            </Example>
        </Section>

        <Section id="api" title="Props">
            <PropsTable
                label="Prop"
                rows={[
                    {
                        name: 'items',
                        type: 'MenuItem[]',
                        required: true,
                        description:
                            'Top-level navigation entries, each with its own groups of links.',
                    },
                    {
                        name: 'openId',
                        type: 'string | null',
                        required: true,
                        description:
                            'Id of the currently open item. Controlled by the parent.',
                    },
                    {
                        name: 'onOpenChange',
                        type: '(id: string | null) => void',
                        required: true,
                        description:
                            'Called when a trigger is hovered, focused, clicked or the panel is dismissed.',
                    },
                    {
                        name: 'columns',
                        type: '2 | 3 | 4',
                        default: '3',
                        description:
                            'Maximum number of link columns rendered before wrapping.',
                    },
                    {
                        name: 'promo',
                        type: 'PromoCard',
                        description:
                            'Optional featured card pinned to the end of the panel.',
                    },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Keep panels to 2–4 labelled columns of links, and add a promo card only when it earns the space.">
                    <button className="button button--small">Health insurance</button>
                </Do>
                <Dont note="Don't nest flyouts more than two levels deep — sub-menus inside a mega panel are impossible to reach on touch and hard to keyboard through.">
                    <button className="button button--small">More ▸ More ▸ More</button>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Page
