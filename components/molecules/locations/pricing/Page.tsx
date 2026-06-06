import { useSDK } from '@contentful/react-apps-toolkit/dist/useSDK'
import { PageExtensionSDK } from '@contentful/app-sdk'
import { Modal } from '@contentful/f36-modal'
import { Spinner } from '@contentful/f36-spinner'
import { Table } from '@contentful/f36-table'
import { Tabs } from '@contentful/f36-tabs'
import { Paragraph } from '@contentful/f36-typography'
import { useEffect, useState } from 'react'
import { useCSVReader, useCSVDownloader } from 'react-papaparse'
import { ParseResult } from 'papaparse'
import { KeyValueMap } from '@contentful/app-sdk/dist/types/entities'
import {
    csvFieldDapPrice,
    csvFieldHomeName,
    csvFieldPricingCode,
    csvFieldRadPrice,
    csvFieldRoomName,
    priceUpdated,
} from '../../contentfulApp/helpers'
import { csvFileStrucutre } from '../../contentfulApp/csvFileStructure'
import { cx } from '../../../../utils/cx'

export const Page = () => {
    const sdk = useSDK<PageExtensionSDK>()

    const [canUpdate, setCanUpdate] = useState(false)
    const [csvUploaded, setCsvUploaded] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [totalRoomsUpdated, setTotalRoomsUpdated] = useState(0)

    const [rooms, setRooms] = useState<KeyValueMap[]>([])
    const [csvResults, setCsvResults] = useState<ParseResult<any[]>>()
    const [unUsedHomes, setUnusedHomes] = useState<Array<any>>()

    const { CSVReader } = useCSVReader()
    const { CSVDownloader, Type } = useCSVDownloader()

    useEffect(() => {
        getRooms()
    }, [])

    useEffect(() => {
        if (csvResults) {
            setCsvUploaded(true)
            const nextRooms = rooms.map((room, i) => {
                const updatedPrices = csvResults.data.find(el => {
                    return (
                        el[csvFieldPricingCode] ==
                            room.fields.nameInPricingFile['en-US'] &&
                        el[csvFieldRoomName] == room.fields.name['en-US']
                    )
                })
                if (updatedPrices) {
                    room.updated = new Array()
                    room.updated.homeName = updatedPrices[csvFieldHomeName]
                    if (
                        priceUpdated(
                            room.fields.dapPrice['en-US'],
                            updatedPrices[csvFieldDapPrice]
                        ) ||
                        priceUpdated(
                            room.fields.radPrice['en-US'],
                            updatedPrices[csvFieldRadPrice]
                        )
                    ) {
                        setCanUpdate(true)
                        room.updated.status = true
                    } else {
                        room.updated.status = false
                    }
                    room.updated.dapPrice = priceUpdated(
                        room.fields.dapPrice['en-US'],
                        updatedPrices[csvFieldDapPrice]
                    )
                        ? updatedPrices[csvFieldDapPrice]
                        : null
                    room.updated.radPrice = priceUpdated(
                        room.fields.radPrice['en-US'],
                        updatedPrices[csvFieldRadPrice]
                    )
                        ? updatedPrices[csvFieldRadPrice]
                        : null
                }
                return room
            })
            setRooms(nextRooms)
            setUnusedHomes(getUnusedCsvHomes())
        }
    }, [csvResults])

    const getRooms = (skip: number = 0) => {
        const limit = 1000
        sdk.space
            .getEntries({
                limit: limit,
                skip: skip,
                content_type: 'rooms',
                order: 'fields.nameInPricingFile',
            })
            .then(data => {
                setRooms(rooms =>
                    rooms.concat(
                        data.items.filter(room => room.sys.publishedVersion)
                    )
                )
                if (data.total > skip + limit) {
                    getRooms(skip + limit)
                }
            })
    }

    const getUnusedCsvHomes = (): Array<any[] | null> => {
        if (csvResults) {
            const unsUsedHomes = csvResults.data.map(room => {
                const roomIndex = rooms.findIndex(
                    el =>
                        room[csvFieldPricingCode] ==
                            el.fields.nameInPricingFile['en-US'] &&
                        room[csvFieldRoomName] == el.fields.name['en-US']
                )
                return roomIndex < 0 ? room : null
            })
            return unsUsedHomes
        } else return new Array()
    }

    const removeCsvFile = () => {
        setCanUpdate(false)
        setCsvUploaded(false)
        setCsvResults(undefined)
        setUnusedHomes(undefined)
        setRooms([])
        getRooms()
    }

    const updateRoomPricing = async () => {
        setIsUpdating(true)
        setIsOpen(true)
        let updatedRooms = 0
        await Promise.all(
            rooms.map(async (room, i): Promise<any> => {
                if (room.updated && room.updated.status) {
                    const updatedRoom = await sdk.space
                        .updateEntry({
                            ...room,
                            sys: {
                                ...room.sys,
                                publishedVersion: room.sys.version,
                            },
                            fields: {
                                ...room.fields,
                                dapPrice: {
                                    ['en-US']: room.updated.dapPrice
                                        ? Number(room.updated.dapPrice)
                                        : Number(
                                              room.fields.dapPrice['en-US']
                                          ),
                                },
                                radPrice: {
                                    ['en-US']: room.updated.radPrice
                                        ? parseInt(room.updated.radPrice, 10)
                                        : parseInt(
                                              room.fields.radPrice['en-US'],
                                              10
                                          ),
                                },
                            },
                        })
                        .then(async data => {
                            await sdk.space.publishEntry({ ...data })
                            updatedRooms++
                            return data
                        })
                        .catch(e => console.error(e))
                    return updatedRoom
                } else {
                    return room
                }
            })
        ).then(prevRooms => {
            setRooms(prevRooms)
            setIsUpdating(false)
            setCsvUploaded(false)
            setCsvResults(undefined)
            setUnusedHomes(undefined)
            setCanUpdate(false)
            setTotalRoomsUpdated(updatedRooms)
        })
    }

    return (
        <div>
            <div className="grid">
                <div className="row-start-1 col-start-1 w-content m-auto h-full">
                    <div>
                        <div className="py-2 w-content m-auto flex flex-col gap-4 grid-cols-12 justify-items-stretch items-stretch">
                            <div className="prose max-w-none">
                                <CSVReader
                                    onUploadAccepted={(results: any) => {
                                        setCsvResults(results)
                                    }}
                                    on
                                >
                                    {({
                                        getRootProps,
                                        acceptedFile,
                                        ProgressBar,
                                        getRemoveFileProps,
                                        onFileLoad,
                                    }: any) => (
                                        <>
                                            <div className="flex flex-row mb-4">
                                                <button
                                                    className="button mr-4"
                                                    type="button"
                                                    {...getRootProps()}
                                                >
                                                    Browse file
                                                </button>
                                                <div className="flex flex-row flex-wrap justify-center content-center border border-black grow">
                                                    {acceptedFile &&
                                                        acceptedFile.name}
                                                    {onFileLoad && (
                                                        <div>File loading</div>
                                                    )}
                                                </div>
                                                <button
                                                    className="button button--secondary ml-4"
                                                    {...getRemoveFileProps()}
                                                    disabled={!acceptedFile}
                                                    onClick={(event: Event) => {
                                                        getRemoveFileProps().onClick(
                                                            event
                                                        )
                                                        removeCsvFile()
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                                <button
                                                    className="button ml-4"
                                                    type="button"
                                                    disabled={!canUpdate}
                                                    onClick={updateRoomPricing}
                                                >
                                                    Publish
                                                </button>
                                            </div>
                                            <ProgressBar className="bg-navy" />
                                        </>
                                    )}
                                </CSVReader>
                            </div>
                            <div>
                                <Modal
                                    onClose={() => setIsOpen(false)}
                                    isShown={isOpen}
                                >
                                    <Modal.Header
                                        title="Updating Room Pricing"
                                        onClose={() => setIsOpen(false)}
                                    />
                                    <Modal.Content>
                                        {isUpdating && (
                                            <Paragraph>
                                                <Spinner variant="primary" />{' '}
                                                Updating Room pricing
                                            </Paragraph>
                                        )}
                                        {!isUpdating && (
                                            <Paragraph>
                                                Updating finished:{' '}
                                                {totalRoomsUpdated} were updated
                                            </Paragraph>
                                        )}
                                    </Modal.Content>
                                </Modal>
                                <Tabs defaultTab="first">
                                    <Tabs.List>
                                        <Tabs.Tab panelId="first">
                                            Rooms
                                        </Tabs.Tab>
                                        <Tabs.Tab panelId="second">
                                            Unused imports
                                        </Tabs.Tab>
                                    </Tabs.List>
                                    <Tabs.Panel id="first">
                                        <Table>
                                            <Table.Head>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        Name
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        Name in File
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        Home Name
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        Rad Price
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        Updated Rad
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        Dap Price
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        Updated Dap
                                                    </Table.Cell>
                                                </Table.Row>
                                            </Table.Head>
                                            <Table.Body>
                                                <RoomRows rooms={rooms} />
                                            </Table.Body>
                                        </Table>
                                    </Tabs.Panel>

                                    <Tabs.Panel id="second">
                                        {unUsedHomes && (
                                            <Table>
                                                <Table.Head>
                                                    <Table.Row>
                                                        <Table.Cell>
                                                            Name
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            Name in File
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            Home Name
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            DAP
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            RAD
                                                        </Table.Cell>
                                                    </Table.Row>
                                                </Table.Head>
                                                <Table.Body>
                                                    <UnusedRoomRows
                                                        rooms={unUsedHomes}
                                                    />
                                                </Table.Body>
                                            </Table>
                                        )}
                                    </Tabs.Panel>
                                </Tabs>

                                {csvUploaded && (
                                    <CSVDownloader
                                        type={Type.Button}
                                        className="button mt-4"
                                        filename={'filename'}
                                        bom={true}
                                        config={{
                                            delimiter: ',',
                                        }}
                                        data={() =>
                                            csvFileStrucutre(rooms, unUsedHomes)
                                        }
                                    >
                                        Verify & Download results as CSV
                                    </CSVDownloader>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const RoomRows = ({ rooms }: { rooms: KeyValueMap[] }) => {
    if (rooms.length) {
        return (
            <>
                {rooms.map((room, i) => (
                    <Table.Row
                        key={i}
                        className={cx(
                            room.updated && room.updated.status
                                ? 'bg-focus-blue'
                                : ''
                        )}
                    >
                        <Table.Cell>{room.fields.name['en-US']}</Table.Cell>
                        <Table.Cell>
                            {room.fields.nameInPricingFile['en-US']}
                        </Table.Cell>
                        <Table.Cell>
                            {room.updated ? room.updated.homeName : ''}
                        </Table.Cell>
                        <Table.Cell>
                            {room.fields.radPrice
                                ? room.fields.radPrice['en-US']
                                : '0'}
                        </Table.Cell>
                        <Table.Cell>
                            {room.updated ? room.updated.radPrice : ''}
                        </Table.Cell>
                        <Table.Cell>
                            {room.fields.dapPrice
                                ? room.fields.dapPrice['en-US']
                                : '0'}
                        </Table.Cell>
                        <Table.Cell>
                            {room.updated ? room.updated.dapPrice : ''}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </>
        )
    } else return <></>
}

const UnusedRoomRows = ({ rooms }: { rooms: Array<any> | undefined }) => {
    if (rooms) {
        return (
            <>
                {rooms.map((room, i) => {
                    if (room)
                        return (
                            <Table.Row key={i}>
                                <Table.Cell>
                                    {room[csvFieldRoomName]}
                                </Table.Cell>
                                <Table.Cell>
                                    {room[csvFieldPricingCode]}
                                </Table.Cell>
                                <Table.Cell>
                                    {room[csvFieldHomeName]}
                                </Table.Cell>
                                <Table.Cell>
                                    {room[csvFieldDapPrice]}
                                </Table.Cell>
                                <Table.Cell>
                                    {room[csvFieldRadPrice]}
                                </Table.Cell>
                            </Table.Row>
                        )
                })}
            </>
        )
    } else return <></>
}
