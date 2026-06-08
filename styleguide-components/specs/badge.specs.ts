import { SpecGroup } from '../primitives/Specifications'

/**
 * Visual design specifications for the Badge component.
 */

export const badgeDefaultSpecs: SpecGroup[] = [
    {
        title: 'Default State',
        dimensions: [
            { label: 'Padding (V)', token: 'py-1', value: '4px', direction: 'top', type: 'padding' },
            { label: 'Padding (H)', token: 'px-2', value: '8px', direction: 'left', type: 'padding' },
            { label: 'Border Radius', token: 'rounded', value: '4px', type: 'border-radius' },
            { label: 'Font Size', token: 'text-caption', value: '12px', type: 'font-size' },
            { label: 'Font Weight', token: 'font-semibold', value: '600', type: 'font-size' },
            { label: 'Background', token: 'bg-cool-paper', value: '#f5f5f5', type: 'color' },
            { label: 'Text Color', token: 'text-grey', value: '#666666', type: 'color' },
            { label: 'Line Height', token: 'leading-4', value: '16px', type: 'line-height' },
        ],
    },
]

export const badgeSuccessSpecs: SpecGroup[] = [
    {
        title: 'Default State',
        dimensions: [
            { label: 'Padding (V)', token: 'py-1', value: '4px', direction: 'top', type: 'padding' },
            { label: 'Padding (H)', token: 'px-2', value: '8px', direction: 'left', type: 'padding' },
            { label: 'Border Radius', token: 'rounded', value: '4px', type: 'border-radius' },
            { label: 'Font Size', token: 'text-caption', value: '12px', type: 'font-size' },
            { label: 'Background', token: 'bg-success', value: '#27ae60', type: 'color' },
            { label: 'Text Color', token: 'text-white', value: '#ffffff', type: 'color' },
        ],
    },
]

export const badgeWarningSpecs: SpecGroup[] = [
    {
        title: 'Default State',
        dimensions: [
            { label: 'Padding (V)', token: 'py-1', value: '4px', direction: 'top', type: 'padding' },
            { label: 'Padding (H)', token: 'px-2', value: '8px', direction: 'left', type: 'padding' },
            { label: 'Border Radius', token: 'rounded', value: '4px', type: 'border-radius' },
            { label: 'Font Size', token: 'text-caption', value: '12px', type: 'font-size' },
            { label: 'Background', token: 'bg-warning', value: '#f39c12', type: 'color' },
            { label: 'Text Color', token: 'text-white', value: '#ffffff', type: 'color' },
        ],
    },
]

export const badgeErrorSpecs: SpecGroup[] = [
    {
        title: 'Default State',
        dimensions: [
            { label: 'Padding (V)', token: 'py-1', value: '4px', direction: 'top', type: 'padding' },
            { label: 'Padding (H)', token: 'px-2', value: '8px', direction: 'left', type: 'padding' },
            { label: 'Border Radius', token: 'rounded', value: '4px', type: 'border-radius' },
            { label: 'Font Size', token: 'text-caption', value: '12px', type: 'font-size' },
            { label: 'Background', token: 'bg-error', value: '#e74c3c', type: 'color' },
            { label: 'Text Color', token: 'text-white', value: '#ffffff', type: 'color' },
        ],
    },
]
