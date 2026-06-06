import { gql } from '@apollo/client'
import FragmentSectionNavigationBar from './fragmentSectionNavigationBar'

export const RequestNavigationBarSection = gql`
    ${FragmentSectionNavigationBar}

    query ($id: String!) {
        navigationBar(id: $id) {
            ...fragmentSectionNavigationBar
        }
    }
`
