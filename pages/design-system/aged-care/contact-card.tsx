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

/** A static still of the aged-care contact card with its booking actions. */
const ContactCardMock = () => (
    <div className="w-full max-w-xs overflow-hidden rounded-xl border border-cool-paper-200 bg-white shadow-DEFAULT">
        <div className="space-y-3 p-5">
            <p className="text-heading-s font-medium text-navy">Bupa Mosman</p>
            <p className="flex items-center gap-2 text-heading-s font-medium text-cyan">
                ☏ 1800 555 123
            </p>
            <p className="text-caption text-grey">Open 9am–5pm, Mon–Fri</p>
            <span className="block rounded-lg bg-fuchsia px-4 py-2 text-center text-body-small font-semibold text-white">
                Book a tour
            </span>
            <span className="block rounded-lg border border-cyan px-4 py-2 text-center text-body-small font-semibold text-cyan">
                Call me back
            </span>
            <span className="block rounded-lg border border-cool-paper-200 px-4 py-2 text-center text-body-small font-semibold text-navy">
                Book online (Calendly)
            </span>
        </div>
        <div className="border-t border-cool-paper-200 p-5 text-body-small text-grey">
            <p>10 Military Rd,</p>
            <p>Mosman NSW 2088</p>
            <span className="mt-2 inline-block text-caption font-semibold text-cyan">
                ⌖ Get directions →
            </span>
        </div>
    </div>
)

const ContactCard: NextPageWithLayout = () => (
    <DesignSystemLayout title="Contact card" toc={toc}>
        <PageHeader
            eyebrow="Aged Care · Component"
            title="Contact card"
            status="stable"
            intro="The conversion card on a care-home page. It carries the home's phone, hours and address, and the aged-care booking actions — book a tour, call now, call me back and online (Calendly) booking — that turn an interested visitor into an enquiry."
        />

        <Section id="overview" title="Overview">
            <p className="text-grey dark:text-light-grey">
                This documents the <strong>aged-care usage</strong> of the contact
                card: which actions to show and in what order. For the base
                component’s full API and a live example, see the{' '}
                <Link href="/design-system/components/contact-card">
                    <a className="font-semibold text-cyan hover:underline">
                        core Contact card ↗
                    </a>
                </Link>
                .
            </p>
            <p className="mt-3 text-grey dark:text-light-grey">
                Implemented by{' '}
                <code className="font-mono text-cyan">
                    components/molecules/blocks/ContactCardBlock.tsx
                </code>{' '}
                and rendered in the sidebar of the{' '}
                <Link href="/design-system/aged-care/home-page">
                    <a className="font-semibold text-cyan hover:underline">care-home page</a>
                </Link>
                .
            </p>
        </Section>

        <Section id="anatomy" title="Anatomy">
            <Anatomy
                parts={[
                    { number: 1, name: 'Heading', description: 'The home name (and optional second line).' },
                    { number: 2, name: 'Phone', description: 'A tel: link with the call icon — tap to call.' },
                    { number: 3, name: 'Contact hours', description: 'Rich-text opening hours.' },
                    { number: 4, name: 'Primary action', description: 'Book a tour (pink button) — the main conversion.' },
                    { number: 5, name: 'Secondary action', description: 'Call me back / call now.' },
                    { number: 6, name: 'Calendly booking', description: 'Optional self-service online booking.' },
                    { number: 7, name: 'Address + directions', description: 'The address and a map link in a new tab.' },
                ]}
            >
                <ContactCardMock />
            </Anatomy>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                rows={[
                    {
                        name: 'component',
                        type: 'CmsContactCard',
                        required: true,
                        description: 'The contact-card entry from Contentful.',
                    },
                ]}
            />
            <p className="mt-6 mb-3 text-body-small font-semibold text-navy dark:text-white">
                Key content fields
            </p>
            <PropsTable
                label="Field"
                rows={[
                    { name: 'heading / heading2', type: 'string', description: 'Card title lines (the home name).' },
                    { name: 'phoneNumber', type: 'string', description: 'Rendered as a tel: link with the call icon.' },
                    { name: 'contactHours', type: 'RichText', description: 'Opening hours (multi-line rich text).' },
                    { name: 'primaryCallToAction* (Text / Href / Colour)', type: 'string', description: 'The main action — “Book a tour”. Colour “Pink” renders the pink button.' },
                    { name: 'secondaryCallToAction* (Text / Href / Type)', type: 'string', description: 'Secondary action — “Call me back”. Type “Solid” vs outline.' },
                    { name: 'calendlyBooking / calendlyBookingText', type: 'CmsAsset / string', description: 'Optional online booking; the dataUrl is rewritten to an in-app ?calendly= link.' },
                    { name: 'street / suburb / stateOrTerritory / postcode', type: 'string', description: 'Address block (all required together to render).' },
                    { name: 'directionLinkText / directionLinkHref', type: 'string', description: 'Map link, opened in a new tab.' },
                    { name: 'tertiaryCallToAction* / extraContact*', type: 'string', description: 'Optional footer link and a second contact number.' },
                ]}
            />
        </Section>

        <Section id="usage" title="Usage">
            <ul className="list-disc space-y-2 pl-5 text-grey dark:text-light-grey">
                <li>One <strong>primary</strong> action only — “Book a tour”. Everything else is secondary or tertiary.</li>
                <li>Lead with the phone number; calling is the most common aged-care enquiry.</li>
                <li>Offer Calendly as a low-pressure alternative to phoning, not as the only path.</li>
                <li>Keep the address and directions at the foot, after the actions.</li>
            </ul>
            <p className="mt-4 text-body-small text-grey dark:text-light-grey">
                Reference rendering:
            </p>
            <CodeBlock
                code={`import { ContactCardBlock } from '@/components/molecules/blocks/ContactCardBlock'

<ContactCardBlock component={contactCardEntry} />`}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Keep one primary action (Book a tour) and make the phone number tappable.">
                    <span className="text-body-small text-grey">
                        Book a tour · Call me back · Phone
                    </span>
                </Do>
                <Dont note="Don't present several equally-weighted buttons — it hides the action that matters.">
                    <span className="text-body-small text-grey">
                        Four primary buttons
                    </span>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default ContactCard
