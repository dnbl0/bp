import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { GroupOverview } from '../../../styleguide-components/primitives'
import { componentGroups } from '../../../styleguide-components/componentGroups'

const group = componentGroups[0]

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Search & navigation">
        <GroupOverview group={group} />
    </DesignSystemLayout>
)

export default Page
