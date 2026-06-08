import { NextPageWithLayout } from '../../../../types/nextLayout'
import { DesignSystemLayout } from '../../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Subsection,
} from '../../../../styleguide-components/primitives'

const toc = [
    { id: 'automated', title: 'Automated testing' },
    { id: 'manual', title: 'Manual testing' },
    { id: 'screen-readers', title: 'Screen-reader pairings' },
    { id: 'checklist', title: 'Manual checklist' },
]

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Testing & tools" toc={toc}>
        <PageHeader
            eyebrow="Accessibility"
            title="Testing & tools"
            status="stable"
            intro="Automated tools catch roughly a third to a half of accessibility issues — the rest need a human. Use both: run a scanner on every change, then test by keyboard and screen reader before you ship."
        />

        <Section id="automated" title="Automated testing">
            <p className="text-grey dark:text-light-grey">
                Run an automated checker as part of normal development and in CI. They
                reliably catch missing labels, contrast failures, broken ARIA and
                invalid attributes — fast feedback with no excuse to skip.
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1 text-grey dark:text-light-grey">
                <li>
                    <strong>axe</strong> — the de-facto engine, available as a browser
                    extension (axe DevTools) and in CI via{' '}
                    <code className="font-mono text-cyan">axe-core</code>.
                </li>
                <li>
                    <strong>Lighthouse</strong> — built into Chrome DevTools for a
                    quick per-page score.
                </li>
                <li>
                    <strong>pa11y</strong> — command-line scanning for pipelines.
                </li>
            </ul>
            <p className="mt-3 text-body-small text-grey dark:text-light-grey">
                Treat a clean automated scan as the floor, not the finish line.
            </p>
        </Section>

        <Section id="manual" title="Manual testing">
            <Subsection title="Keyboard">
                <p className="text-grey dark:text-light-grey">
                    Put the mouse away and drive the whole flow with{' '}
                    <kbd className="font-mono">Tab</kbd> /{' '}
                    <kbd className="font-mono">Shift</kbd>+
                    <kbd className="font-mono">Tab</kbd>,{' '}
                    <kbd className="font-mono">Enter</kbd>,{' '}
                    <kbd className="font-mono">Space</kbd> and the arrow keys. Check that
                    focus is always visible, the order is logical, nothing is reachable
                    only by mouse, and focus is never trapped.
                </p>
            </Subsection>
            <Subsection title="Zoom & reflow">
                <p className="text-grey dark:text-light-grey">
                    Zoom the browser to 200% and 400% and confirm content reflows to a
                    single column with no horizontal scrolling and nothing clipped.
                </p>
            </Subsection>
        </Section>

        <Section id="screen-readers" title="Screen-reader pairings">
            <p className="text-grey dark:text-light-grey">
                Screen readers behave differently per browser, so test the common
                pairings:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-1 text-grey dark:text-light-grey">
                <li>
                    <strong>NVDA + Firefox</strong> (Windows, free)
                </li>
                <li>
                    <strong>JAWS + Chrome</strong> (Windows)
                </li>
                <li>
                    <strong>VoiceOver + Safari</strong> (macOS / iOS, built in)
                </li>
                <li>
                    <strong>TalkBack + Chrome</strong> (Android)
                </li>
            </ul>
            <p className="mt-3 text-body-small text-grey dark:text-light-grey">
                You don&apos;t need every combination for everyday checks — one
                free pairing (NVDA + Firefox or VoiceOver + Safari) catches most
                problems.
            </p>
        </Section>

        <Section id="checklist" title="Manual checklist">
            <ul className="list-disc pl-6 space-y-1 text-grey dark:text-light-grey">
                <li>Navigate the whole flow with the keyboard only.</li>
                <li>Confirm a visible focus ring on every interactive element.</li>
                <li>Check focus order is logical and focus is never trapped.</li>
                <li>Check text contrast against its background at AA.</li>
                <li>Verify meaning is never carried by colour alone.</li>
                <li>
                    Confirm every field has a visible, associated label and clear
                    error text.
                </li>
                <li>Zoom to 200% / 400% and confirm reflow with no clipping.</li>
                <li>Confirm tap targets are at least 24px (ideally 44px).</li>
                <li>Run an automated audit (axe / Lighthouse) and resolve issues.</li>
                <li>
                    Walk the flow with a screen reader: headings, labels, errors and
                    status messages all make sense.
                </li>
            </ul>
        </Section>
    </DesignSystemLayout>
)

export default Page
