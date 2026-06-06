import { gql } from '@apollo/client'

export const RequestBlogBlock = gql`
    query ($id: String!) {
        blogBlock(id: $id) {
            title
            tagName
            anchorId
        }
    }
`
