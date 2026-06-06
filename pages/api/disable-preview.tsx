// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { firstValue } from '../../utils/firstValue'

type Data = {}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // Read about how the Next.js preview mode works here:
    // https://nextjs.org/docs/advanced-features/preview-mode
    res.clearPreviewData()

    const redirectTarget = firstValue(req.query['redirect'])
    if (redirectTarget) {
        res.redirect(redirectTarget)
    } else {
        res.redirect('/')
    }
}
