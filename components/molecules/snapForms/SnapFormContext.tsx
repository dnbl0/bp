import { useRouter } from 'next/router'
import React, {
    createContext,
    Dispatch,
    useContext,
    useEffect,
    useReducer,
} from 'react'
import { firstValue } from '../../../utils/firstValue'

interface State {
    formId: string | null | undefined
}

const initialState: State = {
    formId: undefined,
}

type ShowFormAction = {
    type: 'showForm'
    formId: string
}

type HideFormAction = {
    type: 'hideForm'
}

type Actions = ShowFormAction | HideFormAction

const reducer = (state: State, action: Actions): State => {
    const type = action.type

    switch (type) {
        case 'showForm':
            return { ...state, formId: action.formId }
        case 'hideForm':
            return { ...state, formId: null }
        default:
            throw new Error(`Action type not handled: "${type}"`)
    }
}

const DispatchContext = createContext<Dispatch<Actions>>(undefined as any)
const StateContext = createContext<State>(undefined as any)

const ContextProvider = ({ children }: { children?: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, undefined, () => initialState)
    const router = useRouter()

    useEffect(() => {
        const handleRouteChange = () => {
            const snapFormId = firstValue(router.query['snap'])
                ? firstValue(router.query['snap'])
                : firstValue(router.query['calendly'])
            if (snapFormId) {
                dispatch({ type: 'showForm', formId: snapFormId })
            } else {
                dispatch({ type: 'hideForm' })
            }
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => router.events.off('routeChangeComplete', handleRouteChange)
    }, [router])

    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                {children}
            </StateContext.Provider>
        </DispatchContext.Provider>
    )
}

export type SnapFormDispatch = Dispatch<Actions>

export const SnapFormContextProvider = ContextProvider

export const useSnapFormDispatch = (): SnapFormDispatch => {
    return useContext(DispatchContext)
}

export const useSnapFormState = () => useContext(StateContext)
