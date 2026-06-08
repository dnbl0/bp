import Link from 'next/link'
import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    Anatomy,
    CodeBlock,
    Do,
    Dont,
    DoDontGrid,
    PageHeader,
    PropsTable,
    Section,
} from '../../../styleguide-components/primitives'

const toc = [
    { id: 'overview', title: 'Overview' },
    { id: 'anatomy', title: 'Anatomy' },
    { id: 'props', title: 'Props' },
    { id: 'usage', title: 'Usage' },
    { id: 'guidelines', title: 'Guidelines' },
]

/** A static still of the aged-care header CTA cluster. */
const HeaderActionsMock = () => (
    <div className="flex flex-wrap items-stretch gap-2 rounded-xl border border-cool-paper-200 bg-white p-3">
        {[
            { icon: '⌂', label: 'Book a tour' },
            { icon: '☏', label: '1800 555 123' },
            { icon: '↩', label: 'Call me back' },
            { icon: '☺', label: 'Contact us' },
        ].map(action => (
            <div
                key={action.label}
                className="flex flex-col items-center gap-1 rounded px-4 py-2 hover:bg-[#F0F9FF]"
            >
                <span className="text-heading-s text-cyan" aria-hidden="true">
                    {action.icon}
                </span>
                <span className="whitespace-nowrap text-caption font-semibold text-navy">
                    {action.label}
                </span>
            </div>
        ))}
    </div>
)

const HeaderActions: NextPageWithLayout = () => (
    <DesignSystemLayout title="Header actions" toc={toc}>
        <PageHeader
            eyebrow="Aged Care · Component"
            title="Header actions"
            status="stable"
            intro="The aged-care call-to-action cluster in the global header: Book a tour, Call now, Call me back and Contact us. Each is an icon-over-label button sharing one layout, surfacing the highest-intent actions on every page."
        />

        <Section id="overview" title="Overview">
            <p className="text-grey dark:text-light-grey">
                Aged-care decisions are urgent and high-touch, so the header keeps
                the contact actions one tap away everywhere. These buttons are
                aged-care-specific additions to the shared{' '}
                <Link href="/design-system/components/header">
                    <a className="font-semibold text-cyan hover:underline">global header ↗</a>
                </Link>
                ; they appear in the desktop nav and inside the mobile burger menu.
            </p>
            <p className="mt-3 text-grey dark:text-light-grey">
                Implemented in{' '}
                <code className="font-mono text-cyan">components/organisms/Header/</code>:{' '}
                <code className="font-mono text-cyan">BookATourButton</code>,{' '}
                <code className="font-mono text-cyan">CallNowButton</code>,{' '}
                <code className="font-mono text-cyan">CallBackButton</code> and{' '}
                <code className="font-mono text-cyan">ContactButton</code>, all built on a shared{' '}
                <code className="font-mono text-cyan">HeaderButton</code>.
            </p>
        </Section>

        <Section id="anatomy" title="Anatomy">
            <Anatomy
                parts={[
                    {
                        number: 1,
                        name: 'Icon',
                        description:
                            'A cyan glyph identifying the action (home, phone, call-back, person).',
                    },
                    {
                        number: 2,
                        name: 'Label',
                        description:
                            'A short navy label beneath the icon (the phone number itself for Call now).',
                    },
                    {
                        number: 3,
                        name: 'Hover / focus state',
                        description:
                            'A light-blue hover fill and an inner-blue focus ring on the whole control.',
                    },
                ]}
            >
                <HeaderActionsMock />
            </Anatomy>
        </Section>

        <Section id="props" title="Props">
            <p className="mb-3 text-grey dark:text-light-grey">
                Each button is a thin wrapper around{' '}
                <code className="font-mono text-cyan">HeaderButton(&#123; icon, text &#125;)</code>:
            </p>
            <PropsTable
                label="Component"
                rows={[
                    {
                        name: 'BookATourButton',
                        type: '{ href: string }',
                        description: 'Home icon + “Book a tour”. Links to the tour-booking page; tagged data-link-type="cta-button-book-a-tour".',
                    },
                    {
                        name: 'CallNowButton',
                        type: '{ phoneNumber: string }',
                        description: 'Call icon + the number itself; renders a tel: link.',
                    },
                    {
                        name: 'CallBackButton',
                        type: '{ href: string }',
                        description: 'Call-back icon + “Call me back”. Links to the call-back request form.',
                    },
                    {
                        name: 'ContactButton',
                        type: '{ href: string }',
                        description: 'Person icon + “Contact us”. Opens the contact form.',
                    },
                    {
                        name: 'HeaderButton',
                        type: '{ icon: ReactNode; text: ReactNode }',
                        description: 'Shared layout: icon stacked over a bold navy label, with the hover/focus affordance.',
                    },
                ]}
            />
        </Section>

        <Section id="usage" title="Usage">
            <ul className="list-disc space-y-2 pl-5 text-grey dark:text-light-grey">
                <li>Show the cluster on every page; it is the always-available path to a human.</li>
                <li>Order by intent: Book a tour first, then Call now, then Call me back / Contact us.</li>
                <li>Render the phone number <em>as</em> the Call now label so it is visible and tappable on mobile.</li>
                <li>Collapse the cluster into the burger menu on small screens rather than dropping actions.</li>
            </ul>
            <p className="mt-4 text-body-small text-grey dark:text-light-grey">
                Reference rendering:
            </p>
            <CodeBlock
                code={`import { BookATourButton } from '@/components/organisms/Header/BookATourButton'
import { CallNowButton } from '@/components/organisms/Header/CallNowButton'
import { CallBackButton } from '@/components/organisms/Header/CallBackButton'

<BookATourButton href={bookATourHref} />
<CallNowButton phoneNumber="1800 555 123" />
<CallBackButton href={callBackHref} />`}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Keep the highest-intent actions in the header and order them by intent.">
                    <span className="text-body-small text-grey">
                        Book a tour · Call now · Call me back
                    </span>
                </Do>
                <Dont note="Don't hide calling behind a menu — aged-care visitors expect a phone number up front.">
                    <span className="text-body-small text-grey">
                        Phone number buried in the footer
                    </span>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default HeaderActions
