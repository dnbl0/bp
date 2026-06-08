import { SpecGroup } from '../primitives/Specifications'

export const contactCardDefaultSpecs: SpecGroup[] = [
    {
        title: 'Card Container',
        dimensions: [
            { label: 'Padding', token: 'p-6', value: '24px', direction: 'all', type: 'padding' },
            { label: 'Border Radius', token: 'rounded-lg', value: '8px', type: 'border-radius' },
            { label: 'Background', token: 'bg-white', value: '#ffffff', type: 'color' },
            { label: 'Border', token: 'border', value: '1px solid #e0e0e0', type: 'color' },
            { label: 'Shadow', token: 'shadow-sm', value: '0 1px 2px rgba(0,0,0,0.05)', type: 'shadow' },
        ],
    },
    {
        title: 'Content',
        dimensions: [
            { label: 'Gap', token: 'gap-4', value: '16px', direction: 'all', type: 'gap' },
        ],
    },
]
