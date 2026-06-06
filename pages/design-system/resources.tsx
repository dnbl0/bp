import { NextPageWithLayout } from '../../types/nextLayout'
import { DesignSystemLayout } from '../../styleguide-components/DesignSystemLayout'
import { PageHeader, Section } from '../../styleguide-components/primitives'

const toc = [
    { id: 'design', title: 'Design' },
    { id: 'content', title: 'Content' },
    { id: 'contributing', title: 'Contributing' },
]

const designLinks = [
    {
        title: 'Figma UI Kit',
        href: 'https://www.figma.com/file/iYWhlWxkIXlSYfdZUm8Zra/BVAC-UI-Kit',
        detail: 'The source design file with the colour, typography and component reference.',
    },
]

const contentLinks = [
    {
        title: 'Contentful space',
        href: 'https://app.contentful.com/spaces/7jbjw06z88y9/home',
        detail: 'Where the CMS-driven blocks, sections and pages are authored.',
    },
]

const LinkCard = ({
    title,
    href,
    detail,
}: {
    title: string
    href: string
    detail: string
}) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="block rounded-xl border border-cool-paper-200 dark:border-charcoal p-5 bg-white dark:bg-cool-grey hover:border-cyan transition-colors"
    >
        <span className="block font-semibold text-navy dark:text-white">
            {title} ↗
        </span>
        <span className="mt-1 block text-body-small text-grey dark:text-light-grey">
            {detail}
        </span>
    </a>
)

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
                    <LinkCard key={link.href} {...link} />
                ))}
            </div>
        </Section>

        <Section id="content" title="Content">
            <div className="grid gap-3 sm:grid-cols-2">
                {contentLinks.map(link => (
                    <LinkCard key={link.href} {...link} />
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
