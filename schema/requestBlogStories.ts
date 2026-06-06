import { gql } from '@apollo/client'

export const RequestBlogStories = gql`
    query ($tagName: [String]!, $start: Int!) {
        pageCollection(
            where: { tagName_contains_some: $tagName }
            limit: 6
            skip: $start
            order: sys_publishedAt_DESC
        ) {
            total
            items {
                title
                slug
                tagName
                metaDescription
                sys {
                    id
                }
                openGraphImage {
                    __typename
                    title
                    description
                    contentType
                    fileName
                    size
                    url
                    width
                    height
                }
            }
        }
    }
`
