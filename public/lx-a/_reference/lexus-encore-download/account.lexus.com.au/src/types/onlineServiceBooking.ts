import { Address } from "Types/address";

export enum OnlineServiceBookingState {
    BOOK_A_SERVICE_FIRST_LOADING = "BOOK_A_SERVICE_FIRST_LOADING",
    BOOK_A_SERVICE_LANDING = "BOOK_A_SERVICE_LANDING",
    SUBURB_SEARCH = "SUBURB_SEARCH",
    SELECT_A_DEALER = "SELECT_A_DEALER",
    BOOK_A_SERVICE_CONFIRMATION = "BOOK_A_SERVICE_CONFIRMATION",
    BOOK_A_SERVICE_FLOW = "BOOK_A_SERVICE_FLOW",
}

export interface SuburbAutoCompleteResponse {
    postcode: string;
    suburb: string;
    state: string;
    pricingZone: string;
}

export interface DealerLookupResponse {
    dealerCode: string;
    name: string;
    address: DealerLookupAddress;
    generalEndpoints: DealerLookupGeneralEndpoints;
    serviceTypes: DealerLookupServiceTypes[];
}

export interface DealerLookupAddress {
    street: string;
    suburb: string;
    state: string;
    postcode: string;
    latitude: number;
    longitude: number;
}

export interface DealerLookupGeneralEndpoints {
    phone: string;
    email: string;
}

export interface DealerLookupServiceTypes {
    name: string;
    comments: string;
    operatingHours: OperatingHoursData[];
}

export interface OperatingHoursData {
    day: string;
    openingTime: string;
    closingTime: string;
    closed: "" | "true";
}

export interface DealerDetails {
    dealerName: string;
    dealerPhone?: string | null;
    dealerDistance?: string;
    dealerAddress: DealerLookupAddress;
    dealerOpeningHours?: OperatingHoursData[];
}

export interface OnlineServiceBookingPayload {
    selectedAddress?: Address;
    selectedDealer?: DealerDetails;
}
