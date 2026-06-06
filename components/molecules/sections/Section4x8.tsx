import { BannerSection } from '../../molecules/sections/BannerSection'
import { CmsGrid4X8 } from '../../../types/contentful-cms-types'
import { CmsElement } from '../CmsElement'
import { getBgColour } from '../../../utils/getBgColour'
import { cx } from '../../../utils/cx'
import { ScrollTargetAnchor } from './NavigationBar/ScrollTargetAnchor'
import { getVerticalPadding } from '../../../utils/getVerticalPadding'

interface Section4x8Props {
    component: CmsGrid4X8
}

export const Section4x8 = (component: Section4x8Props) => {
    const {
        backgroundColour,
        verticalPadding,
        largeFirst,
        content1,
        content2,
        anchorId,
    } = component.component

    const Blockcomponent1 = {
        block: content1,
    }

    const Blockcomponent2 = {
        block: content2,
    }

    const bgColour = backgroundColour ? backgroundColour.toString() : 'white'
    const vertPadding = verticalPadding ? verticalPadding.toString() : 'none'

    const sectionClass = cx(
        'h-full',
        getBgColour(bgColour),
        getVerticalPadding(vertPadding)
    )

    const layout = largeFirst ? '8x4' : '4x8'

    return (
        <ScrollTargetAnchor anchorId={anchorId}>
            <div className={sectionClass}>
                <BannerSection bannerLayout={layout}>
                    <CmsElement component={Blockcomponent1} />
                    <CmsElement component={Blockcomponent2} />
                </BannerSection>
            </div>
        </ScrollTargetAnchor>
    )
}
