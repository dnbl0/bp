import { IS_DEMO_USER } from "src/constants";
import endpointPatterns from "../assets/json/demo-endpoint-patterns.json";

enum DemoEndpoints {
    GuestDetails = "guest-details.json",
    GetGuestVehicle = "getguestvehicle.json",
    OnDemand = "ondemand.json",
    VehicleByVin = "vehicle-unit-by-vin.json",
    AirportLoungeBalance = "airport-lounge-balance.json",
    ValetBalance = "valet-balance.json",
    AllRewards = "all-rewards.json",
    OnDemandBookings = "ondemand-bookings.json",
    ValetPartners = "valet-partners.json",
    OnDemandLocations = "ondemand-locations.json",
    OnDemandVehicles = "ondemand-vehicles.json",
    Payments = "payments.json",
    Bookings = "bookings.json",
    Empty = "empty.json",
}

const DEMO_JSON_PUBLIC_FOLDER = "/demo/json/";

export function isDemoUser(): boolean {
    return sessionStorage.getItem(IS_DEMO_USER) === "true";
}

// Precompile regex patterns once
const compiledEndpointPatterns = endpointPatterns
    ? endpointPatterns.map((entry: { pattern: string; filename: string }) => ({
          regex: new RegExp(entry.pattern),
          filename: entry.filename,
      }))
    : [];

export const guestServiceDemoUser = (): string => {
    return DEMO_JSON_PUBLIC_FOLDER + DemoEndpoints.GuestDetails;
};

const getDemoApiEndpoint = (endPoint: RequestInfo): string => {
    const endPointString = endPoint instanceof Request ? endPoint.url.toLowerCase() : endPoint.toLowerCase();
    for (const entry of compiledEndpointPatterns) {
        if (entry.regex.test(endPointString)) {
            return entry.filename;
        }
    }
    return DemoEndpoints.Empty;
};

export const getDemoResponse = (endPoint: RequestInfo): Promise<Response> => {
    const demoApiEndpoint = DEMO_JSON_PUBLIC_FOLDER + getDemoApiEndpoint(endPoint);
    return fetch(demoApiEndpoint);
};
