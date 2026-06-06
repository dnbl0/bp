import {
    CmsAccordionBlock,
    CmsAccordionBlockItemsCollection,
} from '../../../../types/contentful-cms-types'
import { isDefined } from '../../../../utils/typeguards'
import { ScrollTargetAnchor } from '../../sections/NavigationBar/ScrollTargetAnchor'
import { AccordionItem } from './AccordionItem'

export const AccordionBlock = ({
    component,
}: {
    component: CmsAccordionBlock
}) => {
    const { itemsCollection, anchorId } = component
    const items = itemsCollection && flattenItems(itemsCollection)

    if (!items || items.length === 0) return null

    return (
        <ScrollTargetAnchor anchorId={anchorId}>
            <div>
                {items.map((item, index) => (
                    <AccordionItem
                        key={`${index}_${item.sys?.id}`}
                        item={item}
                        itemIndex={index}
                    />
                ))}
            </div>
        </ScrollTargetAnchor>
    )
}

const flattenItems = (collection: CmsAccordionBlockItemsCollection) => {
    const items = collection.items
        .filter(isDefined)
        .filter(item => item.body || item.image)
    return items
}
