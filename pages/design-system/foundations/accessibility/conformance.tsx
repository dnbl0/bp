import { NextPageWithLayout } from '../../../../types/nextLayout'
import { DesignSystemLayout } from '../../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Subsection,
} from '../../../../styleguide-components/primitives'

const toc = [
    { id: 'levels', title: 'What AA means' },
    { id: 'scope', title: 'Scope & caveat' },
    { id: 'known-issues', title: 'Tracking known issues' },
    { id: 'statement', title: 'Accessibility statement' },
]

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Conformance & statement" toc={toc}>
        <PageHeader
            eyebrow="Accessibility"
            title="Conformance & statement"
            status="stable"
            intro="We hold the system to WCAG 2.2 Level AA. This page explains what that target means, the honest limits of a design system, and how we record what is not yet compliant."
        />

        <Section id="levels" title="What AA means">
            <p className="text-grey dark:text-light-grey">
                WCAG defines three conformance levels. <strong>A</strong> is the
                minimum, <strong>AA</strong> is the level referenced by most
                accessibility legislation (and the one we target), and{' '}
                <strong>AAA</strong> is an enhanced level we adopt where it is
                practical but do not require everywhere. Meeting AA means satisfying
                every Level A and Level AA success criterion that applies to a page.
            </p>
            <p className="mt-3 text-grey dark:text-light-grey">
                We track to WCAG 2.2, the current version. Its newest AA criteria —
                target size, dragging alternatives, focus not obscured, redundant
                entry and accessible authentication — are called out where they
                apply throughout these guidelines.
            </p>
        </Section>

        <Section id="scope" title="Scope & caveat">
            <div className="rounded-xl border border-cool-paper-200 dark:border-charcoal bg-cool-paper-50 dark:bg-cool-grey p-5">
                <p className="text-grey dark:text-light-grey">
                    <strong className="text-navy dark:text-white">
                        Using this design system does not make a page accessible.
                    </strong>{' '}
                    Components are built and tested in isolation, so they cannot
                    account for the context you place them in — reading order across
                    a whole page, heading hierarchy, duplicated landmarks, or content
                    you author. Accessibility is a property of the finished page, not
                    of any one component. You still need your own research, design,
                    development and testing.
                </p>
            </div>
        </Section>

        <Section id="known-issues" title="Tracking known issues">
            <p className="text-grey dark:text-light-grey">
                Where a component does not yet meet AA, we record it rather than hide
                it. Following the GOV.UK model, issues are labelled in two buckets so
                their severity is unambiguous:
            </p>
            <Subsection title="Two labels">
                <ul className="list-disc pl-6 space-y-2 text-grey dark:text-light-grey">
                    <li>
                        <strong>Regulation failure</strong> — a genuine WCAG 2.2 A or
                        AA failure. These are prioritised and block a component from
                        being marked stable.
                    </li>
                    <li>
                        <strong>Concern</strong> — a barrier that is not a strict WCAG
                        failure but still degrades the experience for some users. We
                        fix these as capacity allows.
                    </li>
                </ul>
            </Subsection>
            <p className="mt-4 text-body-small text-grey dark:text-light-grey">
                Each component page shows its current status. A component is only
                marked <strong>stable</strong> once it has no open regulation
                failures.
            </p>
        </Section>

        <Section id="statement" title="Accessibility statement">
            <p className="text-grey dark:text-light-grey">
                A product built on this system should publish its own accessibility
                statement covering the live service. A good statement names the
                standard met (WCAG 2.2 AA), the date and who tested it, any known
                non-compliances and planned fixes, and how someone can report a
                barrier or request content in another format. When a formal
                conformance report is needed for procurement, a completed VPAT
                becomes the Accessibility Conformance Report (ACR) for the product —
                produced at the product level, not for the design system itself.
            </p>
        </Section>
    </DesignSystemLayout>
)

export default Page
