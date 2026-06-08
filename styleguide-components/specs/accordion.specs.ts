import { SpecGroup } from '../primitives/Specifications'

/**
 * Visual design specifications for the Accordion component.
 */

export const accordionDefaultSpecs: SpecGroup[] = [
    {
        title: 'Collapsed State',
        dimensions: [
            { label: 'Padding (V)', token: 'py-4', value: '16px', direction: 'top', type: 'padding' },
            { label: 'Padding (H)', token: 'px-5', value: '20px', direction: 'left', type: 'padding' },
            { label: 'Border Bottom', token: 'border-b', value: '1px', type: 'padding' },
            { label: 'Border Color', token: 'border-cool-paper', value: '#e0e0e0', type: 'color' },
            { label: 'Font Size', token: 'text-body', value: '16px', type: 'font-size' },
            { label: 'Font Weight', token: 'font-semibold', value: '600', type: 'font-size' },
            { label: 'Line Height', token: 'leading-6', value: '24px', type: 'line-height' },
            { label: 'Text Color', token: 'text-navy', value: '#001f3f', type: 'color' },
        ],
    },
    {
        title: 'Expanded State',
        dimensions: [
            { label: 'Padding (V)', token: 'py-4', value: '16px', direction: 'top', type: 'padding' },
            { label: 'Border Bottom', token: 'border-b', value: '1px', type: 'padding' },
            { label: 'Content Padding (V)', token: 'py-4', value: '16px', direction: 'top', type: 'padding' },
            { label: 'Content Padding (H)', token: 'px-5', value: '20px', direction: 'left', type: 'padding' },
            { label: 'Content Text Color', token: 'text-grey', value: '#666666', type: 'color' },
        ],
    },
    {
        title: 'Hover State (Collapsed)',
        dimensions: [
            { label: 'Background', token: 'bg-cool-paper-50', value: '#f9f9f9', type: 'color' },
        ],
    },
]
