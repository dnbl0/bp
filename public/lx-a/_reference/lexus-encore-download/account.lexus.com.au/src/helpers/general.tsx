import { Capacitor } from "@capacitor/core";
import * as React from "react";
import { BreakpointContext } from "../context/BreakpointContext";

export const createSwitchMobileDesktopComponent: (mobile: React.ReactNode, desktop: React.ReactNode) => React.FC =
    (mobile, desktop) => () => {
        const isMobile = React.useContext(BreakpointContext);
        return isMobile ? <>{mobile}</> : <>{desktop}</>;
    };

const mqStandAlone = "(display-mode: standalone)";
export const getAppMode = (): "browser" | "standalone" | string => {
    let appMode: "browser" | "standalone" = "browser";
    let platform = "web";

    // Should return 'web', 'ios' or 'android'
    platform = Capacitor.getPlatform();
    if (
        window.matchMedia(mqStandAlone).matches ||
        ("standalone" in window.navigator && !!window.navigator.standalone) ||
        document.referrer.includes("android-app://")
    ) {
        appMode = "standalone";
    }
    return platform === "web" ? appMode : platform;
};

// Return true if running as app or PWA
export const isStandAlone = (): boolean => {
    switch (getAppMode()) {
        case "ios":
        case "android":
        case "standalone":
            return true;
        default:
            return false;
    }
    // return getAppMode() === "standalone";
};
