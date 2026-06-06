import { gql } from '@apollo/client'
import FragmentContactHeroSection from './fragmentContactHeroSection'

export const RequestContactHeroSection = gql`
    query ($id: String!) {
        contactHeroSection(id: $id) {
            ...fragmentContactHeroSection
        }
    }

    ${FragmentContactHeroSection}
`
