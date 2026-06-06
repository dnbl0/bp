import type { NextApiRequest, NextApiResponse } from 'next'
import { requestBlogStories } from '../../lib/requestBlogStories'
import { isDefined } from '../../utils/typeguards'
import { CmsPage } from '../../types/contentful-cms-types'

export type BlogData = {
    success: boolean
    blogs: CmsPage[]
    total: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<BlogData>
) {
    const query = req.query
    const tagName = getTagName(query.name)
    const start = getStartPoint(query.start)

    const blogs = await requestBlogStories(false, tagName, start)

    if (blogs) {
        res.status(200).json({
            success: true,
            blogs: blogs.items.filter(isDefined),
            total: blogs.total,
        })
    } else {
        res.status(404).json({
            success: false,
            blogs: JSON.parse('{"results":"no-results"}'),
            total: 0,
        })
    }
}

const getTagName = (queryName: string | string[] | undefined): string => {
    return typeof queryName === 'string' ? queryName : ''
}

const getStartPoint = (queryStart: string | string[] | undefined): number => {
    return !Number.isNaN(Number(queryStart)) ? Number(queryStart) : 0
}
