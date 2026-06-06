import { gql } from '@apollo/client'

export const RequestBasicHeroSection = gql`
    query ($id: String!, $preview: Boolean!) {
        basicHeroSection(id: $id, preview: $preview) {
            __typename
            sys {
                id
            }
            heading
            headerStyle
            subheading
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
            buttonText
            buttonHref
            linkOpenNewTab
        }
    }
`
