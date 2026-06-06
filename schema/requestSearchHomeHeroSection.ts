import { gql } from '@apollo/client'
import FragmentSearchHomeHeroSection from './fragmentSearchHomeHeroSection'

export const RequestSearchHomeHeroSection = gql`
    query ($id: String!) {
        searchHomeHeroSection(id: $id) {
            ...fragmentSearchHomeHeroSection
        }
    }

    ${FragmentSearchHomeHeroSection}
`
