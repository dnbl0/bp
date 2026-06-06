import { gql } from '@apollo/client'
import FragmentBlockContactCard from './fragmentBlockContactCard'

const Fragment = gql`
    fragment fragmentContactHeroSection on ContactHeroSection {
        anchorId
        heading
        headerStyle
        sys {
            id
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
        contactCard {
            ...fragmentBlockContactCard
        }
    }
    ${FragmentBlockContactCard}
`

export default Fragment
