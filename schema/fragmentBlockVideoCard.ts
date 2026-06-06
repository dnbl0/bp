import { gql } from '@apollo/client'

const fragmentBlockVideoCard = gql`
    fragment fragmentBlockVideoCard on VideoCard {
        __typename
        sys {
            id
        }
        name
        placeholderImage {
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
        videoId
    }
`

export default fragmentBlockVideoCard
