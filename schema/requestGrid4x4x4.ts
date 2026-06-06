import { gql } from '@apollo/client'
import FragmentGrid4x4x4 from './fragmentGrid4x4x4'

export const RequestGrid4x4x4 = gql`
    query ($id: String!) {
        grid4X4X4(id: $id) {
            ...fragmentSection4x4x4
        }
    }

    ${FragmentGrid4x4x4}
`
