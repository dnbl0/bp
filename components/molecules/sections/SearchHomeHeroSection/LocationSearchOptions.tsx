import { invariant } from '@apollo/client/utilities/globals'
import { MouseEventHandler, useState } from 'react'
import { useKey } from 'react-use'
import { cx } from '../../../../utils/cx'
import { isDefined } from '../../../../utils/typeguards'
import {
    LocationSearchItem,
    LocationSearchItems,
} from './useLocationSearchItems'

export const LocationSearchOptions = ({
    locationSearchItems,
    onItemFocused,
    onItemSelected,
}: {
    locationSearchItems: LocationSearchItems
    onItemFocused: (item: LocationSearchItem) => void
    onItemSelected: (item: LocationSearchItem) => void
}) => {
    const { user, homes = [], places = [] } = locationSearchItems

    const [selectedItemIndex, setSelectedItemIndex] = useState(-1)

    const allItems = [user, ...homes, ...places].filter(isDefined)

    const totalItemCount = allItems.length

    const selectedItemId = allItems[selectedItemIndex]?.id

    useKey(
        'ArrowUp',
        () => {
            const nextIndex = clamp(
                -1,
                selectedItemIndex - 1,
                totalItemCount - 1
            )
            const focusedItem = allItems[nextIndex]
            setSelectedItemIndex(nextIndex)
            if (focusedItem) {
                onItemFocused(focusedItem)
            }
        },
        undefined,
        [selectedItemIndex, totalItemCount]
    )

    useKey(
        'ArrowDown',
        () => {
            const nextIndex = clamp(
                -1,
                selectedItemIndex + 1,
                totalItemCount - 1
            )
            const focusedItem = allItems[nextIndex]
            setSelectedItemIndex(nextIndex)
            if (focusedItem) {
                onItemFocused(focusedItem)
            }
        },
        undefined,
        [selectedItemIndex, totalItemCount]
    )

    useKey(
        'Enter',
        () => {
            const selectedItem = allItems[selectedItemIndex]
            if (selectedItem) {
                onItemSelected(selectedItem)
            }
        },
        undefined,
        [allItems]
    )

    const handleClick: MouseEventHandler<HTMLDivElement> = event => {
        invariant(event.target instanceof Element, 'unexpected target type')
        const locationId = event.target.getAttribute('data-location-id')
        const selectedItem = allItems.find(item => item.id === locationId)
        if (selectedItem) {
            onItemSelected(selectedItem)
        }
        event.preventDefault()
    }

    return (
        <div onClick={handleClick}>
            {/* ==== Geo-location option ==== */}

            {user && (
                <Option
                    location={user}
                    key="user"
                    isFocused={user.id === selectedItemId}
                />
            )}

            {/* ==== Home search options ==== */}

            {homes.length > 0 && <GroupHeader caption="Homes" key="homes" />}

            {homes.map(home => (
                <Option
                    location={home}
                    key={home.id}
                    isFocused={home.id === selectedItemId}
                />
            ))}

            {/* ==== Google place search options ==== */}

            {places.length > 0 && <GroupHeader caption="Places" key="places" />}

            {places.map(place => (
                <Option
                    location={place}
                    key={place.id}
                    isFocused={place.id === selectedItemId}
                />
            ))}
        </div>
    )
}

const GroupHeader = ({ caption }: { caption: string }) => {
    return (
        <div
            key={caption}
            className={cx(
                'flex flex-row items-center',
                'px-2 py-2.5 gap-2',
                'cursor-pointer',
                'select-none',
                'text-navy font-medium',
                'bg-cool-paper-100'
            )}
        >
            <div className="w-[24px] h-[24px] hidden"></div>
            <div>{caption}</div>
        </div>
    )
}

const Option = ({
    location,
    isFocused,
}: {
    location: LocationSearchItem
    isFocused: boolean
}) => {
    return (
        <div
            key={location.id}
            data-location-id={location.id}
            className={cx(
                'flex flex-row items-center',
                'px-2 py-2.5 gap-2',
                'cursor-pointer',
                'select-none',
                'text-navy',
                'hover:bg-cool-paper-200',
                isFocused && 'bg-cool-paper-200'
            )}
        >
            <div className="pointer-events-none w-[24px] h-[24px] hidden"></div>
            <div className="pointer-events-none">{location.caption}</div>
        </div>
    )
}

/*
    Clamp a value between a min and max value
*/
const clamp = (minValue: number, targetValue: number, maxValue: number) => {
    return Math.min(Math.max(targetValue, minValue), maxValue)
}
