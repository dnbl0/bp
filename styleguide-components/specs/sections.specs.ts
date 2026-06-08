import { SpecGroup } from '../primitives/Specifications'

export const sectionsDefaultSpecs: SpecGroup[] = [
    {
        title: 'Section Container',
        dimensions: [
            { label: 'Padding (V)', token: 'py-12', value: '48px', direction: 'top', type: 'padding' },
            { label: 'Padding (H)', token: 'px-6', value: '24px', direction: 'left', type: 'padding' },
            { label: 'Background', token: 'bg-white', value: '#ffffff', type: 'color' },
        ],
    },
    {
        title: 'Section Title',
        dimensions: [
            { label: 'Font Size', token: 'text-heading-md', value: '24px', type: 'font-size' },
            { label: 'Font Weight', token: 'font-semibold', value: '600', type: 'font-size' },
            { label: 'Margin Bottom', token: 'mb-6', value: '24px', direction: 'bottom', type: 'margin' },
        ],
    },
]
