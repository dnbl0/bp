import type { NextApiRequest, NextApiResponse } from 'next'
import { requestAgedCareHomeRooms } from '../../lib/requestAgedCareHomeRooms'
import { requestResourceSet } from '../../lib/requestResourceSet'
import {
    CmsAgedCareHomeDetailsTemplate,
    CmsResource,
    CmsResourceBoolean,
    CmsResourceRichText,
    Maybe,
    Scalars,
} from '../../types/contentful-cms-types'
import { isDefined } from '../../utils/typeguards'

export type HomePricingData = {
    success: boolean
    homes: RoomPricingByState
    resources: (CmsResource | CmsResourceRichText | CmsResourceBoolean)[] | undefined
}

export type Room = {
    name: Maybe<string> | undefined
    dapPrice: Maybe<number> | undefined
    radPrice: Maybe<number> | undefined
    extraService: Maybe<number> | undefined
}

export type Home = {
    name: Maybe<string> | undefined
    state: Maybe<string> | undefined
    additionalServices?: Maybe<Scalars['JSON']>
    specialServicePackages?: Maybe<Scalars['JSON']>
    rooms: Room[] | undefined
}

export type RoomPricingByState =
    | {
          state: Maybe<string> | undefined
          homes: Home[] | undefined
      }[]
    | undefined

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<HomePricingData>
) {
    const query = req.query
    const name = homeName(query.name)

    const homes = await requestAgedCareHomeRooms(false, name)

    const newhomes: Array<Home> | undefined = homes
        ?.filter(isDefined)
        .filter(isStateDefined)
        .filter(areRoomsDefined)
        .map((home: CmsAgedCareHomeDetailsTemplate) => ({
            name: home.name,
            state: home.contactCard?.stateOrTerritory,
            additionalServices: home.additionalServices?.json,
            specialServicePackages: home.specialServicePackages?.json,
            rooms: home.roomsCollection?.items.filter(isDefined).map(room => ({
                name: room.name,
                dapPrice: room.dapPrice,
                radPrice: room.radPrice,
                extraService: room.extraServicesPrice,
            })),
        }))

    if (newhomes) {
        const resourceSet = await requestResourceSet('Pricing', false)
        const homesApiData = groupByState(newhomes)
        res.status(200).json({
            success: true,
            homes: homesApiData,
            resources: resourceSet,
        })
    } else {
        res.status(404).json({
            success: false,
            homes: JSON.parse('{"results":"no-results"}'),
            resources: [],
        })
    }
}

const homeName = (queryName: string | string[] | undefined): string | null => {
    return typeof queryName === 'string' ? queryName : null
}

const groupByState = (homesCollection: Array<Home> | undefined = []) => {
    const res: RoomPricingByState = []
    homesCollection.forEach(home => {
        const stateIndex = res.findIndex(state => state.state == home!.state)
        if (stateIndex >= 0) {
            res[stateIndex].homes!.push(home)
        } else {
            res.push({ state: home!.state, homes: [home] })
        }
    })
    return res
}

const isStateDefined = (value: CmsAgedCareHomeDetailsTemplate) =>
    isDefined(value.contactCard?.stateOrTerritory)

const areRoomsDefined = (value: CmsAgedCareHomeDetailsTemplate) =>
    isDefined(value.roomsCollection) && value.roomsCollection.items.length
