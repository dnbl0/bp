import { BannerSection } from '../../molecules/sections/BannerSection'
import { CmsGrid6X6 } from '../../../types/contentful-cms-types'
import { CmsElement } from '../CmsElement'
import { getBgColour } from '../../../utils/getBgColour'
import { ScrollTargetAnchor } from './NavigationBar/ScrollTargetAnchor'
import { getVerticalPadding } from '../../../utils/getVerticalPadding'
import { cx } from '../../../utils/cx'

interface Section6x6Props {
    component: CmsGrid6X6
}

export const Section6x6 = (component: Section6x6Props) => {
    const { backgroundColour, verticalPadding, content1, content2, anchorId } =
        component.component
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

    return (
        <ScrollTargetAnchor anchorId={anchorId}>
            <div className={sectionClass}>
                <BannerSection bannerLayout="6x6">
                    <CmsElement component={Blockcomponent1} />
                    <CmsElement component={Blockcomponent2} />
                </BannerSection>
            </div>
        </ScrollTargetAnchor>
    )
}
