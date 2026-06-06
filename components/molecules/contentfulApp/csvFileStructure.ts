import { KeyValueMap } from '@contentful/app-sdk/dist/types/entities'
import {
    csvFieldDapPrice,
    csvFieldHomeName,
    csvFieldPricingCode,
    csvFieldRadPrice,
    csvFieldRoomName,
} from './helpers'

interface csvExport {
    column1: string
    column2?: string | null
    column3?: string | null
    column4?: string | null
    column5?: string | null
    column6?: string | null
    column7?: string | null
}

export const csvFileStrucutre = (
    roomsList: KeyValueMap[],
    unUsedHomes: Array<any> | undefined
) => {
    const updatedRooms: KeyValueMap[] = []
    const unChangedRooms: KeyValueMap[] = []
    const csvData: csvExport[] = []
    roomsList.forEach(room => {
        if (room.updated && room.updated.status) {
            updatedRooms.push(room)
        } else {
            unChangedRooms.push(room)
        }
    })
    const verificationMessage =
        updatedRooms.length > 0
            ? 'All the pricing verifications are successful'
            : 'File verified but no updates found'
    csvData.push({
        column1: verificationMessage,
        column2: '',
        column3: '',
        column4: '',
        column5: '',
        column6: '',
        column7: '',
    })
    csvData.push({ column1: '' })
    csvData.push({ column1: 'The following rooms will be updated:' })
    csvData.push({
        column1: 'Name',
        column2: 'Name in File',
        column3: 'Home Name',
        column4: 'DAP',
        column5: 'Updated DAP',
        column6: 'RAD',
        column7: 'Updated RAD',
    })
    updatedRooms.forEach(room => {
        csvData.push({
            column1: room.fields.name['en-US'],
            column2: room.fields.nameInPricingFile['en-US'],
            column3: room.updated ? room.updated.homeName : 'Not in Import',
            column4: room.fields.dapPrice['en-US'],
            column5: room.updated ? room.updated.dapPrice : '',
            column6: room.fields.radPrice['en-US'],
            column7: room.updated ? room.updated.radPrice : '',
        })
    })
    csvData.push({ column1: '' })
    csvData.push({ column1: 'The following rooms have no changes:' })
    csvData.push({
        column1: 'Name',
        column2: 'Name in File',
        column3: 'Home Name',
        column4: 'DAP',
        column5: 'RAD',
    })
    unChangedRooms.forEach(room => {
        csvData.push({
            column1: room.fields.name['en-US'],
            column2: room.fields.nameInPricingFile['en-US'],
            column3: room.updated ? room.updated.homeName : 'Not in Import',
            column4: room.fields.dapPrice['en-US'],
            column5: room.fields.radPrice['en-US'],
        })
    })
    csvData.push({ column1: '' })
    csvData.push({ column1: 'The following rooms were unmatched:' })
    csvData.push({
        column1: 'Name',
        column2: 'Name in File',
        column3: 'Home Name',
        column4: 'DAP',
        column5: 'RAD',
    })
    unUsedHomes?.forEach(room => {
        if (room) {
            csvData.push({
                column1: room[csvFieldRoomName],
                column2: room[csvFieldPricingCode],
                column3: room[csvFieldHomeName],
                column4: room[csvFieldDapPrice],
                column5: room[csvFieldRadPrice],
            })
        }
    })
    return csvData
}
