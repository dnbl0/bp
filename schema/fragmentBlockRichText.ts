import { gql } from '@apollo/client'

const FragmentBlockRichText = gql`
    fragment fragmentBlockRichText on RichTextBlock {
        __typename
        sys {
            id
        }
        bodyRichText {
            json
        }
    }
`

export default FragmentBlockRichText
