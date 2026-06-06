import { gql } from '@apollo/client'

export const RequestAgedCareHomeRooms = gql`
    query ($name: String) {
        agedCareHomeDetailsTemplateCollection(
            order: name_ASC
            where: { name: $name }
        ) {
            items {
                name
                contactCard {
                    stateOrTerritory
                }
                additionalServices {
                    json
                }
                specialServicePackages {
                    json
                }
                roomsCollection {
                    items {
                        sys {
                            id
                        }
                        name
                        dapPrice
                        radPrice
                        extraServicesPrice
                    }
                }
            }
        }
    }
`
