import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { SubBrandPlaceholder } from '../../../styleguide-components/SubBrandScaffold'

const toc = [
    { id: 'overview', title: 'Overview' },
    { id: 'guidance', title: 'Guidance' },
]

const EyewearGuidelines: NextPageWithLayout = () => (
    <DesignSystemLayout title="Eyewear guidelines" toc={toc}>
        <SubBrandPlaceholder
            title="Eyewear guidelines"
            intro="Frame galleries, lens guidance and the in-store and online eyewear experience."
        />
    </DesignSystemLayout>
)

export default EyewearGuidelines
