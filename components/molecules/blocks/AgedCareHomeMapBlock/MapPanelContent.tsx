import GoogleMapReact from 'google-maps-react-markers'
import { useEffect, useRef, useState } from 'react'
import { AgedCareHomeSummary } from '../../../../types/homeSummary'
import { cx } from '../../../../utils/cx'
import { getDistanceBetweenPointsAlt } from '../../../../utils/getDistanceBetweenPoints'
import { isDefined } from '../../../../utils/typeguards'
import { ChevronRightIcon } from '../../../atoms/icons/ChevronRightIcon'
import { useGoogleCloudApiKey } from './googleCloudApiKey'
import { ContactCardLocationMarker } from './icons/ContactCardLocationMarker'
import { InfoPanelCloseIcon } from './icons/InfoPanelCloseIcon'
import { MapMarkerIconLarge } from './icons/MapMarkerIcon'
import { PhoneIcon } from './icons/PhoneIcon'
import { ClusterIcon } from './icons/ClusterIcon'
import { LocationBanner } from './Banners'
import { AustraliaMapPoint, LocationFocus, MapPoint } from './types'
import Supercluster, {
    AnyProps,
    ClusterProperties,
    PointFeature,
} from 'supercluster'
import useSupercluster from 'use-supercluster'
import dynamic from 'next/dynamic'

export type MapPanelContentType = {
    focusFirstItem: boolean
    initialMapPosition: MapPoint | undefined
    agedCareHomesSummary: AgedCareHomeSummary[]
    showMessaging: boolean
    locationFocus: LocationFocus
}

const MapPanelContent = (mapPanelContentType: MapPanelContentType) => {
    const {
        focusFirstItem,
        initialMapPosition,
        agedCareHomesSummary,
        showMessaging,
        locationFocus,
    } = mapPanelContentType
    const mapRef = useRef<any>(null)
    const [mapReady, setMapReady] = useState(false)
    const [bounds, setBounds] = useState<
        | [number, number, number, number]
        | [number, number, number, number, number, number]
    >()
    const [clusterZoom, setClusterZoom] = useState(10)
    const [points, setPoints] = useState<any[]>([])

    const mapAdjustForInfo: number = 0.04

    const onGoogleApiLoaded = ({ map, maps }: any) => {
        mapRef.current = map
        if (window.innerWidth <= 768 && locationFocus == 'state') {
            map.setZoom(map.zoom - 1)
        }
        setMapReady(true)
    }

    const agedCareHomesSortedByDistance = agedCareHomesSummary
        .map(home => updateHomeWithDistance(home, initialMapPosition))
        .filter(h => h.distanceFromUserKM)
        .sort(sortFunc)

    const initialSelectedHome =
        focusFirstItem &&
        initialMapPosition?.description &&
        initialMapPosition?.description.length > 3
            ? agedCareHomesSortedByDistance[0]
            : undefined

    const [selectedHome, setSelectedHome] = useState<
        AgedCareHomeSummary | undefined
    >(initialSelectedHome)

    const googleCloudApiKey = useGoogleCloudApiKey()

    const homeLat = initialSelectedHome && initialSelectedHome.location?.lat
    const homeLng = initialSelectedHome && initialSelectedHome.location?.lng

    const { zoom, lat, lng } =
        focusFirstItem &&
        isDefined(homeLat) &&
        isDefined(homeLng) &&
        locationFocus !== 'state'
            ? {
                  zoom: 12,
                  lat: homeLat + mapAdjustForInfo, // Add this so that info box isn't chopped off on mobile
                  lng: homeLng,
              }
            : {
                  ...AustraliaMapPoint,
                  ...initialMapPosition,
              }

    type MarkerPropsType = {
        homeId: string
        lat: number
        lng: number
    }

    const handleMarkerClick = (
        event: MouseEvent,
        { homeId, lat, lng }: MarkerPropsType
    ) => {
        if (homeId) {
            const nextHome =
                homeId !== selectedHome?.id
                    ? agedCareHomesSummary.find(home => home.id === homeId)
                    : undefined
            setSelectedHome(nextHome)
            event.preventDefault()
            event.stopPropagation()
            if (mapReady) {
                const adjustedLat = lat + mapAdjustForInfo
                mapRef.current!.setZoom(12)
                mapRef.current!.panTo({
                    lat: adjustedLat,
                    lng,
                })
            }
        }
    }

    type ClusterPropsType = {
        cluster:
            | PointFeature<AnyProps>
            | PointFeature<ClusterProperties & AnyProps>
        lat: number
        lng: number
    }

    const handleClusterClick = (
        event: MouseEvent,
        { cluster, lat, lng }: ClusterPropsType
    ) => {
        if (cluster && supercluster) {
            const expansionZoom = Math.min(
                supercluster.getClusterExpansionZoom(
                    cluster.id ? Number(cluster.id) : 0
                ),
                20
            )
            mapRef.current.setZoom(expansionZoom)
            mapRef.current.panTo({
                lat: lat,
                lng: lng,
            })
        }
    }

    useEffect(() => {
        if (agedCareHomesSummary !== undefined)
            setPoints(
                agedCareHomesSummary.map(home => {
                    if (home.location?.lng && home.location?.lat) {
                        return {
                            type: 'Feature',
                            properties: { cluster: false, key: home.id },
                            geometry: {
                                type: 'Point',
                                coordinates: [
                                    parseFloat(home.location?.lng.toString()),
                                    parseFloat(home.location?.lat.toString()),
                                ],
                            },
                        }
                    }
                })
            )
    }, [agedCareHomesSummary])

    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom: clusterZoom,
        options: { radius: 100, maxZoom: 20 },
    })

    const onMapChange = ({ bounds, zoom }: { bounds: any; zoom: any }) => {
        const ne = bounds.getNorthEast()
        const sw = bounds.getSouthWest()
        setBounds([sw.lng(), sw.lat(), ne.lng(), ne.lat()])
        setClusterZoom(zoom)
    }

    return (
        <div>
            {initialMapPosition && showMessaging && (
                <LocationBanner
                    searchPoint={initialMapPosition}
                    selectedHome={initialSelectedHome}
                    locationFocus={locationFocus}
                />
            )}
            <div className="aspect-[4/4] md:h-screen md:w-full md:aspect-auto bg-black">
                {initialMapPosition && (
                    <GoogleMapReact
                        apiKey={googleCloudApiKey}
                        defaultCenter={{ lat, lng }}
                        defaultZoom={zoom}
                        onGoogleApiLoaded={onGoogleApiLoaded}
                        onChange={onMapChange}
                    >
                        {clusters.map(cluster => {
                            const [longitude, latitude] =
                                cluster.geometry.coordinates
                            const {
                                cluster: isCluster,
                                point_count: pointCount,
                            } = cluster.properties
                            if (isCluster) {
                                return (
                                    <ClusterMarker
                                        cluster={cluster}
                                        lat={latitude}
                                        lng={longitude}
                                        pointCount={pointCount}
                                        key={cluster.id}
                                        onClick={handleClusterClick}
                                    />
                                )
                            }
                            const homeLat = latitude
                            const homeLng = longitude
                            const homeId = cluster.properties.key
                            if (!homeLat || !homeLng) return null
                            return (
                                <Marker
                                    key={homeId}
                                    lat={homeLat}
                                    lng={homeLng}
                                    homeId={homeId}
                                    focused={homeId === selectedHome?.id}
                                    onClick={handleMarkerClick}
                                />
                            )
                        })}
                        {selectedHome && (
                            <InfoWindow
                                lat={selectedHome.location!.lat}
                                lng={selectedHome.location!.lng}
                                home={selectedHome}
                                onClose={() => setSelectedHome(undefined)}
                            />
                        )}
                    </GoogleMapReact>
                )}
            </div>
        </div>
    )
}

export default dynamic(() => Promise.resolve(MapPanelContent), {
    ssr: false,
})

const Marker = ({
    lat,
    lng,
    homeId,
    focused,
    onClick,
}: {
    lat: number
    lng: number
    homeId: string
    focused?: boolean
    onClick?: any
}) => {
    return (
        <div
            data-marker-home-id={homeId}
            className={cx(
                '-translate-x-[50%] -translate-y-[100%]', // Important to ensure marker points to correct position on map.
                'cursor-pointer ',
                'hover:fill-[#C31162]',
                focused ? 'fill-[#C31162]' : 'fill-cyan'
            )}
            onClick={event =>
                onClick ? onClick(event, { homeId, lat, lng }) : null
            }
            onDoubleClick={event =>
                onClick ? onClick(event, { homeId, lat, lng }) : null
            }
        >
            <div className="pointer-events-none">
                <MapMarkerIconLarge />
            </div>
        </div>
    )
}

const ClusterMarker = ({
    lat,
    lng,
    cluster,
    onClick,
    pointCount,
}: {
    lat: number
    lng: number
    cluster: PointFeature<AnyProps> | PointFeature<ClusterProperties & AnyProps>
    onClick?: any
    pointCount: string
}) => {
    return (
        <div
            data-marker-home-id={`cluster-${cluster.id}`}
            className={cx(
                '-translate-x-[50%] -translate-y-[100%]', // Important to ensure marker points to correct position on map.
                'cursor-pointer ',
                'hover:fill-[#C31162]',
                'text-white fill-cyan'
            )}
            onClick={event =>
                onClick ? onClick(event, { cluster, lat, lng }) : null
            }
            onDoubleClick={event =>
                onClick ? onClick(event, { cluster, lat, lng }) : null
            }
        >
            <div className=" items-center flex justify-center">
                <ClusterIcon className="absolute" />
                <span className="z-fixed text-xl font-semibold">
                    {pointCount}
                </span>
            </div>
        </div>
    )
}

const InfoWindow = ({
    home,
    onClose,
}: {
    lat: number
    lng: number
    home: AgedCareHomeSummary
    onClose: () => void
}) => {
    return (
        <div className="relative">
            <div
                className={cx(
                    'w-[220px] bg-white absolute',
                    '-translate-x-[50%] -translate-y-[calc(100%+60px)]'
                )}
            >
                <div className="relative text-body">
                    <div className={cx('p-4 flex flex-col gap-4')}>
                        {home.name && (
                            <div className="text-heading-s text-navy font-medium">
                                {home.name}
                            </div>
                        )}
                        {home.phoneNumber && (
                            <div className="flex flex-row gap-4 items-center">
                                <div>
                                    <PhoneIcon />
                                </div>
                                <div>
                                    <a
                                        href={`tel:${home.phoneNumber}`}
                                        className="text-cyan"
                                    >
                                        {home.phoneNumber}
                                    </a>
                                </div>
                            </div>
                        )}
                        {home.address && (
                            <div className="flex flex-row gap-4 items-center">
                                <div>
                                    <ContactCardLocationMarker />
                                </div>
                                <div>
                                    <div>{home.address.street},</div>
                                    <div>{`${home.address.suburb} ${home.address.stateOrTerritory} ${home.address.postcode}`}</div>
                                </div>
                            </div>
                        )}
                        {home.slug && (
                            <div>
                                <a
                                    href={home.slug}
                                    className="button button--tertiary"
                                >
                                    <div>Visit care home page</div>
                                    <div>
                                        <ChevronRightIcon />
                                    </div>
                                </a>
                            </div>
                        )}
                    </div>
                    <button
                        className={cx(
                            'absolute bg-[#E3F1FF] text-navy',
                            'top-2 right-2 w-[24px] h-[24px]',
                            'rounded-full',
                            'flex flex-col justify-center items-center',
                            'cursor-pointer'
                        )}
                        onClick={onClose}
                    >
                        <div className="pointer-events-none">
                            <InfoPanelCloseIcon />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

// TODO[Shannon]: Sorting by distance is something that probably should be
// handled in the parent component.
const sortFunc = (a: AgedCareHomeSummary, b: AgedCareHomeSummary) => {
    // Sort by distance
    if (a.distanceFromUserKM && b.distanceFromUserKM) {
        return a.distanceFromUserKM - b.distanceFromUserKM
    }

    // Sort by name
    if (!a.name || !b.name) return 0

    if (a.name < b.name) {
        return -1
    }
    if (a.name > b.name) {
        return 1
    }
    return 0
}

const updateHomeWithDistance = (
    home: AgedCareHomeSummary,
    userPosition: MapPoint | undefined
) => {
    const homeLat = home.location?.lat
    const homeLng = home.location?.lng

    if (!userPosition || !homeLat || !homeLng) return home

    const homePosition = { lat: homeLat, lng: homeLng }

    const distanceBetweenPoints = getDistanceBetweenPointsAlt(
        userPosition,
        homePosition
    )

    const roundedDistance = Math.ceil(distanceBetweenPoints)

    const result: AgedCareHomeSummary = {
        ...home,
        distanceFromUserKM: roundedDistance,
    }

    return result
}
