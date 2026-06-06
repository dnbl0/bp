import { gql } from '@apollo/client'
import FragmentBlockCta from './fragmentBlockCta'

const Fragment = gql`
    fragment fragmentThreeColumnSearchHomeHeroSection on ThreeColumnSearchHomeHeroSection {
        __typename
        sys {
            id
        }
        anchorId
        heading
        headerStyle
        subheading
        searchIcon {
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
        searchHeading
        searchContent
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
        middleContent
        middleCta {
            ...fragmentBlockCta
        }
        middleHeading
        middleIcon {
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
        rightContent
        rightCta {
            ...fragmentBlockCta
        }
        rightHeading
        rightIcon {
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

    ${FragmentBlockCta}
`

export default Fragment



