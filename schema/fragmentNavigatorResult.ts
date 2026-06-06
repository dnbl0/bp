import { gql } from '@apollo/client'
import FragmentBlockPromotionCard from './fragmentBlockPromotionCard'
import FragmentBlockColoredCard from './fragmentBlockColouredCard'

const fragmentNavigatorStep = gql`
    fragment fragmentNavigatorResult on NavigatorResult {
        __typename
        sys {
            id
        }
        name
        bannerTitle
        bannerPrimaryCtaText
        bannerPrimaryCtaUrl
        bannerSecondaryCtaText
        bannerSecondaryCtaUrl
        heading
        description
        resultsContentCollection(limit: 50) {
            items {
                ...fragmentBlockColouredCard
            }
        }
        resultNotice {
            ...fragmentBlockPromotionCard
        }
        
    }

    ${FragmentBlockPromotionCard}
    ${FragmentBlockColoredCard}
`

export default fragmentNavigatorStep