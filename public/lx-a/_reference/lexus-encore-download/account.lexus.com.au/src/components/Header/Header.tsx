import "./Header.scss";
import * as React from "react";
import { CollapseState, mobileSecondaryNavigationOpenSelector } from "ReduxSlices/general";
import HeaderPrimaryAndSecondary from "./HeaderPrimaryAndSecondary/HeaderPrimaryAndSecondary";
import classnames from "classnames";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import { useSelector } from "react-redux";
import { isStandAlone } from "Helpers/general";
import HeaderLogoOnly from "./HeaderLogoOnly/HeaderLogoOnly";

const bem = createBemFn("header");

interface HeaderProps {
    hideBackground?: boolean;
}

const Header: React.FC<React.PropsWithChildren<HeaderProps>> = ({ children, hideBackground = false }) => {
    const mobileSecondaryNavigationOpen = useSelector(mobileSecondaryNavigationOpenSelector);
    const mobileSecondaryNavigationShowHeaderBackground =
        mobileSecondaryNavigationOpen === CollapseState.Opening || mobileSecondaryNavigationOpen === CollapseState.Open;
    const standAlone = isStandAlone();

    return (
        <div
            className={classnames(bem(), {
                [bem(undefined, "hide-background")]: hideBackground && !mobileSecondaryNavigationShowHeaderBackground,
                [bem(undefined, "pwa-native-mode")]: standAlone,
            })}
        >
            {standAlone ? <HeaderLogoOnly /> : <HeaderPrimaryAndSecondary secondaryNavigation />}
            {children}
        </div>
    );
};

export default Header;
