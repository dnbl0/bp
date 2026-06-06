/*
    This endpoint is used to search for places matching a place name or postcode.

    This endpoint is powered by the Google Places API.
    https://developers.google.com/maps/documentation/places/web-service/autocomplete
*/

import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { isRecord } from '../../utils/typeguards'

const apiRequestBody = z.object({
    latLng: z.string(),
})

const placesResponse = z.object({
    status: z.string().optional(),
    error_message: z.string().optional(),
    results: z.array(
        z.object({
            formatted_address: z.string().optional(),
            address_components: z.array(
                z.object({
                    long_name: z.string(),
                    short_name: z.string(),
                    types: z.array(z.string()),
                })
            ),
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
        const { latLng } = apiRequestBody.parse(requestBody)
        const place = await findPlaceByLatLng(latLng)
        // const location = place && (await findLocationForPlaceId(place.placeId))
        res.status(200).json({ place })
    } catch (error) {
        res.status(500).json({
            message: 'Unexpected server error',
        })
    }
}

const findPlaceByLatLng = async (latLong: string) => {
    const apiKey = process.env.GOOGLE_CLOUD_API_KEY_SERVER

    const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&latlng=${latLong}`

    const opt: RequestInit = {
        method: 'GET',
    }

    const response = await fetch(endpoint, opt)

    if (!response.ok) {
        return undefined
    } else {
        try {
            const data = placesResponse.parse(await response.json())
            return data.results[0] && data.results[0].formatted_address
                ? data.results[0].formatted_address?.valueOf()
                : 'My location'
        } catch (error) {
            return 'Unknown Location'
        }
    }
}
