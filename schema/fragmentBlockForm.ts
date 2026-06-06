import { gql } from '@apollo/client'

const fragmentBlockForm = gql`
    fragment fragmentBlockForm on FormBlock {
        __typename
        sys {
            id
        }
        formUrl
        formHeight
    }
`

export default fragmentBlockForm
