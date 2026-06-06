import { gql } from '@apollo/client'

const fragmentBlockImageCard = gql`
    fragment fragmentBlockImageCard on ImageCard {
        __typename
        sys {
            id
        }
        heading
        body
        buttonText
        buttonHref
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

export default fragmentBlockImageCard
