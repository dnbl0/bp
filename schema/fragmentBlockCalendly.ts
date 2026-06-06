import { gql } from '@apollo/client'

const fragmentBlockCalendly = gql`
    fragment fragmentBlockCalendly on CalendlyBlock {
        __typename
        sys {
            id
        }
        dataUrl
        height
    }
`

export default fragmentBlockCalendly
