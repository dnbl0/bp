import { SpecGroup } from '../primitives/Specifications'

export const colouredCardDefaultSpecs: SpecGroup[] = [
    {
        title: 'Card Container',
        dimensions: [
            { label: 'Padding', token: 'p-6', value: '24px', direction: 'all', type: 'padding' },
            { label: 'Border Radius', token: 'rounded-lg', value: '8px', type: 'border-radius' },
            { label: 'Background', token: 'bg-cyan-50', value: '#e3f2fd', type: 'color' },
            { label: 'Border', token: 'border-l-4', value: '4px solid #0079c8', direction: 'left', type: 'color' },
        ],
    },
    {
        title: 'Content',
        dimensions: [
            { label: 'Gap (items)', token: 'gap-3', value: '12px', direction: 'all', type: 'gap' },
            { label: 'Text Color', token: 'text-navy', value: '#001f3f', type: 'color' },
        ],
    },
]
