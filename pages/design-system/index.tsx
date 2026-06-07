import Link from 'next/link'
import { NextPageWithLayout } from '../../types/nextLayout'
import { DesignSystemLayout } from '../../styleguide-components/DesignSystemLayout'
import { PageHeader, Section } from '../../styleguide-components/primitives'
import {
    SITE_TAGLINE,
    hrefFor,
    navSections,
} from '../../styleguide-components/designSystem.config'

const toc = [
    { id: 'principles', title: 'Principles' },
    { id: 'how-it-works', title: 'How it works' },
    { id: 'explore', title: 'Explore' },
]

const principles = [
    {
        title: 'Single source of truth',
        body: 'Tokens are read live from the production Tailwind theme, so the documentation can never drift from the shipped product.',
    },
    {
        title: 'Built from real components',
        body: 'Every example renders the actual React component in its real runtime — what you see is what ships.',
    },
    {
        title: 'Accessible by default',
        body: 'Colour, type and focus styles are designed to meet WCAG AA, with guidance baked into each page.',
    },
    {
        title: 'Composable',
        body: 'Atoms compose into molecules, blocks and sections following an atomic-design hierarchy.',
    },
]

const DesignSystemHome: NextPageWithLayout = () => (
    <DesignSystemLayout title="Introduction" toc={toc}>
        <PageHeader
            eyebrow="Overview"
            title="Bupa Design System"
            status="stable"
            intro={SITE_TAGLINE}
        />

        <p className="text-grey dark:text-light-grey">
            This is the living documentation for the design language behind the
            Bupa Aged Care website. It documents the foundations — colour,
            typography, spacing, elevation, iconography and motion — alongside the
            component library that brings them to life. Everything here is generated
            from the same code that powers the production site.
        </p>

        <Section id="principles" title="Principles">
            <div className="grid gap-4 sm:grid-cols-2">
                {principles.map(principle => (
                    <div
                        key={principle.title}
                        className="rounded-xl border border-cool-paper-200 dark:border-charcoal p-6 bg-white dark:bg-cool-grey"
                    >
                        <h3 className="text-heading-s font-semibold text-navy dark:text-white">
                            {principle.title}
                        </h3>
                        <p className="mt-2 text-body-small text-grey dark:text-light-grey">
                            {principle.body}
                        </p>
                    </div>
                ))}
            </div>
        </Section>

        <Section id="how-it-works" title="How it works">
            <p className="text-grey dark:text-light-grey">
                Design tokens are sourced directly from{' '}
                <code className="font-mono text-cyan">tailwind.config.js</code> and the
                CSS custom properties in{' '}
                <code className="font-mono text-cyan">styles/base/typography.css</code>.
                Components are imported from the same{' '}
                <code className="font-mono text-cyan">components/</code> directory used by
                the site. Editing those sources updates this documentation
                automatically — there is nothing to keep in sync by hand.
            </p>
        </Section>

        <Section id="explore" title="Explore">
            <div className="space-y-8">
                {navSections
                    .filter(section => section.title !== 'Overview')
                    .map(section => (
                        <div key={section.title}>
                            <h3 className="bds-h3 text-navy dark:text-white mb-3">
                                {section.title}
                            </h3>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {section.items.map(item => (
                                    <Link key={item.slug} href={hrefFor(item.slug)}>
                                        <a className="group rounded-xl border border-cool-paper-200 dark:border-charcoal p-5 bg-white dark:bg-cool-grey hover:border-cyan transition-colors">
                                            <span className="block font-semibold text-navy dark:text-white group-hover:text-cyan">
                                                {item.title}
                                            </span>
                                            {item.summary && (
                                                <span className="mt-1 block text-body-small text-grey dark:text-light-grey">
                                                    {item.summary}
                                                </span>
                                            )}
                                        </a>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
        </Section>
    </DesignSystemLayout>
)

export default DesignSystemHome
