import { useEffect, useState } from 'react'

const findLocationForSearch = async (searchString: string) => {
    const endpoint = `/api/find-location`
    const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify({ searchString }),
    }
    const response = await fetch(endpoint, options)
    if (!response.ok) {
        console.error(`fetch error: ${response.status} ${response.statusText}`)
        return undefined
    } else {
        const { location, place } = await response.json()
        if (location && place) {
            return {
                description: place.description,
                ...location,
            }
        }
        return undefined
    }
}

export interface Location {
    description: string
    lat: number
    lng: number
}

export const usePlaceSearch = (searchString: string | undefined) => {
    const [location, setLocation] = useState<Location | undefined>(undefined)

    useEffect(() => {
        if (searchString) {
            findLocationForSearch(searchString).then(data => {
                setLocation(data as any as Location)
            })
        }
    }, [searchString])

    return location
}
