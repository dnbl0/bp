import Link from 'next/link'
import { ReactNode } from 'react'
import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { ArrowRight } from '../../../components/atoms/icons/ArrowRight'
import { brandGuidelines, hrefForItem } from '../../../styleguide-components/brands'
import { BrandHero, BigStatement, Section } from '../../../styleguide-components/primitives'
import { purpose } from '../../../styleguide-components/brand/content'

const toc = [
    { id: 'pillars', title: 'The four pillars' },
    { id: 'explore', title: 'Explore the guidelines' },
    { id: 'about', title: 'About this version' },
]

interface Pillar {
    title: string
    href: string
    description: string
}

const pillars: Pillar[] = [
    {
        title: 'Our strategy',
        href: `${brandGuidelines.basePath}/strategy`,
        description: 'Our purpose, ambition and values — the reason we exist and what we want to be.',
    },
    {
        title: 'Design principles',
        href: `${brandGuidelines.basePath}/design-principles`,
        description: 'Start with a square. Blue is the glue. Less is more. Keep it real.',
    },
    {
        title: 'Design toolkit',
        href: `${brandGuidelines.basePath}/logo`,
        description: 'Logo, colour, typography, imagery, icons, buttons and more — the building blocks of the brand.',
    },
    {
        title: 'Tone of voice',
        href: `${brandGuidelines.basePath}/tone-of-voice`,
        description: 'How we sound: helpful, straightforward, friendly and inviting.',
    },
]

const PillarCard = ({ pillar }: { pillar: Pillar }) => (
    <Link href={pillar.href}>
        <a className="group flex flex-col rounded-2xl border border-cool-paper-200 dark:border-charcoal p-6 bg-white dark:bg-cool-grey hover:border-cyan hover:shadow-depth-hover transition-all">
            <span className="flex items-center gap-2 text-heading-s font-semibold text-navy dark:text-white group-hover:text-cyan">
                {pillar.title}
                <span className="text-cyan opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                    <ArrowRight className="w-4 h-4 fill-current" />
                </span>
            </span>
            <span className="mt-2 flex-1 text-body-small text-grey dark:text-light-grey">
                {pillar.description}
            </span>
        </a>
    </Link>
)

/**
 * Line icons for the overview cards, keyed by page slug. All share a 24px
 * grid, currentColor stroke and rounded joins so they read as one set.
 */
const cardIcons: Record<string, ReactNode> = {
    strategy: (
        <>
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="12" cy="12" r="1" />
        </>
    ),
    'design-principles': (
        <rect x="4" y="4" width="16" height="16" rx="2" />
    ),
    logo: (
        <path d="M3 13h4l2-5 3 9 2.5-6 1.5 2h5" />
    ),
    colour: (
        <>
            <circle cx="12" cy="12" r="9" />
            <circle cx="9" cy="9" r="1" />
            <circle cx="15" cy="9" r="1" />
            <circle cx="9" cy="15" r="1" />
            <circle cx="15" cy="15" r="1" />
        </>
    ),
    typography: (
        <path d="M5 7V5h14v2M12 5v14M9 19h6" />
    ),
    layout: (
        <>
            <rect x="4" y="5" width="16" height="14" rx="2" />
            <path d="M4 9h16M4 15h16" />
        </>
    ),
    photography: (
        <>
            <path d="M4 8a2 2 0 0 1 2-2h2l1.5-2h5L18 6h0a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
            <circle cx="12" cy="13" r="3" />
        </>
    ),
    illustration: (
        <path d="M16.5 4.5l3 3L9 18l-4 1 1-4z" />
    ),
    iconography: (
        <>
            <rect x="4" y="4" width="7" height="7" rx="1" />
            <rect x="13" y="4" width="7" height="7" rx="1" />
            <rect x="4" y="13" width="7" height="7" rx="1" />
            <rect x="13" y="13" width="7" height="7" rx="1" />
        </>
    ),
    buttons: (
        <>
            <rect x="3" y="8" width="18" height="8" rx="4" />
            <path d="M8 12h8" />
        </>
    ),
    'promotional-flashes': (
        <path d="M12 3l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L4.8 8.3l5-.7z" />
    ),
    'tone-of-voice': (
        <path d="M5 5h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H9l-4 4v-4H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
    ),
}

const CardIcon = ({ slug }: { slug: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
        aria-hidden="true"
    >
        {cardIcons[slug] ?? <rect x="5" y="4" width="14" height="16" rx="2" />}
    </svg>
)

const PageCard = ({
    title,
    summary,
    href,
    slug,
}: {
    title: string
    summary?: string
    href: string
    slug: string
}) => (
    <Link href={href}>
        <a className="group flex flex-col rounded-xl border border-cool-paper-200 dark:border-charcoal p-5 bg-white dark:bg-cool-grey hover:border-cyan hover:shadow-depth-hover transition-all">
            <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-cool-paper-100 dark:bg-charcoal text-cyan group-hover:bg-cyan group-hover:text-white transition-colors">
                <CardIcon slug={slug} />
            </span>
            <span className="text-body font-semibold text-navy dark:text-white group-hover:text-cyan">
                {title}
            </span>
            <span className="mt-1 flex-1 text-body-small text-grey dark:text-light-grey">
                {summary}
            </span>
        </a>
    </Link>
)

const Group = ({ title, children }: { title: string; children: ReactNode }) => (
    <div>
        <h3 className="mb-3 text-body-small font-bold uppercase tracking-wide text-disabled-text">
            {title}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </div>
)

const BrandHome: NextPageWithLayout = () => (
    <DesignSystemLayout title="Introduction" toc={toc} wide>
        <BrandHero
            eyebrow="Brand guidelines · 2023 (v1)"
            title="Our brand guidelines"
            intro="How the Bupa brand looks, sounds and behaves — so every communication feels distinctly, confidently Bupa."
        />

        <BigStatement label="Our purpose" tone="blue">
            {purpose}
        </BigStatement>

        <Section id="pillars" title="The four pillars">
            <div className="grid gap-4 sm:grid-cols-2">
                {pillars.map(pillar => (
                    <PillarCard key={pillar.title} pillar={pillar} />
                ))}
            </div>
        </Section>

        <Section id="explore" title="Explore the guidelines">
            <div className="space-y-8">
                {brandGuidelines.navSections.map(section => (
                    <Group key={section.title} title={section.title}>
                        {section.items
                            .filter(item => item.slug !== '')
                            .map(item => (
                                <PageCard
                                    key={item.slug}
                                    title={item.title}
                                    summary={item.summary}
                                    href={hrefForItem(brandGuidelines, item)}
                                    slug={item.slug}
                                />
                            ))}
                    </Group>
                ))}
            </div>
        </Section>

        <Section id="about" title="About this version">
            <p className="text-grey dark:text-light-grey">
                This is a faithful reproduction of the <strong>Bupa Brand Guidelines
                Version 1 (©Bupa 2023)</strong>, presented through the design system
                documentation template. When creating icons and illustrations, or
                purchasing and modifying photography, please speak to your local brand
                and legal teams for guidance. Brand assets — logos, photography,
                illustration libraries and promotional flashes — are downloadable from
                Bupa Inspire.
            </p>
        </Section>
    </DesignSystemLayout>
)

export default BrandHome
