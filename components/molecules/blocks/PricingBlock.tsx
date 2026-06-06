import {
    CmsGrid4X4X4,
    CmsGrid6X6,
    CmsPricingCard,
} from '../../../types/contentful-cms-types'
import { ScrollTargetAnchor } from '../sections/NavigationBar/ScrollTargetAnchor'
import { PricingComponent } from './PricingComponent'

export const PricingBlock = ({ component }: { component: CmsPricingCard }) => {
    const { careHome, anchorId, pricingGrid, careCostGrid } =
        component
    const careHomeName = careHome && careHome.name ? careHome.name : undefined

    return (
        <>
            {anchorId && (
                <ScrollTargetAnchor anchorId={anchorId}></ScrollTargetAnchor>
            )}{' '}
            <PricingComponent
                careHomeName={careHomeName}
                pricingGrid={(pricingGrid as CmsGrid6X6) || undefined}
                careCostGrid={(careCostGrid as CmsGrid4X4X4) || undefined}
            />
        </>
    )
}
