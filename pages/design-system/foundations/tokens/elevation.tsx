import { NextPageWithLayout } from '../../../../types/nextLayout'
import { DesignSystemLayout } from '../../../../styleguide-components/DesignSystemLayout'
import { PageHeader, Section, TokenTable } from '../../../../styleguide-components/primitives'
import type { TokenRow } from '../../../../styleguide-components/primitives'
import { elevation } from '../../../../styleguide-components/tokens'

const toc = [{ id: 'shadows', title: 'Shadow tokens' }]

const elevationRows: TokenRow[] = elevation.map(shadow => ({
    token: shadow.token,
    value: shadow.value,
    description: shadow.description,
    preview: (
        <div
            className="w-16 h-10 rounded-lg bg-white"
            style={{ boxShadow: shadow.value }}
        />
    ),
}))

const Elevation: NextPageWithLayout = () => (
    <DesignSystemLayout title="Elevation tokens" toc={toc}>
        <PageHeader
            eyebrow="Design tokens"
            title="Elevation"
            status="stable"
            intro="Box shadow tokens that separate surfaces from the page and signal interactivity. Use the resting shadow on cards and the hover shadow to lift interactive surfaces on pointer-over."
        />

        <Section id="shadows" title="Shadow tokens">
            <p className="text-grey dark:text-light-grey">
                Apply shadows with the <code className="font-mono text-cyan">shadow</code>,{' '}
                <code className="font-mono text-cyan">shadow-depth-default</code> and{' '}
                <code className="font-mono text-cyan">shadow-depth-hover</code> utilities.
                Keep elevation purposeful — too many competing shadows flatten the hierarchy.
            </p>
            <TokenTable rows={elevationRows} withPreview withDescription />
        </Section>
    </DesignSystemLayout>
)

export default Elevation
