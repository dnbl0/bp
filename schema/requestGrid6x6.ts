import { gql } from '@apollo/client'
import FragmentGrid6x6 from './fragmentGrid6x6'

export const RequestGrid6x6 = gql`
    query ($id: String!) {
        grid6X6(id: $id) {
            ...fragmentSection6x6
        }
    }

    ${FragmentGrid6x6}
`
