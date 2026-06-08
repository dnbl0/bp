import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { ComponentHero } from '../../../styleguide-components/componentPreviews'
import {
    PageHeader,
    Section,
    Example,
    PropsTable,
    Do,
    Dont,
    DoDontGrid,
    Specifications,
} from '../../../styleguide-components/primitives'
import { CallNowIcon } from '../../../components/atoms/icons/CallNowIcon'
import { ChevronRightIcon } from '../../../components/atoms/icons/ChevronRightIcon'
import { contactCardDefaultSpecs } from '../../../styleguide-components/specs/contact-card.specs'

const toc = [
    { id: 'example', title: 'Example' },
    { id: 'specifications', title: 'Visual Specifications' },
    { id: 'props', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

const ContactCard: NextPageWithLayout = () => (
    <DesignSystemLayout title="Contact card" toc={toc}>
        <PageHeader
            eyebrow="Components · Molecules"
            title="Contact card"
            status="stable"
            intro="A white, elevated card that brings together a care home's contact details — phone, hours and address — with primary, secondary and tertiary calls to action."
        />

        <ComponentHero name="ContactCardBlock" />

        <Section id="example" title="Example">
            <Example
                surface="tinted"
                code={`<div className="bg-white rounded shadow-depth-hover flex flex-col max-w-sm">
  <div className="p-6 flex flex-col gap-3">
    <h2 className="text-heading-s font-medium text-navy">
      Sunshine Aged Care
    </h2>
    <a className="flex items-center gap-2 text-navy font-semibold" href="#">
      <CallNowIcon className="w-5 h-5 fill-cyan" />
      1800 030 130
    </a>
    <p className="text-body-small text-grey">Open 8am – 6pm, Mon–Fri</p>
    <p className="text-body-small text-grey">
      12 Banksia Street, Sunshine VIC 3020
    </p>
    <div className="flex flex-col gap-2 pt-2">
      <a className="button" href="#">Book a tour</a>
      <a className="button button--secondary" href="#">Enquire online</a>
      <a className="button button--tertiary px-0" href="#">
        <span>Get directions</span>
        <ChevronRightIcon />
      </a>
    </div>
  </div>
</div>`}
            >
                <div className="bg-white rounded shadow-depth-hover flex flex-col max-w-sm">
                    <div className="p-6 flex flex-col gap-3">
                        <h2 className="text-heading-s font-medium text-navy">
                            Sunshine Aged Care
                        </h2>
                        <a className="flex items-center gap-2 text-navy font-semibold" href="#">
                            <CallNowIcon className="w-5 h-5 fill-cyan" />
                            1800 030 130
                        </a>
                        <p className="text-body-small text-grey">Open 8am – 6pm, Mon–Fri</p>
                        <p className="text-body-small text-grey">
                            12 Banksia Street, Sunshine VIC 3020
                        </p>
                        <div className="flex flex-col gap-2 pt-2">
                            <a className="button" href="#">Book a tour</a>
                            <a className="button button--secondary" href="#">Enquire online</a>
                            <a className="button button--tertiary px-0" href="#">
                                <span>Get directions</span>
                                <ChevronRightIcon />
                            </a>
                        </div>
                    </div>
                </div>
            </Example>
        </Section>

        <Section id="specifications" title="Visual Specifications">
            <p className="text-grey dark:text-light-grey">
                Component visual specifications for sizing, spacing and colors.
            </p>
            <Specifications variant="Default" groups={[contactCardDefaultSpecs]} withTable>
                <div className="bg-white rounded shadow-depth-hover flex flex-col max-w-sm">
                    <div className="p-6 flex flex-col gap-3">
                        <h2 className="text-heading-s font-medium text-navy">
                            Sunshine Aged Care
                        </h2>
                        <a className="flex items-center gap-2 text-navy font-semibold" href="#">
                            <CallNowIcon className="w-5 h-5 fill-cyan" />
                            1800 030 130
                        </a>
                        <p className="text-body-small text-grey">Open 8am – 6pm, Mon–Fri</p>
                        <p className="text-body-small text-grey">
                            12 Banksia Street, Sunshine VIC 3020
                        </p>
                    </div>
                </div>
            </Specifications>
        </Section>

        <Section id="props" title="Props">
            <PropsTable
                label="Field"
                rows={[
                    { name: 'heading / heading2', type: 'string', description: 'Card title lines.' },
                    { name: 'phoneNumber / contactHours', type: 'string', description: 'Phone number and opening hours.' },
                    { name: 'street / suburb / stateOrTerritory / postcode', type: 'string', description: 'Address parts.' },
                    { name: 'primaryCallToAction*', type: 'string', description: 'Primary action text, href and colour.' },
                    { name: 'secondaryCallToAction*', type: 'string', description: 'Secondary action text, href, type (e.g. Solid) and dropdown colour.' },
                    { name: 'tertiaryCallToAction*', type: 'string', description: 'Tertiary inline action text and href.' },
                    { name: 'directionLinkText / directionLinkHref', type: 'string', description: 'Get-directions link.' },
                    { name: 'calendlyBooking / calendlyBookingText', type: 'string', description: 'Optional Calendly booking integration.' },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Keep one primary action and step the rest down to secondary and tertiary so the main task is obvious.">
                    <div className="flex flex-col gap-2 max-w-[12rem]">
                        <a className="button" href="#">Book a tour</a>
                        <a className="button button--secondary" href="#">Enquire online</a>
                        <a className="button button--tertiary px-0" href="#">
                            <span>Get directions</span>
                            <ChevronRightIcon />
                        </a>
                    </div>
                </Do>
                <Dont note="Don't give a card multiple primary buttons — competing actions blur which one to take.">
                    <div className="flex flex-col gap-2 max-w-[12rem]">
                        <a className="button" href="#">Book a tour</a>
                        <a className="button" href="#">Enquire online</a>
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default ContactCard
