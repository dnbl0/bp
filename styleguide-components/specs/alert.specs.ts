import { SpecGroup } from '../primitives/Specifications'

/**
 * Visual design specifications for the Alert component.
 */

export const alertDefaultSpecs: SpecGroup[] = [
    {
        title: 'Default State',
        dimensions: [
            { label: 'Padding', token: 'p-4', value: '16px', direction: 'all', type: 'padding' },
            { label: 'Border Radius', token: 'rounded-lg', value: '8px', type: 'border-radius' },
            { label: 'Border Width', token: 'border', value: '1px', type: 'padding' },
            { label: 'Gap (icon/text)', token: 'gap-3', value: '12px', direction: 'all', type: 'gap' },
            { label: 'Font Size', token: 'text-body-small', value: '14px', type: 'font-size' },
            { label: 'Line Height', token: 'leading-6', value: '24px', type: 'line-height' },
            { label: 'Background', token: 'bg-blue-50', value: '#e3f2fd', type: 'color' },
            { label: 'Border Color', token: 'border-blue', value: '#2196f3', type: 'color' },
            { label: 'Text Color', token: 'text-blue', value: '#1976d2', type: 'color' },
        ],
    },
]

export const alertSuccessSpecs: SpecGroup[] = [
    {
        title: 'Default State',
        dimensions: [
            { label: 'Padding', token: 'p-4', value: '16px', direction: 'all', type: 'padding' },
            { label: 'Border Radius', token: 'rounded-lg', value: '8px', type: 'border-radius' },
            { label: 'Background', token: 'bg-success-50', value: '#e8f5e9', type: 'color' },
            { label: 'Border Color', token: 'border-success', value: '#4caf50', type: 'color' },
            { label: 'Text Color', token: 'text-success', value: '#388e3c', type: 'color' },
        ],
    },
]

export const alertWarningSpecs: SpecGroup[] = [
    {
        title: 'Default State',
        dimensions: [
            { label: 'Padding', token: 'p-4', value: '16px', direction: 'all', type: 'padding' },
            { label: 'Border Radius', token: 'rounded-lg', value: '8px', type: 'border-radius' },
            { label: 'Background', token: 'bg-warning-50', value: '#fff3e0', type: 'color' },
            { label: 'Border Color', token: 'border-warning', value: '#ff9800', type: 'color' },
            { label: 'Text Color', token: 'text-warning', value: '#f57c00', type: 'color' },
        ],
    },
]

export const alertErrorSpecs: SpecGroup[] = [
    {
        title: 'Default State',
        dimensions: [
            { label: 'Padding', token: 'p-4', value: '16px', direction: 'all', type: 'padding' },
            { label: 'Border Radius', token: 'rounded-lg', value: '8px', type: 'border-radius' },
            { label: 'Background', token: 'bg-error-50', value: '#ffebee', type: 'color' },
            { label: 'Border Color', token: 'border-error', value: '#f44336', type: 'color' },
            { label: 'Text Color', token: 'text-error', value: '#d32f2f', type: 'color' },
        ],
    },
]
