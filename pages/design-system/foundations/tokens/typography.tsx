import { NextPageWithLayout } from '../../../../types/nextLayout'
import { DesignSystemLayout } from '../../../../styleguide-components/DesignSystemLayout'
import { PageHeader, Section, TokenTable } from '../../../../styleguide-components/primitives'
import type { TokenRow } from '../../../../styleguide-components/primitives'
import { typeScale, legacyTypeScale } from '../../../../styleguide-components/tokens'

const toc = [
    { id: 'scale', title: 'Type scale' },
    { id: 'legacy', title: 'Legacy aliases' },
]

const typeRows: TokenRow[] = typeScale.map(step => ({
    token: `text-${step.token}`,
    value: `${step.sizes.base} → ${step.sizes.lg}`,
    preview: (
        <span
            className="text-navy dark:text-white"
            style={{ fontSize: step.sizes.base, lineHeight: 1 }}
        >
            Ag
        </span>
    ),
    description: step.cssVar,
}))

const legacyRows: TokenRow[] = legacyTypeScale.map(step => ({
    token: `text-${step.token}`,
    value: `${step.sizes.base} → ${step.sizes.lg}`,
    preview: (
        <span
            className="text-navy dark:text-white"
            style={{ fontSize: step.sizes.base, lineHeight: 1 }}
        >
            Ag
        </span>
    ),
    description: step.cssVar,
}))

const Typography: NextPageWithLayout = () => (
    <DesignSystemLayout title="Typography tokens" toc={toc}>
        <PageHeader
            eyebrow="Design tokens"
            title="Typography"
            status="stable"
            intro="The responsive semantic type scale. Each step grows at the md and lg breakpoints. Values shown are base size → large breakpoint size."
        />

        <Section id="scale" title="Type scale">
            <p className="text-grey dark:text-light-grey">
                Use semantic names for all new work — they survive a type scale revision.
                Apply them with the <code className="font-mono text-cyan">text-</code> prefix,
                e.g. <code className="font-mono text-cyan">text-heading-l</code> or{' '}
                <code className="font-mono text-cyan">text-body-small</code>.
            </p>
            <TokenTable rows={typeRows} withPreview withDescription />
        </Section>

        <Section id="legacy" title="Legacy aliases">
            <p className="text-grey dark:text-light-grey">
                Numeric aliases remain for backwards compatibility. Prefer the semantic scale above for new work.
            </p>
            <TokenTable rows={legacyRows} withPreview withDescription />
        </Section>
    </DesignSystemLayout>
)

export default Typography
