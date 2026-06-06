import { gql } from '@apollo/client'
import fragmentSingleColumnTemplate from './fragmentSingleColumnTemplate'

export const RequestSingleColumnPage = gql`
    query ($slug: String, $preview: Boolean!) {
        pageCollection(limit: 1, where: { slug: $slug }, preview: $preview) {
            items {
                template {
                    ...singleColumnTemplate
                }
            }
        }
    }

    ${fragmentSingleColumnTemplate}
`
