import { gql } from '@apollo/client'

const FragmentBlockPromotionCard = gql`
    fragment fragmentBlockPromotionCard on PromotionCard {
        __typename
        sys {
            id
        }
        heading
        body
        buttonText
        buttonHref
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
        iconPosition
    }
`

export default FragmentBlockPromotionCard
