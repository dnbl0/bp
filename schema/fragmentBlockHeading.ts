import { gql } from '@apollo/client'

const fragmentBlockHeading = gql`
    fragment fragmentBlockHeading on HeadingBlock {
        sys {
            id
        }
        text
        fontSize
        fontWeight        
        anchorId 
        addTopMargin
    }
`

export default fragmentBlockHeading
