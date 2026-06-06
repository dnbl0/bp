import { gql } from '@apollo/client'

const RequestPageById = gql`
    query ($id: String!) {
        page(id: $id) {
            __typename
            sys {
                id
            }
            title
            slug
            indexForSearching
            metaDescription
        }
    }
`

export default RequestPageById
