import { gql } from '@apollo/client'
import FragmentGrid4x8 from './fragmentGrid4x8'

export const RequestGrid4x8 = gql`
    query ($id: String!) {
        grid4X8(id: $id) {
            ...fragmentSection4x8
        }
    }

    ${FragmentGrid4x8}
`
