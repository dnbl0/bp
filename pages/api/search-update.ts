import { invariant } from '@apollo/client/utilities/globals'
import { createClient } from '../../lib/contentfulGraphqlClient'
import { requestPageById } from '../../lib/requestPageDataById'
import type { NextApiRequest, NextApiResponse } from 'next'
import { gql } from '@apollo/client'
import { lowerCaseFirstLetter } from '../../utils/lowerCaseFirstLetter'
import {
    indexContent,
    AlgoliaSearch,
    deleteContent,
} from '../../lib/algoliaIndexClient'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

interface Props {
    searchData: AlgoliaSearch
}

type entryCollectionItem = {
    __typename: string
    sys: {
        id: string
    }
}

type Data = {
    success: boolean
    message?: string
}

let useIds: string[] = []

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY } = process.env
    invariant(ALGOLIA_APP_ID, 'app id not defined')
    invariant(ALGOLIA_ADMIN_KEY, 'admin key not defined')

    const canAccess =
        ALGOLIA_APP_ID === req.headers['x-algolia-application-id'] &&
        ALGOLIA_ADMIN_KEY === req.headers['x-algolia-api-key']

    // Get data sent from hook
    if (req.method == 'PUT' && canAccess) {
        const body = req.body
        const id = body.sys.id
        const contentType = body.sys.contentType.sys.id
        const fieldsObj = body.fields

        const pageCheckType = body.sys.contentType
        const type = pageCheckType ? pageCheckType.sys.id : undefined
        if (type && type == 'page') {
            const pageData = await indexPageComponent(body)
            return res.status(200).json(pageData)
        }
        const pages = await getPagesByLinkedId(id, contentType, useIds)
        const uniquePages = await [...new Set(pages)]
        const algoliaPages = await getAlgoliaPages(uniquePages, fieldsObj, id)

        const indexedContent = await indexContent(algoliaPages)
        res.status(200).json({
            success: true,
            message: 'Successfully updated index',
        })
    } else {
        res.status(404).json({
            success: false,
            message: `Method: ${req.method}, Access: ${
                canAccess ? 'True' : 'False'
            }`,
        })
    }
}

const getAlgoliaPages = async (pages: string[], fieldsObj: any, objId: any) => {
    let algoliaPages: AlgoliaSearch[] = []
    for await (const pageId of pages) {
        const pageData = await requestPageById(pageId)
        if (pageData.indexForSearching) {
            algoliaPages = algoliaPages.concat(
                getContentText({
                    obj: fieldsObj,
                    url: pageData.slug,
                    title: pageData.title,
                    pageId: pageData.sys.id,
                    objectId: objId,
                })
            )
        }
    }
    return algoliaPages
}

function getContentText({
    obj,
    url,
    title,
    pageId,
    objectId,
}: {
    obj: any
    url: string
    title: string
    pageId: string
    objectId: string
}) {
    let res: AlgoliaSearch[] = []
    let prevKey: string | undefined = ''
    let currentObjectId: string = objectId
    function recurse(obj: { [x: string]: any }, current: string | undefined) {
        prevKey = current
        for (const key in obj) {
            let value = obj[key]
            if (key == 'id') {
                currentObjectId = value
            }
            if (value != undefined) {
                if (value && typeof value === 'object') {
                    if (key == 'en-US' && value.nodeType == 'document') {
                        res.push({
                            url: url,
                            title: title,
                            content: documentToPlainTextString(value),
                            objectID:
                                currentObjectId + '_' + pageId + '_' + prevKey,
                            contentType: key,
                            contentFulId: currentObjectId,
                            contFulPageId: pageId,
                        })
                    } else {
                        recurse(value, key)
                    }
                } else {
                    if (
                        (prevKey == 'value' && key == 'en-US') ||
                        // (prevKey == 'title' && key == 'en-US') ||
                        (prevKey == 'body' && key == 'en-US') ||
                        // (prevKey == 'heading' && key == 'en-US') ||
                        // (prevKey == 'subheading' && key == 'en-US') ||
                        (prevKey == 'text' && key == 'en-US')
                    ) {
                        res.push({
                            url: url,
                            title: title,
                            content: value,
                            objectID:
                                currentObjectId + '_' + pageId + '_' + prevKey,
                            contentType: prevKey,
                            contentFulId: currentObjectId,
                            contFulPageId: pageId,
                        })
                    }
                }
            }
            prevKey = key
        }
    }
    recurse(obj, undefined)
    return res
}

const getPagesByLinkedId = async (
    contentId: string,
    contentType: string,
    usedIds: string[]
) => {
    if (havePreviouslyUsedId(contentId, usedIds)) {
        return []
    } else {
        usedIds.push(contentId)
    }

    let pages: string[] = []
    const client = createClient(false)
    const myContentType = lowerCaseFirstLetter(contentType)
    const RequestContent = gql`
    query($id: String!) {
        ${myContentType}(id: $id) {
          __typename
          linkedFrom {
            entryCollection {
              __typename
              items {
                __typename
                sys {
                  id
                }
              }
            }
          }
        }
      }
    `
    try {
        const { data, error } = await client.query({
            query: RequestContent,
            variables: { id: contentId },
            fetchPolicy: 'no-cache',
            // Ignore errors coming from draft as they trip up apollo
            errorPolicy: 'ignore',
        })
        if (data[myContentType]) {
            for await (const element of data[myContentType].linkedFrom
                .entryCollection.items) {
                if (element.__typename == 'Page') {
                    pages.push(element.sys.id)
                } else {
                    const subPages = await getPagesByLinkedId(
                        element.sys.id,
                        element.__typename,
                        usedIds
                    )
                    if (subPages) {
                        pages = pages.concat(subPages)
                    }
                }
            }
        }
    } catch (error) {
        console.error(
            'requestArticleData:',
            JSON.stringify(error, undefined, 2)
        )
        throw error
    }
    return pages
}

const havePreviouslyUsedId = (id: string, usedIds?: string[]) => {
    return usedIds && usedIds.findIndex(el => el == id) >= 0
}

const indexPageComponent = async (body: any) => {
    const indexForSearching = body.fields.indexForSearching
        ? body.fields.indexForSearching['en-US']
        : false
    const id = body.sys.id
    if (!indexForSearching) {
        // Have a page update that may no longer be indexed so clear them
        const filter = `contFulPageId:${id}`
        const deletedContent = await deleteContent(filter)
        return {
            success: true,
            message: `Page and results were removed from index`,
        }
    } else {
        const pageData = await requestPageById(id)
        if (pageData) {
            const indexPage: AlgoliaSearch = {
                url: pageData.slug,
                title: pageData.title,
                content: pageData.metaDescription,
                objectID: id + '_' + id + '_' + 'page',
                contentType: 'page',
                contentFulId: id,
                contFulPageId: id,
            }
            const indexedContent = await indexContent([indexPage])
            return {
                success: indexedContent ? true : false,
                message: indexedContent
                    ? 'Page has been indexed'
                    : "Page couldn't be indexed",
            }
        }
    }
    return {
        success: false,
        message: `No page results indexed`,
    }
}
