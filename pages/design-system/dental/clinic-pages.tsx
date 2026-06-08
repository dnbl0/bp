import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { SubBrandPlaceholder } from '../../../styleguide-components/SubBrandScaffold'

const toc = [
    { id: 'overview', title: 'Overview' },
    { id: 'guidance', title: 'Guidance' },
]

const ClinicPages: NextPageWithLayout = () => (
    <DesignSystemLayout title="Clinic pages" toc={toc}>
        <SubBrandPlaceholder
            title="Clinic pages"
            intro="Clinic locator, appointment booking and treatment guidance for dental care."
        />
    </DesignSystemLayout>
)

export default ClinicPages
