import { NextPageWithLayout } from '../../../types/nextLayout'
import { DesignSystemLayout } from '../../../styleguide-components/DesignSystemLayout'
import { GroupOverview } from '../../../styleguide-components/primitives'
import {
    componentGroups,
    tocForGroup,
} from '../../../styleguide-components/componentGroups'

const group = componentGroups[5]

const Page: NextPageWithLayout = () => (
    <DesignSystemLayout title="Infrastructure & templates" toc={tocForGroup(group)}>
        <GroupOverview group={group} />
    </DesignSystemLayout>
)

export default Page
