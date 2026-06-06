import { CloseIcon } from '../../atoms/icons/CloseIcon'

export const BurgerNavTop = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="flex flex-row justify-end pt-2 px-2">
            <button className="px-4 py-4 cursor-pointer" onClick={onClose}>
                <span className="sr-only">Close</span>
                <CloseIcon className="fill-navy" />
            </button>
        </div>
    )
}
