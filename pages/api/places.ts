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

export type PlacesResponse = z.infer<typeof placesResponse>

type Data = {}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const requestBody = isRecord(req.body) ? req.body : JSON.parse(req.body)
        const requestData = apiRequestBody.parse(requestBody)

        const apiKey = process.env.GOOGLE_CLOUD_API_KEY_SERVER

        const endpoint = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&components=country%3Aau&types=locality%7Cpostal_code&input=${requestData.searchString}`

        const opt: RequestInit = {
            method: 'GET',
        }

        const response = await fetch(endpoint, opt)

        if (!response.ok) {
            res.status(500).json({
                message: 'API error',
                errorMessage: JSON.stringify(response.text),
            })
        } else {
            const jsonObj = await response.json()
            const data = placesResponse.parse(jsonObj)
            res.status(200).json(data)
        }
    } catch (error) {
        res.status(500).json({ message: 'Unexpected server error' })
    }
}
