import { useEffect, useState } from 'react'
import { CmsCarousel } from '../../../types/contentful-cms-types'
import { CmsElement } from '../CmsElement'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { ArrowLeft } from '../../atoms/icons/ArrowLeft'
import { ArrowRight } from '../../atoms/icons/ArrowRight'
import { cx } from '../../../utils/cx'

export const CarouselBlock = ({ component }: { component: CmsCarousel }) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [totalSlides, setTotalSlides] = useState(0)
    const [itemsPerSlide, setItemsPerSlide] = useState(1)
    const { title, carouselItemsCollection, slidesPerScreen } = component

    const updateCurrentSlide = (index: number) => {
        if (currentSlide !== index) {
            setCurrentSlide(index)
        }
    }

    const nextSlide = () => {
        if (currentSlide < totalSlides - 1) {
            setCurrentSlide(currentSlide + 1)
        }
    }

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1)
        }
    }

    const carouselItems = groupArrayIntoPairs(
        carouselItemsCollection?.items,
        itemsPerSlide
    )

    useEffect(() => {
        if (slidesPerScreen && window.innerWidth > 768) {
            setItemsPerSlide(slidesPerScreen)
        } else {
            setItemsPerSlide(1)
        }
        const _totalSlides = carouselItemsCollection
            ? Math.ceil(carouselItemsCollection?.items.length / itemsPerSlide)
            : 0
        setTotalSlides(_totalSlides)
    }, [carouselItemsCollection, itemsPerSlide, slidesPerScreen])

    return (
        !title ? null : (
            <div id="carousel">
            <Carousel
                showThumbs={false}
                showStatus={false}
                showArrows={false}
                showIndicators={false}
                selectedItem={currentSlide}
                onChange={updateCurrentSlide}
            >
                {carouselItems.map((item, i) => {
                    return (
                        <div
                            key={i}
                            className="flex gap-x-6 justify-between h-full p-px text-left"
                        >
                            {item.map((component, i) => {
                                if (component) {
                                    const CarouselComponent = {
                                        block: component,
                                    }
                                    return (
                                        <div key={i} className="flex-1 flex">
                                            <CmsElement
                                                component={CarouselComponent}
                                            />
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    )
                })}
            </Carousel>
            <div className="flex justify-between mt-5" id="carousel-toolbar">
                <div
                    className={cx(
                        'flex items-center',
                        currentSlide === 0 ? 'opacity-50' : 'cursor-pointer'
                    )}
                    onClick={() => prevSlide()}
                >
                    <div
                        className={cx(
                            'rounded-full p-3',
                            currentSlide === 0 ? 'bg-disabled-text' : 'bg-cyan'
                        )}
                    >
                        <ArrowLeft className="fill-white" />
                    </div>
                    <div
                        className={cx(
                            'ml-2 font-semibold',
                            currentSlide === 0
                                ? 'text-disabled-text'
                                : 'text-cyan'
                        )}
                    >
                        Previous
                    </div>
                </div>
                <div className="flex items-center">
                    {currentSlide + 1} of {totalSlides}
                </div>
                <div
                    className={cx(
                        'flex items-center',
                        currentSlide === totalSlides - 1
                            ? 'opacity-50'
                            : 'cursor-pointer'
                    )}
                    onClick={() => nextSlide()}
                >
                    <div
                        className={cx(
                            'mr-2 font-semibold',
                            currentSlide === totalSlides - 1
                                ? 'text-disabled-text'
                                : 'text-cyan'
                        )}
                    >
                        Next
                    </div>
                    <div
                        className={cx(
                            'rounded-full p-3',
                            currentSlide === totalSlides - 1
                                ? 'bg-disabled-text'
                                : 'bg-cyan'
                        )}
                    >
                        <ArrowRight className="fill-white" />
                    </div>
                </div>
            </div>
        </div>
        )
    )
}

function groupArrayIntoPairs(
    items: any[] | undefined,
    itemsPerSlide: number | undefined | null = 1
) {
    const groupedArray = []

    if (items && itemsPerSlide) {
        for (let i = 0; i < items.length; i += itemsPerSlide) {
            //const pair = [inputArray[i], inputArray[i + 1]];
            const pair = []
            let p = 0
            while (p < items.length && p < itemsPerSlide) {
                pair.push(items[i + p])
                p++
            }

            groupedArray.push(pair)
        }
    }
    return groupedArray
}
