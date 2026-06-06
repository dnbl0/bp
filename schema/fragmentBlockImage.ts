import { gql } from '@apollo/client'

const fragmentBlockImage = gql`
    fragment fragmentBlockImage on ImageBlock {
        __typename
        image {
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
`

export default fragmentBlockImage
