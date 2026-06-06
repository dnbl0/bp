import { gql } from '@apollo/client'

export const RequestTwoColumnSection = gql`
    query ($id: String!, $preview: Boolean!) {
        twoColumnSection(id: $id, preview: $preview) {
            ...fragmentTwoColumnSection
        }
    }

    fragment fragmentTwoColumnSection on TwoColumnSection {
        sys {
            id
        }
        __typename
        anchorId
        layout
        smallScreenStackDirection
        backgroundColour
    }
`
