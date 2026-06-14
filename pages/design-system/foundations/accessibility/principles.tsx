import { NextPageWithLayout } from '../../../../types/nextLayout'
import { DesignSystemLayout } from '../../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Subsection,
    InfoCard,
    cardIcons,
} from '../../../../styleguide-components/primitives'

const toc = [
    { id: 'pour', title: 'The POUR model' },
    { id: 'target', title: 'Our target' },
    { id: 'checklist', title: 'Quick checklist' },
]

const principles = [
    {
        title: 'Perceivable',
        icon: 'perceivable',
        body: 'Information and interface components must be presentable in ways people can perceive. Provide text alternatives, captions and adaptable structure; meet contrast; never rely on colour or sound alone.',
    },
    {
        title: 'Operable',
        icon: 'operable',
        body: 'Interface components and navigation must be operable. Everything works by keyboard and touch, nothing traps focus, targets are large enough, time limits are adjustable and motion is controllable.',
    },
    {
        title: 'Understandable',
        icon: 'understandable',
        body: 'Information and the operation of the interface must be understandable. Use plain language, label fields clearly, identify and explain errors, and keep behaviour predictable and consistent.',
    },
    {
        title: 'Robust',
        icon: 'robust',
        body: 'Content must be robust enough to be interpreted by a wide range of user agents and assistive technologies. Use semantic HTML first; expose name, role and value; reach for ARIA only to fill genuine gaps.',
    },
]

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Principles" toc={toc}>
        <PageHeader
            eyebrow="Accessibility"
            title="Principles"
            status="stable"
            intro="Every accessibility rule we follow sits under one of four ideas — perceivable, operable, understandable and robust. Together they spell POUR, the backbone of the Web Content Accessibility Guidelines."
        />

        <Section id="pour" title="The POUR model">
            <p className="text-grey dark:text-light-grey">
                WCAG groups all of its success criteria under these four
                principles. They make a fast review lens: pick any screen and ask
                whether it is perceivable, operable, understandable and robust for
                someone who cannot see it, cannot use a mouse, or reads it through
                a screen reader.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {principles.map(principle => (
                    <InfoCard
                        key={principle.title}
                        icon={cardIcons[principle.icon]}
                        title={principle.title}
                        description={principle.body}
                    />
                ))}
            </div>
        </Section>

        <Section id="target" title="Our target">
            <p className="text-grey dark:text-light-grey">
                We build to <strong>WCAG 2.2 Level AA</strong> across the
                experience. AA is the level referenced by accessibility law in most
                markets, and it is the bar every component and page in this system
                is designed and reviewed against. Where a component cannot yet meet
                it, that gap is recorded openly — see{' '}
                <a
                    href="/design-system/foundations/accessibility/conformance"
                    className="text-cyan hover:underline"
                >
                    Conformance &amp; statement
                </a>
                .
            </p>
            <p className="mt-3 text-grey dark:text-light-grey">
                The remaining guideline pages break each principle down into
                practical rules, examples and the exact success criteria they
                satisfy.
            </p>
        </Section>

        <Section id="checklist" title="Quick checklist">
            <Subsection title="Before you ship">
                <ul className="list-disc pl-6 space-y-1 text-grey dark:text-light-grey">
                    <li>Navigate the whole flow with the keyboard only.</li>
                    <li>
                        Confirm a visible focus ring on every interactive element.
                    </li>
                    <li>Check text contrast against its background at AA.</li>
                    <li>Verify meaning is never carried by colour alone.</li>
                    <li>
                        Confirm every field has a visible, associated label and
                        clear error text.
                    </li>
                    <li>
                        Run an automated audit (axe / Lighthouse) and resolve
                        issues.
                    </li>
                    <li>Spot-check with a screen reader (VoiceOver / NVDA).</li>
                </ul>
            </Subsection>
            <p className="mt-4 text-body-small text-grey dark:text-light-grey">
                The full, role-aware version lives on the{' '}
                <a
                    href="/design-system/foundations/accessibility/testing"
                    className="text-cyan hover:underline"
                >
                    Testing &amp; tools
                </a>{' '}
                page.
            </p>
        </Section>
    </DesignSystemLayout>
)

export default Page
