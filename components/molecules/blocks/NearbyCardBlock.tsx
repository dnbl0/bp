import Link from 'next/link'
import {
    CmsAgedCareHomeDetailsTemplateNearbyHomesCollection,
    CmsLocation,
} from '../../../types/contentful-cms-types'
import { getDistanceBetweenPoints } from '../../../utils/getDistanceBetweenPoints'
import { ChevronRightIcon } from '../../atoms/icons/ChevronRightIcon'
import { ResponsiveImage } from '../../atoms/ResponsiveImage'

export const NearbyCardBlock = ({
    location,
    nearbyHomes,
}: {
    location: CmsLocation
    nearbyHomes: CmsAgedCareHomeDetailsTemplateNearbyHomesCollection
}) => {
    if (nearbyHomes.items.length)
        return (
            <div className="flex flex-col">
                <div className="flex-grow">
                    <div className="flex flex-col gap-3  border-b border-cool-paper-200">
                        <div className="font-medium text-2xl text-navy">
                            Nearby homes
                        </div>
                        {nearbyHomes.items.map((home, i) => {
                            const image = home?.galleryCollection?.items[0]
                            const homeLink = home?.homeDisplayPage?.slug
                                ? home?.homeDisplayPage?.slug
                                : '#'
                            return (
                                <Link key={i} href={homeLink}>
                                    <a
                                        className="cursor group"
                                        data-link-type="nearby-homes"
                                    >
                                        <div className="flex items-center p-6 border-t border-cool-paper-200">
                                            <div className="mr-6 h-[42px] w-[42px]">
                                                {image && (
                                                    <ResponsiveImage
                                                        image={image}
                                                        layout="fill"
                                                        iconSize='250'
                                                    />
                                                )}
                                            </div>
                                            <div className="grow">
                                                <div className="font-medium text-navy group-hover:underline">
                                                    {home?.name}
                                                </div>
                                                {home?.location && (
                                                    <div>
                                                        {getDistanceBetweenPoints(
                                                            home.location,
                                                            location
                                                        ).toFixed(0)}{' '}
                                                        kms away
                                                    </div>
                                                )}
                                            </div>
                                            <div className="fill-navy">
                                                <ChevronRightIcon />
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    else return <></>
}
