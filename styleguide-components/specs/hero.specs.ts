import { SpecGroup } from '../primitives/Specifications'

export const heroDefaultSpecs: SpecGroup[] = [
    {
        title: 'Hero Container',
        dimensions: [
            { label: 'Padding (V)', token: 'py-12', value: '48px', direction: 'top', type: 'padding' },
            { label: 'Padding (H)', token: 'px-6', value: '24px', direction: 'left', type: 'padding' },
            { label: 'Min Height', token: 'min-h-96', value: '384px', type: 'height' },
            { label: 'Background', token: 'bg-white', value: '#ffffff', type: 'color' },
        ],
    },
    {
        title: 'Heading',
        dimensions: [
            { label: 'Font Size', token: 'text-heading-lg', value: '32px', type: 'font-size' },
            { label: 'Font Weight', token: 'font-bold', value: '700', type: 'font-size' },
            { label: 'Color', token: 'text-navy', value: '#001f3f', type: 'color' },
            { label: 'Margin Bottom', token: 'mb-4', value: '16px', direction: 'bottom', type: 'margin' },
        ],
    },
]
