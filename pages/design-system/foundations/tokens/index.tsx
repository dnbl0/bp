import Link from 'next/link'
import { NextPageWithLayout } from '../../../../types/nextLayout'
import { DesignSystemLayout } from '../../../../styleguide-components/DesignSystemLayout'
import { PageHeader, Section } from '../../../../styleguide-components/primitives'

const toc = [
    { id: 'what-are-tokens', title: 'What are design tokens?' },
    { id: 'how-we-use-them', title: 'How we use them' },
    { id: 'categories', title: 'Token categories' },
]

const categories = [
    {
        title: 'Color',
        href: '/design-system/foundations/tokens/color',
        description: 'Primary, secondary, UI and background colour tokens read live from the Tailwind theme.',
    },
    {
        title: 'Typography',
        href: '/design-system/foundations/tokens/typography',
        description: 'The responsive semantic type scale — heading sizes, body and caption with breakpoint values.',
    },
    {
        title: 'Spacing',
        href: '/design-system/foundations/tokens/spacing',
        description: 'The 4px spacing scale applied through padding, margin and gap utilities.',
    },
    {
        title: 'Radius',
        href: '/design-system/foundations/tokens/radius',
        description: 'Corner radius tokens for cards, inputs, pills and other rounded surfaces.',
    },
    {
        title: 'Elevation',
        href: '/design-system/foundations/tokens/elevation',
        description: 'Box shadow tokens that separate surfaces and signal interactivity.',
    },
    {
        title: 'Motion',
        href: '/design-system/foundations/tokens/motion',
        description: 'Animation utilities and staggered delay tokens for purposeful, consistent movement.',
    },
]

const Tokens: NextPageWithLayout = () => (
    <DesignSystemLayout title="Design tokens" toc={toc}>
        <PageHeader
            eyebrow="Foundations"
            title="Design tokens"
            status="stable"
            intro="Design tokens are the single source of truth for every visual decision in the Bupa Design System — colour, type, spacing, radius, elevation and motion. They are defined once in the Tailwind theme and consumed everywhere."
        />

        <Section id="what-are-tokens" title="What are design tokens?">
            <p className="text-grey dark:text-light-grey">
                A design token is a named value that represents a design decision.
                Instead of hard-coding{' '}
                <code className="font-mono text-cyan">#0079C8</code> into a
                component, you reference the token{' '}
                <code className="font-mono text-cyan">text-cyan</code> or{' '}
                <code className="font-mono text-cyan">bg-cyan</code>. When the
                brand value changes, every component that consumes the token
                updates automatically.
            </p>
            <p className="mt-4 text-grey dark:text-light-grey">
                In the Bupa Design System, tokens live in{' '}
                <code className="font-mono text-cyan">tailwind.config.js</code> and{' '}
                <code className="font-mono text-cyan">styles/base/typography.css</code>.
                The documentation on this site reads those files directly, so the
                reference can never drift from the production theme.
            </p>
        </Section>

        <Section id="how-we-use-them" title="How we use them">
            <ul className="space-y-3">
                {[
                    {
                        rule: 'Always use a token, never a raw value.',
                        detail: 'Avoid hard-coding hex colours, rem values or pixel sizes. Use the Tailwind utility that maps to the token instead.',
                    },
                    {
                        rule: 'Prefer semantic names over numeric aliases.',
                        detail: 'Use text-body-small rather than text-sm; use heading-l rather than text-3xl. Semantic names survive a type scale revision.',
                    },
                    {
                        rule: 'Tokens are the contract between design and code.',
                        detail: 'Figma variables are kept in sync with the Tailwind theme. If a Figma component references a token, the same token name is available as a Tailwind class.',
                    },
                ].map(item => (
                    <li
                        key={item.rule}
                        className="rounded-xl border border-cool-paper-200 dark:border-charcoal p-4 bg-white dark:bg-cool-grey"
                    >
                        <p className="font-semibold text-navy dark:text-white">{item.rule}</p>
                        <p className="mt-1 text-body-small text-grey dark:text-light-grey">{item.detail}</p>
                    </li>
                ))}
            </ul>
        </Section>

        <Section id="categories" title="Token categories">
            <div className="grid gap-4 sm:grid-cols-2">
                {categories.map(cat => (
                    <Link key={cat.href} href={cat.href}>
                        <a className="group block rounded-xl border border-cool-paper-200 dark:border-charcoal p-5 bg-white dark:bg-cool-grey hover:border-cyan dark:hover:border-cyan transition-colors">
                            <p className="font-semibold text-navy dark:text-white group-hover:text-cyan transition-colors">
                                {cat.title}
                            </p>
                            <p className="mt-1 text-body-small text-grey dark:text-light-grey">
                                {cat.description}
                            </p>
                        </a>
                    </Link>
                ))}
            </div>
        </Section>
    </DesignSystemLayout>
)

export default Tokens
