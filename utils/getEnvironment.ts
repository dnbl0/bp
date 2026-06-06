/**
 * Gets the current build environment. Supports both Vercel and Netlify.
 *
 * This will return one of the following values:
 * - development
 * - staging
 * - production
 */
export const getEnvironment = () => {
    const { NEXT_PUBLIC_VERCEL_ENV, CONTEXT } = process.env
    const environment = NEXT_PUBLIC_VERCEL_ENV || CONTEXT

    switch (environment) {
        case undefined:
        case 'development':
        case 'dev': {
            return 'development'
        }

        case 'production': {
            return 'production'
        }

        default: {
            return 'staging'
        }
    }
}
