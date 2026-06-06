export const ColorSwatch = ({
    name,
    hex,
    colorCode,
}: {
    name: string // Name matches Bupa's terminology.
    hex: string // Hex colour value.
    colorCode: string // Tailwind colour identifier.
}) => {
    return (
        <div className="flex flex-col gap-2">
            <div className={`${colorCode} h-[100px] rounded-t`} />
            <div className="flex flex-row gap-2 justify-between items-center">
                <div className="font-semibold">{name}</div>
                <div className="px-2 py-1 bg-cool-paper-200 inline-block rounded">
                    {colorCode.replace(/^bg-/, '')}
                </div>
            </div>
            <div className="font-light uppercase">{hex}</div>
        </div>
    )
}
