import { SpecGroup } from '../primitives/Specifications'

export const imageCardDefaultSpecs: SpecGroup[] = [
    {
        title: 'Card Container',
        dimensions: [
            { label: 'Border Radius', token: 'rounded-lg', value: '8px', type: 'border-radius' },
            { label: 'Overflow', token: 'overflow-hidden', value: 'hidden', type: 'padding' },
            { label: 'Border', token: 'border', value: '1px solid #e0e0e0', type: 'color' },
            { label: 'Background', token: 'bg-white', value: '#ffffff', type: 'color' },
            { label: 'Shadow', token: 'shadow-sm', value: '0 1px 2px 0 rgba(0,0,0,0.05)', type: 'shadow' },
        ],
    },
    {
        title: 'Content Area',
        dimensions: [
            { label: 'Padding', token: 'p-4', value: '16px', direction: 'all', type: 'padding' },
            { label: 'Gap', token: 'gap-3', value: '12px', direction: 'all', type: 'gap' },
        ],
    },
]
