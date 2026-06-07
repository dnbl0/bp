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
    { id: 'bar', title: 'Utility bar' },
    { id: 'switcher', title: 'Audience switcher' },
    { id: 'api', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

const audiences = ['Personal', 'Business', 'Overseas', 'Providers']

const AudienceSwitcher = () => {
    const [active, setActive] = useState('Personal')
    return (
        <div
            role="group"
            aria-label="Choose audience"
            className="flex items-center gap-1 rounded-full bg-white dark:bg-cool-grey p-1"
        >
            {audiences.map(name => {
                const isActive = active === name
                return (
                    <button
                        key={name}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setActive(name)}
                        className={
                            'rounded-full px-3 py-1 text-caption font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue ' +
                            (isActive
                                ? 'bg-cyan text-white'
                                : 'text-grey dark:text-light-grey hover:text-navy dark:hover:text-white')
                        }
                    >
                        {name}
                    </button>
                )
            })}
        </div>
    )
}

const UtilityBarDemo = () => (
    <div className="w-full rounded-lg bg-cool-paper-50 dark:bg-cool-grey border border-cool-paper-200 dark:border-charcoal">
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center sm:justify-between gap-2 sm:gap-3 px-3 sm:px-4 py-2">
            <nav
                aria-label="Utility"
                className="flex items-center gap-4 text-caption"
            >
                <a
                    href="#"
                    className="text-grey dark:text-light-grey hover:text-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue rounded"
                >
                    Find a store
                </a>
                <a
                    href="#"
                    className="text-grey dark:text-light-grey hover:text-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue rounded"
                >
                    Help
                </a>
            </nav>
            <div className="flex items-center gap-4">
                <AudienceSwitcher />
                <a
                    href="#"
                    className="text-caption font-semibold text-cyan hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue rounded"
                >
                    Log in
                </a>
            </div>
        </div>
    </div>
)

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Utility bar" toc={toc}>
        <PageHeader
            eyebrow="Composite patterns"
            title="Utility bar"
            status="in-review"
            intro="A thin strip above the main header for low-frequency, site-wide utilities — store locator, help, the audience switcher and log in. It sits on a subtle surface so it never competes with the primary navigation."
        />

        <p className="text-grey dark:text-light-grey">
            This is a proposed pattern identified from the bupa.com.au audit. It
            is not yet a shipped component — this page is a reference spec for
            adoption.
        </p>

        <Section id="bar" title="Utility bar">
            <p className="text-grey dark:text-light-grey">
                Secondary links sit on the left; the audience switcher and log in
                anchor the right. The whole bar uses caption-sized text on a{' '}
                <code className="font-mono text-cyan">cool-paper-50</code> surface
                to stay quiet.
            </p>
            <Example
                caption="A compact utility bar above the header"
                code={`<div className="w-full rounded-lg bg-cool-paper-50 dark:bg-cool-grey border border-cool-paper-200 dark:border-charcoal">
  <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2">
    <nav aria-label="Utility" className="flex items-center gap-4 text-caption">
      <a href="#" className="text-grey dark:text-light-grey hover:text-cyan">Find a store</a>
      <a href="#" className="text-grey dark:text-light-grey hover:text-cyan">Help</a>
    </nav>
    <div className="flex items-center gap-4">
      <AudienceSwitcher />
      <a href="#" className="text-caption font-semibold text-cyan hover:underline">Log in</a>
    </div>
  </div>
</div>`}
            >
                <UtilityBarDemo />
            </Example>
        </Section>

        <Section id="switcher" title="Audience switcher">
            <p className="text-grey dark:text-light-grey">
                The switcher is a segmented control: one option is selected at a
                time, signalled by{' '}
                <code className="font-mono text-cyan">aria-pressed</code> and a
                filled cyan pill. Use it to scope the whole site to an audience.
            </p>
            <Example
                caption="A segmented audience switcher"
                code={`const [active, setActive] = useState('Personal')

<div role="group" aria-label="Choose audience" className="flex items-center gap-1 rounded-full bg-white dark:bg-cool-grey p-1">
  {audiences.map(name => {
    const isActive = active === name
    return (
      <button
        key={name}
        type="button"
        aria-pressed={isActive}
        onClick={() => setActive(name)}
        className={
          'rounded-full px-3 py-1 text-caption font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue ' +
          (isActive
            ? 'bg-cyan text-white'
            : 'text-grey dark:text-light-grey hover:text-navy dark:hover:text-white')
        }
      >
        {name}
      </button>
    )
  })}
</div>`}
            >
                <AudienceSwitcher />
            </Example>
        </Section>

        <Section id="api" title="Props">
            <PropsTable
                label="Prop"
                rows={[
                    {
                        name: 'links',
                        type: 'UtilityLink[]',
                        required: true,
                        description:
                            'Secondary links shown on the left, e.g. Find a store and Help.',
                    },
                    {
                        name: 'audiences',
                        type: 'string[]',
                        required: true,
                        description:
                            'Segmented options for the audience switcher.',
                    },
                    {
                        name: 'activeAudience',
                        type: 'string',
                        required: true,
                        description:
                            'Currently selected audience. Controlled by the parent.',
                    },
                    {
                        name: 'onAudienceChange',
                        type: '(audience: string) => void',
                        required: true,
                        description:
                            'Called when a different audience segment is pressed.',
                    },
                    {
                        name: 'loginHref',
                        type: 'string',
                        description:
                            'Destination for the log in link anchored on the right.',
                    },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <p className="text-grey dark:text-light-grey">
                On small screens the bar collapses: the secondary links move into
                the mobile menu and only the audience switcher and log in remain,
                so it never wraps to two rows on a phone.
            </p>
            <DoDontGrid>
                <Do note="Reserve the utility bar for low-frequency, site-wide actions and keep it on a subtle surface beneath the main header.">
                    <span className="rounded bg-cool-paper-50 dark:bg-cool-grey px-3 py-1 text-caption text-grey dark:text-light-grey">
                        Find a store · Help · Log in
                    </span>
                </Do>
                <Dont note="Don't put primary navigation or a prominent CTA here — it competes with the header and is too small to be the main entry point.">
                    <button className="button button--small">Get a quote</button>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Page
