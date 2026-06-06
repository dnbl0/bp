/*
    This endpoint is used to search for places matching a place name or postcode.

    This endpoint is powered by the Google Places API.
    https://developers.google.com/maps/documentation/places/web-service/autocomplete
*/

import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { isRecord } from '../../utils/typeguards'

const apiRequestBody = z.object({
    searchString: z.string(),
})

const placesResponse = z.object({
    status: z.string().optional(),
    error_message: z.string().optional(),
    predictions: z.array(
        z.object({
            description: z.string(),
            place_id: z.string(),
        })
    ),
})

const geocodeResponse = z.object({
    status: z.string().optional(),
    error_message: z.string().optional(),
    results: z.array(
        z.object({
            geometry: z.object({
                location: z.object({
                    lat: z.number(),
                    lng: z.number(),
                }),
            }),
        })
    ),
})

type Data = {}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const requestBody = isRecord(req.body) ? req.body : JSON.parse(req.body)
        const { searchString } = apiRequestBody.parse(requestBody)
        const place = await findPlace(searchString)
        const location = place && (await findLocationForPlaceId(place.placeId))
        res.status(200).json({ place, location })
    } catch (error) {
        res.status(500).json({ message: 'Unexpected server error' })
    }
}

const findPlace = async (searchString: string) => {
    const apiKey = process.env.GOOGLE_CLOUD_API_KEY_SERVER

    const endpoint = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&components=country%3Aau&types=locality%7Cpostal_code&input=${searchString}`

    const opt: RequestInit = {
        method: 'GET',
    }

    const response = await fetch(endpoint, opt)

    if (!response.ok) {
        return undefined
    } else {
        const data = placesResponse.parse(await response.json())
        const place = data.predictions
            .map(place => ({
                placeId: place.place_id,
                description: place.description,
            }))
            .shift()
        return place
    }
}

const findLocationForPlaceId = async (placeId: string) => {
    const apiKey = process.env.GOOGLE_CLOUD_API_KEY_SERVER

    const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&place_id=${placeId}`

    const opt: RequestInit = {
        method: 'GET',
    }

    const response = await fetch(endpoint, opt)

    if (!response.ok) {
        return undefined
    } else {
        const data = geocodeResponse.parse(await response.json())
        const location = data.results[0].geometry.location
        return location
    }
}
