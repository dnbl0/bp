import "./SecondaryNavigation.scss";

import * as React from "react";

import {
    CollapseState,
    closeMobileSecondaryNavigationThunk,
    mobileSecondaryNavigationOpenSelector,
    openMobileSecondaryNavigationThunk,
} from "ReduxSlices/general";

import { NavLink } from "react-router-dom";
import OuterGrid from "../OuterGrid/OuterGrid";
import { RouteSection } from "../../helpers/routes";
import { SVGBentoAnimated } from "lexus-style-guide/Components/SVGIcons/icons/animated/SVGBentoAnimated";
import { SVGIconButton } from "lexus-style-guide/Components/SVGIcons/SVGIconButton";
import SecondaryNavigationLink from "./SecondaryNavigationLink/SecondaryNavigationLink";
import SecondaryNavigationLinks from "./SecondaryNavigationLinks/SecondaryNavigationLinks";
import { Theme } from "lexus-style-guide/Components/shared/Theme";
import classnames from "classnames";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import { featuredSecondaryNavigationItem } from "./secondaryNavigationItems";
import { firstNameSelector } from "ReduxSlices/user";
import { removeDash } from "../../helpers/string";
import { routeString } from "../../helpers/routes";
import { useSelector } from "react-redux";
import { useThunkDispatch } from "../../hooks/thunk";

const bem = createBemFn("secondary-navigation");

const SecondaryNavigation: React.FC = () => {
    //#region hooks
    const firstName = useSelector(firstNameSelector);
    const mobileSecondaryNavigationIsOpen = useSelector(mobileSecondaryNavigationOpenSelector);
    const dispatch = useThunkDispatch();
    //#endregion

    const mobileSecondaryNavigationOpenOrOpening =
        mobileSecondaryNavigationIsOpen === CollapseState.Open ||
        mobileSecondaryNavigationIsOpen === CollapseState.Opening;
    const toggleMobileNav = () => {
        if (mobileSecondaryNavigationOpenOrOpening) {
            dispatch(closeMobileSecondaryNavigationThunk);
        } else {
            dispatch(openMobileSecondaryNavigationThunk);
        }
    };

    return (
        <OuterGrid className={bem()}>
            <div className={bem("main")}>
                <div className={bem("featured-link")}>
                    <SecondaryNavigationLink
                        className={classnames(bem("featured-link-link"), bem("featured-link-link", "desktop"))}
                        to={routeString(featuredSecondaryNavigationItem)}
                    >
                        {removeDash(featuredSecondaryNavigationItem)}
                    </SecondaryNavigationLink>
                    <NavLink
                        className={classnames(
                            bem("featured-link-link"),
                            bem("featured-link-link", "mobile"),
                            "link-uppercase"
                        )}
                        to={routeString(RouteSection.Dashboard)}
                    >
                        <span className={bem("featured-link-text")}>{firstName}</span>
                    </NavLink>
                </div>
                <SecondaryNavigationLinks />
                <SVGIconButton
                    stackOnMobile={true}
                    theme={Theme.DARK}
                    className={bem("mobile-menu__icon")}
                    onClick={toggleMobileNav}
                >
                    <SVGBentoAnimated active={mobileSecondaryNavigationOpenOrOpening} width={28} height={28} />
                </SVGIconButton>
            </div>
        </OuterGrid>
    );
};

export default SecondaryNavigation;
