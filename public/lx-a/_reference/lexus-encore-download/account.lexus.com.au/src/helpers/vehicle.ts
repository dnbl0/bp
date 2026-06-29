import { Vehicle, VerifiedVehicle, VehicleStatus, VehicleUnitPayload } from "../types/vehicle";
import { maxBy } from "lodash";
import { Selector } from "reselect";
import { NotNullOrUndefined } from "../types/general";
import { na } from "../constants";
import { defaultMaxBookingDurationInDays } from "ReduxSlices/onDemand/onDemandConstants";
import { getEncorePackageGroups } from "Hooks/useEncorePackageGroups";
import { EncorePackageErrorProp } from "Types/vehicle";

// NOTE: hasVehicles is not the opposite of hasNoVehicles, same with isVerified and isUnverified

export const hasVehicles = (vehicles?: Vehicle[]): boolean => vehicles !== undefined && vehicles.length > 0;
export const isVerified = (vehicles?: Vehicle[]): boolean | undefined =>
    hasVehicles(vehicles) && vehicles && vehicles[0].status === VehicleStatus.Verified;
export const isUnverified = (vehicles?: Vehicle[]): boolean | undefined =>
    hasVehicles(vehicles) &&
    vehicles &&
    (!("status" in vehicles[0]) || vehicles[0].status === VehicleStatus.Unverified);
export const hasNoVehicles = (vehicles?: Vehicle[]): boolean => vehicles !== undefined && vehicles.length === 0;
export const isMissingEncorePackage = (vehicle?: Vehicle): boolean => !vehicle?.encorePackages && !vehicle?.caseNumber;

export const getLatestVerifiedVehicle = (vehicles: Vehicle[]): VerifiedVehicle | undefined => {
    const verifiedVehicles = vehicles.filter(
        vehicle => vehicle.status === VehicleStatus.Verified
    ) as any as VerifiedVehicle[];
    const latestVehicle = maxBy(verifiedVehicles, v => {
        return new Date(vehicleFieldSelector(v, "deliveryDate"));
    });

    return latestVehicle;
};

export const getAllowedBookingDays = (vehicle?: Vehicle): number => {
    let allowedBookingDays = defaultMaxBookingDurationInDays;
    const { currentEncorePackage } = getEncorePackageGroups(vehicle?.encorePackages);
    if (
        !!currentEncorePackage &&
        !isEncorePackageErrorProp(currentEncorePackage) &&
        !!currentEncorePackage.numberofDays
    ) {
        allowedBookingDays = currentEncorePackage.numberofDays;
    }
    return allowedBookingDays;
};

type VehicleUnitPayloadSelector<T> = Selector<VehicleUnitPayload | undefined, T>;

export type AllowedFields = Omit<
    VehicleUnitPayload,
    "takata" | "dealerOffscheduleEnabled" | "nonToyotaEnabled" | "vehicleUnitLoadStatus"
>;
type DefaultVehicle = NotNullOrUndefined<AllowedFields>;
const defaultVehicle: DefaultVehicle = {
    registrationNumber: na,
    state: na,
    odometer: na,
    vin: na,
    images: [],
    model: na,
    grade: na,
    manufacturedYear: na,
    vehicleAge: na,
    deliveryDate: na,
    vehicleTypeCode: na,
    manufacturer: na,
    engineNumber: na,
    source: na,
    vehicleDescription: na,
    compliancePlate: na,
    paint: {
        code: na,
        description: na,
    },
    warrantyExpiryDate: na,
    ownerManualUrl: na,
};

export const vehicleFieldSelector = <K extends keyof AllowedFields>(
    vehicle: AllowedFields | undefined,
    field: K
): DefaultVehicle[K] => ((vehicle && vehicle[field]) || defaultVehicle[field]) as DefaultVehicle[K];

export const vehicleManufacturedYearSelector: VehicleUnitPayloadSelector<string> = vehicle =>
    vehicle && vehicle.manufacturedYear ? vehicle.manufacturedYear.split("-")[0] : "";

export const isEncorePackageErrorProp = (value: unknown): value is EncorePackageErrorProp => {
    return typeof value === "object" && value !== null && "errorMessage" in value;
};
