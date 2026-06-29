import { LoadStatus } from "../types/loadStatus";
import { VinOrRegistrationType, VehicleUnitPayload } from "../types/vehicle";
import { StateOrTerritory } from "../types/stateAndTerritory";
import { vehicleUnitUrl, vehicleUnitByVinUrl, associateVehicleUrl, createVehicleCaseUrl } from "../apiHref";
import {
    FetchActionPayload,
    createFetchThunk,
    PromiseThunk,
    fetchActionToLoadStatus,
    FetchAction,
    FetchContainer,
    initialFetchContainer,
    getFetchContainerValue,
    getFetchActionPayloadValue,
    fetchActionPayloadToContainer,
} from "../helpers/fetch";
import { Dispatch, StateSelector } from "../types/general";
import { fetchVehiclesThunk } from "./vehicle";
import { RootLevelAction } from "./rootLevelAction";
import { createSelector } from "reselect";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setEncoreTier } from "ReduxSlices/user";
import { getLatestVerifiedVehicle, isEncorePackageErrorProp } from "Helpers/vehicle";
import { parseDateString } from "Helpers/dateTime";
import { getEncorePackageGroups } from "Hooks/useEncorePackageGroups";

export interface RegistrationData {
    registration: string;
    stateOrTerritory?: StateOrTerritory;
}

export interface VinData {
    vin: string;
}

export interface CreateCaseData {
    brand: string;
    caseNumber: string;
    errCode: string;
    errorDesc: string;
    recordId: string;
    success: string;
}

type SetVehicleAssociationUnitPayload = VinOrRegistrationType;
type SetAddTypePayload = VinOrRegistrationType | undefined;
type SetRegistrationDataPayload = RegistrationData;
type SetVinDataPayload = VinData;

type RegistrationVehicleFetchActionPayload = FetchActionPayload<VehicleUnitPayload>;
type VinVehicleFetchActionPayload = FetchActionPayload<VehicleUnitPayload>;
type AssociateVehicleFetchActionPayload = FetchActionPayload<undefined>;
type SetCaseNumberPayload = FetchActionPayload<CreateCaseData>;

type RegistrationVehicleFetchContainer = FetchContainer<VehicleUnitPayload>;
type VinVehicleFetchContainer = FetchContainer<VehicleUnitPayload>;

export enum AddVehicleFlowAction {
    FetchRegistrationVehicle = "fetchRegistrationVehicle",
    FetchVinVehicle = "fetchVinVehicle",
    ClearAddVehicleFlow = "clearAddVehicleFlow",
    AssociateVehicle = "associateVehicle",
    SetVehicleAssociationUnit = "setVehicleAssociationUnit",
    SetAddType = "setAddType",
    SetRegistrationData = "setRegistrationData",
    ResetRegistrationData = "resetRegistrationData",
    SetVinData = "setVinData",
    SetupVehicleAdd = "setupVehicleAdd",
    SetCaseNumber = "setCaseNumber",
}

export interface AddVehicleFlowState {
    registrationVehicle: RegistrationVehicleFetchContainer;
    vinVehicle: VinVehicleFetchContainer;
    vehicleAssociation: {
        unit?: VehicleUnitPayload;
        status: LoadStatus;
        by?: VinOrRegistrationType;
        error?: Error;
        caseNumber?: string;
    };
    addType?: VinOrRegistrationType;
    registrationData: RegistrationData;
    vinData: VinData;
}

export const initialAddVehicleFlowState: AddVehicleFlowState = {
    registrationVehicle: initialFetchContainer,
    vinVehicle: initialFetchContainer,
    vehicleAssociation: {
        status: LoadStatus.NotStarted,
    },
    registrationData: { registration: "" },
    vinData: { vin: "" },
};

export const fetchRegistrationVehicleThunk =
    (registration: string, state: StateOrTerritory): PromiseThunk<VehicleUnitPayload> =>
    async dispatch => {
        const uri = (await vehicleUnitUrl()).replace("{rego}", registration).replace("{state}", state);
        const url = new URL(uri);
        return dispatch(createFetchThunk(url.href, fetchRegistrationVehicle));
    };

export const fetchVinVehicleThunk =
    (vin: string): PromiseThunk<VehicleUnitPayload> =>
    async dispatch => {
        const url = new URL(`${await vehicleUnitByVinUrl()}/${vin}`);
        return dispatch(createFetchThunk(url.href, fetchVinVehicle));
    };

export const associateVehicleThunk =
    (SfId: string, vin: string): PromiseThunk<void, Record<string, unknown>> =>
    async (dispatch: Dispatch<Record<string, unknown>>) => {
        const url = await associateVehicleUrl();
        const thunk = createFetchThunk(url, associateVehicle, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ vin, SfId }),
        });
        dispatch(thunk).finally(() => {
            dispatch(fetchVehiclesThunk).then(vehicles => {
                const vehicle = getLatestVerifiedVehicle(vehicles);
                const { currentEncorePackage } = getEncorePackageGroups(vehicle?.encorePackages);
                const startDate = !isEncorePackageErrorProp(currentEncorePackage)
                    ? parseDateString(currentEncorePackage?.packageStartDate)
                    : null;
                const expiryDate = !isEncorePackageErrorProp(currentEncorePackage)
                    ? parseDateString(currentEncorePackage?.packageExpiryDate)
                    : null;
                const now = new Date();

                if (
                    currentEncorePackage &&
                    !isEncorePackageErrorProp(currentEncorePackage) &&
                    startDate &&
                    expiryDate &&
                    now > startDate &&
                    now < expiryDate
                )
                    dispatch(setEncoreTier(currentEncorePackage.encoreTier));
            });
        });
    };

export const createAssociateVehicleCaseThunk =
    (SfId: string, vin: string, errorCode: string): PromiseThunk<void, Record<string, unknown>> =>
    async (dispatch: Dispatch<Record<string, unknown>>) => {
        const url = await createVehicleCaseUrl();
        await dispatch(
            createFetchThunk(url, setCaseNumber, {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({ vin, sfId: SfId, creationReason: errorCode }),
            })
        );
    };

const registrationVehicleContainerSelector: StateSelector<RegistrationVehicleFetchContainer> = state =>
    state.addVehicleFlow.registrationVehicle;

export const registrationVehicleLoadStatusSelector: StateSelector<LoadStatus> = state =>
    registrationVehicleContainerSelector(state).status;

export const registrationVehicleUnitSelector: StateSelector<VehicleUnitPayload | undefined> = createSelector(
    registrationVehicleContainerSelector,
    getFetchContainerValue
);

const vinVehicleContainerSelector: StateSelector<VinVehicleFetchContainer> = state => state.addVehicleFlow.vinVehicle;

export const vinVehicleLoadStatusSelector: StateSelector<LoadStatus> = state =>
    vinVehicleContainerSelector(state).status;

export const vinVehicleUnitSelector: StateSelector<VehicleUnitPayload | undefined> = createSelector(
    vinVehicleContainerSelector,
    getFetchContainerValue
);

export const vehicleAssociationUnitSelector: StateSelector<VehicleUnitPayload | undefined> = state =>
    state.addVehicleFlow.vehicleAssociation.unit;

export const vehicleAssociationStatusSelector: StateSelector<LoadStatus> = state =>
    state.addVehicleFlow.vehicleAssociation.status;

export const vehicleAssociationBySelector: StateSelector<VinOrRegistrationType | undefined> = state =>
    state.addVehicleFlow.vehicleAssociation.by;

export const addTypeSelector: StateSelector<VinOrRegistrationType | undefined> = state => state.addVehicleFlow.addType;

export const registrationDataSelector: StateSelector<RegistrationData> = state => state.addVehicleFlow.registrationData;

export const vinDataSelector: StateSelector<VinData> = state => state.addVehicleFlow.vinData;

export const vehicleErrorSelector: StateSelector<Error | undefined> = state =>
    state.addVehicleFlow.vehicleAssociation.error;

export const vehicleErrorCaseNumberSelector: StateSelector<string | undefined> = state =>
    state.addVehicleFlow.vehicleAssociation.caseNumber;

const vehicleFlowSlice = createSlice({
    name: "vehicleFlow",
    initialState: initialAddVehicleFlowState,
    reducers: {
        [AddVehicleFlowAction.FetchRegistrationVehicle]: (
            state,
            action: PayloadAction<RegistrationVehicleFetchActionPayload>
        ) => {
            state.registrationVehicle = fetchActionPayloadToContainer(action.payload);
        },
        [AddVehicleFlowAction.FetchVinVehicle]: (state, action: PayloadAction<VinVehicleFetchActionPayload>) => {
            state.vinVehicle = fetchActionPayloadToContainer(action.payload);
        },
        [AddVehicleFlowAction.ClearAddVehicleFlow]: () => initialAddVehicleFlowState,
        [AddVehicleFlowAction.AssociateVehicle]: (state, action: PayloadAction<AssociateVehicleFetchActionPayload>) => {
            state.vehicleAssociation.status = fetchActionToLoadStatus(action.payload.action);
            state.vehicleAssociation.error =
                action.payload.action === FetchAction.Failure ? action.payload.value : undefined;
        },
        [AddVehicleFlowAction.SetVehicleAssociationUnit]: (
            state,
            action: PayloadAction<SetVehicleAssociationUnitPayload>
        ) => {
            const unit =
                action.payload === VinOrRegistrationType.VIN && state.vinVehicle.status === LoadStatus.Success
                    ? getFetchContainerValue(state.vinVehicle)
                    : action.payload === VinOrRegistrationType.REGISTRATION &&
                      state.registrationVehicle.status === LoadStatus.Success
                    ? getFetchContainerValue(state.registrationVehicle)
                    : undefined;

            state.vehicleAssociation.status = LoadStatus.NotStarted;
            state.vehicleAssociation.unit = unit;
            state.vehicleAssociation.by = action.payload;
        },
        [AddVehicleFlowAction.SetAddType]: (state, action: PayloadAction<SetAddTypePayload>) => {
            state.addType = action.payload;
        },
        [AddVehicleFlowAction.SetRegistrationData]: (state, action: PayloadAction<SetRegistrationDataPayload>) => {
            state.registrationData = action.payload;
        },
        [AddVehicleFlowAction.ResetRegistrationData]: state => {
            state.registrationData = initialAddVehicleFlowState.registrationData;
            state.registrationVehicle = { ...initialAddVehicleFlowState.registrationVehicle };
        },
        [AddVehicleFlowAction.SetVinData]: (state, action: PayloadAction<SetVinDataPayload>) => {
            state.vinData = action.payload;
        },
        [AddVehicleFlowAction.SetCaseNumber]: (state, action: PayloadAction<SetCaseNumberPayload>) => {
            state.vehicleAssociation.status = LoadStatus.Failed;
            state.vehicleAssociation.caseNumber = getFetchActionPayloadValue(action.payload)?.caseNumber;
        },
        [AddVehicleFlowAction.SetupVehicleAdd]: state => {
            state.registrationVehicle = initialAddVehicleFlowState.registrationVehicle;
        },
        [RootLevelAction.Reset]: () => initialAddVehicleFlowState,
    },
});

export const {
    fetchRegistrationVehicle,
    fetchVinVehicle,
    setAddType,
    setRegistrationData,
    resetRegistrationData,
    setVinData,
    associateVehicle,
    clearAddVehicleFlow,
    setVehicleAssociationUnit,
    setupVehicleAdd,
    setCaseNumber,
} = vehicleFlowSlice.actions;

export const { reducer: vehicleFlowReducer } = vehicleFlowSlice;
