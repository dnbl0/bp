import { gql } from '@apollo/client'

const fragmentBlockCard = gql`
    fragment fragmentBlockCard on Card {
        __typename
        sys {
            id
        }
        heading
        content {
            json
        }
    }
`

export default fragmentBlockCard
