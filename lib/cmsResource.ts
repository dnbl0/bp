import {
    CmsResource,
    CmsResourceBoolean,
    CmsResourceRichText,
    CmsResourceSetResourcesItem,
} from '../types/contentful-cms-types'

export const readResourceString = (
    cmsResources: CmsResourceSetResourcesItem[] | undefined = [],
    key: string,
    fallback: string
) => {
    const item = cmsResources.find(
        item => item.key === key && item.__typename === 'Resource'
    )
    const value = (item as CmsResource)
        ? (item as CmsResource).value
        : undefined

    return value !== undefined && value !== null ? value : fallback
}

export const readResourceRichText = (
    cmsResources: CmsResourceSetResourcesItem[] | undefined = [],
    key: string,
    fallback: string
) => {
    const item = cmsResources.find(
        item => item.key === key && item.__typename === 'ResourceRichText'
    )
    const value = (item as CmsResourceRichText)?.valueRichText?.json
    const anchorId = (item as CmsResourceRichText)?.anchorId

    return value !== undefined && value !== null ? {value, anchorId} : fallback
}

export const readResourceBoolean = (
    cmsResources: CmsResourceSetResourcesItem[] | undefined = [],
    key: string,
    fallback: boolean
) => {
    const item = cmsResources.find(
        item => item.key === key && item.__typename === 'ResourceBoolean'
    )
    const value = (item as CmsResourceBoolean).valueBoolean

    return value !== undefined && value !== null ? value : fallback
}
