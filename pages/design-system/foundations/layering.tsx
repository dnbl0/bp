import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { PageHeader, TokenTable } from '../../../styleguide-components/primitives'
import { layering } from '../../../styleguide-components/tokens'

const Layering: NextPageWithLayout = () => (
    <DesignSystemLayout title="Layering">
        <PageHeader
            eyebrow="Foundations"
            title="Layering"
            status="stable"
            intro="A named z-index scale keeps stacking predictable. Always reach for a semantic token rather than an arbitrary number so overlays, modals and tooltips layer correctly."
        />

        <div className="relative h-48 my-6 rounded-xl border border-cool-paper-200 dark:border-charcoal bg-cool-paper-100 dark:bg-cool-grey overflow-hidden">
            {layering.slice(0, 6).map((layer, index) => (
                <div
                    key={layer.token}
                    className="absolute h-20 w-40 rounded-lg shadow flex items-end p-2 text-caption font-mono text-white"
                    style={{
                        zIndex: Number(layer.value),
                        left: 24 + index * 36,
                        top: 16 + index * 18,
                        backgroundColor: `hsl(${201 - index * 18} 100% ${40 - index * 3}%)`,
                    }}
                >
                    {layer.token}
                </div>
            ))}
        </div>

        <TokenTable rows={layering} />
    </DesignSystemLayout>
)

export default Layering
