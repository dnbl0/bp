import { gql } from '@apollo/client'

const fragmentBlogBlock = gql`
    fragment fragmentBlogBlock on BlogBlock {
        __typename
        sys {
            id
        }
        title
        tagName
        anchorId
    }
`

export default fragmentBlogBlock
