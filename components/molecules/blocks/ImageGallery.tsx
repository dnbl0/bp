import {
    CmsAsset,
    CmsAssetCollection,
} from '../../../types/contentful-cms-types'
import ReactImageGallery, { ReactImageGalleryItem } from 'react-image-gallery'
import { memo, useEffect, useState } from 'react'

import { ImageGalleryIcon } from '../../atoms/icons/ImageGalleryIcon'
import { ImageModal } from './ImageModal'
import { ResponsiveImage } from '../../atoms/ResponsiveImage'
import { addTagManagerEvent } from '../../../utils/tagManager'

export const ImageGallery = ({ gallery }: { gallery: CmsAssetCollection }) => {
    const [showGalleryModal, setShowGalleryModal] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(1)
    const mainGallery: CmsAsset[] = []
    gallery.items.map((item, i) => {
        if (i < 5 && item) mainGallery[i] = item
    })

    const images: Array<ReactImageGalleryItem> = gallery.items.map(item => {
        return {
            original: item?.url ? item?.url : '',
            originalTitle: item?.description ? item?.description : '',
        }
    })

    const DisplayImage = ({
        image,
        index,
    }: {
        image: CmsAsset
        index: number
    }) => (
        <>
            <ResponsiveImage image={image} layout="fill" />
            <a
                className="h-full w-full top-0 cursor-pointer absolute opacity-0 hover:opacity-20 bg-black"
                onClick={() => (
                    setCurrentSlide(index), setShowGalleryModal(true)
                )}
                data-link-type={`image-gallery-${index}`}
            ></a>
        </>
    )

    useEffect(() => {
        if (showGalleryModal) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [showGalleryModal])

    if (gallery.items.length) {
        return (
            <>
                <div id="image-gallery" className="relative">
                    <div className="row-start-1 col-start-1 w-content m-auto h-full">
                        <div className="hidden md:flex aspect-[50/19] relative">
                            <div className="mr-6 overflow-hidden rounded w-[calc(50%-theme(space.6)*2/3)] relative">
                                <DisplayImage
                                    image={mainGallery[0]}
                                    index={1}
                                />
                            </div>
                            <div className="w-[calc(25%-theme(space.6)*2/3)] mr-6">
                                <div className="h-[calc(50%-theme(space.6)/2)] mb-6 overflow-hidden rounded relative">
                                    <DisplayImage
                                        image={mainGallery[1]}
                                        index={2}
                                    />
                                </div>
                                <div className="h-[calc(50%-theme(space.6)/2)] overflow-hidden rounded relative">
                                    <DisplayImage
                                        image={mainGallery[2]}
                                        index={3}
                                    />
                                </div>
                            </div>
                            <div className="w-[calc(25%-theme(space.6)*2/3)]">
                                <div className="h-[calc(50%-theme(space.6)/2)] mb-6 overflow-hidden rounded relative">
                                    <DisplayImage
                                        image={mainGallery[3]}
                                        index={4}
                                    />
                                </div>
                                <div className="h-[calc(50%-theme(space.6)/2)] overflow-hidden rounded relative">
                                    <DisplayImage
                                        image={mainGallery[4]}
                                        index={5}
                                    />
                                </div>
                            </div>
                            <button
                                className="button button--small button--secondary bottom-6 right-7 rounded !bg-white absolute hidden md:block"
                                onClick={() => {
                                    setCurrentSlide(1),
                                        setShowGalleryModal(true)
                                }}
                                data-link-type="image-gallery-show-all"
                            >
                                Show all images
                            </button>
                        </div>
                    </div>
                    <div className="block md:hidden aspect-video w-full overflow-hidden">
                        <ReactImageGallery
                            items={images}
                            showFullscreenButton={false}
                            showPlayButton={false}
                            onSlide={currentIndex => {
                                setCurrentSlide(currentIndex + 1)
                                addTagManagerEvent('image_gallery_slide', {
                                    slide: currentIndex + 1,
                                })
                            }}
                            onClick={() => setShowGalleryModal(true)}
                        />
                    </div>
                    <button
                        className="rounded text-xs text-navy bottom-6 right-7 p-1 !bg-cyan-50 absolute flex md:hidden"
                        onClick={() => setShowGalleryModal(true)}
                    >
                        {currentSlide}/{gallery.items.length}{' '}
                        <div className="ml-2 fill-navy">
                            <span className="sr-only">Show all images</span>
                            <ImageGalleryIcon />
                        </div>
                    </button>
                </div>
                {showGalleryModal && (
                    <ImageModal
                        images={gallery.items}
                        onClose={() => setShowGalleryModal(false)}
                        scrollToImage={currentSlide}
                    />
                )}
            </>
        )
    } else return <></>
}

export const MemoizedImageGallery = memo(ImageGallery)
