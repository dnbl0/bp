import { CmsAsset, Maybe } from '../../../types/contentful-cms-types'
import { useEffect, useRef } from 'react'

import { CloseIcon } from '../../atoms/icons/CloseIcon'
import { FullScreenModal } from '../../atoms/FullScreenModal'
import { ResponsiveImage } from '../../atoms/ResponsiveImage'
import { cx } from '../../../utils/cx'

export const ImageModal = ({
    images,
    onClose,
    scrollToImage,
}: {
    images: Maybe<CmsAsset>[] | null
    onClose: () => void
    scrollToImage: number
}) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setTimeout(() => {
            if (ref.current) {
                ref.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest',
                })
            }
        }, 500)
    }, [ref])

    return (
        <FullScreenModal>
            <div className="bg-white h-full w-full fixed overflow-y-scroll">
                <div className="z-fixed fixed bg-white w-full text-right">
                    <button className="px-4 py-4 m-6" onClick={onClose}>
                        <span className="sr-only">Close</span>
                        <CloseIcon className="fill-navy scale-150" />
                    </button>
                </div>
                <div className="flex flex-col h-full w-image-content m-auto pt-[70px] md:pt-12">
                    <div className="grow">
                        {images &&
                            images.map(
                                (image, i) =>
                                    image && (
                                        <div
                                            key={i}
                                            className={cx(
                                                'mt-6 md:mt-12 relative rounded overflow-hidden',
                                                i + 1 == images.length
                                                    ? 'mb-6 md:mb-12'
                                                    : ''
                                            )}
                                            ref={
                                                i + 1 == scrollToImage
                                                    ? ref
                                                    : null
                                            }
                                        >
                                            <ResponsiveImage
                                                image={image}
                                                layout="responsive"
                                            />
                                            {image.description && (
                                                <div className="text-xs sm:text-base absolute left-4 mr-4 bottom-4 bg-navy text-white p-2">
                                                    {image.description}
                                                </div>
                                            )}
                                        </div>
                                    )
                            )}
                    </div>
                </div>
            </div>
        </FullScreenModal>
    )
}
