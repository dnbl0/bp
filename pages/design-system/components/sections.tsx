import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { PageHeader, Section } from '../../../styleguide-components/primitives'

const gridSections = [
    { name: 'Section12', split: [12], detail: 'Full-width, single column.' },
    { name: 'Section6x6', split: [6, 6], detail: 'Two equal columns.' },
    { name: 'Section4x8', split: [4, 8], detail: 'Asymmetric — narrow then wide.' },
    { name: 'Section4x4x4', split: [4, 4, 4], detail: 'Three equal columns.' },
    { name: 'Section3x3x3x3', split: [3, 3, 3, 3], detail: 'Four equal columns.' },
]

const layoutSections = [
    { name: 'OneColumnSection', detail: 'A single-column content band.' },
    { name: 'TwoColumnSection', detail: 'A left/right two-column band.' },
    { name: 'BannerSection', detail: 'A promotional banner band with configurable layout.' },
    { name: 'BasicHeroSection', detail: 'A standard page hero.' },
    { name: 'ContactHeroSection', detail: 'A hero with contact-oriented CTAs.' },
    { name: 'SearchHomeHeroSection', detail: 'The homepage hero with integrated search.' },
    { name: 'ThreeColumnSearchHeroSection', detail: 'A three-column hero with search.' },
    { name: 'RegionListDetailSection', detail: 'A list/detail layout for browsing regions.' },
]

const toc = [
    { id: 'grid', title: 'Grid sections' },
    { id: 'layout', title: 'Layout sections' },
    { id: 'usage', title: 'Usage' },
]

const Sections: NextPageWithLayout = () => (
    <DesignSystemLayout title="Sections" toc={toc}>
        <PageHeader
            eyebrow="Components · Sections"
            title="Sections"
            status="stable"
            intro="Sections are full-width bands that arrange content blocks on a 12-column grid. Authors choose a named layout rather than composing column spans by hand, keeping pages consistent and responsive."
        />

        <Section id="grid" title="Grid sections">
            <div className="space-y-6">
                {gridSections.map(section => (
                    <div key={section.name}>
                        <div className="flex items-baseline justify-between mb-2">
                            <code className="font-mono text-body-small text-cyan">
                                {section.name}
                            </code>
                            <span className="text-caption text-grey dark:text-light-grey">
                                {section.detail}
                            </span>
                        </div>
                        <div className="grid grid-cols-12 gap-2">
                            {section.split.map((span, index) => (
                                <div
                                    key={index}
                                    className="h-12 rounded bg-cyan-50 dark:bg-charcoal border border-cyan/40 flex items-center justify-center text-caption font-mono text-cyan"
                                    style={{ gridColumn: `span ${span} / span ${span}` }}
                                >
                                    {span}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Section>

        <Section id="layout" title="Layout sections">
            <div className="grid gap-3 sm:grid-cols-2">
                {layoutSections.map(section => (
                    <div
                        key={section.name}
                        className="rounded-xl border border-cool-paper-200 dark:border-charcoal p-4 bg-white dark:bg-cool-grey"
                    >
                        <code className="font-mono text-body-small text-cyan">
                            {section.name}
                        </code>
                        <p className="mt-1 text-body-small text-grey dark:text-light-grey">
                            {section.detail}
                        </p>
                    </div>
                ))}
            </div>
        </Section>

        <Section id="usage" title="Usage">
            <p className="text-grey dark:text-light-grey">
                On narrow viewports, grid columns stack vertically. Keep related
                content within a single section so it reflows together, and prefer the
                fewest columns that communicate the hierarchy.
            </p>
        </Section>
    </DesignSystemLayout>
)

export default Sections
