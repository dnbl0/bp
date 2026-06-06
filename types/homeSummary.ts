import { isDefined, isRecord } from '../utils/typeguards'
import { CmsAsset } from './contentful-cms-types'

export type Tag = {
    id: string
    name: string
}

export const isTag = <T>(value: unknown): value is Tag => {
    return isRecord(value) && isDefined(value['id']) && isDefined(value['name'])
}

export const isStateOrRegionTag = (tag: { name: string }): boolean => {
    return tag.name.startsWith('State:') || tag.name.startsWith('Region:')
}

export interface AgedCareHomeSummary {
    id: string
    name?: string
    shortDescription?: string
    location?: {
        lat: number
        lng: number
    }
    slug?: string
    image?: CmsAsset
    tags?: Tag[]
    phoneNumber?: string
    address?: {
        street?: string
        suburb?: string
        stateOrTerritory?: string
        postcode?: string
    }
    distanceFromUserKM?: number // Distance from user in km.
}

export interface AgedCareHomeLocationTag {
    id: string
    name: string
    homesInLocation: string[]
}

export const findHomesInRegion = (
    agedCareHomesSummary: AgedCareHomeSummary[],
    stateOrRegionId: string
) => {
    return agedCareHomesSummary.filter(
        home => home.tags?.findIndex(tag => tag.id === stateOrRegionId) !== -1
    )
}
