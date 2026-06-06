import { gql } from '@apollo/client'
import FragmentGrid12 from './fragmentGrid12'

export const RequestGrid12 = gql`
    query ($id: String!) {
        grid12(id: $id) {
            ...fragmentSection12
        }
    }

    ${FragmentGrid12}
`
