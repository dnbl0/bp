// There is a naming conflict where this component is used by another algolia component but loaded

import algoliasearch from 'algoliasearch'
import { invariant } from '@apollo/client/utilities/globals'

export type AlgoliaSearch = {
    url: string
    title: string
    content: string
    objectID: string
    contentType: string
    contentFulId: string
    contFulPageId: string
}

export const indexContent = async (searchItems: AlgoliaSearch[]) => {
    const { ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY, ALGOLIA_INDEX } = process.env

    invariant(ALGOLIA_APP_ID, 'app id not defined')
    invariant(ALGOLIA_ADMIN_KEY, 'admin key not defined')
    invariant(ALGOLIA_INDEX, 'index not defined')

    const algoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY)

    const algoliaIndex = algoliaClient.initIndex(ALGOLIA_INDEX)

    const indexedContent = await algoliaIndex.saveObjects(searchItems)

    return indexedContent
}

export const deleteContent = async (searchItems: string) => {
    const { ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY, ALGOLIA_INDEX } = process.env

    invariant(ALGOLIA_APP_ID, 'app id not defined')
    invariant(ALGOLIA_ADMIN_KEY, 'admin key not defined')
    invariant(ALGOLIA_INDEX, 'index not defined')

    const algoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY)

    const algoliaIndex = algoliaClient.initIndex(ALGOLIA_INDEX)

    const deletedContent = await algoliaIndex.deleteBy({ filters: searchItems })

    return deletedContent
}
