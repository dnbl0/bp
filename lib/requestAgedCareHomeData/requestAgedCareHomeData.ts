import { gql } from '@apollo/client'
import { CmsQuery } from '../../types/contentful-cms-types'
import {
    AgedCareHomeLocationTag,
    AgedCareHomeSummary,
    isStateOrRegionTag,
    isTag,
    Tag,
} from '../../types/homeSummary'
import { stripUndefined } from '../../utils/stripUndefined'
import { isDefined } from '../../utils/typeguards'
import { unqiueBy } from '../../utils/unique'
import { createClient } from '../contentfulGraphqlClient'

const request = gql`
    query {
        agedCareHomeDetailsTemplateCollection {
            items {
                sys {
                    id
                }
                contentfulMetadata {
                    tags {
                        id
                        name
                    }
                }
                location {
                    lat
                    lon
                }
                name
                shortDescription
                homeDisplayPage {
                    slug
                }
                galleryCollection(limit: 1) {
                    items {
                        title
                        description
                        url
                        width
                        height
                    }
                }
                contactCard {
                    phoneNumber
                    street
                    suburb
                    stateOrTerritory
                    postcode
                }
            }
        }
    }
`

export const requestAgedCareHomeData = async (showPreviewContent: boolean) => {
    const client = createClient(showPreviewContent)

    try {
        const { data, error } = await client.query<CmsQuery>({
            query: request,
            fetchPolicy: 'no-cache',
            // Ignore errors coming from draft as they trip up apollo
            errorPolicy: 'ignore',
        })

        if (error) {
            throw new Error('Error requesting location tags', error)
        }

        const agedCareHomeLocationTags = getLocationTags(data)
        const agedCareHomesSummary = getAgedCareHomesSummary(data)

        return { agedCareHomesSummary, agedCareHomeLocationTags }
    } catch (error) {
        console.error('requestPageData:', JSON.stringify(error, undefined, 2))
        throw error
    }
}

const getLocationTags = (data: CmsQuery): AgedCareHomeLocationTag[] => {
    const agedCareHomes =
        data.agedCareHomeDetailsTemplateCollection?.items.filter(isDefined) ||
        []

    const allLocationTags = agedCareHomes
        .flatMap(locationTag => locationTag.contentfulMetadata.tags)
        .filter(isDefined)
        .map(({ __typename, ...rest }) => rest)
        .filter(isTag) as Tag[]

    const uniqueTags = unqiueBy(allLocationTags, 'id')

    const stateOrRegionTags = uniqueTags.filter(isStateOrRegionTag)

    const withAgedCareHomes = stateOrRegionTags.map(tag => ({
        ...tag,
        homesInLocation: agedCareHomes
            .filter(home =>
                home.contentfulMetadata.tags
                    .map(tag => tag?.id)
                    .filter(isDefined)
                    .includes(tag.id)
            )
            .map(home => home.sys.id),
    }))

    return withAgedCareHomes
}

const getAgedCareHomesSummary = (data: CmsQuery): AgedCareHomeSummary[] => {
    const agedCareHomesRaw =
        data.agedCareHomeDetailsTemplateCollection?.items.filter(isDefined) ||
        []
    const agedCareHomes: AgedCareHomeSummary[] = agedCareHomesRaw.map(home => {
        const lat = home.location?.lat
        const lng = home.location?.lon // Rename from `lon` to `lng` for consistency with Google Map API naming convention.
        const location =
            isDefined(lat) && isDefined(lng) ? { lat, lng } : undefined

        const address: AgedCareHomeSummary['address'] = stripUndefined({
            street: home.contactCard?.street || undefined,
            suburb: home.contactCard?.suburb || undefined,
            stateOrTerritory: home.contactCard?.stateOrTerritory || undefined,
            postcode: home.contactCard?.postcode || undefined,
        })

        const hasAddress = Object.entries(address).length > 0

        return stripUndefined({
            id: home.sys.id,
            location,
            address: hasAddress ? address : undefined,
            name: home.name || undefined,
            phoneNumber: home.contactCard?.phoneNumber || undefined,
            shortDescription: home.shortDescription || undefined,
            slug: home.homeDisplayPage?.slug || undefined,
            image: home.galleryCollection?.items.shift() || undefined,
            tags: home.contentfulMetadata.tags
                .filter(isDefined)
                .filter(isTag) as Tag[],
        })
    })

    return agedCareHomes
}
