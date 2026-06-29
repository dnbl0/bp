import { partition } from "lodash";
import { AccountStatus } from "../accountStatus";
import { Vehicle, VehicleStatus } from "../types/vehicle";
import {
    salesforceErrorCode601,
    salesforceErrorCode602,
    salesforceErrorCode609,
    salesforceErrorCode614,
} from "../constants";
import { useSettingsPromise } from "../hooks/usePromiseState";

export const getAccountStatus = (vehicles: Pick<Vehicle, "status">[] | undefined): AccountStatus => {
    const vehicleArrays = partition(vehicles, v => {
        return "status" in v && v.status.toLowerCase() === VehicleStatus.Verified.toLowerCase();
    });

    const numberOfVerifiedVehicles = vehicleArrays[0].length;
    const numberOfUnverifiedVehicles = vehicleArrays[1].length;

    if (numberOfUnverifiedVehicles === 1) {
        return AccountStatus.HasOneUnverifiedVehicle;
    }

    if (numberOfVerifiedVehicles >= 1) {
        return AccountStatus.HasOneOrMoreVerifiedVehicles;
    }

    return AccountStatus.HasNoVehicles;
};

export const isErrorCodeOfMagicLink = (errorCode: number): boolean => {
    return [salesforceErrorCode601, salesforceErrorCode602, salesforceErrorCode609, salesforceErrorCode614].includes(
        errorCode
    );
};

export const IsDummyAccount = (accountId?: string): boolean => {
    const dummyAccounts = useSettingsPromise(settings => settings.dummyAccounts);
    return !!(dummyAccounts?.length && accountId && dummyAccounts.some(account => account.id === accountId));
};
