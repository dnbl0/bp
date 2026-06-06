import Link from 'next/link'
import { NextPageWithLayout } from '../../types/nextLayout'
import { DesignSystemLayout } from '../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Example,
    CodeBlock,
} from '../../styleguide-components/primitives'

const toc = [
    { id: 'prerequisites', title: 'Prerequisites' },
    { id: 'run-locally', title: 'Run locally' },
    { id: 'structure', title: 'Project structure' },
    { id: 'using-a-component', title: 'Using a component' },
    { id: 'using-tokens', title: 'Using tokens' },
    { id: 'theming', title: 'Theming & dark mode' },
    { id: 'contributing', title: 'Contributing' },
    { id: 'help', title: 'Getting help' },
]

const docLink = (href: string, label: string) => (
    <Link href={href}>
        <a className="text-cyan font-semibold hover:underline">{label}</a>
    </Link>
)

const GettingStarted: NextPageWithLayout = () => (
    <DesignSystemLayout title="Getting started" toc={toc}>
        <PageHeader
            eyebrow="Overview"
            title="Getting started"
            status="stable"
            intro="Everything you need to start building with the Bupa Design System — how to run the site, where things live, and how to compose pages from real components and tokens."
        />

        <Section id="prerequisites" title="Prerequisites">
            <ul className="list-disc pl-6 space-y-1 text-grey dark:text-light-grey">
                <li>Node 16.14 or newer and Yarn 1.x.</li>
                <li>
                    A <code className="font-mono text-cyan">.env</code> file —
                    copy <code className="font-mono text-cyan">.env-example</code>{' '}
                    and fill in the Contentful tokens.
                </li>
                <li>Access to the Figma UI Kit and the Contentful space (see {docLink('/design-system/resources', 'Resources')}).</li>
            </ul>
        </Section>

        <Section id="run-locally" title="Run locally">
            <p className="text-grey dark:text-light-grey">
                Install dependencies and start the dev server. The design system
                lives under{' '}
                <code className="font-mono text-cyan">/design-system</code>.
            </p>
            <div className="my-6">
                <CodeBlock
                    language="bash"
                    code={`yarn install
yarn dev
# open http://localhost:3000/design-system`}
                />
            </div>
        </Section>

        <Section id="structure" title="Project structure">
            <p className="text-grey dark:text-light-grey">
                The codebase follows atomic design. Documentation pages are thin
                wrappers around the same production components the live site
                uses.
            </p>
            <div className="my-6">
                <CodeBlock
                    language="bash"
                    code={`components/            # Production component library
  atoms/ molecules/ organisms/ templates/
styleguide-components/ # Docs UI: layout, primitives, config
  primitives/          # PageHeader, Section, Example, PropsTable…
  designSystem.config.ts  # Navigation + search index
  tokens.ts            # Live token introspection
pages/design-system/   # The documentation pages you see here
styles/                # Global CSS + design-token CSS variables
tailwind.config.js     # The source of truth for design tokens`}
                />
            </div>
        </Section>

        <Section id="using-a-component" title="Using a component">
            <p className="text-grey dark:text-light-grey">
                Most components are styled with semantic CSS classes, so any{' '}
                <code className="font-mono text-cyan">&lt;button&gt;</code> or{' '}
                <code className="font-mono text-cyan">&lt;a&gt;</code> can adopt
                them. Toggle the <strong>Code</strong> tab below to copy the
                markup.
            </p>
            <Example
                caption="A primary and secondary button"
                code={`<button className="button">Primary</button>
<button className="button button--secondary">Secondary</button>`}
            >
                <button className="button">Primary</button>
                <button className="button button--secondary">Secondary</button>
            </Example>
            <p className="text-grey dark:text-light-grey">
                Browse every component, with props and guidelines, in{' '}
                {docLink('/design-system/components', 'Components')}.
            </p>
        </Section>

        <Section id="using-tokens" title="Using tokens">
            <p className="text-grey dark:text-light-grey">
                Colours, type, spacing, elevation and motion are exposed as
                Tailwind utilities generated from{' '}
                <code className="font-mono text-cyan">tailwind.config.js</code>.
                Prefer tokens over hard-coded values so the UI tracks the theme.
            </p>
            <div className="my-6">
                <CodeBlock
                    language="tsx"
                    code={`<div className="bg-cool-paper-100 text-navy rounded-xl shadow p-6">
    <h3 className="text-heading-s">Tokenised card</h3>
</div>`}
                />
            </div>
            <p className="text-grey dark:text-light-grey">
                The full lookup lives on the{' '}
                {docLink('/design-system/foundations/tokens', 'Design tokens')}{' '}
                page.
            </p>
        </Section>

        <Section id="theming" title="Theming & dark mode">
            <p className="text-grey dark:text-light-grey">
                Dark mode is class-based (<code className="font-mono text-cyan">darkMode: 'class'</code>).
                Pair every colour utility with its{' '}
                <code className="font-mono text-cyan">dark:</code> variant, as the
                doc primitives do, and your component will respond to the theme
                toggle automatically.
            </p>
        </Section>

        <Section id="contributing" title="Contributing">
            <p className="text-grey dark:text-light-grey">
                Adding or changing a component? Register it in{' '}
                <code className="font-mono text-cyan">designSystem.config.ts</code>,
                document it with the shared primitives, and follow the steps on
                the {docLink('/design-system/resources', 'Resources')} page.
                Check {docLink('/design-system/status', 'Component status')} to
                see what still needs coverage.
            </p>
        </Section>

        <Section id="help" title="Getting help">
            <p className="text-grey dark:text-light-grey">
                Stuck? Start with {docLink('/design-system/patterns', 'Patterns')}{' '}
                for end-to-end guidance, or reach the design system team via the
                channels listed in {docLink('/design-system/resources', 'Resources')}.
            </p>
        </Section>
    </DesignSystemLayout>
)

export default GettingStarted
