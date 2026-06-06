import { gql } from '@apollo/client'
import fragmentSingleColumnTemplate from './fragmentSingleColumnTemplate'

const requestSingleColumnTemplateById = gql`
    query($id: String!, $preview: Boolean!) {
        singleColumnTemplate(id: $id, preview: $preview) {
            ...singleColumnTemplate
        }
    }

    ${fragmentSingleColumnTemplate}
`

export default requestSingleColumnTemplateById