/*
    The Aged Care Home Location map block component has three location focus modes:
    - geolocate: User location
    - state: State location from button.
    - search: Place location from search query

    This is required because the user can interact with map in different ways.
    - They might be search for aged care homes based on their browser reported
      location.
    - They might be searching for homes in a suburb or postcode. This mode is
      triggered by entering a search query.
    - The user may have selected a state from the button row. This mode shows
      the user homes in the selected state.
*/
export const enum LocationFocus {
    geolocate = 'geolocate', // User location
    state = 'state', // State location from button.
    search = 'search', // Place location from search query
}

export type MapPoint = {
    description: string
    zoom: number
    lat: number
    lng: number
}

export const AustraliaMapPoint: MapPoint = {
    description: 'Australia',
    lat: -34.397,
    lng: 150.644,
    zoom: 4,
}

export const VictoriaMapPoint: MapPoint = {
    description: 'Victoria',
    lat: -36.4960531,
    lng: 140.9696565,
    zoom: 6,
}
