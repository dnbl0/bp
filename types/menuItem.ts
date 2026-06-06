import { isRecord } from '../utils/typeguards'

export interface MenuItem {
    id: string // Contentful item ID. Might not be unique.
    caption: string
    href?: string
    openInNewTab?: boolean
    items?: MenuItem[]
}

// TODO[Shannon]: I'm sure there is a better way this type can be written.
type MenuItemWithHref = {
    id: string
    caption: string
    href: string
    openInNewTab?: boolean
}

export const isMenuItemWithHref = (
    value: unknown
): value is MenuItemWithHref => {
    return (
        isRecord(value) &&
        !!value['id'] &&
        !!value['caption'] &&
        !!value['href']
    )
}
