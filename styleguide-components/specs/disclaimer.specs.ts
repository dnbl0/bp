import { SpecGroup } from '../primitives/Specifications'

export const disclaimerDefaultSpecs: SpecGroup[] = [
    {
        title: 'Disclaimer Container',
        dimensions: [
            { label: 'Padding', token: 'p-4', value: '16px', direction: 'all', type: 'padding' },
            { label: 'Border Radius', token: 'rounded-lg', value: '8px', type: 'border-radius' },
            { label: 'Background', token: 'bg-warm-50', value: '#fff8f0', type: 'color' },
            { label: 'Border', token: 'border-l-4', value: '4px solid #ff9800', direction: 'left', type: 'color' },
            { label: 'Gap', token: 'gap-3', value: '12px', direction: 'all', type: 'gap' },
        ],
    },
    {
        title: 'Text',
        dimensions: [
            { label: 'Font Size', token: 'text-body-small', value: '14px', type: 'font-size' },
            { label: 'Line Height', token: 'leading-6', value: '24px', type: 'line-height' },
            { label: 'Color', token: 'text-grey', value: '#666666', type: 'color' },
        ],
    },
]
