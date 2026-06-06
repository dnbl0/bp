import { CmsCard } from '../../../types/contentful-cms-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

/*
TODO:
This is temporary place holder for card content item. To be completed as part of it's main ticket in future
*/

interface CmsCardProps {
    component: CmsCard
}

export const CardBlock = (component: CmsCardProps) => {
    const { __typename, content, heading } = component.component
    return (
        <div>
            <h2>{heading}</h2>
            {content && <div>{documentToReactComponents(content.json)}</div>}
        </div>
    )
}
