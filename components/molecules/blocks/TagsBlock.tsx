import {
    CmsAgedCareHomeDetailsTemplateCustomTagBlockCollection,
    CmsTagBlock,
    Maybe,
} from '../../../types/contentful-cms-types'

import { Tag } from '../../atoms/Tag'
import { isDefined } from '../../../utils/typeguards'

export const TagsBlock = ({
    component,
}: {
    component: CmsAgedCareHomeDetailsTemplateCustomTagBlockCollection
}) => {
    const { items } = component
    if (!items) return null
    return (
        <div className="mb-12 flex flex-row flex-wrap">
            {items.filter(isDefined).map((tag: Maybe<CmsTagBlock>) => (
                <Tag
                    key={tag?.sys.id}
                    title={tag?.title ?? ''}
                    href={tag?.href ?? ''}
                    openInNewTab={tag?.openInNewTab ?? false}
                    bgColor={tag?.bgColor ?? ''}
                    textColor={tag?.textColor ?? ''}
                />
            ))}
        </div>
    )
}
