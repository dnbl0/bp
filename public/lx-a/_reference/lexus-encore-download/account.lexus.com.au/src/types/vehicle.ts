import { UserEncoreTiers } from "Helpers/users";
import { LoadStatus } from "./loadStatus";

export enum VinOrRegistrationType {
    REGISTRATION = "registration",
    VIN = "vin",
}

export interface VehicleImage {
    size: string;
    materialCode: string;
    link: string;
}

export enum VehicleStatus {
    Verified = "Verified",
    Unverified = "Unverified",
    Error = "Error",
}

export enum EncorePackagePaymentStatus {
    PaymentPending = "Payment Pending",
    PaymentCompleted = "Payment Completed",
    PaymentFailed = "Payment Failed",
    Eligible = "Eligible",
    NotEligible = "Not Eligible",
    PaylinkExpired = "Paylink Expired",
}
export interface EncorePackageProps {
    numberofDays: number | null;
    packageTypeStatus: string;
    packageStartDate: string;
    packageExpiryDate: string;
    encoreTier: UserEncoreTiers;
    message: string | null;
    packagePaymentStatus: EncorePackagePaymentStatus;
    paymentTransactionId: string | null;
    packagePurchasePaylink: string | null;
    paylinkExpiryDate: string | null;
}

export interface EncorePackageErrorProp {
    errorMessage: string;
}

export interface VehicleUnitPayload {
    registrationNumber?: string;
    state?: string;
    odometer?: string;
    vin?: string;
    images?: VehicleImage[];
    model?: string;
    grade?: string;
    manufacturedYear?: string;
    vehicleAge?: string;
    deliveryDate?: string;
    vehicleTypeCode?: string;
    manufacturer?: string;
    engineNumber?: string;
    takata?: {
        takataStatus?: string;
        takataExpires?: string;
        takataPRA?: string;
        takataCampaignCode?: string;
    };
    source?: string;
    dealerOffscheduleEnabled?: boolean;
    nonToyotaEnabled?: boolean;
    vehicleDescription?: string;
    compliancePlate?: string;
    paint?: {
        code?: string;
        description?: string;
    };
    warrantyExpiryDate?: string;
    vehicleUnitLoadStatus?: LoadStatus;
    ownerManualUrl?: string;
}

export interface GuestVehicle<Status extends VehicleStatus = VehicleStatus> {
    model: string;
    registration: string;
    vin: string;
    status: Status;
    vehicleOwnershipId: string;
    caseNumber: Status extends VehicleStatus.Unverified ? string : undefined;
    encorePackages: EncorePackageProps | EncorePackageProps[] | EncorePackageErrorProp | null;
}

export type VerifiedVehicle = GuestVehicle<VehicleStatus.Verified> & VehicleUnitPayload;

export type UnverifiedVehicle = GuestVehicle<VehicleStatus.Unverified>;

export type ErrorVehicle = GuestVehicle<VehicleStatus.Error>;

export type Vehicle = VerifiedVehicle | UnverifiedVehicle | ErrorVehicle;
