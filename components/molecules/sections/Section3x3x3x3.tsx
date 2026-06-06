import { BannerSection } from './BannerSection'
import { CmsGrid3X3X3X3 } from '../../../types/contentful-cms-types'
import { CmsElement } from '../CmsElement'
import { getBgColour } from '../../../utils/getBgColour'
import { ScrollTargetAnchor } from './NavigationBar/ScrollTargetAnchor'
import { getVerticalPadding } from '../../../utils/getVerticalPadding'
import { cx } from '../../../utils/cx'

interface Section3x3x3x3Props {
    component: CmsGrid3X3X3X3
}

export const Section3x3x3x3 = (component: Section3x3x3x3Props) => {
    const {
        backgroundColour,
        verticalPadding,
        content1,
        content2,
        content3,
        content4,
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
    const Blockcomponent4 = {
        block: content4,
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
                <BannerSection bannerLayout="3x3x3x3">
                    <CmsElement component={Blockcomponent1} />
                    <CmsElement component={Blockcomponent2} />
                    <CmsElement component={Blockcomponent3} />
                    <CmsElement component={Blockcomponent4} />
                </BannerSection>
            </div>
        </ScrollTargetAnchor>
    )
}
