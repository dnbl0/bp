import Link from 'next/link'
import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import {
    PageHeader,
    Section,
    Subsection,
    TokenName,
    TokenCallout,
} from '../../../styleguide-components/primitives'

const toc = [
    { id: 'why', title: 'Why tokens' },
    { id: 'tiers', title: 'The three tiers' },
    { id: 'reading', title: 'Reading a token name' },
    { id: 'context', title: 'Tokens in context' },
]

const TokenAnatomy: NextPageWithLayout = () => (
    <DesignSystemLayout title="Anatomy of a token" toc={toc}>
        <PageHeader
            eyebrow="Foundations"
            title="Anatomy of a token"
            status="stable"
            intro="A design token is a named decision — a colour, a size, a piece of spacing — applied through a predictable utility name. This page explains how to read those names, how the primitive, semantic and component tiers relate, and shows the tokens at work in a real composition."
        />

        <Section id="why" title="Why tokens">
            <p className="text-body-small text-grey dark:text-light-grey mb-4">
                Instead of hard-coding <code className="font-mono text-cyan">#00335B</code>, reference a token. The token carries intent, resolves to a concrete value from <code className="font-mono text-cyan">tailwind.config.js</code>, and updates everywhere when that one file changes.
            </p>
        </Section>

        <Section id="tiers" title="The three tiers">
            <p className="text-body-small text-grey dark:text-light-grey mb-6">
                Tokens build in three layers — each tier references the one below, so a single change ripples outwards predictably.
            </p>

            <Subsection title="1 · Primitive">
                <p className="text-body-small text-grey dark:text-light-grey mb-3">
                    Raw palette and scale values. No opinion about <em>where</em> they are used — just the vocabulary.
                </p>
                <TokenName
                    segments={[
                        {
                            text: 'cyan',
                            label: 'Palette',
                            description:
                                'The named colour family in the theme — the primary brand blue.',
                        },
                        {
                            text: '50',
                            label: 'Tint step',
                            description:
                                'The lightness stop within that family. 50 is the lightest, used for subtle fills.',
                        },
                    ]}
                />
            </Subsection>

            <Subsection title="2 · Semantic">
                <p className="text-body-small text-grey dark:text-light-grey mb-3">
                    Role-based names — what you reach for day to day. They say what the value is <em>for</em>, not what it literally is.
                </p>
                <TokenName
                    segments={[
                        {
                            text: 'text',
                            label: 'Property',
                            description:
                                'The CSS property the utility sets — here, the font size.',
                        },
                        {
                            text: 'heading',
                            label: 'Role',
                            description:
                                'The semantic role in the type scale — heading text rather than body or caption.',
                        },
                        {
                            text: 'l',
                            label: 'Scale step',
                            description:
                                'The size step within that role: xl, l, m, s. Larger steps read as more important.',
                        },
                    ]}
                />
            </Subsection>

            <Subsection title="3 · Component">
                <p className="text-body-small text-grey dark:text-light-grey mb-3">
                    Several semantic and primitive tokens composed into one part — a button&apos;s padding, background, radius. See the{' '}
                    <Link href="/design-system/components/button">
                        <a className="text-cyan font-semibold hover:underline">component spec sheets</a>
                    </Link>{' '}
                    and the <em>Tokens in context</em> diagram below.
                </p>
            </Subsection>
        </Section>

        <Section id="reading" title="Reading a token name">
            <p className="text-body-small text-grey dark:text-light-grey mb-4">
                Tailwind utilities: property prefix → role or palette → step. Read left to right.
            </p>

            <TokenName
                segments={[
                    {
                        text: 'p',
                        label: 'Property',
                        description: 'Padding on all sides.',
                    },
                    {
                        text: '3',
                        label: 'Spacing step',
                        description:
                            'The step on the 4px spacing scale. Step 3 resolves to 12px.',
                    },
                ]}
            />

            <TokenName
                segments={[
                    {
                        text: 'bg',
                        label: 'Property',
                        description: 'Background colour.',
                    },
                    {
                        text: 'cyan',
                        label: 'Palette',
                        description: 'The primary brand colour family.',
                    },
                    {
                        text: '50',
                        label: 'Tint step',
                        description: 'The lightest stop, for subtle surface fills.',
                    },
                ]}
            />
        </Section>

        <Section id="context" title="Tokens in context">
            <p className="text-body-small text-grey dark:text-light-grey mb-4">
                The same tokens applied to a real card — each label points to the part it styles.
            </p>

            <TokenCallout
                annotations={[
                    { target: 'heading', token: 'text-heading-l', side: 'left' },
                    { target: 'subheading', token: 'text-heading-s', side: 'left' },
                    { target: 'body', token: 'text-body', side: 'left' },
                    { target: 'card', token: 'p-6', side: 'right' },
                    { target: 'gap', token: 'gap-3', side: 'right' },
                    { target: 'card', token: 'rounded-xl', side: 'right' },
                ]}
            >
                <div
                    data-callout="card"
                    className="mx-auto max-w-md rounded-xl border border-cool-paper-200 dark:border-charcoal p-6 bg-white dark:bg-cool-grey"
                >
                    <h3
                        data-callout="heading"
                        className="text-heading-l font-semibold text-navy dark:text-white"
                    >
                        Project Strategy
                    </h3>
                    <h4
                        data-callout="subheading"
                        className="mt-4 text-heading-s font-semibold text-navy dark:text-white"
                    >
                        Team
                    </h4>
                    <div data-callout="gap" className="mt-2 flex flex-wrap gap-3">
                        {['@Polly', '@Manuela', '@Lucy'].map((name, i) => (
                            <span
                                key={name}
                                className={`rounded-full px-3 py-1 text-body-small font-medium ${
                                    i === 0
                                        ? 'bg-cyan text-white'
                                        : 'bg-cool-paper-100 dark:bg-charcoal text-navy dark:text-white'
                                }`}
                            >
                                {name}
                            </span>
                        ))}
                    </div>
                    <p
                        data-callout="body"
                        className="mt-4 text-body text-grey dark:text-light-grey"
                    >
                        Increase impressions to the current customer base and
                        supercharge online campaigns this quarter.
                    </p>
                </div>
            </TokenCallout>
        </Section>
    </DesignSystemLayout>
)

export default TokenAnatomy
