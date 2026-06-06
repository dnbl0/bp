import { isRecord } from '../utils/typeguards'
import { CmsNavigationElement } from './contentful-cms-types'

export interface NavigationLink extends CmsNavigationElement {
    caption: string
    href: string
    colour?: string
}

export const isNavigationLink = (value: unknown): value is NavigationLink => {
    return isRecord(value) && !!value.caption && !!value.href
}
