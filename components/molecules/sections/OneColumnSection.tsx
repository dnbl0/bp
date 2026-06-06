import { CmsOneColumnSection } from '../../../types/contentful-cms-types'
import { cx } from '../../../utils/cx'
import { getBgColour } from '../../../utils/getBgColour'
import { isDefined } from '../../../utils/typeguards'
import { Section } from '../../atoms/Section'
import { CmsElement } from '../CmsElement'

export const OneColumnSection = ({
    component,
}: {
    component: CmsOneColumnSection
}) => {
    const { contentCollection, backgroundColour } = component

    const blocks = contentCollection?.items.filter(isDefined) || []

    const bgColour = backgroundColour ? backgroundColour.toString() : 'white'
    const bgClass = getBgColour(bgColour)

    return (
        <Section className={bgClass}>
            <div className={cx('py-2', 'flex flex-col gap-4')}>
                <div className="flex flex-col gap-4">
                    {blocks.map((block, index) => (
                        <div key={`${index}_${block.sys?.id}`}>
                            <CmsElement component={{ block }} />
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    )
}
