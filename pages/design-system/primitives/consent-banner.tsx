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
    { id: 'banner', title: 'Banner' },
    { id: 'interactive', title: 'Interactive' },
    { id: 'api', title: 'Props' },
    { id: 'guidelines', title: 'Guidelines' },
]

const ConsentBanner = ({ onChoice }: { onChoice?: (choice: string) => void }) => (
    <div
        className="w-full max-w-xl rounded-lg border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey p-5"
        role="region"
        aria-label="Cookie consent"
    >
        <p className="text-body-small text-grey dark:text-light-grey">
            We use cookies to improve your experience, analyse traffic and
            personalise content. You can accept all, reject all, or choose what
            we use.{' '}
            <a
                href="#"
                className="text-cyan underline rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
            >
                Read our privacy policy
            </a>
            .
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
            <button
                type="button"
                className="button"
                onClick={() => onChoice?.('accepted all cookies')}
            >
                Accept all
            </button>
            <button
                type="button"
                className="button button--secondary"
                onClick={() => onChoice?.('rejected all cookies')}
            >
                Reject all
            </button>
            <button
                type="button"
                className="button button--ghost"
                onClick={() => onChoice?.('opened cookie preferences')}
            >
                Manage preferences
            </button>
        </div>
    </div>
)

const ConsentBannerDemo = () => {
    const [choice, setChoice] = useState<string | null>(null)
    if (choice) {
        return (
            <p className="text-body-small text-grey dark:text-light-grey" role="status">
                Thanks — you {choice}.
            </p>
        )
    }
    return <ConsentBanner onChoice={setChoice} />
}

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Consent banner" toc={toc}>
        <PageHeader
            eyebrow="Primitives"
            title="Consent banner"
            status="in-review"
            intro="A cookie and tracking consent banner shown on first visit. It states plainly what cookies are used for, links to the full policy, and offers accept, reject and manage choices with equal prominence."
        />

        <p className="text-grey dark:text-light-grey">
            A proposed primitive identified from bupa.com.au, not yet a shipped
            component — this page is a reference spec built from the design
            tokens to guide adoption.
        </p>

        <Section id="banner" title="Banner">
            <p className="text-grey dark:text-light-grey">
                In production the banner is fixed to the bottom of the viewport;
                here it is rendered inline within the example canvas. It carries
                a short message, a policy link, and three actions: a primary
                Accept all, a secondary Reject all, and a ghost Manage
                preferences.
            </p>
            <Example
                caption="The consent banner and its three actions"
                code={`<div
  className="w-full max-w-xl rounded-lg border border-cool-paper-200 dark:border-charcoal bg-white dark:bg-cool-grey p-5"
  role="region"
  aria-label="Cookie consent"
>
  <p className="text-body-small text-grey dark:text-light-grey">
    We use cookies to improve your experience, analyse traffic and
    personalise content. You can accept all, reject all, or choose what
    we use.{' '}
    <a
      href="#"
      className="text-cyan underline rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue"
    >
      Read our privacy policy
    </a>
    .
  </p>
  <div className="mt-4 flex flex-wrap gap-3">
    <button type="button" className="button">Accept all</button>
    <button type="button" className="button button--secondary">Reject all</button>
    <button type="button" className="button button--ghost">Manage preferences</button>
  </div>
</div>`}
            >
                <ConsentBanner />
            </Example>
        </Section>

        <Section id="interactive" title="Interactive">
            <p className="text-grey dark:text-light-grey">
                Choosing any action records the choice, dismisses the banner and
                shows a short confirmation. Each button is keyboard-operable and
                the region is labelled for assistive tech.
            </p>
            <Example
                caption="Selecting an action dismisses the banner"
                code={`const [choice, setChoice] = useState<string | null>(null)

if (choice) {
  return (
    <p className="text-body-small text-grey dark:text-light-grey" role="status">
      Thanks — you {choice}.
    </p>
  )
}

return <ConsentBanner onChoice={setChoice} />`}
            >
                <ConsentBannerDemo />
            </Example>
        </Section>

        <Section id="api" title="Props">
            <PropsTable
                label="Prop"
                rows={[
                    {
                        name: 'message',
                        type: 'ReactNode',
                        required: true,
                        description:
                            'Plain-language explanation of what cookies are used for.',
                    },
                    {
                        name: 'policyHref',
                        type: 'string',
                        required: true,
                        description:
                            'Link to the full privacy / cookie policy.',
                    },
                    {
                        name: 'onAcceptAll',
                        type: '() => void',
                        required: true,
                        description:
                            'Called when the person accepts all cookie categories.',
                    },
                    {
                        name: 'onRejectAll',
                        type: '() => void',
                        required: true,
                        description:
                            'Called when the person rejects all non-essential cookies.',
                    },
                    {
                        name: 'onManage',
                        type: '() => void',
                        required: true,
                        description:
                            'Opens the granular per-category preferences dialog.',
                    },
                ]}
            />
        </Section>

        <Section id="guidelines" title="Guidelines">
            <DoDontGrid>
                <Do note="Give Accept all and Reject all equal visual prominence so neither is the path of least resistance.">
                    <div className="flex gap-3">
                        <button type="button" className="button">
                            Accept all
                        </button>
                        <button type="button" className="button button--secondary">
                            Reject all
                        </button>
                    </div>
                </Do>
                <Dont note="Don't pre-tick optional categories or hide Reject behind extra clicks — consent must be a free, informed, opt-in choice.">
                    <div className="flex gap-3">
                        <button type="button" className="button">
                            Accept all
                        </button>
                        <button type="button" className="button button--ghost">
                            Manage preferences
                        </button>
                    </div>
                </Dont>
            </DoDontGrid>
        </Section>
    </DesignSystemLayout>
)

export default Page
