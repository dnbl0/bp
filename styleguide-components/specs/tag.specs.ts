import { SpecGroup } from '../primitives/Specifications'

export const tagDefaultSpecs: SpecGroup[] = [
    {
        title: 'Default State',
        dimensions: [
            { label: 'Padding (V)', token: 'py-1.5', value: '6px', direction: 'top', type: 'padding' },
            { label: 'Padding (H)', token: 'px-3', value: '12px', direction: 'left', type: 'padding' },
            { label: 'Border Radius', token: 'rounded-full', value: '999px', type: 'border-radius' },
            { label: 'Font Size', token: 'text-caption', value: '12px', type: 'font-size' },
            { label: 'Font Weight', token: 'font-medium', value: '500', type: 'font-size' },
            { label: 'Background', token: 'bg-cool-paper', value: '#f5f5f5', type: 'color' },
            { label: 'Text Color', token: 'text-navy', value: '#001f3f', type: 'color' },
            { label: 'Line Height', token: 'leading-4', value: '16px', type: 'line-height' },
        ],
    },
]

export const tagColoredSpecs: SpecGroup[] = [
    {
        title: 'Default State',
        dimensions: [
            { label: 'Padding (V)', token: 'py-1.5', value: '6px', direction: 'top', type: 'padding' },
            { label: 'Padding (H)', token: 'px-3', value: '12px', direction: 'left', type: 'padding' },
            { label: 'Border Radius', token: 'rounded-full', value: '999px', type: 'border-radius' },
            { label: 'Font Size', token: 'text-caption', value: '12px', type: 'font-size' },
            { label: 'Background', token: 'bg-cyan-50', value: '#e3f2fd', type: 'color' },
            { label: 'Text Color', token: 'text-cyan', value: '#0079c8', type: 'color' },
        ],
    },
]
