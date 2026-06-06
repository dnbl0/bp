import { gql } from '@apollo/client'

const fragmentBlockCta = gql`
    fragment fragmentBlockCta on CtaBlock {
        __typename
        sys {
            id
        }
        text
        href
        size
        variant
        iconVariant
        alignment
    }
`

export default fragmentBlockCta
