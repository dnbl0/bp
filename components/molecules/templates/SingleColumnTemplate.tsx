import { Fragment } from 'react'
import { CmsSingleColumnTemplate } from '../../../types/contentful-cms-types'
import { isDefined } from '../../../utils/typeguards'
import { CmsElement } from '../CmsElement'

export const SingleColumnTemplate = ({
    component,
}: {
    component: CmsSingleColumnTemplate
}) => {
    const sections = component.sectionsCollection?.items.filter(isDefined)
    if (!sections || sections.length === 0) {
        return null
    }

    return (
        <div className="overflow-visible">
            {sections.map((section, index) => {
                const component = {
                    block: section,
                }
                return (
                    <Fragment key={index}>
                        <CmsElement component={component} />
                    </Fragment>
                )
            })}
        </div>
    )
}
