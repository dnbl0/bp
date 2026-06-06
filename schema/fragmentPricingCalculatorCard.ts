import { gql } from '@apollo/client'

const FragmentPricingCalculatorCard = gql`
    fragment fragmentPricingCalculatorCard on PricingCalculatorCard {
        __typename
        sys {
            id
        }
        id
        header
        backgroundColour
        customSubHeader
        showMoreBtnText
        showMoreText
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
    }
`

export default FragmentPricingCalculatorCard
