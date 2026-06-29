import { stringEnumToArray } from "lexus-style-guide/Components/helpers/enum";

export enum State {
    NSW = "new south wales",
    WA = "western australia",
    QLD = "queensland",
    SA = "south australia",
    VIC = "victoria",
    TAS = "tasmania",
}

export const allStates = stringEnumToArray(State).sort();

export enum Territory {
    ACT = "australian capital territory",
    NT = "northern territory",
}

export enum Country {
    NZ = "new zealand",
}

export const allTerritories = stringEnumToArray(Territory).sort();

export type StateOrTerritory = keyof typeof State | keyof typeof Territory;

export type StateOrTerritoryOrCountry = keyof typeof State | keyof typeof Territory | keyof typeof Country;

export const StateAndTerritory = { ...State, ...Territory };

export const StateAndTerritoryAndCountry = { ...State, ...Territory, ...Country };

export const allStatesAndTerritories = stringEnumToArray(StateAndTerritory).sort();

export const stringToStateOrTerritory = (searchKey: string): StateOrTerritory | undefined => {
    const result = allStatesAndTerritories.find(x => x.key === searchKey);
    if (result) {
        return result.key as StateOrTerritory;
    }
    return undefined;
};

export const allRegions = stringEnumToArray(StateAndTerritoryAndCountry).sort();

export const stringToRegion = (searchKey: string): StateOrTerritoryOrCountry | undefined => {
    const result = allRegions.find(x => x.key === searchKey);
    if (result) {
        return result.key as StateOrTerritoryOrCountry;
    }
    return undefined;
};
