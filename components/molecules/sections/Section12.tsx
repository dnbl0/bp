import { BannerSection } from '../../molecules/sections/BannerSection'
import { CmsGrid12 } from '../../../types/contentful-cms-types'
import { CmsElement } from '../CmsElement'
import { getBgColour } from '../../../utils/getBgColour'
import { ScrollTargetAnchor } from './NavigationBar/ScrollTargetAnchor'
import { getVerticalPadding } from '../../../utils/getVerticalPadding'
import { cx } from '../../../utils/cx'

interface Section12Props {
    component: CmsGrid12
}

export const Section12 = (component: Section12Props) => {
    const { content, backgroundColour, verticalPadding, anchorId } =
        component.component
    const blockcomponent = {
        block: content,
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
                <BannerSection bannerLayout="12">
                    <CmsElement component={blockcomponent} />
                </BannerSection>
            </div>
        </ScrollTargetAnchor>
    )
}
