import * as React from "react";
import PrimaryNavInternal from "./PrimaryNavInternal/PrimaryNavInternal";
import MainNavContainerInternal from "./MainNavContainerInternal/MainNavContainerInternal";

export enum LexusComponents {
    PrimaryNav = "LexusComponents.Feature.SiteNavigation.ScPrimaryNav",
    MainNavContainer = "LexusComponents.Feature.SiteNavigation.ScMainNavContainer",
}

const LexusComponentFactory = (componentName: string): React.FC<any> | React.Component<any> | JSX.Element | null => {
    switch (componentName) {
        case LexusComponents.PrimaryNav:
            return PrimaryNavInternal;
        case LexusComponents.MainNavContainer:
            return MainNavContainerInternal;
        default:
            return null;
    }
};

export default LexusComponentFactory;
