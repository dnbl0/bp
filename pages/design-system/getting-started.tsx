import { NextPageWithLayout } from '../../types/nextLayout'
import { DesignSystemLayout } from '../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Example,
    CodeBlock,
    InfoCard,
    cardIcons,
} from '../../styleguide-components/primitives'

const toc = [
    { id: 'prerequisites', title: 'Prerequisites' },
    { id: 'run-locally', title: 'Run locally' },
    { id: 'structure', title: 'Project structure' },
    { id: 'using-a-component', title: 'Using a component' },
    { id: 'using-tokens', title: 'Using tokens' },
    { id: 'theming', title: 'Theming & dark mode' },
    { id: 'next-steps', title: 'Next steps' },
]

const GettingStarted: NextPageWithLayout = () => (
    <DesignSystemLayout title="Getting started" toc={toc}>
        <PageHeader
            eyebrow="Overview"
            title="Getting started"
            status="stable"
            intro="How to run the site, where things live, and how to compose pages from real components and tokens."
        />

        <Section id="prerequisites" title="Prerequisites">
            <div className="grid gap-3 sm:grid-cols-3">
                {[
                    { label: 'Node', detail: '16.14 or newer' },
                    { label: 'Yarn', detail: '1.x' },
                    { label: '.env', detail: 'Copy .env-example and fill in Contentful tokens' },
                ].map(item => (
                    <div
                        key={item.label}
                        className="rounded-xl border border-cool-paper-200 dark:border-charcoal p-4 bg-white dark:bg-cool-grey"
                    >
                        <p className="font-mono text-caption font-semibold text-cyan">{item.label}</p>
                        <p className="mt-1 text-body-small text-grey dark:text-light-grey">{item.detail}</p>
                    </div>
                ))}
            </div>
        </Section>

        <Section id="run-locally" title="Run locally">
            <CodeBlock
                language="bash"
                code={`yarn install
yarn dev
# open http://localhost:3000/design-system`}
            />
        </Section>

        <Section id="structure" title="Project structure">
            <CodeBlock
                language="bash"
                code={`components/               # Production component library
  atoms/ molecules/ organisms/ templates/
styleguide-components/    # Docs UI: layout, primitives, config
  primitives/             # PageHeader, Section, Example, PropsTable…
  designSystem.config.ts  # Navigation + search index
  tokens.ts               # Live token introspection
pages/design-system/      # The documentation pages you see here
styles/                   # Global CSS + design-token CSS variables
tailwind.config.js        # Source of truth for design tokens`}
            />
        </Section>

        <Section id="using-a-component" title="Using a component">
            <Example
                caption="Primary and secondary buttons — toggle Code to copy the markup"
                code={`<button className="button">Primary</button>
<button className="button button--secondary">Secondary</button>`}
            >
                <button className="button">Primary</button>
                <button className="button button--secondary">Secondary</button>
            </Example>
        </Section>

        <Section id="using-tokens" title="Using tokens">
            <p className="text-body-small text-grey dark:text-light-grey mb-4">
                All colours, type, spacing, elevation and motion are Tailwind utilities generated from{' '}
                <code className="font-mono text-cyan">tailwind.config.js</code>. Use tokens over hard-coded values so the UI tracks the theme automatically.
            </p>
            <CodeBlock
                language="tsx"
                code={`<div className="bg-cool-paper-100 text-navy rounded-xl shadow p-6">
    <h3 className="text-heading-s">Tokenised card</h3>
</div>`}
            />
        </Section>

        <Section id="theming" title="Theming & dark mode">
            <p className="text-body-small text-grey dark:text-light-grey mb-4">
                Dark mode is class-based. Pair every colour utility with its <code className="font-mono text-cyan">dark:</code> variant and your component responds to the theme toggle automatically.
            </p>
            <CodeBlock
                language="tsx"
                code={`<div className="bg-white dark:bg-cool-grey text-navy dark:text-white rounded-xl p-6">
    Dark-mode ready
</div>`}
            />
        </Section>

        <Section id="next-steps" title="Next steps">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                    { label: 'Design tokens', icon: 'tokens', href: '/design-system/foundations/tokens', detail: 'Full colour, type, spacing and motion reference' },
                    { label: 'Components', icon: 'components', href: '/design-system/components', detail: 'Every component with props and live examples' },
                    { label: 'Patterns', icon: 'patterns', href: '/design-system/patterns', detail: 'Grid, forms and composition guidance' },
                    { label: 'Resources', icon: 'resources', href: '/design-system/resources', detail: 'Figma kit, Contentful authoring, how to contribute' },
                    { label: 'Component status', icon: 'status', href: '/design-system/status', detail: 'Coverage matrix — what still needs documentation' },
                ].map(link => (
                    <InfoCard
                        key={link.href}
                        icon={cardIcons[link.icon]}
                        href={link.href}
                        title={link.label}
                        description={link.detail}
                    />
                ))}
            </div>
        </Section>
    </DesignSystemLayout>
)

export default GettingStarted
