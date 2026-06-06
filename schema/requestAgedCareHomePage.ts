import { gql } from '@apollo/client'
import FragmentAgedCareHomeDetailsTemplate from './fragmentAgedCareHomeDetailsTemplate'

export const RequestAgedCareHomePage = gql`
    ${FragmentAgedCareHomeDetailsTemplate}

    query ($slug: String, $preview: Boolean!) {
        pageCollection(limit: 1, where: { slug: $slug }, preview: $preview) {
            items {
                template {
                    ...agedCareHomeDetailsTemplate
                }
            }
        }
    }
`
