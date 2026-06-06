import { AgedCareHomeSummary } from '../../../../types/homeSummary'
import { cx } from '../../../../utils/cx'
import { isDefined } from '../../../../utils/typeguards'
import { LocationFocus, MapPoint } from './types'

export const LocationBanner = ({
    searchPoint,
    selectedHome,
    locationFocus,
}: {
    searchPoint: MapPoint
    selectedHome?: AgedCareHomeSummary
    locationFocus?: LocationFocus
}) => {
    if (
        isDefined(selectedHome) &&
        isDefined(selectedHome.distanceFromUserKM) &&
        selectedHome.distanceFromUserKM > 100 &&
        locationFocus !== LocationFocus.state
    ) {
        return (
            <Banner>
                <span className="text-center">
                    Unfortunately we don&apos;t have any Bupa care homes within
                    100 kms of {searchPoint.description}. Please find your
                    nearest Bupa care home below.
                </span>
            </Banner>
        )
    }

    return (
        <Banner>
            {locationFocus !== LocationFocus.state ? (
                <>
                    <span className="text-center">
                        Displaying Bupa care homes nearest to
                    </span>
                    <span className="text-center font-medium">
                        {searchPoint.description}
                    </span>
                </>
            ) : (
                <>
                    <span className="text-center">
                        Please find your nearest Bupa care home in&nbsp;
                        <span className="font-medium">
                            {searchPoint.description}
                        </span>
                        &nbsp;below. Or search for another location above.
                    </span>
                </>
            )}
        </Banner>
    )
}

export const UnknownLocationBanner = () => {
    return (
        <Banner>
            <span className="text-center">
                We weren&apos;t able to find your location on the map. Please
                refine your search results to an Australian suburb or postcode.
            </span>
        </Banner>
    )
}

const Banner = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div
            className={cx(
                'px-4 md:px-16 py-2 bg-[#cce4f4] flex flex-row flex-wrap justify-center items-center gap-x-1'
            )}
        >
            {children}
        </div>
    )
}
