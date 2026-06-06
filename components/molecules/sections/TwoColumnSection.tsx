import { CmsTwoColumnSection } from '../../../types/contentful-cms-types'
import { cx } from '../../../utils/cx'
import { isDefined } from '../../../utils/typeguards'
import { ScrollTargetAnchor } from './NavigationBar/ScrollTargetAnchor'
import { Section } from '../../atoms/Section'
import { CmsElement } from '../CmsElement'
import { getBgColour } from '../../../utils/getBgColour'

export const TwoColumnSection = ({
    component,
}: {
    component: CmsTwoColumnSection
}) => {
    const {
        smallScreenStackDirection,
        leftColumnCollection,
        rightColumnCollection,
        anchorId,
        layout,
        backgroundColour,
    } = component
    const leftBlocks = leftColumnCollection?.items.filter(isDefined) || []
    const rightBlocks = rightColumnCollection?.items.filter(isDefined) || []
    const bgColour = backgroundColour ? backgroundColour.toString() : 'white'
    const bgClass = getBgColour(bgColour)

    return (
        <ScrollTargetAnchor anchorId={anchorId}>
            <Section className={bgClass}>
                <div
                    className={cx(
                        'py-2',
                        'flex gap-4 grid-cols-12',
                        'lg:grid',
                        getLayoutClass(layout),
                        smallScreenStackDirection === 'Up'
                            ? 'flex-col-reverse'
                            : 'flex-col'
                    )}
                >
                    <div className="flex flex-col gap-4">
                        {leftBlocks.map((block, index) => (
                            <div key={`${index}_${block.sys?.id}`}>
                                <CmsElement component={{ block }} />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-4">
                        {rightBlocks.map((block, index) => (
                            <div key={`${index}_${block.sys?.id}`}>
                                <CmsElement component={{ block }} />
                            </div>
                        ))}
                    </div>
                </div>
            </Section>
        </ScrollTargetAnchor>
    )
}

const getLayoutClass = (layout: string | null | undefined): string => {
    switch (layout) {
        case null:
        case undefined:
        case '8x4':
            return cx(
                '[&>*:nth-child(1)]:col-span-8',
                '[&>*:nth-child(2)]:col-span-4'
            )

        case '10x2':
            return cx(
                '[&>*:nth-child(1)]:col-span-10',
                '[&>*:nth-child(2)]:col-span-2'
            )
            
        case '6x6':
            return cx(
                '[&>*:nth-child(1)]:col-span-6',
                '[&>*:nth-child(2)]:col-span-6'
            )

        case '4x8':
            return cx(
                '[&>*:nth-child(1)]:col-span-4',
                '[&>*:nth-child(2)]:col-span-8'
            )

        default:
            console.warn(`Unexpected TwoColumnSection layout value: ${layout}`)
            return cx(
                '[&>*:nth-child(1)]:col-span-8',
                '[&>*:nth-child(2)]:col-span-4'
            )
    }
}
