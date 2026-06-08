import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { SubBrandPlaceholder } from '../../../styleguide-components/SubBrandScaffold'

const toc = [
    { id: 'overview', title: 'Overview' },
    { id: 'guidance', title: 'Guidance' },
]

const BusinessPortals: NextPageWithLayout = () => (
    <DesignSystemLayout title="Business portals" toc={toc}>
        <SubBrandPlaceholder
            title="Business portals"
            intro="Employer dashboards, partner portals and corporate landing pages."
        />
    </DesignSystemLayout>
)

export default BusinessPortals
