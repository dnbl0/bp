import { SpecGroup } from '../primitives/Specifications'

/**
 * Visual design specifications for the Tabs component.
 */

export const tabsDefaultSpecs: SpecGroup[] = [
    {
        title: 'Inactive Tab',
        dimensions: [
            { label: 'Padding (V)', token: 'py-3', value: '12px', direction: 'top', type: 'padding' },
            { label: 'Padding (H)', token: 'px-4', value: '16px', direction: 'left', type: 'padding' },
            { label: 'Font Size', token: 'text-body-small', value: '14px', type: 'font-size' },
            { label: 'Font Weight', token: 'font-medium', value: '500', type: 'font-size' },
            { label: 'Text Color', token: 'text-grey', value: '#666666', type: 'color' },
            { label: 'Border Bottom', token: 'border-b-2', value: '2px transparent', type: 'padding' },
        ],
    },
    {
        title: 'Active Tab',
        dimensions: [
            { label: 'Padding (V)', token: 'py-3', value: '12px', direction: 'top', type: 'padding' },
            { label: 'Padding (H)', token: 'px-4', value: '16px', direction: 'left', type: 'padding' },
            { label: 'Font Size', token: 'text-body-small', value: '14px', type: 'font-size' },
            { label: 'Font Weight', token: 'font-semibold', value: '600', type: 'font-size' },
            { label: 'Text Color', token: 'text-cyan', value: '#0079c8', type: 'color' },
            { label: 'Border Bottom', token: 'border-b-2', value: '2px solid #0079c8', type: 'color' },
        ],
    },
    {
        title: 'Hover State (Inactive)',
        dimensions: [
            { label: 'Text Color', token: 'text-navy', value: '#001f3f', type: 'color' },
        ],
    },
]

export const tabsSmallSpecs: SpecGroup[] = [
    {
        title: 'Inactive Tab',
        dimensions: [
            { label: 'Padding (V)', token: 'py-2', value: '8px', direction: 'top', type: 'padding' },
            { label: 'Padding (H)', token: 'px-3', value: '12px', direction: 'left', type: 'padding' },
            { label: 'Font Size', token: 'text-caption', value: '12px', type: 'font-size' },
            { label: 'Text Color', token: 'text-grey', value: '#666666', type: 'color' },
        ],
    },
    {
        title: 'Active Tab',
        dimensions: [
            { label: 'Text Color', token: 'text-cyan', value: '#0079c8', type: 'color' },
            { label: 'Border Bottom', token: 'border-b-2', value: '2px solid #0079c8', type: 'color' },
        ],
    },
]
