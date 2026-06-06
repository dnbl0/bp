import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { PageHeader } from '../../../styleguide-components/primitives'
import { elevation } from '../../../styleguide-components/tokens'

const Elevation: NextPageWithLayout = () => (
    <DesignSystemLayout title="Elevation">
        <PageHeader
            eyebrow="Foundations"
            title="Elevation"
            status="stable"
            intro="Shadows separate surfaces from the page and signal interactivity. Use the resting shadow on cards and the hover shadow to lift interactive surfaces on pointer-over."
        />

        <div className="grid gap-8 sm:grid-cols-2 mt-6">
            {elevation.map(shadow => (
                <div key={shadow.token}>
                    <div
                        className="h-32 rounded-xl bg-white"
                        style={{ boxShadow: shadow.value }}
                    />
                    <div className="mt-4">
                        <code className="font-mono text-body-small text-cyan">
                            {shadow.token}
                        </code>
                        <p className="mt-1 text-body-small text-grey dark:text-light-grey">
                            {shadow.description}
                        </p>
                        <p className="mt-1 font-mono text-caption text-disabled-text break-all">
                            {shadow.value}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </DesignSystemLayout>
)

export default Elevation
