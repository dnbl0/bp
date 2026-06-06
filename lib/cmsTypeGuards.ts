import {
    CmsAgedCareHomeDetailsTemplate,
    CmsSingleColumnTemplate,
} from '../types/contentful-cms-types'
import { isRecord } from '../utils/typeguards'

export const isUndefinedOrNull = (
    value: unknown
): value is undefined | null => {
    return value === undefined || value === null
}

export const isCmsSingleColumnTemplate = (
    value: unknown
): value is CmsSingleColumnTemplate => {
    return isRecord(value) && value['__typename'] === 'SingleColumnTemplate'
}

export const isCmsAgedCareHomeDetailsTemplate = (
    value: unknown
): value is CmsAgedCareHomeDetailsTemplate => {
    return (
        isRecord(value) && value['__typename'] === 'AgedCareHomeDetailsTemplate'
    )
}
