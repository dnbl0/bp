import { invariant } from '@apollo/client/utilities/globals'
import type { NextApiRequest, NextApiResponse } from 'next'
import { indexContent, AlgoliaSearch } from '../../lib/algoliaIndexClient'

type Data = {
    success: boolean
    message?: string
}

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
    if (req.method == 'POST' && canAccess) {
        const body = req.body
        const id = body.sys.id
        const type = body.sys.type
        const fields = body.fields
        if (
            type == 'Asset' &&
            fields &&
            fields.file['en-US'].contentType == 'application/pdf'
        ) {
            const indexedDoc: AlgoliaSearch = {
                url: 'https:' + fields.file['en-US'].url,
                title: fields.title['en-US'],
                content: fields.description['en-US'],
                objectID: id,
                contentType: type,
                contentFulId: id,
                contFulPageId: id,
            }
            const indexedContent = await indexContent([indexedDoc])
            res.status(200).json({
                success: true,
                message: `Successfully updated index. Added content:${indexedDoc}`,
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'Not a valid file',
            })
        }
    } else {
        res.status(404).json({
            success: false,
            message: `Method: ${req.method}, Access: ${
                canAccess ? 'True' : 'False'
            }`,
        })
    }
}
