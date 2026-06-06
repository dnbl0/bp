import React, { createContext, Dispatch, useContext, useReducer } from 'react'
import { NavigationLink } from '../../../../types/navigationLink'

type Anchor = {
    id: string
    element: HTMLDivElement
}

type State = {
    anchors: Anchor[]
    links: NavigationLink[]
    activeAnchorId: string | null
}

const initialState: State = {
    anchors: [],
    links: [],
    activeAnchorId: null,
}

type UpdateAnchorAction = {
    type: 'updateAnchor'
    isVisible: boolean
    anchor: Anchor
}

type UpdateLinksAction = {
    type: 'updateLinks'
    links: NavigationLink[]
}

type Actions = UpdateAnchorAction | UpdateLinksAction

const reducer = (state: State, action: Actions) => {
    const type = action.type
    switch (type) {
        case 'updateAnchor':
            return handleUpdateAnchor(state, action)
        case 'updateLinks':
            return handleUpdateLinks(state, action)
        default:
            throw new Error(`Action type not handled: "${type}"`)
    }
}

const DispatchContext = createContext<Dispatch<Actions>>(undefined as any)
const StateContext = createContext<State>(undefined as any)

const ContextProvider = ({ children }: { children?: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                {children}
            </StateContext.Provider>
        </DispatchContext.Provider>
    )
}

const handleUpdateAnchor = (
    state: State,
    action: UpdateAnchorAction
): State => {
    const { isVisible, anchor: changedAnchor } = action

    const mergedAnchors: Anchor[] = isVisible
        ? [...state.anchors, changedAnchor]
        : state.anchors.filter(anchor => anchor.id !== changedAnchor.id)

    const sortedAnchors = mergedAnchors.sort((a, b) => {
        const topA = a.element.getBoundingClientRect().top
        const topB = b.element.getBoundingClientRect().top
        return topA - topB
    })

    const activeAnchorId = getActiveAnchorId(
        state.activeAnchorId,
        sortedAnchors,
        state.links
    )

    return {
        ...state,
        anchors: sortedAnchors,
        activeAnchorId,
    }
}

const handleUpdateLinks = (state: State, action: UpdateLinksAction) => {
    const { links } = action

    const activeAnchorId = getActiveAnchorId(
        state.activeAnchorId,
        state.anchors,
        links
    )

    return {
        ...state,
        links,
        activeAnchorId,
    }
}

const getActiveAnchorId = (
    currentActiveAnchorId: string | null,
    sortedAnchors: Anchor[],
    links: NavigationLink[]
) => {
    const nextActiveAnchorId = getFirstAnchorId(sortedAnchors, links)
    return nextActiveAnchorId || currentActiveAnchorId
}

const getFirstAnchorId = (
    sortedAnchors: Anchor[],
    links: NavigationLink[]
): string | null => {
    const filteredAnchors = sortedAnchors.filter(anchor =>
        links.find(link => link.href === `#${anchor.id}`)
    )
    const firstAchor = filteredAnchors.shift()
    return firstAchor ? firstAchor.id : null
}

export const NavigationBarContextProvider = ContextProvider
export const useNavigationBarDispatch = () => useContext(DispatchContext)
export const useNavigationBarState = () => useContext(StateContext)
