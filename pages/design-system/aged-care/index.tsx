import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { SubBrandLanding } from '../../../styleguide-components/SubBrandScaffold'

const toc = [
    { id: 'explore', title: 'Explore' },
    { id: 'inherits', title: 'Built on the Bupa core' },
]

const AgedCareHome: NextPageWithLayout = () => (
    <DesignSystemLayout title="Introduction" toc={toc} wide>
        <SubBrandLanding />
    </DesignSystemLayout>
)

export default AgedCareHome
