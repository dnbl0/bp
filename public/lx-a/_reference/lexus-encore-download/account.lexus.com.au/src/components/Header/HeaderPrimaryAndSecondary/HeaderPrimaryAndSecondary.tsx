import "./HeaderPrimaryAndSecondary.scss";

import * as React from "react";

import SecondaryNavigation from "../../../components/SecondaryNavigation/SecondaryNavigation";
import SecondaryNavigationMenuMobile from "../../../components/SecondaryNavigationMenuMobile/SecondaryNavigationMenuMobile";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import PrimaryNavigationSC10 from "../../PrimaryNavigation/PrimaryNavigationSC10";
import { useSettingsPromise } from "../../../hooks/usePromiseState";
import { BreakpointContext } from "../../../context/BreakpointContext";

const bem = createBemFn("header-primary-and-secondary");

interface Props {
    secondaryNavigation?: boolean;
}

const HeaderPrimaryAndSecondary: React.FC<Props> = ({ secondaryNavigation = false }) => {
    const primaryNavigationSC10ContentPath = useSettingsPromise(
        settings => settings.general.primaryNavigationSC10ContentPath
    );
    const isMobile = React.useContext(BreakpointContext);

    return (
        <div className={bem()}>
            {primaryNavigationSC10ContentPath && <PrimaryNavigationSC10 />}
            {!isMobile && <SecondaryNavigation />}
            {secondaryNavigation && <SecondaryNavigationMenuMobile />}
        </div>
    );
};

export default HeaderPrimaryAndSecondary;
