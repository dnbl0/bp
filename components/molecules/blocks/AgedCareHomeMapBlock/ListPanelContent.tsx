import { useState } from 'react'
import {
    AgedCareHomeSummary,
    findHomesInRegion,
} from '../../../../types/homeSummary'
import { cx } from '../../../../utils/cx'
import { getDistanceBetweenPointsAlt } from '../../../../utils/getDistanceBetweenPoints'
import { ChevronRightIcon } from '../../../atoms/icons/ChevronRightIcon'
import { ResponsiveImage } from '../../../atoms/ResponsiveImage'
import { LocationBanner } from './Banners'
import { MapPoint } from './types'

const INITIAL_ITEMS_LENGTH = 10

export const ListPanelContent = ({
    mapPosition,
    stateOrRegionId,
    agedCareHomesSummary,
}: {
    mapPosition?: MapPoint
    stateOrRegionId: string | undefined
    agedCareHomesSummary: AgedCareHomeSummary[]
}) => {
    const [isAllVisible, setAllVisible] = useState(false)

    if (!stateOrRegionId) return null

    const homesInRegion = findHomesInRegion(
        agedCareHomesSummary,
        stateOrRegionId
    ).map(home => updateHomeWithDistance(home, mapPosition))

    const visibleHomes = homesInRegion
        .sort(sortFunc)
        .slice(0, isAllVisible ? undefined : INITIAL_ITEMS_LENGTH)

    const isLoadMoreButtonRequired = homesInRegion.length > INITIAL_ITEMS_LENGTH

    return (
        <div>
            {mapPosition && <LocationBanner searchPoint={mapPosition} />}
            {visibleHomes.map((home, index) => (
                <a
                    key={index}
                    href={home.slug}
                    className={cx(
                        'p-6',
                        'border-b-cool-paper-200 border-b-[1px]',
                        'flex flex-row gap-4 items-center',
                        'hover:bg-[#F0F9FF]'
                    )}
                >
                    {home.image && (
                        <div>
                            <div className="h-[42px] w-[42px]">
                                <ResponsiveImage
                                    layout="fill"
                                    image={home.image}
                                    iconSize='250'
                                />
                            </div>
                        </div>
                    )}
                    <div className="grow">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                            <div>
                                <div className="text-navy font-medium whitespace-nowrap">
                                    {home.name}
                                </div>
                                {home.distanceFromUserKM && (
                                    <div className="text-body-small">
                                        {home.distanceFromUserKM} km away
                                    </div>
                                )}
                                {home.shortDescription && (
                                    <div className="text-body-small">
                                        {home.shortDescription}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="inline-block">
                        <ChevronRightIcon />
                    </div>
                </a>
            ))}
            {isLoadMoreButtonRequired && !isAllVisible && (
                <div className="mt-6">
                    <div className="flex flex-col items-center justify-end sm:flex-row">
                        <div className="flex justify-center sm:basis-1/3 mb-3 sm:mb-0">
                            <button
                                className="button button--secondary"
                                onClick={() => setAllVisible(true)}
                            >
                                Load more
                            </button>
                        </div>
                        <div className="sm:basis-1/3 text-end">
                            <span>
                                Showing {visibleHomes.length} of{' '}
                                {homesInRegion.length}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

// TODO[Shannon]: Sorting by distance is something that probably should be
// handled in the parent component.
const sortFunc = (a: AgedCareHomeSummary, b: AgedCareHomeSummary) => {
    // Sort by distance
    if (a.distanceFromUserKM && b.distanceFromUserKM) {
        return a.distanceFromUserKM - b.distanceFromUserKM
    }

    // Sort by name
    if (!a.name || !b.name) return 0

    if (a.name < b.name) {
        return -1
    }
    if (a.name > b.name) {
        return 1
    }
    return 0
}

const updateHomeWithDistance = (
    home: AgedCareHomeSummary,
    userPosition: MapPoint | undefined
) => {
    const homeLat = home.location?.lat
    const homeLng = home.location?.lng

    if (!userPosition || !homeLat || !homeLng) return home

    const homePosition = { lat: homeLat, lng: homeLng }

    const distanceBetweenPoints = getDistanceBetweenPointsAlt(
        userPosition,
        homePosition
    )

    const roundedDistance = Math.ceil(distanceBetweenPoints)

    const result: AgedCareHomeSummary = {
        ...home,
        distanceFromUserKM: roundedDistance,
    }

    return result
}
