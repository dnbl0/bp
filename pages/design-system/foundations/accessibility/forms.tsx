import { NextPageWithLayout } from '../../../../types/nextLayout'
import { DesignSystemLayout } from '../../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Subsection,
    Do,
    Dont,
    DoDontGrid,
    CriteriaList,
} from '../../../../styleguide-components/primitives'

const toc = [
    { id: 'labels', title: 'Labels & instructions' },
    { id: 'errors', title: 'Errors' },
    { id: 'autocomplete', title: 'Autocomplete & input purpose' },
    { id: 'auth', title: 'Authentication' },
    { id: 'criteria', title: 'Success criteria' },
]

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Forms & validation" toc={toc}>
        <PageHeader
            eyebrow="Accessibility"
            title="Forms & validation"
            status="stable"
            intro="Forms are where accessibility most affects whether someone can complete a task. Every field needs a real label, every error needs a clear explanation, and logging in must not depend on memory or a puzzle."
        />

        <Section id="labels" title="Labels & instructions">
            <p className="text-grey dark:text-light-grey">
                Every field has a visible, programmatically-associated{' '}
                <code className="font-mono text-cyan">&lt;label&gt;</code> (linked by{' '}
                <code className="font-mono text-cyan">for</code>/
                <code className="font-mono text-cyan">id</code>, or by wrapping the
                input). Placeholders are <em>not</em> labels — they vanish on input,
                fail contrast and disappear for screen readers. Put format hints in
                persistent helper text, not the placeholder.
            </p>
            <DoDontGrid>
                <Do note="Use a persistent visible label, with the input linked to it.">
                    <label className="block text-body-small">
                        <span className="font-semibold text-navy dark:text-white">
                            Email
                        </span>
                        <input
                            className="mt-1 block w-44 rounded-md border border-cool-paper-200 dark:border-charcoal px-2 py-1"
                            type="email"
                        />
                    </label>
                </Do>
                <Dont note="Rely on a placeholder as the label — it disappears the moment someone types.">
                    <input
                        className="block w-44 rounded-md border border-cool-paper-200 dark:border-charcoal px-2 py-1"
                        placeholder="Email"
                    />
                </Dont>
            </DoDontGrid>
        </Section>

        <Section id="errors" title="Errors">
            <p className="text-grey dark:text-light-grey">
                Identify errors in text next to the field — never colour alone — and
                link the message to the input with{' '}
                <code className="font-mono text-cyan">aria-describedby</code>, marking
                the field <code className="font-mono text-cyan">aria-invalid</code>.
                Where you know the fix, suggest it (&quot;Enter a date as
                DD/MM/YYYY&quot;). For legal, financial or data submissions, make the
                action reversible, checked or confirmed before it commits.
            </p>
        </Section>

        <Section id="autocomplete" title="Autocomplete & input purpose">
            <p className="text-grey dark:text-light-grey">
                Add <code className="font-mono text-cyan">autocomplete</code> tokens to
                fields collecting a user&apos;s own information (name, email, phone,
                address). It lets browsers and assistive tech fill them reliably, and
                under WCAG 2.2 you should not force people to re-enter information they
                already gave earlier in the same process — carry it forward or let them
                pick it.
            </p>
        </Section>

        <Section id="auth" title="Authentication">
            <p className="text-grey dark:text-light-grey">
                Don&apos;t make logging in a memory or puzzle test. Support password
                managers, allow paste into password fields, and offer passkeys or
                email links. Avoid CAPTCHAs that require transcribing or solving a
                cognitive puzzle with no accessible alternative (WCAG 2.2).
            </p>
            <Subsection title="Accessible names for controls">
                <p className="text-body-small text-grey dark:text-light-grey">
                    Custom controls must expose their name, role and value to assistive
                    tech. Built on native elements with a proper label this happens
                    automatically; if you build a custom widget, see{' '}
                    <a
                        href="/design-system/foundations/accessibility/assistive-technology"
                        className="text-cyan hover:underline"
                    >
                        Screen readers &amp; ARIA
                    </a>
                    .
                </p>
            </Subsection>
        </Section>

        <Section id="criteria" title="Success criteria">
            <CriteriaList
                items={[
                    { id: '1.3.5', title: 'Identify Input Purpose', level: 'AA' },
                    { id: '3.3.1', title: 'Error Identification', level: 'A' },
                    { id: '3.3.2', title: 'Labels or Instructions', level: 'A' },
                    { id: '3.3.3', title: 'Error Suggestion', level: 'AA' },
                    {
                        id: '3.3.4',
                        title: 'Error Prevention (Legal, Financial, Data)',
                        level: 'AA',
                    },
                    {
                        id: '3.3.7',
                        title: 'Redundant Entry',
                        level: 'A',
                        isNew: true,
                    },
                    {
                        id: '3.3.8',
                        title: 'Accessible Authentication (Minimum)',
                        level: 'AA',
                        isNew: true,
                    },
                    { id: '4.1.2', title: 'Name, Role, Value', level: 'A' },
                ]}
            />
        </Section>
    </DesignSystemLayout>
)

export default Page
