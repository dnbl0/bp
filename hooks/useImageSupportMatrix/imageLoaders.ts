import { ImageLoader, ImageProps } from 'next/image'
import { ImageSupportMatrix } from './useImageSupportMatix'

/**
 * An image loader is a function that generates image URLs.
 *
 * An image loader transforms a given image URL to include
 * size, format and quality parameters. These tranformed URLs
 * allow Next.js to load an image that is optimised for
 * the user's screen size and browser capabilities.
 *
 * Image loader functions are custom written for each image
 * host. Next.js has support for some hosts out of the
 * box. Contentful is not supported, which is why we've
 * written a custom loader.
 *
 * See the [image loader function docs](https://nextjs.org/docs/basic-features/image-optimization#loaders)
 * for more info.
 */
export const getImageLoader = (
    imageSupport: ImageSupportMatrix,
    props: ImageProps
): ImageLoader | undefined => {
    return isImageHostedOnContentful(props)
        ? contentfulImageLoader(imageSupport)
        : undefined // Returning undefined allows Next.js to fallback to using it's default image loader.
}

const isImageHostedOnContentful = (props: ImageProps): boolean => {
    return (
        typeof props.src === 'string' &&
        props.src.startsWith('https://images.ctfassets.net')
    )
}

/**
 * Returns an image loader function that supports the
 * [Contentful Images API](https://www.contentful.com/developers/docs/references/images-api/)
 */
const contentfulImageLoader =
    (imageSupport: ImageSupportMatrix): ImageLoader =>
    ({ src, width, quality }) => {
        const widthStr = `?w=${width}`

        const formatStr = (() => {
            switch (true) {
                case imageSupport['avif']:
                    return '&fm=avif'
                case imageSupport['webp::lossless']:
                    return '&fm=webp'
                default:
                    return ''
            }
        })()

        const qualityStr = quality !== undefined ? `&q=${quality}` : ''

        return `${src}${widthStr}${formatStr}${qualityStr}`
    }
