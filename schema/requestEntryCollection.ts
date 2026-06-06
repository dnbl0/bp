import { gql } from '@apollo/client'

export const RequestEntryCollection = gql`
query($id: String!) {
    entryCollection(limit:1, where: {sys: {id: $id}}, preview: true ) {
      __typename
      items {
        __typename
        sys {
          id
        }
      }
    }
}
`
