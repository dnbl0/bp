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
    { id: 'operability', title: 'Full operability' },
    { id: 'focus-visible', title: 'Visible focus' },
    { id: 'order', title: 'Focus order' },
    { id: 'management', title: 'Focus management' },
    { id: 'criteria', title: 'Success criteria' },
]

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Keyboard & focus" toc={toc}>
        <PageHeader
            eyebrow="Accessibility"
            title="Keyboard & focus"
            status="stable"
            intro="Many people — power users, and anyone using a screen reader, switch device or voice control — never touch a mouse. Everything must work from the keyboard, with focus always visible and never trapped."
        />

        <Section id="operability" title="Full operability">
            <p className="text-grey dark:text-light-grey">
                Every interactive element must be reachable with{' '}
                <kbd className="font-mono">Tab</kbd> and operable with{' '}
                <kbd className="font-mono">Enter</kbd> /{' '}
                <kbd className="font-mono">Space</kbd> (and arrow keys within
                composite widgets such as tabs, menus and radio groups). Prefer
                native elements — a real{' '}
                <code className="font-mono text-cyan">&lt;button&gt;</code> is
                keyboard-operable for free, where a{' '}
                <code className="font-mono text-cyan">&lt;div&gt;</code> is not.
            </p>
        </Section>

        <Section id="focus-visible" title="Visible focus">
            <p className="text-grey dark:text-light-grey">
                A keyboard focus indicator must always be visible. Never remove the
                outline without replacing it with something of equal or better
                clarity. The system&apos;s focus ring uses{' '}
                <code className="font-mono text-cyan">focus-blue</code> at 3:1
                contrast on both themes. Under WCAG 2.2, the focused element must also
                not be completely hidden behind sticky headers, toasts or cookie
                banners.
            </p>
            <DoDontGrid>
                <Do note="Keep a clear, high-contrast focus ring on every interactive element.">
                    <button className="rounded-md px-3 py-2 text-body-small font-semibold text-navy dark:text-white ring-2 ring-focus-blue">
                        Focused button
                    </button>
                </Do>
                <Dont note="Strip outlines with outline:none and leave nothing in their place.">
                    <button className="rounded-md px-3 py-2 text-body-small font-semibold text-grey dark:text-light-grey">
                        No focus shown
                    </button>
                </Dont>
            </DoDontGrid>
        </Section>

        <Section id="order" title="Focus order">
            <p className="text-grey dark:text-light-grey">
                Focus should move in a logical, predictable order that follows the
                reading order — generally the DOM order. Avoid positive{' '}
                <code className="font-mono text-cyan">tabindex</code> values, which
                fight the natural order; use only{' '}
                <code className="font-mono text-cyan">0</code> (in the natural flow)
                or <code className="font-mono text-cyan">-1</code> (focusable only by
                script). Moving focus must not, on its own, trigger a change of
                context.
            </p>
        </Section>

        <Section id="management" title="Focus management">
            <Subsection title="Dialogs & overlays">
                <p className="text-grey dark:text-light-grey">
                    When a modal opens, move focus into it and trap focus inside while
                    it is open, so <kbd className="font-mono">Tab</kbd> cycles within
                    the dialog rather than escaping to the page behind. On close,
                    return focus to the control that opened it. Never trap focus
                    anywhere else — the user must always be able to tab away.
                </p>
            </Subsection>
        </Section>

        <Section id="criteria" title="Success criteria">
            <CriteriaList
                items={[
                    { id: '2.1.1', title: 'Keyboard', level: 'A' },
                    { id: '2.1.2', title: 'No Keyboard Trap', level: 'A' },
                    { id: '2.4.3', title: 'Focus Order', level: 'A' },
                    { id: '2.4.7', title: 'Focus Visible', level: 'AA' },
                    {
                        id: '2.4.11',
                        title: 'Focus Not Obscured (Minimum)',
                        level: 'AA',
                        isNew: true,
                    },
                    { id: '3.2.1', title: 'On Focus', level: 'A' },
                ]}
            />
        </Section>
    </DesignSystemLayout>
)

export default Page
