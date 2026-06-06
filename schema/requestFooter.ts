import { gql } from '@apollo/client'

const RequestFooter = gql`
    query {
        footerCollection(limit: 1, where: { name: "Footer" }) {
            items {
                aboutText
                facebookLink
                twitterLink
                instagramLink
                youTubeLink
                linkedInLink
                tagLine
                copyRightNotice
                finePrintLinksCollection(limit: 8) {
                    items {
                        sys {
                            id
                        }
                        caption
                        href
                        openInNewTab
                    }
                }
                menuSection1 {
                    ...menuSectionFields
                }
                menuSection2 {
                    ...menuSectionFields
                }
                menuSection3 {
                    ...menuSectionFields
                }
                menuSection4 {
                    ...menuSectionFields
                }
                menuSection5 {
                    ...menuSectionFields
                }
                menuSection6 {
                    ...menuSectionFields
                }
                menuSection7 {
                    ...menuSectionFields
                }
                menuSection8 {
                    ...menuSectionFields
                }
            }
        }
    }

    fragment menuSectionFields on NavigationElement {
        sys {
            id
        }
        caption
        href
        openInNewTab
        itemsCollection(limit: 15) {
            items {
                sys {
                    id
                }
                caption
                href
                openInNewTab
            }
        }
    }
`

export default RequestFooter
