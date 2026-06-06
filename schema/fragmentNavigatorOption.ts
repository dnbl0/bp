import { gql } from '@apollo/client'
import FragmentBlockPromotionCard from './fragmentBlockPromotionCard'
import FragmentBlockColoredCard from './fragmentBlockColouredCard'
import FragmentBlockCta from './fragmentBlockCta'

const fragmentNavigatorOption = gql`
    fragment fragmentNavigatorOption on NavigatorStep {
        __typename
        sys {
            id
        }
        name
        heading
        subHeading
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
        alternateHeading
        resultTitle
        modalOverrideContent {
          json          
        }
        modalOverrideCtasCollection(limit: 5) {
          items {
            ...fragmentBlockCta
          }
        }
        notice {
          ...fragmentBlockPromotionCard
        }
        resultContent {
          ...fragmentBlockColouredCard
        }
        resultsContentExcludeList
    }


    ${FragmentBlockPromotionCard}
    ${FragmentBlockColoredCard}
    ${FragmentBlockCta}
`

export default fragmentNavigatorOption
