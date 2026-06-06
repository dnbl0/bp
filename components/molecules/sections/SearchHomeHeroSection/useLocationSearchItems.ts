import { invariant } from '@apollo/client/utilities/globals'
import { useGeolocationSensor } from '../../../../hooks/useGeolocationSensor'
import { useGlobalPageData } from '../../../../hooks/useGlobalPageData'
import { AgedCareHomeSummary } from '../../../../types/homeSummary'
import { LocationSearchType } from './constants'
import { usePlacesAutoComplete } from './usePlacesAutocomplete'

export interface LocationSearchItem {
    id: string // Must be unqiue for all items
    type: LocationSearchType
    caption: string
    code?: string
}

export interface LocationSearchItems {
    user?: LocationSearchItem
    homes?: LocationSearchItem[]
    places?: LocationSearchItem[]
}

export const useLocationSearchItems = (
    isSearchActive: boolean,
    searchString: string
): LocationSearchItems => {
    const geolocation = useGeolocationSensor(isSearchActive)

    const isLocationAvailable = geolocation.latitude && geolocation.longitude

    const { agedCareHomesSummary = [] } = useGlobalPageData()

    const placeSearchResults = usePlacesAutoComplete(searchString)

    if (!isSearchActive) return {}

    const user: LocationSearchItem = {
        id: LocationSearchType.geolocate,
        type: LocationSearchType.geolocate,
        caption: 'My location',
    }

    const homes: LocationSearchItem[] =
        searchString === '' ? [] : findHomes(searchString, agedCareHomesSummary)

    const places: LocationSearchItem[] = placeSearchResults.map(place => ({
        id: `${LocationSearchType.place}-${place.place_id}`,
        type: LocationSearchType.place,
        caption: place.description,
        code: place.place_id,
    }))

    return {
        user: isLocationAvailable ? user : undefined,
        homes,
        places,
    }
}

export const findHomes = (
    searchString: string,
    agedCareHomesSummary: AgedCareHomeSummary[]
): LocationSearchItem[] => {
    return agedCareHomesSummary
        .filter(home => !!home.name)
        .filter(home =>
            home.name?.toUpperCase().includes(searchString.toUpperCase())
        )
        .sort((a, b) => {
            invariant(a.name, 'Home name is required')
            invariant(b.name, 'Home name is required')
            return a.name.localeCompare(b.name)
        })
        .map(home => ({
            id: `${LocationSearchType.home}-${home.id}`,
            type: LocationSearchType.home,
            caption: home.name || 'error: no name',
            code: home.slug,
        }))
}
