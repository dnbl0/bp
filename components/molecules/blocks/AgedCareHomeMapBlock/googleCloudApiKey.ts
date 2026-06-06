import { useEffect } from 'react'

export const useGoogleCloudApiKey = () => {
    const googleCloudApiKey =
        process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API_KEY_CLIENT

    useEffect(() => {
        if (!googleCloudApiKey) {
            console.error('Cannot find Google Cloud API Key')
        }
    }, [googleCloudApiKey])

    return googleCloudApiKey
}
