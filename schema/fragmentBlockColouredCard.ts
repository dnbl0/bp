import { gql } from '@apollo/client'

const fragmentBlockCard = gql`
    fragment fragmentBlockColouredCard on ColouredCard {
        __typename
        sys {
            id
        }
        heading
        headingSize
        bodyRichText {
            json
        }
        body
        bodyPosition
        buttonText
        buttonHref
        backgroundColour
        icon {
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
        iconSize
    }
`

export default fragmentBlockCard
