import { gql } from '@apollo/client'

export const RequestListingRegionDetailsSection = gql`
    query ($id: String!, $preview: Boolean!) {
        regionListDetailsSection(id: $id, preview: $preview) {
            __typename
            sys {
                id
            }
            name
            ageCareHomesCollection {
                __typename
                items {
                    __typename
                    sys {
                        id
                    }
                    contentfulMetadata {
                        tags {
                            id
                            name
                        }
                    }
                    name
                    homeDisplayPage {
                        slug
                    }
                    galleryCollection(limit: 1) {
                        items {
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
                }
            }
        }
    }
`
