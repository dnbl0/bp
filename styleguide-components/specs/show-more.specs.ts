import { SpecGroup } from '../primitives/Specifications'

export const showMoreDefaultSpecs: SpecGroup[] = [
    {
        title: 'Container',
        dimensions: [
            { label: 'Gap', token: 'gap-4', value: '16px', direction: 'all', type: 'gap' },
        ],
    },
    {
        title: 'Show More Button',
        dimensions: [
            { label: 'Padding (V)', token: 'py-3', value: '12px', direction: 'top', type: 'padding' },
            { label: 'Padding (H)', token: 'px-6', value: '24px', direction: 'left', type: 'padding' },
            { label: 'Font Size', token: 'text-body-small', value: '14px', type: 'font-size' },
            { label: 'Text Color', token: 'text-cyan', value: '#0079c8', type: 'color' },
        ],
    },
]
