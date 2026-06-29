import {
    FetchAction,
    FetchActionPayload,
    FetchContainer,
    PromiseThunk,
    Thunk,
    fetchActionPayloadToContainer,
    getFetchContainerValue,
    initialFetchContainer,
    isLoadCompleted,
} from "Helpers/fetch";

import { LoadStatus } from "../types/loadStatus";
import { PrimaryNavRawData } from "@tmca/lexus-kit/css-in-js";
import { RootLevelAction } from "./rootLevelAction";
import { StateSelector } from "../types/general";
import WebFont from "webfontloader";
import { createSelector } from "reselect";
import { hasPath } from "Helpers/object";
import { makeLinksAbsolute } from "Components/PrimaryNavigation/makeLinksAbsolute";
import { settingsPromise } from "../settings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const collapseOpenTime = 600;
const collapseCloseTime = 600;
let collapseTimeout: NodeJS.Timeout | undefined;

export enum CollapseState {
    Closed = "Closed",
    Opening = "Opening",
    Open = "Open",
    Closing = "Closing",
}

type SetFontsLoadStatusPayload = LoadStatus;
export type PrimaryNavRawDataWithContext = {
    nav: PrimaryNavRawData & { settings?: { isTwoStepSearch?: { boolValue: boolean } } };
    context?: HeadlessSiteContextRaw;
};
type GetPrimaryNavigationDataFetchActionPayload = FetchActionPayload<PrimaryNavRawDataWithContext | undefined>;
type GetPrimaryNavigationDataFetchContainer = FetchContainer<PrimaryNavRawDataWithContext | undefined>;

type OpenPopTartPayload = string;

export enum GeneralAction {
    SetFontsLoadStatus = "setFontsLoadStatus",
    SetMobileSecondaryNavOpen = "setMobileSecondaryNavOpen",
    FooterIntersecting = "footerIntersecting",
    GetPrimaryNavigationData = "getPrimaryNavigationData",
    OpenPopTart = "openPopTart",
    ClosePopTart = "closePopTart",
    IsNativeApp = "isNativeApp",
    IsIFrame = "isIFrame",
    ToggleBenefitModal = "toggleBenefitsModal",
}

const fontsLoadStartedAction = () => setFontsLoadStatus(LoadStatus.InProgress);
const fontsLoadSuccessAction = () => setFontsLoadStatus(LoadStatus.Success);
const fontsLoadFailureAction = () => setFontsLoadStatus(LoadStatus.Failure);

export interface GeneralState {
    fontsLoadStatus: LoadStatus;
    mobileSecondaryNavOpen: CollapseState;
    footerIntersecting: boolean;
    primaryNavigation: GetPrimaryNavigationDataFetchContainer;
    popTart: string[];
    isNativeApp: boolean;
    isIFrame: boolean;
    showBenefitsModal: boolean;
}

export const initialGeneralState: GeneralState = {
    fontsLoadStatus: LoadStatus.NotStarted,
    mobileSecondaryNavOpen: CollapseState.Closed,
    footerIntersecting: true,
    primaryNavigation: initialFetchContainer,
    popTart: [],
    isNativeApp: false,
    isIFrame: false,
    showBenefitsModal: false,
};

export const closeMobileSecondaryNavigationThunk: Thunk<void> = (dispatch, getState) => {
    dispatch(setMobileSecondaryNavOpen(CollapseState.Closing));
    if (collapseTimeout !== undefined) {
        clearTimeout(collapseTimeout);
    }
    collapseTimeout = setTimeout(() => {
        const state = getState();
        const openState = mobileSecondaryNavigationOpenSelector(state);
        if (openState === CollapseState.Closing) {
            dispatch(setMobileSecondaryNavOpen(CollapseState.Closed));
        }
    }, collapseCloseTime);
};

export const openMobileSecondaryNavigationThunk: Thunk<void> = (dispatch, getState) => {
    dispatch(setMobileSecondaryNavOpen(CollapseState.Opening));
    if (collapseTimeout !== undefined) {
        clearTimeout(collapseTimeout);
    }
    collapseTimeout = setTimeout(() => {
        const state = getState();
        const openState = mobileSecondaryNavigationOpenSelector(state);
        if (openState === CollapseState.Opening) {
            dispatch(setMobileSecondaryNavOpen(CollapseState.Open));
        }
    }, collapseOpenTime);
};

export const loadFontsThunk: Thunk<void> = dispatch => {
    dispatch(fontsLoadStartedAction());

    WebFont.load({
        custom: {
            families: ["Nobel:n3,n4,n7"],
        },
        active: () => dispatch(fontsLoadSuccessAction()),
        inactive: () => dispatch(fontsLoadFailureAction()),
    });
};

type PrimaryNavContainerRendering = {
    componentName: string;
    placeholders: unknown;
};

type PrimaryNavRendering = {
    fields: {
        data: PrimaryNavRawData;
    };
};

type EncoreConfig = {
    encoreBaseUrl: {
        value: string;
    };
    loginUrl: {
        value: string;
    };
    logoutUrl: {
        value: string;
    };
    refreshUrl: {
        value: string;
    };
    encoreVehicleUnitApiUrl?: {
        value: string;
    };
    encoreGuestApiUrl?: {
        value: string;
    };
};

export type HeadlessSiteContextRaw = EncoreConfig & {
    config: {
        publicUrl: {
            value: string;
        };
        searchPage: {
            value: string;
        };
        searchEnv: {
            value: string;
        };
        searchCustomerKey: {
            value: string;
        };
        serverApiHost: {
            value: string;
        };
        searchIndexSource: {
            value: string;
        };
        searchEntity: {
            value: string;
        };
    };
};

type SharedSettingsRendering = {
    fields: {
        data: HeadlessSiteContextRaw;
    };
};

const isPrimaryNavContainerRendering = (rendering: unknown): rendering is PrimaryNavContainerRendering =>
    hasPath(rendering, "componentName") && rendering.componentName === "NavigationContainer";

const isPrimaryNavRendering = (rendering: unknown): rendering is PrimaryNavRendering =>
    hasPath(rendering, "fields.data.details") && !!rendering.fields.data.details;

const isSharedSettingsRendering = (rendering: unknown): rendering is SharedSettingsRendering =>
    hasPath(rendering, "fields.data.config") &&
    "componentName" in rendering &&
    rendering.componentName === "SharedSettings" &&
    !!rendering.fields.data.config;

const renderingDataSelectorSC10 = (d: unknown): PrimaryNavRawData | undefined => {
    try {
        const navPlaceholder = hasPath(
            d,
            "data.layout.item.rendered.sitecore.route.placeholders.headless-lexus-navigation"
        )
            ? d.data.layout.item.rendered.sitecore.route.placeholders["headless-lexus-navigation"]
            : undefined;

        const container = Array.isArray(navPlaceholder)
            ? navPlaceholder.find<PrimaryNavContainerRendering>(isPrimaryNavContainerRendering)
            : undefined;

        const placeholder = hasPath(container, "placeholders.headless-navigation-container")
            ? container.placeholders["headless-navigation-container"]
            : undefined;

        return Array.isArray(placeholder)
            ? placeholder.find<PrimaryNavRendering>(isPrimaryNavRendering)?.fields.data
            : undefined;
    } catch {
        return;
    }
};

const renderingContextSelectorSC10 = (d: unknown): HeadlessSiteContextRaw | undefined => {
    try {
        const navPlaceholder = hasPath(
            d,
            "data.layout.item.rendered.sitecore.route.placeholders.headless-lexus-navigation"
        )
            ? d.data.layout.item.rendered.sitecore.route.placeholders["headless-lexus-navigation"]
            : undefined;

        return Array.isArray(navPlaceholder)
            ? navPlaceholder.find<SharedSettingsRendering>(isSharedSettingsRendering)?.fields.data
            : undefined;
    } catch {
        return;
    }
};

export const getPrimaryNavigationDataThunk: PromiseThunk<void> = async dispatch => {
    dispatch(
        getPrimaryNavigationData({
            action: FetchAction.Fetch,
        })
    );
    try {
        const settings = await settingsPromise();

        let value: PrimaryNavRawDataWithContext | undefined;

        if (settings.general.primaryNavigationSC10ContentPath) {
            const mainsiteBaseUrl = settings.general.mainsiteBaseUrl
                ? settings.general.mainsiteBaseUrl
                : settings.general.lexusBrandBaseUrl;

            const data = await fetch(settings.general.bffBaseUrl + settings.general.primaryNavigationSC10ContentPath)
                .then((response: any) => response.json())
                .catch((error: Error) => {
                    throw new Error("Failed to fetch Primary Navigation Data");
                });
            const renderingData = renderingDataSelectorSC10(data);
            const contextData = renderingContextSelectorSC10(data);

            if (renderingData === undefined) {
                throw new Error("Failed to load Primary Navigation Data");
            }
            value = { nav: makeLinksAbsolute(mainsiteBaseUrl, renderingData), context: contextData };
        }

        dispatch(
            getPrimaryNavigationData({
                action: FetchAction.Success,
                value,
            })
        );
    } catch (e: unknown) {
        dispatch(
            getPrimaryNavigationData({
                action: FetchAction.Failure,
                value: e instanceof Error ? e : new Error("An unknown error occurred"),
            })
        );
    }
};

export const mobileSecondaryNavigationOpenSelector: StateSelector<CollapseState> = state =>
    state.general.mobileSecondaryNavOpen;

const fontsLoadStatusSelector: StateSelector<LoadStatus> = state => state.general.fontsLoadStatus;

export const fontLoadFinishedSelector = createSelector(fontsLoadStatusSelector, isLoadCompleted);

export const footerIntersectingSelector: StateSelector<boolean> = state => state.general.footerIntersecting;

const primaryNavigationContainerSelector: StateSelector<GetPrimaryNavigationDataFetchContainer> = state =>
    state.general.primaryNavigation;

export const primaryNavigationDataSelector: StateSelector<PrimaryNavRawDataWithContext | undefined> = createSelector(
    primaryNavigationContainerSelector,
    getFetchContainerValue
);

export const currentPopTartSelector: StateSelector<string | undefined> = state => state.general.popTart[0];

export const isNativeAppSelector: StateSelector<boolean> = state => state.general.isNativeApp;

export const isIFrameSelector: StateSelector<boolean> = state => state.general.isIFrame;

export const currentBenefitModalStatusSelector: StateSelector<boolean> = state => state.general.showBenefitsModal;

const generalSlice = createSlice({
    name: "general",
    initialState: initialGeneralState,
    reducers: {
        [GeneralAction.SetFontsLoadStatus]: (state, action: PayloadAction<SetFontsLoadStatusPayload>) => {
            state.fontsLoadStatus = action.payload;
        },
        [GeneralAction.SetMobileSecondaryNavOpen]: (state, action: PayloadAction<CollapseState>) => {
            state.mobileSecondaryNavOpen = action.payload;
        },
        [GeneralAction.FooterIntersecting]: (state, action: PayloadAction<boolean>) => {
            state.footerIntersecting = action.payload;
        },
        [GeneralAction.GetPrimaryNavigationData]: (
            state,
            action: PayloadAction<GetPrimaryNavigationDataFetchActionPayload>
        ) => {
            state.primaryNavigation = fetchActionPayloadToContainer(action.payload);
        },
        [GeneralAction.OpenPopTart]: (state, action: PayloadAction<OpenPopTartPayload>) => {
            state.popTart = [...state.popTart, action.payload];
        },
        [GeneralAction.ClosePopTart]: state => {
            state.popTart = state.popTart.slice(1);
        },
        [GeneralAction.IsNativeApp]: (state, action: PayloadAction<boolean>) => {
            state.isNativeApp = action.payload;
        },
        [GeneralAction.IsIFrame]: (state, action: PayloadAction<boolean>) => {
            state.isIFrame = action.payload;
        },
        [GeneralAction.ToggleBenefitModal]: (state, action: PayloadAction<boolean>) => {
            state.showBenefitsModal = action.payload;
        },
        [RootLevelAction.Reset]: state => ({
            ...initialGeneralState,
            fontsLoadStatus: state.fontsLoadStatus,
            primaryNavigation: state.primaryNavigation,
        }),
    },
});

export const {
    setFontsLoadStatus,
    footerIntersecting,
    setMobileSecondaryNavOpen,
    isNativeApp,
    getPrimaryNavigationData,
    isIFrame,
    openPopTart,
    toggleBenefitsModal,
    closePopTart,
} = generalSlice.actions;

export const { reducer: generalReducer } = generalSlice;
