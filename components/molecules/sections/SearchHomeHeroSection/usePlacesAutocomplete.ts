import { useEffect } from 'react'
import { useQuery as useReactQuery } from '@tanstack/react-query'
import { PlacesResponse } from '../../../../pages/api/places'

export type PlaceRecord = PlacesResponse['predictions'][number]

const queryAutocomplete = async (searchString: string) => {
    const endpoint = `/api/places`
    const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify({ searchString }),
    }
    const response = await fetch(endpoint, options)
    if (!response.ok) {
        throw new Error(
            `fetch error: ${response.status} ${response.statusText}`
        )
    } else {
        const data = (await response.json()) as PlacesResponse
        const places = data.predictions
        return places
    }
}

export const usePlacesAutoComplete = (searchString: string): PlaceRecord[] => {
    const { isLoading, isError, data, error } = useReactQuery({
        queryKey: [`locationSearch`, searchString],
        queryFn: () => queryAutocomplete(searchString),
        staleTime: 5 * 60 * 1000, // 5 minutes
    })

    useEffect(() => {
        if (isError) {
            console.error('usePlacesAutoComplete error:', error)
        }
    }, [isError, error])

    return isLoading || isError ? [] : data
}
