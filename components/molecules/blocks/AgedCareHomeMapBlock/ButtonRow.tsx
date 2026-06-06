import { cx } from '../../../../utils/cx'

export const ButtonRow = ({
    captions,
    selected,
    onSelect,
}: {
    selected: number
    captions: string[]
    onSelect: (index: number) => void
}) => {
    return (
        <div className="text-navy font-semibold relative mb-4">
            {captions.map((caption, index) => (
                <Button
                    key={index}
                    caption={caption}
                    active={selected === index}
                    onClick={() => onSelect(index)}
                />
            ))}
        </div>
    )
}

const Button = ({
    active,
    caption,
    onClick,
}: {
    active: boolean
    caption: string
    onClick: () => void
}) => {
    return (
        <button
            className={cx(
                'relative',
                'py-3 px-4',
                'border-[1px]',
                'border-cyan border-l-transparent first:border-l-cyan',
                'first:rounded-l last:rounded-r',
                'hover:bg-[#F0F9FF]',
                active && 'bg-[#F0F9FF]',
                'focus-visible:z-[1] focus-visible:border-l-cyan'
            )}
            onClick={onClick}
        >
            {caption}
        </button>
    )
}
