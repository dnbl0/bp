import { gql } from '@apollo/client'
import FragmentBlockPromotionCard from './fragmentBlockPromotionCard'
import FragmentNavigatorStep from './fragmentNavigatorStep'
import FragmentNavigatorResult from './fragmentNavigatorResult'

export const RequestAgedCareNavigator = gql`
    query ($id: String!) {
        agedCareNavigator(id: $id) {
            navigatorHeading
            menuItemsToHide
            navigatorHeadingButtonUrl
            navigatorHeadingButtonText
            navigatorHeadingButtonIcon {
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
            introductionImage {
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
            introductionContent {
                json
            }
            introductionDisclaimer
            introductionHighlight {
                ...fragmentBlockPromotionCard
            }
            introductionLeftButton
            navigatorStepsCollection(limit: 10) {
                items {
                    ...fragmentNavigatorStep
                }
            }
            navigatorResultsCollection(limit: 50) {
                items {
                   ...fragmentNavigatorResult
                }
            }
        }
    }

    ${FragmentBlockPromotionCard}
    ${FragmentNavigatorStep}
    ${FragmentNavigatorResult}

`
            