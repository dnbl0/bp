import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { SubBrandPlaceholder } from '../../../styleguide-components/SubBrandScaffold'

const toc = [
    { id: 'overview', title: 'Overview' },
    { id: 'guidance', title: 'Guidance' },
]

const CareHomes: NextPageWithLayout = () => (
    <DesignSystemLayout title="Care homes" toc={toc}>
        <SubBrandPlaceholder
            title="Care homes"
            intro="Care-home pages, the care navigator, pricing and nearby search."
        />
    </DesignSystemLayout>
)

export default CareHomes
