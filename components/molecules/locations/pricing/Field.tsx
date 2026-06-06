import { useSDK } from '@contentful/react-apps-toolkit/dist/useSDK'
import { Paragraph } from '@contentful/f36-typography'
import { FieldExtensionSDK } from '@contentful/app-sdk'

export const Field = () => {
    const fieldSdk = useSDK<FieldExtensionSDK>()
    return (
        <div>
            <div>Field not editable via CMS.</div>
            <Paragraph>
                <strong>Current Value: </strong>
                {fieldSdk.field.getValue()}
            </Paragraph>
        </div>
    )
}
