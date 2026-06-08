import { SpecGroup } from '../primitives/Specifications'

export const toggleDefaultSpecs: SpecGroup[] = [
    {
        title: 'Off State',
        dimensions: [
            { label: 'Width', token: 'w-14', value: '56px', type: 'width' },
            { label: 'Height', token: 'h-8', value: '32px', type: 'height' },
            { label: 'Border Radius', token: 'rounded-full', value: '999px', type: 'border-radius' },
            { label: 'Background', token: 'bg-grey', value: '#cccccc', type: 'color' },
            { label: 'Padding', token: 'p-1', value: '4px', direction: 'all', type: 'padding' },
        ],
    },
    {
        title: 'On State',
        dimensions: [
            { label: 'Width', token: 'w-14', value: '56px', type: 'width' },
            { label: 'Height', token: 'h-8', value: '32px', type: 'height' },
            { label: 'Background', token: 'bg-cyan', value: '#0079c8', type: 'color' },
            { label: 'Thumb Size', token: 'w-6 h-6', value: '24px', type: 'width' },
        ],
    },
    {
        title: 'Disabled State',
        dimensions: [
            { label: 'Background', token: 'bg-disabled', value: '#e8e8e8', type: 'color' },
            { label: 'Opacity', token: 'opacity-50', value: '50%', type: 'color' },
        ],
    },
]
