import { gql } from '@apollo/client'
import FragmentThreeColumnSearchHomeHeroSection from './fragmentThreeColumnSeachHomeSection'

export const RequestThreeColumnSearchHomeHeroSection = gql`
    query ($id: String!) {
        threeColumnSearchHomeHeroSection(id: $id) {
            ...fragmentThreeColumnSearchHomeHeroSection
        }
    }

    ${FragmentThreeColumnSearchHomeHeroSection}
`
