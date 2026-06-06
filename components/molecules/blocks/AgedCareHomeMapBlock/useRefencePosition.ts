import { useMemo, useRef } from 'react'
import {
    useGeolocationSensor,
    GeoLocationSensorState,
} from '../../../../hooks/useGeolocationSensor'
import { isDefined } from '../../../../utils/typeguards'
import {
    AustraliaMapPoint,
    LocationFocus,
    MapPoint,
    VictoriaMapPoint,
} from './types'
import { Location, usePlaceSearch } from './usePlaceSearch'

/*
 * This hook is used to decide where the map should initially be
 * positioned when the page loads.
 */
export const useInitialMapPosition = (
    isActive: boolean, // Set to true to request geolocation data.
    locationFocus: LocationFocus,
    searchString: string | undefined,
    selectedState: string | undefined
): MapPoint | undefined => {
    const userGeolocation = useGeolocationSensor(
        isActive && locationFocus === LocationFocus.geolocate
    )

    const searchLocation = usePlaceSearch(
        locationFocus === LocationFocus.search ? searchString : undefined
    )

    return useMemo(() => {
        switch (locationFocus) {
            case LocationFocus.geolocate:
                return getMapPointForGeolocation(userGeolocation)
            case LocationFocus.search:
                return getMapPointForSearch(searchLocation)
            case LocationFocus.state:
                return getMapPointForState(selectedState, searchLocation)

            default:
                console.error(`Unexpected location focus: "${locationFocus}"`)
                return undefined
        }
    }, [locationFocus, userGeolocation, searchLocation, selectedState])
}

/*
 * This hook is used to get the user's current position or
 * the position of place they searched for.
 * The result is intended to be used to calculate the distance
 * between the user and the aged care homes.
 */
export const useListReferencePosition = (
    isActive: boolean, // Set to true to request geolocation data.
    locationFocus: LocationFocus,
    searchString: string | undefined
) => {
    const activeLocationFocus = useRef<LocationFocus>(locationFocus)
    const userGeolocation = useGeolocationSensor(
        isActive && locationFocus === LocationFocus.geolocate
    )

    const searchLocation = usePlaceSearch(
        locationFocus === LocationFocus.search ? searchString : undefined
    )

    return useMemo(() => {
        // If the user has changed the location focus, then we need to
        // update the active location focus. The catch is that
        // `LocationFocus.state` is not a valid location focus. It's
        // not a valid focus because make sense to calcuate the
        // distance between a state (NSW, VIC, etc) and an aged care home.
        //
        // Age care homes are contained inside the state.
        //
        // To avoid this, the UI falls back to using the previous
        // location focus (`geolocate` or `search`) to calculate
        // the home distance.
        switch (locationFocus) {
            case LocationFocus.geolocate:
            case LocationFocus.search:
                activeLocationFocus.current = locationFocus
                break
            case LocationFocus.state:
                // Do nothing.
                break
            default:
                console.error(`Unexpected location focus: "${locationFocus}"`)
        }

        switch (activeLocationFocus.current) {
            case LocationFocus.geolocate:
                return getMapPointForGeolocation(userGeolocation)
            case LocationFocus.search:
                return getMapPointForSearch(searchLocation)
            case LocationFocus.state:
                return getMapPointForGeolocation(userGeolocation)
            default:
                console.error(`Unexpected location focus: "${locationFocus}"`)
                return undefined
        }
    }, [locationFocus, userGeolocation, searchLocation])
}

const getMapPointForGeolocation = (
    geolocation: GeoLocationSensorState
): MapPoint | undefined => {
    const {
        latitude: userLat,
        longitude: userLng,
        formattedAddress,
    } = geolocation
    return isDefined(userLat) &&
        isDefined(userLng) &&
        isDefined(formattedAddress)
        ? {
              description: formattedAddress,
              lat: userLat,
              lng: userLng,
              zoom: 12,
          }
        : undefined
}

const getMapPointForSearch = (
    location: Location | undefined
): MapPoint | undefined => {
    if (location) {
        return {
            ...location,
            zoom: 12,
        }
    } else {
        return undefined
    }
}

const getMapPointForState = (
    state: string | undefined,
    location: Location | undefined
): MapPoint | undefined => {
    const stateChk = state?.replace('state', '')
    if (location && stateChk && location.description.includes(stateChk))
        return {
            description: location.description,
            lat: location.lat,
            lng: location.lng,
            zoom: 7,
        }

    switch (state) {
        case 'stateACT':
            return {
                description: 'ACT',
                lat: -35.5215885,
                lng: 148.8001751,
                zoom: 9,
            }
        case 'stateNSW':
            return {
                description: 'NSW',
                lat: -32.228895,
                lng: 148.456487,
                zoom: 7,
            }
        case 'stateNT':
            return {
                description: 'NT',
                lat: -18.4185961,
                lng: 128.996269,
                zoom: 6,
            }
        case 'stateQLD':
            return {
                description: 'QLD',
                lat: -21.914244,
                lng: 145.131985,
                zoom: 6,
            }
        case 'stateSA':
            return {
                description: 'SA',
                lat: -31.254022,
                lng: 136.016686,
                zoom: 6,
            }
        case 'stateTAS':
            return {
                description: 'TAS',
                lat: -41.1347731,
                lng: 137.4795498,
                zoom: 6,
            }
        case 'stateVIC':
            return {
                description: 'VIC',
                lat: -37.363204,
                lng: 144.812705,
                zoom: 7,
            }
        case 'stateWA':
            return {
                description: 'WA',
                lat: -19.8786791,
                lng: 83.9473259,
                zoom: 4,
            }
        default:
            console.error(`Unknown state: ${state}`)
            return AustraliaMapPoint
    }
}
