import { gql } from '@apollo/client'

const Fragment = gql`
    fragment fragmentSearchHomeHeroSection on SearchHomeHeroSection {
        __typename
        sys {
            id
        }
        anchorId
        heading
        headerStyle
        subheading
        searchCallToAction
        searchButtonText
        searchInputPlaceholder
        searchEndpoint
        image {
            __typename
            title
            description
            contentType
            fileName
            size
            url
            width
            height
        }
    }
`

export default Fragment
