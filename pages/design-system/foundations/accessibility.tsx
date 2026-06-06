import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Do,
    Dont,
    DoDontGrid,
} from '../../../styleguide-components/primitives'

const toc = [
    { id: 'principles', title: 'Principles' },
    { id: 'contrast', title: 'Color & contrast' },
    { id: 'keyboard', title: 'Keyboard & focus' },
    { id: 'motion', title: 'Motion' },
    { id: 'forms', title: 'Forms & labels' },
    { id: 'images', title: 'Images & alt text' },
    { id: 'checklist', title: 'Testing checklist' },
]

const Accessibility: NextPageWithLayout = () => (
    <DesignSystemLayout title="Accessibility" toc={toc}>
        <PageHeader
            eyebrow="Foundations"
            title="Accessibility"
            status="stable"
            intro="Accessibility is a default, not a feature. We target WCAG 2.1 AA across the experience. This page collects the shared rules every component and page is expected to follow."
        />

        <Section id="principles" title="Principles">
            <ul className="list-disc pl-6 space-y-2 text-grey dark:text-light-grey">
                <li>
                    <strong>Perceivable</strong> — content meets AA contrast and
                    never relies on colour alone to convey meaning.
                </li>
                <li>
                    <strong>Operable</strong> — everything works with a keyboard,
                    with a visible focus indicator at all times.
                </li>
                <li>
                    <strong>Understandable</strong> — labels, errors and
                    instructions are clear and announced to assistive tech.
                </li>
                <li>
                    <strong>Robust</strong> — semantic HTML first; ARIA only to
                    fill genuine gaps.
                </li>
            </ul>
        </Section>

        <Section id="contrast" title="Color & contrast">
            <p className="text-grey dark:text-light-grey">
                Body text needs a contrast ratio of at least 4.5:1, and large
                text or UI boundaries at least 3:1. Navy on white and white on
                cyan both pass; pale tokens such as{' '}
                <code className="font-mono text-cyan">disabled-text</code> are for
                non-essential text only. The focus ring uses{' '}
                <code className="font-mono text-cyan">focus-blue</code>, and state
                colours (<code className="font-mono text-cyan">error-red</code>,{' '}
                <code className="font-mono text-cyan">success-green</code>) must
                always be paired with an icon or text label.
            </p>
            <DoDontGrid>
                <Do note="Pair status colour with an icon and text so meaning survives without colour.">
                    <span className="inline-flex items-center gap-2 text-error-red font-semibold">
                        <span aria-hidden="true">✕</span> Payment failed
                    </span>
                </Do>
                <Dont note="Rely on colour alone — colour-blind users and screen readers miss the message.">
                    <span className="w-4 h-4 rounded-full bg-error-red inline-block" />
                </Dont>
            </DoDontGrid>
        </Section>

        <Section id="keyboard" title="Keyboard & focus">
            <p className="text-grey dark:text-light-grey">
                Every interactive element must be reachable with{' '}
                <kbd className="font-mono">Tab</kbd>, actionable with{' '}
                <kbd className="font-mono">Enter</kbd>/<kbd className="font-mono">Space</kbd>,
                and show a visible focus ring. Preserve a logical DOM order, never
                remove outlines without a replacement, and trap focus inside
                modals while returning it to the trigger on close.
            </p>
        </Section>

        <Section id="motion" title="Motion">
            <p className="text-grey dark:text-light-grey">
                Animations are subtle and short by default. Honour{' '}
                <code className="font-mono text-cyan">prefers-reduced-motion</code>:
                avoid large parallax or auto-playing movement, and ensure no
                content depends on an animation to be understood.
            </p>
        </Section>

        <Section id="forms" title="Forms & labels">
            <p className="text-grey dark:text-light-grey">
                Every field has a visible, programmatically-associated{' '}
                <code className="font-mono text-cyan">&lt;label&gt;</code>.
                Placeholders are not labels. Surface errors in text next to the
                field and link them with{' '}
                <code className="font-mono text-cyan">aria-describedby</code>, and
                mark invalid fields with{' '}
                <code className="font-mono text-cyan">aria-invalid</code>.
            </p>
        </Section>

        <Section id="images" title="Images & alt text">
            <p className="text-grey dark:text-light-grey">
                Informative images need concise{' '}
                <code className="font-mono text-cyan">alt</code> text describing
                their purpose. Decorative images take empty{' '}
                <code className="font-mono text-cyan">alt=&quot;&quot;</code> so
                screen readers skip them. Icon-only buttons need an{' '}
                <code className="font-mono text-cyan">aria-label</code>.
            </p>
        </Section>

        <Section id="checklist" title="Testing checklist">
            <ul className="list-disc pl-6 space-y-1 text-grey dark:text-light-grey">
                <li>Navigate the whole flow with the keyboard only.</li>
                <li>Confirm a visible focus ring on every interactive element.</li>
                <li>Check text contrast against its background at AA.</li>
                <li>Verify meaning is never carried by colour alone.</li>
                <li>Run an automated audit (axe / Lighthouse) and resolve issues.</li>
                <li>Spot-check with a screen reader (VoiceOver / NVDA).</li>
            </ul>
        </Section>
    </DesignSystemLayout>
)

export default Accessibility
