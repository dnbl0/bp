import { NextPageWithLayout } from '../../../../types/nextLayout'
import { DesignSystemLayout } from '../../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Do,
    Dont,
    DoDontGrid,
    CriteriaList,
} from '../../../../styleguide-components/primitives'

const toc = [
    { id: 'headings', title: 'Headings' },
    { id: 'landmarks', title: 'Landmarks' },
    { id: 'skip-links', title: 'Skip links' },
    { id: 'order', title: 'Reading order' },
    { id: 'links', title: 'Link & page titles' },
    { id: 'criteria', title: 'Success criteria' },
]

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Structure & semantics" toc={toc}>
        <PageHeader
            eyebrow="Accessibility"
            title="Structure & semantics"
            status="stable"
            intro="Screen-reader users navigate by structure — jumping between headings and landmark regions rather than reading top to bottom. Semantic HTML gives them that map for free."
        />

        <Section id="headings" title="Headings">
            <p className="text-grey dark:text-light-grey">
                Use real heading tags (<code className="font-mono text-cyan">h1</code>
                –<code className="font-mono text-cyan">h6</code>) in order, one level
                at a time, with a single{' '}
                <code className="font-mono text-cyan">h1</code> per page. Heading
                level conveys <em>hierarchy</em>, not size — pick the level for its
                place in the outline and style it separately. Never skip a level (
                <code className="font-mono text-cyan">h2</code> straight to{' '}
                <code className="font-mono text-cyan">h4</code>) just to get a
                smaller look.
            </p>
            <DoDontGrid>
                <Do note="Choose the heading level for the outline, then style the size independently.">
                    <code className="font-mono text-body-small text-dark-green">
                        &lt;h2 class=&quot;text-heading-s&quot;&gt;
                    </code>
                </Do>
                <Dont note="Pick a heading level just because it looks the right size.">
                    <code className="font-mono text-body-small text-error-red">
                        &lt;h4&gt; used for visual size
                    </code>
                </Dont>
            </DoDontGrid>
        </Section>

        <Section id="landmarks" title="Landmarks">
            <p className="text-grey dark:text-light-grey">
                Wrap the page in landmark elements —{' '}
                <code className="font-mono text-cyan">header</code>,{' '}
                <code className="font-mono text-cyan">nav</code>,{' '}
                <code className="font-mono text-cyan">main</code>,{' '}
                <code className="font-mono text-cyan">aside</code>,{' '}
                <code className="font-mono text-cyan">footer</code> — so assistive
                tech can jump straight to a region. There should be exactly one{' '}
                <code className="font-mono text-cyan">main</code>; give repeated
                landmarks (two <code className="font-mono text-cyan">nav</code>s) an{' '}
                <code className="font-mono text-cyan">aria-label</code> to tell them
                apart.
            </p>
        </Section>

        <Section id="skip-links" title="Skip links">
            <p className="text-grey dark:text-light-grey">
                A skip link is the first focusable element on the page and lets
                keyboard users bypass the header to reach the main content. It can be
                visually hidden until focused, then appear. The system ships a{' '}
                <a
                    href="/design-system/components/skip-links"
                    className="text-cyan hover:underline"
                >
                    Skip links
                </a>{' '}
                component for exactly this.
            </p>
        </Section>

        <Section id="order" title="Reading order">
            <p className="text-grey dark:text-light-grey">
                Screen readers and keyboards follow the order of the HTML source, not
                the visual order CSS produces. Keep the DOM order matching the
                intended reading order, and be careful with CSS (flex/grid reordering,
                absolute positioning) that moves things visually but not in the
                source.
            </p>
        </Section>

        <Section id="links" title="Link & page titles">
            <p className="text-grey dark:text-light-grey">
                Link text should make sense out of context — &quot;Read the cover
                guide&quot;, not &quot;click here&quot; — because users tab through
                links as a list. Every page needs a unique, descriptive{' '}
                <code className="font-mono text-cyan">&lt;title&gt;</code> that names
                the page first.
            </p>
        </Section>

        <Section id="criteria" title="Success criteria">
            <CriteriaList
                items={[
                    { id: '1.3.1', title: 'Info and Relationships', level: 'A' },
                    { id: '1.3.2', title: 'Meaningful Sequence', level: 'A' },
                    { id: '2.4.1', title: 'Bypass Blocks', level: 'A' },
                    { id: '2.4.2', title: 'Page Titled', level: 'A' },
                    { id: '2.4.4', title: 'Link Purpose (In Context)', level: 'A' },
                    { id: '2.4.6', title: 'Headings and Labels', level: 'AA' },
                ]}
            />
        </Section>
    </DesignSystemLayout>
)

export default Page
