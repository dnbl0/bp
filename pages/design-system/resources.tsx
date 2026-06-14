import { ReactNode } from 'react'
import { NextPageWithLayout } from '../../types/nextLayout'
import { DesignSystemLayout } from '../../styleguide-components/DesignSystemLayout'
import { InfoCard, PageHeader, Section, cardIcons } from '../../styleguide-components/primitives'
import { FigmaIcon } from '../../components/atoms/icons/FigmaIcon'

const toc = [
    { id: 'design', title: 'Design' },
    { id: 'content', title: 'Content' },
    { id: 'contributing', title: 'Contributing' },
]

const designLinks: { title: string; href: string; detail: string; icon: ReactNode }[] = [
    {
        title: 'Figma UI Kit',
        icon: <FigmaIcon width={18} height={18} />,
        href: 'https://www.figma.com/file/iYWhlWxkIXlSYfdZUm8Zra/BVAC-UI-Kit',
        detail: 'The source design file with the colour, typography and component reference.',
    },
]

const contentLinks: { title: string; href: string; detail: string; icon: ReactNode }[] = [
    {
        title: 'Contentful space',
        icon: cardIcons.content,
        href: 'https://app.contentful.com/spaces/7jbjw06z88y9/home',
        detail: 'Where the CMS-driven blocks, sections and pages are authored.',
    },
]

const Resources: NextPageWithLayout = () => (
    <DesignSystemLayout title="Resources" toc={toc}>
        <PageHeader
            eyebrow="Resources"
            title="Resources"
            status="stable"
            intro="Source files, tools and guidance for working with the design system."
        />

        <Section id="design" title="Design">
            <div className="grid gap-3 sm:grid-cols-2">
                {designLinks.map(link => (
                    <InfoCard key={link.href} icon={link.icon} href={link.href} title={link.title} description={link.detail} external />
                ))}
            </div>
        </Section>

        <Section id="content" title="Content">
            <div className="grid gap-3 sm:grid-cols-2">
                {contentLinks.map(link => (
                    <InfoCard key={link.href} icon={link.icon} href={link.href} title={link.title} description={link.detail} external />
                ))}
            </div>
        </Section>

        <Section id="contributing" title="Contributing">
            <p className="text-grey dark:text-light-grey">
                This documentation lives in the website repository under{' '}
                <code className="font-mono text-cyan">styleguide-components/</code> and{' '}
                <code className="font-mono text-cyan">pages/design-system/</code>. It
                reads tokens live from{' '}
                <code className="font-mono text-cyan">tailwind.config.js</code> and{' '}
                <code className="font-mono text-cyan">styles/base/typography.css</code>,
                and imports the real components, so there is no separate copy to keep
                in sync.
            </p>
            <p className="mt-4 text-grey dark:text-light-grey">
                To add a component page: create a page under{' '}
                <code className="font-mono text-cyan">pages/design-system/components/</code>,
                build it from the shared primitives (
                <code className="font-mono text-cyan">PageHeader</code>,{' '}
                <code className="font-mono text-cyan">Example</code>,{' '}
                <code className="font-mono text-cyan">PropsTable</code>,{' '}
                <code className="font-mono text-cyan">Anatomy</code>,{' '}
                <code className="font-mono text-cyan">Do</code>/
                <code className="font-mono text-cyan">Dont</code>), and register it in{' '}
                <code className="font-mono text-cyan">designSystem.config.ts</code> so
                it appears in the sidebar and search.
            </p>
        </Section>
    </DesignSystemLayout>
)

export default Resources
