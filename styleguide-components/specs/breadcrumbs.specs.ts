import { SpecGroup } from '../primitives/Specifications'

export const breadcrumbsDefaultSpecs: SpecGroup[] = [
    {
        title: 'Breadcrumb Item',
        dimensions: [
            { label: 'Font Size', token: 'text-body-small', value: '14px', type: 'font-size' },
            { label: 'Line Height', token: 'leading-6', value: '24px', type: 'line-height' },
            { label: 'Text Color', token: 'text-grey', value: '#666666', type: 'color' },
            { label: 'Link Color', token: 'text-cyan', value: '#0079c8', type: 'color' },
            { label: 'Hover Color', token: 'text-cyan-hover', value: '#005497', type: 'color' },
        ],
    },
    {
        title: 'Separator',
        dimensions: [
            { label: 'Content', token: 'separator', value: '/', type: 'color' },
            { label: 'Margin (H)', token: 'mx-1.5', value: '6px', direction: 'left', type: 'margin' },
            { label: 'Color', token: 'text-grey', value: '#999999', type: 'color' },
        ],
    },
    {
        title: 'Current Page',
        dimensions: [
            { label: 'Font Weight', token: 'font-medium', value: '500', type: 'font-size' },
            { label: 'Text Color', token: 'text-navy', value: '#001f3f', type: 'color' },
        ],
    },
]
