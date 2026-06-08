import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { SubBrandPlaceholder } from '../../../styleguide-components/SubBrandScaffold'

const toc = [
    { id: 'overview', title: 'Overview' },
    { id: 'guidance', title: 'Guidance' },
]

const CoverComparison: NextPageWithLayout = () => (
    <DesignSystemLayout title="Cover comparison" toc={toc}>
        <SubBrandPlaceholder
            title="Cover comparison"
            intro="Comparing health cover tiers and the member-facing product pages that present them."
        />
    </DesignSystemLayout>
)

export default CoverComparison
