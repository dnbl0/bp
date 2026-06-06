import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useGlobalPageData } from '../../../../hooks/useGlobalPageData'
import { CmsAgedCareHomeMap } from '../../../../types/contentful-cms-types'
import { firstValue } from '../../../../utils/firstValue'
import { addTagManagerEvent } from '../../../../utils/tagManager'
import { ScrollTargetAnchor } from '../../sections/NavigationBar/ScrollTargetAnchor'
import {
    LocationSearchType,
    SEARCH_STRING_FIELD_NAME,
    SEARCH_TYPE_FIELD_NAME,
} from '../../sections/SearchHomeHeroSection/constants'
import { ButtonRow } from './ButtonRow'
import { ListPanelContent } from './ListPanelContent'
import MapPanelContent from './MapPanelContent'
import { TabControl } from './TabControl'
import { LocationFocus, VictoriaMapPoint } from './types'
import { UnknownLocationBanner } from './Banners'
import {
    useInitialMapPosition,
    useListReferencePosition,
} from './useRefencePosition'

export const AgedCareHomeMapBlock = ({}: { component: CmsAgedCareHomeMap }) => {
    const router = useRouter()

    const searchType = firstValue(router.query[SEARCH_TYPE_FIELD_NAME])
    const searchString = firstValue(router.query[SEARCH_STRING_FIELD_NAME])

    const initialPanelIndex = 0

    const focusFirstMapItem =
        searchType === LocationSearchType.geolocate ||
        searchType === LocationSearchType.place

    const [panelIndex, setPanelIndex] = useState<number>(initialPanelIndex || 0)

    const [locationFocus, setLocationFocus] = useState<LocationFocus>(() =>
        getInitialLocationFocus(searchType)
    )

    const { agedCareHomeLocationTags, agedCareHomesSummary } =
        useGlobalPageData()

    const { buttonCaptions, sortedTags } = useMemo(() => {
        const sortedTags = (agedCareHomeLocationTags || [])
            .filter(tag => tag.name.startsWith('State:'))
            .sort((a, b) => b.homesInLocation.length - a.homesInLocation.length)

        const buttonCaptions = sortedTags.map(tag => {
            const caption = tag.name.split(' ')[1]
            const count = tag.homesInLocation.length
            return `${caption} (${count})`
        })

        return { sortedTags, buttonCaptions }
    }, [agedCareHomeLocationTags])

    const [selectButtonIndex, setSelectButtonIndex] = useState(
        getInitialButtonIndex(searchString, buttonCaptions)
    )

    const selectedState: string | undefined = sortedTags[selectButtonIndex]?.id

    const initialMapPosition = useInitialMapPosition(
        panelIndex === 1,
        locationFocus,
        searchString,
        selectedState
    )

    const listReferencePosition = useListReferencePosition(
        panelIndex === 0,
        locationFocus,
        searchString
    )

    useEffect(() => {
        if (locationFocus != LocationFocus.state) {
            if (initialMapPosition?.description) {
                setSelectButtonIndex(
                    getInitialButtonIndex(
                        initialMapPosition?.description,
                        buttonCaptions
                    )
                )
            } else {
                setSelectButtonIndex(1)
            }
        }
    }, [buttonCaptions, initialMapPosition, locationFocus])

    useEffect(() => {
        if (locationFocus != LocationFocus.state) {
            if (listReferencePosition?.description) {
                setSelectButtonIndex(
                    getInitialButtonIndex(
                        listReferencePosition?.description,
                        buttonCaptions
                    )
                )
            } else {
                setSelectButtonIndex(1)
            }
        }
    }, [buttonCaptions, listReferencePosition, locationFocus])

    if (!agedCareHomeLocationTags) return null
    if (!agedCareHomesSummary) return null

    return (
        <div>
            {buttonCaptions.length > 0 && (
                <ButtonRow
                    captions={buttonCaptions}
                    selected={selectButtonIndex}
                    onSelect={(index: number) => {
                        addTagManagerEvent('search', {
                            search_location:
                                buttonCaptions[index].split(' ')[0],
                        })
                        setSelectButtonIndex(index)
                        setLocationFocus(LocationFocus.state)
                    }}
                />
            )}
            <ScrollTargetAnchor anchorId="aged-care-home-map" />
            <TabControl
                tabIndex={panelIndex}
                onChange={(index, label) => {
                    setPanelIndex(index)
                    addTagManagerEvent('search', {
                        search_mode: label,
                    })
                }}
            >
                <ListPanelContent
                    mapPosition={listReferencePosition}
                    stateOrRegionId={selectedState}
                    agedCareHomesSummary={agedCareHomesSummary}
                />
                {initialMapPosition ? (
                    <MapPanelContent
                        key={`${selectedState}-${locationFocus}`}
                        focusFirstItem={focusFirstMapItem}
                        initialMapPosition={initialMapPosition}
                        agedCareHomesSummary={agedCareHomesSummary}
                        locationFocus={locationFocus}
                        showMessaging={true}
                    />
                ) : (
                    // Try to minimise layout shift.
                    <>
                        <UnknownLocationBanner />
                        <MapPanelContent
                            key={`${selectedState}-${locationFocus}`}
                            focusFirstItem={focusFirstMapItem}
                            initialMapPosition={VictoriaMapPoint}
                            agedCareHomesSummary={agedCareHomesSummary}
                            locationFocus={LocationFocus.state}
                            showMessaging={false}
                        />
                    </>
                )}
            </TabControl>
        </div>
    )
}

const getInitialLocationFocus = (
    searchType: string | undefined
): LocationFocus => {
    if (searchType === LocationSearchType.geolocate) {
        return LocationFocus.geolocate
    } else if (searchType === LocationSearchType.place) {
        return LocationFocus.search
    } else {
        return LocationFocus.state
    }
}

const getInitialButtonIndex = (
    searchString: string | undefined,
    buttonCaptions: string[]
) => {
    if (!searchString) return 0
    const state = / (ACT|NSW|NT|QLD|SA|TAS|VIC|WA)(,| )/.exec(searchString)?.[1]
    if (!state) return 0
    const index = buttonCaptions.findIndex(caption => caption.startsWith(state))
    const initialIndex = index >= 0 ? index : 0
    return initialIndex
}
