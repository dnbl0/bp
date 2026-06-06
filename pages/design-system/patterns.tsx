import { NextPageWithLayout } from '../../types/nextLayout'
import { DesignSystemLayout } from '../../styleguide-components/DesignSystemLayout'
import { PageHeader, Section } from '../../styleguide-components/primitives'

const toc = [
    { id: 'atomic-design', title: 'Atomic design' },
    { id: 'grid', title: 'Grid system' },
    { id: 'forms', title: 'Forms' },
    { id: 'search', title: 'Search' },
]

const layers = [
    { name: 'Atoms', detail: 'Buttons, tags, icons, inputs — indivisible building blocks.' },
    { name: 'Molecules', detail: 'Cards, hero banners and the CMS content blocks authored in Contentful.' },
    { name: 'Sections', detail: 'Full-width layout bands that arrange blocks into rows, columns and grids.' },
    { name: 'Organisms', detail: 'The header, footer and other large, self-contained regions.' },
    { name: 'Templates', detail: 'Page scaffolds that assemble organisms and sections into a page.' },
]

const Patterns: NextPageWithLayout = () => (
    <DesignSystemLayout title="Patterns" toc={toc}>
        <PageHeader
            eyebrow="Patterns"
            title="Patterns"
            status="stable"
            intro="Patterns describe how the foundations and components combine into consistent, reusable solutions to common design problems."
        />

        <Section id="atomic-design" title="Atomic design">
            <p className="text-grey dark:text-light-grey">
                The library follows an atomic-design hierarchy. Smaller pieces
                compose into larger ones, so a change to an atom ripples through
                everything built on top of it.
            </p>
            <ol className="mt-4 space-y-3">
                {layers.map((layer, index) => (
                    <li
                        key={layer.name}
                        className="flex gap-4 items-start rounded-xl border border-cool-paper-200 dark:border-charcoal p-4 bg-white dark:bg-cool-grey"
                    >
                        <span className="flex-none w-8 h-8 rounded-full bg-cyan text-white font-semibold flex items-center justify-center">
                            {index + 1}
                        </span>
                        <span>
                            <span className="block font-semibold text-navy dark:text-white">
                                {layer.name}
                            </span>
                            <span className="block text-body-small text-grey dark:text-light-grey">
                                {layer.detail}
                            </span>
                        </span>
                    </li>
                ))}
            </ol>
        </Section>

        <Section id="grid" title="Grid system">
            <p className="text-grey dark:text-light-grey">
                Sections lay content out on a 12-column grid. Named section
                components express common splits — <code className="font-mono text-cyan">Section6x6</code>,{' '}
                <code className="font-mono text-cyan">Section4x8</code>,{' '}
                <code className="font-mono text-cyan">Section4x4x4</code> and{' '}
                <code className="font-mono text-cyan">Section3x3x3x3</code> — so authors
                pick a layout rather than hand-rolling column spans.
            </p>
            <div className="mt-4 space-y-2">
                {[
                    [6, 6],
                    [4, 8],
                    [4, 4, 4],
                    [3, 3, 3, 3],
                ].map(split => (
                    <div key={split.join('-')} className="grid grid-cols-12 gap-2">
                        {split.map((span, index) => (
                            <div
                                key={index}
                                className="h-10 rounded bg-cyan-50 dark:bg-charcoal border border-cyan/40 flex items-center justify-center text-caption font-mono text-cyan"
                                style={{ gridColumn: `span ${span} / span ${span}` }}
                            >
                                {span}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </Section>

        <Section id="forms" title="Forms">
            <p className="text-grey dark:text-light-grey">
                Lead-capture forms are rendered through the SnapForms integration and
                surfaced either inline (via <code className="font-mono text-cyan">FormBlock</code>)
                or in a modal. Keep forms short, label every field, and pair the
                submit action with a single primary button.
            </p>
        </Section>

        <Section id="search" title="Search">
            <p className="text-grey dark:text-light-grey">
                The find-a-home experience is built on Algolia InstantSearch with
                type-ahead autocomplete. Present results progressively, keep the query
                visible, and provide a clear empty state when nothing matches.
            </p>
        </Section>
    </DesignSystemLayout>
)

export default Patterns
