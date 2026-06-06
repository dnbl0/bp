import {
    CmsAgedCareHomeDetailsTemplate,
    CmsImageCard,
    CmsRegionListDetailsSection,
} from '../../../types/contentful-cms-types'

import { BannerSection } from './BannerSection'
import { ImageCardBlock } from '../blocks/ImageCardBlock'
import { Section } from '../../atoms/Section'
import { isDefined } from '../../../utils/typeguards'
import { useState } from 'react'

const INITIAL_ITEMS_LENGTH = 6

export const RegionListDetailSection = ({
    component,
}: {
    component: CmsRegionListDetailsSection
}) => {
    const [loadMore, setLoadMore] = useState(false)

    if (!component?.ageCareHomesCollection?.items.length) {
        return null
    }

    const totalAgeCareHomes = component.ageCareHomesCollection.items.length

    const handleLoadMore = () => {
        setLoadMore(true)
    }

    return (
        <>
            <div className="mt-10 w-content m-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
                {component.ageCareHomesCollection.items
                    .filter(isDefined)
                    .slice(0, loadMore ? undefined : INITIAL_ITEMS_LENGTH)
                    .map(item => createImageCard(item))
                    .map((item, index) => (
                        <ImageCardBlock
                            key={index}
                            component={item}
                            cardBlockType="skeleton"
                        />
                    ))}
            </div>

            {totalAgeCareHomes > INITIAL_ITEMS_LENGTH && !loadMore && (
                <Section className="mt-12">
                    <div className="flex flex-col items-center justify-end sm:flex-row">
                        <div className="flex justify-center sm:basis-1/3 mb-3 sm:mb-0">
                            <button
                                className="button button--secondary"
                                onClick={handleLoadMore}
                            >
                                Load more
                            </button>
                        </div>
                        <div className="sm:basis-1/3 text-end">
                            <span>
                                Showing {INITIAL_ITEMS_LENGTH} of{' '}
                                {totalAgeCareHomes}
                            </span>
                        </div>
                    </div>
                </Section>
            )}
        </>
    )
}

const createImageCard = (
    item: CmsAgedCareHomeDetailsTemplate
): CmsImageCard => {
    return {
        __typename: 'ImageCard',
        _id: '52766',
        sys: item.sys,
        heading: item.name,
        contentfulMetadata: item.contentfulMetadata,
        image: item.galleryCollection?.items[0],
        buttonText: 'Visit page',
        buttonHref: item.homeDisplayPage?.slug,
    }
}
