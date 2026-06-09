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

const PageCard = ({ title, summary, href }: { title: string; summary?: string; href: string }) => (
    <Link href={href}>
        <a className="group flex flex-col rounded-xl border border-cool-paper-200 dark:border-charcoal p-5 bg-white dark:bg-cool-grey hover:border-cyan hover:shadow-depth-hover transition-all">
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
        <div className="grid gap-4 sm:grid-cols-2">{children}</div>
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
