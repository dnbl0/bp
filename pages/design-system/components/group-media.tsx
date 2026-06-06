import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { GroupOverview } from '../../../styleguide-components/primitives'
import { componentGroups } from '../../../styleguide-components/componentGroups'

const group = componentGroups[1]

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Media & imagery">
        <GroupOverview group={group} />
    </DesignSystemLayout>
)

export default Page
