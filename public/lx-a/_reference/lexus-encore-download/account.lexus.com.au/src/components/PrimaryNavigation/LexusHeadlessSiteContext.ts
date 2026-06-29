import { createContext } from "react";

export interface HeadlessSiteProps {
    publicUrl?: string;
    searchPage?: string;
    searchEntity?: string;
    searchIndexSource?: string[];
    searchCustomerKey?: string;
    searchEnv?: string;
    serverApiHost?: string;
    encoreBaseUrl?: string;
    loginUrl?: string;
    logoutUrl?: string;
    refreshUrl?: string;
    encoreVehicleUnitApiUrl?: string;
    encoreGuestApiUrl?: string;
}

type LexusHeadlessSiteContextProps = HeadlessSiteProps | null;

export const LexusHeadlessSiteContext = createContext<LexusHeadlessSiteContextProps>(null);
