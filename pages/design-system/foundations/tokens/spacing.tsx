import { NextPageWithLayout } from '../../../../types/nextLayout'
import { DesignSystemLayout } from '../../../../styleguide-components/DesignSystemLayout'
import { PageHeader, Section, TokenTable } from '../../../../styleguide-components/primitives'
import type { TokenRow } from '../../../../styleguide-components/primitives'
import { spacingScale } from '../../../../styleguide-components/tokens'

const toc = [{ id: 'scale', title: 'Spacing scale' }]

const spacingRows: TokenRow[] = spacingScale.map(token => ({
    token: `p-${token.token} · m-${token.token} · gap-${token.token}`,
    value: token.value,
    preview: (
        <div
            className="h-4 bg-cyan rounded-sm"
            style={{ width: token.value.split(' ')[0] }}
        />
    ),
}))

const Spacing: NextPageWithLayout = () => (
    <DesignSystemLayout title="Spacing tokens" toc={toc}>
        <PageHeader
            eyebrow="Design tokens"
            title="Spacing"
            status="stable"
            intro="A 4px-based scale governs all padding, margin and gap values. Each step maps directly to Tailwind utilities — use p-, m- or gap- prefixes with the token number."
        />

        <Section id="scale" title="Spacing scale">
            <p className="text-grey dark:text-light-grey">
                The scale uses Tailwind's default spacing, which is based on a 4px
                (0.25rem) unit. Use tokens rather than arbitrary values to keep
                layouts consistent across the system.
            </p>
            <TokenTable rows={spacingRows} withPreview />
        </Section>
    </DesignSystemLayout>
)

export default Spacing
