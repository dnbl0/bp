import Link from 'next/link'
import { NextPageWithLayout } from '../../types/nextLayout'
import { DesignSystemLayout } from '../../styleguide-components/DesignSystemLayout'
import { Section } from '../../styleguide-components/primitives'
import { StatusBadge } from '../../styleguide-components/primitives/StatusBadge'
import { ArrowRight } from '../../components/atoms/icons/ArrowRight'
import { SquareBupaLogo } from '../../components/atoms/icons/SquareBupaLogo'
import {
    SITE_TAGLINE,
    SITE_TITLE,
    hrefFor,
} from '../../styleguide-components/designSystem.config'

const toc = [
    { id: 'explore', title: 'Explore' },
    { id: 'principles', title: 'Principles' },
    { id: 'how-it-works', title: 'How it works' },
    { id: 'help', title: 'Need help?' },
]

/**
 * The top-level destinations surfaced on the landing page, modelled on the
 * card grid of the Primer documentation home. The sidebar carries the full
 * navigation; these are the entry points most people start from.
 */
const destinations = [
    {
        title: 'Getting started',
        slug: 'getting-started',
        accent: 'bg-cyan',
        body: 'Run the site, learn the project structure, and start composing pages from components and tokens.',
    },
    {
        title: 'Foundations',
        slug: 'foundations/tokens',
        accent: 'bg-teal',
        body: 'The design tokens behind everything — colour, typography, spacing, elevation and motion.',
    },
    {
        title: 'Components',
        slug: 'components',
        accent: 'bg-purple',
        body: 'Design and development guidance for every component in the library, with live examples.',
    },
    {
        title: 'Patterns',
        slug: 'patterns',
        accent: 'bg-fuchsia',
        body: 'Atomic design, the 12-column grid system, and forms and search experiences.',
    },
    {
        title: 'Iconography',
        slug: 'foundations/iconography',
        accent: 'bg-orange',
        body: 'The inline SVG icon set, searchable with copyable imports for every glyph.',
    },
    {
        title: 'Resources',
        slug: 'resources',
        accent: 'bg-green',
        body: 'The Figma UI Kit, Contentful mappings and guidance for contributing back.',
    },
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

/** The brand swatches shown in the hero, hinting at the system behind the docs. */
const heroSwatches = [
    'bg-cyan',
    'bg-navy',
    'bg-teal',
    'bg-purple',
    'bg-fuchsia',
    'bg-orange',
    'bg-green',
    'bg-cyan-400',
]

const Hero = () => (
    <header className="mb-16 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
            <p className="text-body-small font-semibold uppercase tracking-wide text-cyan">
                Overview
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
                <h1 className="text-heading-xl font-bold text-navy dark:text-white">
                    {SITE_TITLE}
                </h1>
                <StatusBadge status="stable" />
            </div>
            <p className="mt-4 max-w-2xl text-heading-s text-grey dark:text-light-grey">
                {SITE_TAGLINE} A set of guidelines, principles and patterns for
                designing and building the Bupa Aged Care experience.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
                <Link href={hrefFor('getting-started')}>
                    <a className="inline-flex items-center gap-2 rounded-lg bg-cyan px-5 py-2.5 font-semibold text-white hover:bg-cyan-400 transition-colors">
                        Get started
                        <ArrowRight className="w-4 h-4 fill-current" />
                    </a>
                </Link>
                <Link href={hrefFor('components')}>
                    <a className="inline-flex items-center gap-2 rounded-lg border border-cool-paper-200 dark:border-charcoal px-5 py-2.5 font-semibold text-navy dark:text-white hover:border-cyan hover:text-cyan transition-colors">
                        Browse components
                    </a>
                </Link>
            </div>
        </div>

        {/* A small "design system" still life: the mark over a field of brand swatches. */}
        <div
            className="relative hidden lg:block rounded-2xl border border-cool-paper-200 dark:border-charcoal bg-cool-paper-50 dark:bg-cool-grey p-8"
            aria-hidden="true"
        >
            <div className="flex items-center justify-center mb-6">
                <SquareBupaLogo className="w-16 h-16" />
            </div>
            <div className="grid grid-cols-4 gap-3">
                {heroSwatches.map((swatch, index) => (
                    <div
                        key={index}
                        className={`${swatch} aspect-square rounded-lg shadow-DEFAULT`}
                    />
                ))}
            </div>
        </div>
    </header>
)

const DesignSystemHome: NextPageWithLayout = () => (
    <DesignSystemLayout title="Introduction" toc={toc} wide>
        <Hero />

        <Section id="explore" title="Explore">
            <p className="-mt-2 mb-6 max-w-2xl text-grey dark:text-light-grey">
                Everything here is generated from the same code that powers the
                production site. Start with one of the areas below.
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {destinations.map(destination => (
                    <Link key={destination.slug} href={hrefFor(destination.slug)}>
                        <a className="group flex flex-col rounded-xl border border-cool-paper-200 dark:border-charcoal p-6 bg-white dark:bg-cool-grey hover:border-cyan hover:shadow-depth-hover transition-all">
                            <span
                                className={`${destination.accent} mb-4 h-9 w-9 rounded-lg`}
                                aria-hidden="true"
                            />
                            <span className="text-heading-s font-semibold text-navy dark:text-white group-hover:text-cyan">
                                {destination.title}
                            </span>
                            <span className="mt-2 flex-1 text-body-small text-grey dark:text-light-grey">
                                {destination.body}
                            </span>
                            <span className="mt-4 inline-flex items-center gap-1.5 text-body-small font-semibold text-cyan">
                                Learn more
                                <ArrowRight className="w-4 h-4 fill-current transition-transform group-hover:translate-x-1" />
                            </span>
                        </a>
                    </Link>
                ))}
            </div>
        </Section>

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

        <Section id="help" title="Need help?">
            <div className="rounded-2xl border border-cool-paper-200 dark:border-charcoal bg-cool-paper-50 dark:bg-cool-grey p-8">
                <p className="max-w-2xl text-grey dark:text-light-grey">
                    Found a bug in the documentation, or want to propose a new
                    component? Head to the resources page for contribution
                    guidance and the Figma UI Kit.
                </p>
                <Link href={hrefFor('resources')}>
                    <a className="mt-4 inline-flex items-center gap-1.5 font-semibold text-cyan hover:underline">
                        Go to resources
                        <ArrowRight className="w-4 h-4 fill-current" />
                    </a>
                </Link>
            </div>
        </Section>
    </DesignSystemLayout>
)

export default DesignSystemHome
