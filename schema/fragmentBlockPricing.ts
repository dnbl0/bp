import { gql } from '@apollo/client'
import FragmentGrid6x6 from './fragmentGrid6x6'
import FragmentGrid4x4x4 from './fragmentGrid4x4x4'

const fragmentBlockPricing = gql`
    fragment fragmentBlockPricing on PricingCard {
        __typename
        sys {
            id
        }
        anchorId
        careHome {
            name
        }
        pricingGrid {
            ...fragmentSection6x6
        }
        careCostGrid {
            ...fragmentSection4x4x4
        }
    }
    ${FragmentGrid6x6}
    ${FragmentGrid4x4x4}
`

export default fragmentBlockPricing
