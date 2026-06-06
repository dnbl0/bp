import FragmentSearchHomeHeroSection from './fragmentSearchHomeHeroSection'
import { gql } from '@apollo/client'

export const RequestBrowseByRegion = gql`
    query ($name: String!) {
        searchHomeHeroSectionCollection(limit: 1, where: { name: $name }) {
            items {
                ...fragmentSearchHomeHeroSection
                contentfulMetadata {
                    tags {
                        id
                        name
                    }
                }
            }
        }
    }

    ${FragmentSearchHomeHeroSection}
`
