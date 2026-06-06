import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { PageHeader, Section } from '../../../styleguide-components/primitives'
import { radiusScale, spacingScale } from '../../../styleguide-components/tokens'

const toc = [
    { id: 'spacing', title: 'Spacing scale' },
    { id: 'radius', title: 'Radius' },
    { id: 'containers', title: 'Container queries' },
]

const Spacing: NextPageWithLayout = () => (
    <DesignSystemLayout title="Spacing & Layout" toc={toc}>
        <PageHeader
            eyebrow="Foundations"
            title="Spacing & Layout"
            status="stable"
            intro="A consistent 4px-based spacing scale governs padding, margins and gaps. Corner radii and container-query utilities keep layouts coherent across breakpoints."
        />

        <Section id="spacing" title="Spacing scale">
            <p className="text-grey dark:text-light-grey">
                Each step maps to a Tailwind utility such as{' '}
                <code className="font-mono text-cyan">p-4</code>,{' '}
                <code className="font-mono text-cyan">gap-2</code> or{' '}
                <code className="font-mono text-cyan">mt-8</code>. The bars below are
                drawn at the token's real size.
            </p>
            <div className="mt-4 space-y-2">
                {spacingScale.map(token => {
                    const rem = token.value.split(' ')[0]
                    return (
                        <div key={token.token} className="flex items-center gap-4">
                            <code className="w-10 flex-none font-mono text-caption text-cyan text-right">
                                {token.token}
                            </code>
                            <div
                                className="h-4 bg-cyan rounded-sm"
                                style={{ width: rem }}
                            />
                            <span className="font-mono text-caption text-grey dark:text-light-grey">
                                {token.value}
                            </span>
                        </div>
                    )
                })}
            </div>
        </Section>

        <Section id="radius" title="Radius">
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {radiusScale.map(token => (
                    <div key={token.token} className="text-center">
                        <div
                            className="h-24 bg-cool-paper-100 dark:bg-cool-grey border-2 border-cyan"
                            style={{ borderRadius: token.value.split(' ')[0] }}
                        />
                        <div className="mt-2 font-mono text-caption text-cyan">
                            {token.token}
                        </div>
                        <div className="font-mono text-caption text-grey dark:text-light-grey">
                            {token.value}
                        </div>
                    </div>
                ))}
            </div>
        </Section>

        <Section id="containers" title="Container queries">
            <p className="text-grey dark:text-light-grey">
                Layouts use the{' '}
                <code className="font-mono text-cyan">@tailwindcss/container-queries</code>{' '}
                plugin, so components can respond to the width of their container
                rather than the viewport. Wrap a region in{' '}
                <code className="font-mono text-cyan">@container</code> and size
                children with <code className="font-mono text-cyan">@sm:</code>,{' '}
                <code className="font-mono text-cyan">@md:</code> and{' '}
                <code className="font-mono text-cyan">@lg:</code> variants. Resize this
                window to see the box below switch from stacked to inline at its own
                container breakpoint.
            </p>
            <div className="@container mt-4 rounded-xl border border-cool-paper-200 dark:border-charcoal p-6 bg-white dark:bg-cool-grey">
                <div className="flex flex-col @md:flex-row gap-4">
                    <div className="flex-1 rounded-lg bg-cyan-50 dark:bg-charcoal p-4 text-body-small text-navy dark:text-light-grey">
                        Panel A
                    </div>
                    <div className="flex-1 rounded-lg bg-cyan-50 dark:bg-charcoal p-4 text-body-small text-navy dark:text-light-grey">
                        Panel B
                    </div>
                </div>
            </div>
        </Section>
    </DesignSystemLayout>
)

export default Spacing
