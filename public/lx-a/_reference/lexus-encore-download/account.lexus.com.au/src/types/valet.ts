import { State, Territory } from "./stateAndTerritory";

export enum ValetProviderName {
    WESTFIELD = "Westfield",
    QANTAS = "Qantas",
    CHADSTONE = "Chadstone Shopping Centre",
    CHATSWOOD_CHASE = "Chatswood Chase",
    PLAYFORD = "The Playford Hotel",
    PACIFIC_FAIR = "Pacific Fair Shopping Centre",
    KARRINYUP = "Karrinyup Shopping Centre",
    HIGHPOINT = "Highpoint Shopping Centre",
}

export interface ValetProviderLocation {
    id: string;
    name: string;
    street: string;
    city: string;
    state: State | Territory;
    postcode: string;
    phone: string;
    branchLocation: string;
    valetEntryPoint: string;
    lat: number;
    lon: number;
    valetDescription: string;
    shoppingCenter: string;
}

export interface ValetProvider {
    id: string;
    name: ValetProviderName;
    category: string;
    defaultAllocation: number;
    locations: ValetProviderLocation[];
    redemptionsLeft?: number;
    offerType: string;
}

export interface ValetProviderBalance {
    partnerId: string;
    balance: number;
    expiration: string;
    rego: string;
    model: string;
}
