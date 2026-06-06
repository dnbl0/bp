import { gql } from '@apollo/client'
import FragmentGrid3x3x3x3 from './fragmentGrid3x3x3x3'

export const RequestGrid3x3x3x3 = gql`
    query ($id: String!) {
        grid3X3X3X3(id: $id) {
            ...fragmentSection3x3x3x3
        }
    }

    ${FragmentGrid3x3x3x3}
`
