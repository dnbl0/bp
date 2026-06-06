import { invariant } from '@apollo/client/utilities/globals'
import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteContent } from '../../lib/algoliaIndexClient'

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
    if (req.method == 'DELETE' && canAccess) {
        const body = req.body
        const id = body.sys.id
        const type = body.sys.type

        if (type == 'DeletedAsset' || type == 'DeletedEntry') {
            const filter = `contentFulId:${id} OR contFulPageId:${id}`
            const deletedContent = await deleteContent(filter)
            res.status(200).json({
                success: true,
                message: `Successfully updated index. Deleted content: ${id}`,
            })
        } else {
            res.status(200).json({
                success: false,
                message: 'Not a valid content type',
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
