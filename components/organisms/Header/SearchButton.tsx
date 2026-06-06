import { HTMLAttributes } from 'react'
import { SearchIcon } from '../../atoms/icons/SearchIcon'
import { HeaderButton } from './HeaderButton'

export const SearchButton = (props: HTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            {...props}
            className="block rounded hover:bg-[#F0F9FF] active:focus:shadow-inner-blue"
        >
            <HeaderButton
                icon={<SearchIcon className="fill-cyan" />}
                text="Search"
            />
        </button>
    )
}
