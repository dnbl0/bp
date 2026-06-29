import { AddVehicleFlowState, vehicleFlowReducer, initialAddVehicleFlowState } from "./addVehicleFlow";
import { GeneralState, generalReducer, initialGeneralState } from "./general";
import { PaymentsState, initialPaymentsState, paymentsReducer } from "./payments";
import { RewardState, initialRewardState, rewardReducer } from "./reward";
import { ValetState, initialValetState, valetReducer } from "./valet";
import { AirportLoungeState, initialAirportLoungeState, airportLoungeReducer } from "./airportLounge";
import { VehicleState, initialVehicleState, vehicleReducer } from "./vehicle";
import { initialOnDemandState, onDemandReducer } from "./onDemand/onDemandReducers";
import { initialUserState, userReducer } from "./user";

import { OnDemand } from "./onDemand/onDemandInterfaces";
import { User } from "./userInterfaces";
import { combineReducers, PayloadAction } from "@reduxjs/toolkit";
import { resetAll, RootLevelAction } from "./rootLevelAction";

export interface AppState {
    user: User;
    airportLounge: AirportLoungeState;
    valet: ValetState;
    addVehicleFlow: AddVehicleFlowState;
    reward: RewardState;
    onDemand: OnDemand;
    general: GeneralState;
    vehicle: VehicleState;
    payments: PaymentsState;
}

export const initialState: AppState = {
    user: initialUserState,
    airportLounge: initialAirportLoungeState,
    valet: initialValetState,
    addVehicleFlow: initialAddVehicleFlowState,
    reward: initialRewardState,
    onDemand: initialOnDemandState,
    general: initialGeneralState,
    vehicle: initialVehicleState,
    payments: initialPaymentsState,
};

export const appReducer = combineReducers({
    user: userReducer,
    airportLounge: airportLoungeReducer,
    valet: valetReducer,
    addVehicleFlow: vehicleFlowReducer,
    reward: rewardReducer,
    onDemand: onDemandReducer,
    general: generalReducer,
    vehicle: vehicleReducer,
    payments: paymentsReducer,
});

export const rootReducer = (state: AppState | undefined, action: PayloadAction) => {
    if (action.type === resetAll.type) {
        const { general, ...rest } = initialState;
        return appReducer({ general: state?.general, ...rest }, { type: RootLevelAction.Reset });
    }
    return appReducer(state, action);
};
