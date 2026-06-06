import { gql } from '@apollo/client'

const fragmentBlockContactCard = gql`
    fragment fragmentBlockContactCard on ContactCard {
        __typename
        sys {
            id
        }
        heading
        heading2
        phoneNumber
        contactHours {
            json
        }
        street
        suburb
        stateOrTerritory
        postcode
        primaryCallToActionText
        primaryCallToActionHref
        primaryCallToActionColour
        secondaryCallToActionText
        secondaryCallToActionHref
        secondaryCallToActionDropdownColour
        secondaryCallToActionType
        tertiaryCallToActionText
        tertiaryCallToActionHref
        extraContactHeading
        extraContactPhoneNumber
        directionLinkText
        directionLinkHref
        calendlyBooking {
            dataUrl
        }
        calendlyBookingText
    }
`

export default fragmentBlockContactCard
