import { NextPageWithLayout } from '../../../../types/nextLayout'
import { DesignSystemLayout } from '../../../../styleguide-components/DesignSystemLayout'
import { PageHeader, Section, TokenTable } from '../../../../styleguide-components/primitives'
import type { TokenRow } from '../../../../styleguide-components/primitives'
import { radiusScale } from '../../../../styleguide-components/tokens'

const toc = [{ id: 'scale', title: 'Radius scale' }]

/** Strip the parenthetical px hint so the preview renders a valid CSS value. */
const rawValue = (value: string): string => value.split(' ')[0]

const radiusRows: TokenRow[] = radiusScale.map(token => ({
    token: token.token,
    value: token.value,
    preview: (
        <div
            className="w-10 h-10 bg-cyan-50 border border-cyan"
            style={{ borderRadius: rawValue(token.value) }}
        />
    ),
}))

const Radius: NextPageWithLayout = () => (
    <DesignSystemLayout title="Radius tokens" toc={toc}>
        <PageHeader
            eyebrow="Design tokens"
            title="Radius"
            status="stable"
            intro="Corner radius tokens for cards, inputs, pills and other rounded surfaces. Applied with the rounded- Tailwind prefix."
        />

        <Section id="scale" title="Radius scale">
            <p className="text-grey dark:text-light-grey">
                Use <code className="font-mono text-cyan">rounded-lg</code> for cards
                and modals, <code className="font-mono text-cyan">rounded-xl</code> for
                larger containers, and <code className="font-mono text-cyan">rounded-full</code>{' '}
                for pills and avatar circles.
            </p>
            <TokenTable rows={radiusRows} withPreview />
        </Section>
    </DesignSystemLayout>
)

export default Radius
