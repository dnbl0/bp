import { SpecGroup } from '../primitives/Specifications'

export const videoCardDefaultSpecs: SpecGroup[] = [
    {
        title: 'Card Container',
        dimensions: [
            { label: 'Border Radius', token: 'rounded-lg', value: '8px', type: 'border-radius' },
            { label: 'Overflow', token: 'overflow-hidden', value: 'hidden', type: 'padding' },
            { label: 'Background', token: 'bg-black', value: '#000000', type: 'color' },
        ],
    },
    {
        title: 'Play Button',
        dimensions: [
            { label: 'Width', token: 'w-16', value: '64px', type: 'width' },
            { label: 'Height', token: 'h-16', value: '64px', type: 'height' },
            { label: 'Border Radius', token: 'rounded-full', value: '999px', type: 'border-radius' },
            { label: 'Background', token: 'bg-white', value: '#ffffff', type: 'color' },
            { label: 'Icon Size', token: 'w-8 h-8', value: '32px', type: 'width' },
        ],
    },
]
