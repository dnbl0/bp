import Request from '../schema/requestFooter'
import {
    CmsFooter,
    CmsNavigationElement,
    CmsQuery,
} from '../types/contentful-cms-types'
import { isMenuItemWithHref, MenuItem } from '../types/menuItem'
import { stripUndefined } from '../utils/stripUndefined'
import { isDefined } from '../utils/typeguards'
import { flattenCmsNavigationElement } from './cmsNav'
import { createClient } from './contentfulGraphqlClient'

export type SociaMediaService =
    | 'Facebook'
    | 'Twitter'
    | 'Instagram'
    | 'YouTube'
    | 'LinkedIn'

type SocialMediaLink = {
    service: SociaMediaService
    href: string | undefined
}

export interface FooterData {
    aboutText?: string
    copyRightNotice?: string
    tagLine?: string
    finePrintLinks?: MenuItem[]
    socialLinks?: SocialMediaLink[]
    footerMenu?: (MenuItem | null)[] // The null items are important for the layout.
}

export const requestFooterData = async (showPreviewContent: boolean) => {
    const client = createClient(showPreviewContent)

    const { data, error } = await client.query<CmsQuery>({
        query: Request,
        fetchPolicy: 'no-cache',
        // Ignore errors coming from draft as they trip up apollo
        errorPolicy: 'ignore',
    })

    if (error) {
        throw new Error('Error requesting footer data', error)
    }

    return flattenFooterData(data)
}

const flattenFooterData = (data: CmsQuery): FooterData | undefined => {
    const footerItem = data.footerCollection?.items?.filter(isDefined).shift()

    if (!footerItem) return undefined

    return stripUndefined({
        aboutText: footerItem.aboutText?.trim() || undefined,
        copyRightNotice: footerItem.copyRightNotice?.trim() || undefined,
        tagLine: footerItem.tagLine?.trim() || undefined,
        finePrintLinks: flattenFinePrintLinks(footerItem),
        socialLinks: flattenSocialLinks(footerItem),
        footerMenu: flattenFooterMenu(footerItem),
    })
}

const flattenSocialLinks = (
    footerItem: CmsFooter
): SocialMediaLink[] | undefined => {
    const facebookLink = footerItem.facebookLink?.trim() || undefined
    const twitterLink = footerItem.twitterLink?.trim() || undefined
    const instagramLink = footerItem.instagramLink?.trim() || undefined
    const youTubeLink = footerItem.youTubeLink?.trim() || undefined
    const linkedInLink = footerItem.linkedInLink?.trim() || undefined

    const allLinks = [
        facebookLink,
        twitterLink,
        instagramLink,
        youTubeLink,
        linkedInLink,
    ]

    // Do we have any links? If not return undefined.
    if (allLinks.filter(isDefined).length === 0) {
        return undefined
    }

    return [
        { service: 'Facebook', href: facebookLink },
        { service: 'Twitter', href: twitterLink },
        { service: 'Instagram', href: instagramLink },
        { service: 'YouTube', href: youTubeLink },
        { service: 'LinkedIn', href: linkedInLink },
    ]
}

const flattenFinePrintLinks = (footerItem: CmsFooter) => {
    return footerItem.finePrintLinksCollection?.items
        ?.filter(isDefined)
        .map(item => ({
            id: item.sys.id,
            caption: item.caption?.trim() || undefined,
            href: item.href || undefined,
            openInNewTab: item.openInNewTab ?? false,
        }))
        .filter(isMenuItemWithHref) as MenuItem[]
}

const flattenFooterMenu = (footerItem: CmsFooter) => {
    const menuSections = [
        flattenMenuSection(footerItem.menuSection1),
        flattenMenuSection(footerItem.menuSection2),
        flattenMenuSection(footerItem.menuSection3),
        flattenMenuSection(footerItem.menuSection4),
        flattenMenuSection(footerItem.menuSection5),
        flattenMenuSection(footerItem.menuSection6),
        flattenMenuSection(footerItem.menuSection7),
        flattenMenuSection(footerItem.menuSection8),
    ]

    return menuSections.every(section => section === null)
        ? undefined
        : menuSections
}

const flattenMenuSection = (
    section: CmsNavigationElement | undefined | null
) => {
    const menuItem = section && flattenCmsNavigationElement(section)
    return menuItem || null
}
