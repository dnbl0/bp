import {
    CmsNavigationElement,
    CmsNavigationElementItemsCollection,
    CmsNavigationMenuCollection,
} from '../types/contentful-cms-types'
import { MenuItem } from '../types/menuItem'
import { isDefined } from '../utils/typeguards'

export const flattenCmsNavigationMenuCollection = (
    collection?: CmsNavigationMenuCollection | undefined | null
) => {
    const topLevelMenu = collection?.items.filter(isDefined).shift()
    const topLevelItems =
        topLevelMenu?.itemsCollection?.items.filter(isDefined) || []
    return topLevelItems
        .filter(isDefined)
        .map(flattenCmsNavigationElement)
        .filter(isDefined)
}

export const flattenCmsNavigationElement = (
    element: CmsNavigationElement
): MenuItem | undefined => {
    const id = element.sys?.id.trim() || undefined
    const caption = element.caption?.trim() || undefined
    const href = element.href?.trim() || undefined
    const openInNewTab = element.openInNewTab || false
    const items = flattenCmsNavigationElementItemsCollection(
        element.itemsCollection
    )
    // A menu item must have an `id` and a `caption`.
    if (!id || !caption) {
        return undefined
    }
    // A menu item must have a `href` or child `items`.
    // It doesn't make sense to show a menu item without either.
    if (!href && !items) {
        return undefined
    }
    return {
        id,
        caption,
        openInNewTab,
        ...(href ? { href } : {}),
        ...(items ? { items } : {}),
    }
}

export const flattenCmsNavigationElementItemsCollection = (
    collection: CmsNavigationElementItemsCollection | undefined | null
) => {
    if (!collection) {
        return undefined
    }

    const menuItems = collection.items
        .filter(isDefined)
        .map(flattenCmsNavigationElement)
        .filter(isDefined)

    return menuItems.length > 0 ? menuItems : undefined
}
