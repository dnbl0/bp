import { BannerSection } from './BannerSection'
import { CmsGrid4X4X4 } from '../../../types/contentful-cms-types'
import { CmsElement } from '../CmsElement'
import { getBgColour } from '../../../utils/getBgColour'
import { ScrollTargetAnchor } from './NavigationBar/ScrollTargetAnchor'
import { getVerticalPadding } from '../../../utils/getVerticalPadding'
import { cx } from '../../../utils/cx'

interface Section4x4x4Props {
    component: CmsGrid4X4X4
}

export const Section4x4x4 = (component: Section4x4x4Props) => {
    const {
        backgroundColour,
        verticalPadding,
        content1,
        content2,
        content3,
        anchorId,
    } = component.component
    const Blockcomponent1 = {
        block: content1,
    }
    const Blockcomponent2 = {
        block: content2,
    }
    const Blockcomponent3 = {
        block: content3,
    }
    const bgColour = backgroundColour ? backgroundColour.toString() : 'white'
    const vertPadding = verticalPadding ? verticalPadding.toString() : 'none'

    const sectionClass = cx(
        'h-full',
        getBgColour(bgColour),
        getVerticalPadding(vertPadding)
    )

    return (
        <ScrollTargetAnchor anchorId={anchorId}>
            <div className={sectionClass}>
                <BannerSection bannerLayout="4x4x4">
                    <CmsElement component={Blockcomponent1} />
                    <CmsElement component={Blockcomponent2} />
                    <CmsElement component={Blockcomponent3} />
                </BannerSection>
            </div>
        </ScrollTargetAnchor>
    )
}
