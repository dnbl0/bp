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
    { id: 'how', title: 'How assistive tech reads a page' },
    { id: 'names', title: 'Accessible names' },
    { id: 'aria-rules', title: 'The five rules of ARIA' },
    { id: 'live', title: 'Live regions' },
    { id: 'criteria', title: 'Success criteria' },
]

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Screen readers & ARIA" toc={toc}>
        <PageHeader
            eyebrow="Accessibility"
            title="Screen readers & ARIA"
            status="stable"
            intro="Assistive technologies build their own model of a page from its markup. Get the semantics right and they work for free; reach for ARIA carelessly and you can make things worse than plain HTML."
        />

        <Section id="how" title="How assistive tech reads a page">
            <p className="text-grey dark:text-light-grey">
                A screen reader exposes each element&apos;s <strong>role</strong> (what
                it is — button, link, heading), its <strong>name</strong> (its label),
                its <strong>value</strong> and its <strong>state</strong>
                (expanded, checked, disabled). Native HTML elements carry all of this
                already, which is why a real{' '}
                <code className="font-mono text-cyan">&lt;button&gt;</code> beats a
                styled <code className="font-mono text-cyan">&lt;div&gt;</code> every
                time.
            </p>
        </Section>

        <Section id="names" title="Accessible names">
            <p className="text-grey dark:text-light-grey">
                Every interactive element needs an accessible name. Usually that is its
                visible text or an associated{' '}
                <code className="font-mono text-cyan">&lt;label&gt;</code>. For
                icon-only controls, supply one with{' '}
                <code className="font-mono text-cyan">aria-label</code>; to point at
                visible text elsewhere, use{' '}
                <code className="font-mono text-cyan">aria-labelledby</code>. The name
                should match what the user sees, so voice-control users can say it.
            </p>
        </Section>

        <Section id="aria-rules" title="The five rules of ARIA">
            <p className="text-grey dark:text-light-grey">
                The W3C&apos;s guidance is blunt: <strong>no ARIA is better than bad
                ARIA</strong>. Pages with ARIA average more detected errors than pages
                without, because it is easy to misuse. The five rules:
            </p>
            <ol className="mt-3 list-decimal pl-6 space-y-2 text-grey dark:text-light-grey">
                <li>
                    If a native HTML element or attribute does the job, use it instead
                    of re-creating it with ARIA.
                </li>
                <li>Don&apos;t change native semantics unless you really must.</li>
                <li>
                    Every interactive ARIA control must be usable from the keyboard.
                </li>
                <li>
                    Don&apos;t put{' '}
                    <code className="font-mono text-cyan">role=&quot;presentation&quot;</code>{' '}
                    or{' '}
                    <code className="font-mono text-cyan">aria-hidden=&quot;true&quot;</code>{' '}
                    on a focusable element.
                </li>
                <li>Every interactive element must have an accessible name.</li>
            </ol>
            <DoDontGrid>
                <Do note="Use the native element — it is keyboard- and screen-reader-ready by default.">
                    <code className="font-mono text-body-small text-dark-green">
                        &lt;button&gt;Save&lt;/button&gt;
                    </code>
                </Do>
                <Dont note="Re-build a control from a div and bolt on ARIA and key handlers.">
                    <code className="font-mono text-body-small text-error-red">
                        &lt;div role=&quot;button&quot; tabindex=&quot;0&quot;&gt;
                    </code>
                </Dont>
            </DoDontGrid>
        </Section>

        <Section id="live" title="Live regions">
            <p className="text-grey dark:text-light-grey">
                When content updates without a page change — a toast, a validation
                summary, &quot;3 results found&quot; — announce it with an ARIA live
                region so screen-reader users hear it without losing their place.
            </p>
            <Subsection title="Politeness">
                <p className="text-body-small text-grey dark:text-light-grey">
                    Use{' '}
                    <code className="font-mono text-cyan">aria-live=&quot;polite&quot;</code>{' '}
                    (or a status role) for most updates so they wait for a pause, and
                    reserve{' '}
                    <code className="font-mono text-cyan">assertive</code> for genuinely
                    urgent messages such as errors that interrupt a task.
                </p>
            </Subsection>
        </Section>

        <Section id="criteria" title="Success criteria">
            <CriteriaList
                items={[
                    { id: '4.1.2', title: 'Name, Role, Value', level: 'A' },
                    { id: '4.1.3', title: 'Status Messages', level: 'AA' },
                ]}
            />
        </Section>
    </DesignSystemLayout>
)

export default Page
