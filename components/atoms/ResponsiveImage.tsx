import Image, { ImageProps } from 'next/image'

import { CmsAsset } from '../../types/contentful-cms-types'
import { cmsAssetToImageAttributes } from '../../lib/cmsAssets'
import { getImageLoader } from '../../hooks/useImageSupportMatrix/imageLoaders'
import { smallTransparentImage } from '../../utils/smallTransparentImage'
import useDimensions from 'react-cool-dimensions'
import { useImageSupportMatrix } from '../../hooks/useImageSupportMatrix'
import { useSizesForImage } from '../../hooks/useSizesForImage'

/**

The `ResponsiveImage` component provides an easy way to display
responsive images.

> Responsive images are the set of techniques used to load
> the right image based on device resolution, orientation,
> screen size, network connection, and page layout.
[Responsive Images](https://imagekit.io/responsive-images/#:~:text=Responsive%20images%20are%20the%20set,result%20in%20time%20%26%20bandwidth%20wastage.)

This component uses Contentful's [Images API][1] to resize
and reformat Contentful hosted images.

[1]: https://www.contentful.com/developers/docs/references/images-api/
*/

export const ResponsiveImage = ({
    image,
    iconSize,
    layout,
}: {
    image: CmsAsset
    iconSize?: string
    layout: ImageProps['layout']
}) => {
    const imageProps = image && cmsAssetToImageAttributes(image)
    const imageSupportMatrix = useImageSupportMatrix()
    const { observe, width: wrapperWidth } = useDimensions()
    const iconWidth = iconSize ? parseInt(iconSize?.replace(/\D/g,''), 10) : wrapperWidth;
    const sizes = useSizesForImage(iconWidth)

    if (!imageProps) {
        return null
    }

    const isSizesRequired = layout === 'fill' || layout === 'responsive'

    const isReady = isSizesRequired === false || (isSizesRequired && sizes)

    const isWidthHeightRequired = layout !== 'fill' || !!iconSize

    const { src, description, width, height, title } = imageProps
    let imageWidth = width;
    let imageHeight = height;

     if (iconSize && iconSize !== 'Default' && width && height) {
        const aspectRatio = (width && height) ? width / height : 1;
        imageWidth = parseInt(iconSize.replace(/\D/g,''), 10);
        imageHeight = Math.round(imageWidth / aspectRatio);
    }


    return (
        <div className="fix-nextjs-image relative h-full" ref={observe}>
            <Image
                alt={title || 'Bupa Age care home image'}
                objectFit={'cover'}
                layout={layout}
                loader={getImageLoader(imageSupportMatrix, imageProps)}
                sizes={isSizesRequired ? sizes : undefined}
                src={isReady ? src : smallTransparentImage}
                width={isWidthHeightRequired ? imageWidth : undefined}
                height={isWidthHeightRequired ? imageHeight : undefined}
            />
        </div>
    )
}
