import { gql } from '@apollo/client'
import FragmentNavigatorOption from './fragmentNavigatorOption'

const fragmentNavigatorStep = gql`
    fragment fragmentNavigatorStep on AgedCareNavigatorStep {
        __typename
        sys {
            id
        }
        name
        heading
        description
        summaryImage {
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
        summaryTitle
        stepOptionsCollection(limit: 50) {
            items {
                ...fragmentNavigatorOption
            }
        }
    }

    ${FragmentNavigatorOption}
`

export default fragmentNavigatorStep