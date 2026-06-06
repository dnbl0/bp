import { Maybe } from 'graphql/jsutils/Maybe'
import { CmsAsset } from '../types/contentful-cms-types'
import { isRecord } from '../utils/typeguards'

export const cmsAssetToImageAttributes = (
    asset: CmsAsset | Maybe<CmsAsset> | undefined,
    newWidth?: string
) => {
    const src = (asset && asset.url) || undefined
    let width = (asset && asset.width) || undefined
    let height = (asset && asset.height) || undefined
    const description = (asset && asset.description) || undefined
    const title = (asset && asset.title) || undefined

    if (newWidth && newWidth !== 'Default' && width && height) {
        const aspectRatio = (width && height) ? width / height : 1;
        width = parseInt(newWidth.replace(/\D/g,''), 10);
        height = Math.round(width / aspectRatio);
    }

    return src && width && height
        ? { src, width, height, description, title }
        : undefined
}

export const cmsAssetToVideoAttributes = (
    asset: CmsAsset | Maybe<CmsAsset> | undefined
) => {
    const src = (asset && asset.url) || undefined
    const type = (asset && asset.contentType) || undefined
    const description = (asset && asset.description) || undefined

    return src && type ? { src, type, description } : undefined
}

export const isCmsAsset = (value: unknown): value is CmsAsset => {
    return isRecord(value) && value['__typename'] === 'Asset'
}
