import { getEnvironment } from './getEnvironment'

export const getTealiumEnvironment = () => {
    const env = getEnvironment()

    switch (env) {
        case 'production': {
            return 'prod'
        }
        case 'development': {
            return 'dev'
        }
        default: {
            return 'qa'
        }
    }
}
