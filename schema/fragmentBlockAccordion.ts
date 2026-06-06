import { gql } from '@apollo/client'

const fragmentBlockAccordion = gql`
    fragment fragmentBlockAccordion on AccordionBlock {
        __typename
        sys {
            id
        }
        anchorId
        itemsCollection(limit: 10) {
            items {
                heading
                body {
                    json
                }
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
        }
    }
`

export default fragmentBlockAccordion
