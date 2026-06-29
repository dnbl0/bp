import "./SecondaryNavigationMenuMobile.scss";

import * as React from "react";

import {
    CollapseState,
    closeMobileSecondaryNavigationThunk,
    mobileSecondaryNavigationOpenSelector,
} from "ReduxSlices/general";
import { RouteSection, routeString } from "../../helpers/routes";
import {
    allSecondaryNavigationSecondaryItems,
    getSecondaryNavigationPrimaryItems,
} from "../SecondaryNavigation/secondaryNavigationItems";

import { OwnershipLinkInternalSize } from "../OwnershipLinkInternal/OwnershipLinkInternal";
import OwnershipLinkWithArrow from "../OwnershipLinkInternalWithArrow/OwnershipLinkInternalWithArrow";
import { breakpointNumeric } from "../../constants";
import classnames from "classnames";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import debounce from "lodash/debounce";
import { snakeToTitle } from "../../helpers/string";
import { useSelector } from "react-redux";
import { useThunkDispatch } from "../../hooks/thunk";
import { useVehicles } from "../../hooks/useVehicles";

const bem = createBemFn("secondary-navigation-menu-mobile");
const debounceTime = 250;

const SecondaryNavigationMenuMobile: React.FC = () => {
    //#region hooks
    const isOpen = useSelector(mobileSecondaryNavigationOpenSelector);
    const openOrOpening = isOpen === CollapseState.Open || isOpen === CollapseState.Opening;
    const ref = React.useRef<HTMLDivElement>(null);
    const vehicles = useVehicles(true);
    const dispatch = useThunkDispatch();

    const closeMobileSecondaryNavigation = () => dispatch(closeMobileSecondaryNavigationThunk);

    const getHeight = () =>
        ref.current !== null && openOrOpening ? window.innerHeight - ref.current.getBoundingClientRect().top : 0;

    React.useEffect(() => {
        const setHeight = () => {
            if (ref.current !== null) {
                const newHeight = getHeight();
                const currentHeight = ref.current.clientHeight;
                if (newHeight !== currentHeight) {
                    ref.current.style.height = `${newHeight}px`;
                }
            }
        };

        const onScroll = debounce(() => {
            setHeight();
        }, debounceTime);

        const onResize = debounce(() => {
            if (window.innerWidth >= breakpointNumeric) {
                closeMobileSecondaryNavigation();
            }

            setHeight();
        }, debounceTime);

        if (openOrOpening) {
            const app = document.getElementsByClassName("app").item(0);
            if (app !== null) {
                app.addEventListener("scroll", onScroll);
            }
            window.addEventListener("resize", onResize);
        }

        return () => {
            const app = document.getElementsByClassName("app").item(0);
            if (app !== null) {
                app.removeEventListener("scroll", onScroll);
            }
            window.removeEventListener("resize", onResize);
        };
    }, [isOpen]);
    //#endregion

    const height = getHeight();
    const openTransitionTimeIn = 600;
    const navigationItemTransitionGapIn = 70;

    const transitionDelay = (i: number) =>
        openOrOpening ? `${openTransitionTimeIn / 2 + i * navigationItemTransitionGapIn}ms` : "0ms";

    return (
        <div
            ref={ref}
            className={classnames(
                bem(),
                { [bem(undefined, "open")]: isOpen === CollapseState.Open },
                { [bem(undefined, "opening")]: isOpen === CollapseState.Opening }
            )}
            style={{ height }}
        >
            <nav className={bem("navigation")}>
                <div className={bem("navigation-primary")}>
                    {getSecondaryNavigationPrimaryItems(vehicles).map((item, i) => (
                        <OwnershipLinkWithArrow
                            className={bem("navigation-item")}
                            circleArrow={true}
                            href={routeString(item as RouteSection)}
                            onClick={closeMobileSecondaryNavigation}
                            size={OwnershipLinkInternalSize.ExtraLarge}
                            style={{ transitionDelay: transitionDelay(i) }}
                            key={item}
                        >
                            {snakeToTitle(item)}
                        </OwnershipLinkWithArrow>
                    ))}
                </div>
                <div className={bem("navigation-secondary")}>
                    {allSecondaryNavigationSecondaryItems.map((item, i) => (
                        <OwnershipLinkWithArrow
                            className={bem("navigation-item")}
                            size={OwnershipLinkInternalSize.Large}
                            href={routeString(item)}
                            onClick={closeMobileSecondaryNavigation}
                            circleArrow={true}
                            style={{
                                transitionDelay: transitionDelay(
                                    getSecondaryNavigationPrimaryItems(vehicles).length + i
                                ),
                            }}
                            key={item}
                        >
                            {snakeToTitle(item)}
                        </OwnershipLinkWithArrow>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default SecondaryNavigationMenuMobile;
