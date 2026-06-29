import classnames from "classnames";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import * as React from "react";
import { useSelector } from "react-redux";
import { CollapseState, mobileSecondaryNavigationOpenSelector } from "ReduxSlices/general";
import { guestDetailsSelector, guestErrorSelector } from "ReduxSlices/user";
import { ClassNameProp } from "Types/general";
import Spinner from "../Spinner/Spinner";
import "./Page.scss";
import PWANavigation from "Components/PWANavigation/PWANavigation";
import { DemoBanner } from "Components/DemoBanner/DemoBanner";
import { isDemoUser } from "Helpers/demoUser";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { useDemoBannerHeight } from "Hooks/helpers";

const bem = createBemFn("page");

interface Props extends ClassNameProp {
    title: string;
    lockScroll?: boolean;
}

const Page: React.FC<React.PropsWithChildren<Props>> = ({
    children,
    title,
    lockScroll: lockScrollProp = false,
    className,
}) => {
    //#region hooks
    const guestDetails = useSelector(guestDetailsSelector);
    const guestDetailsError = useSelector(guestErrorSelector);
    const mobileSecondaryNavigationOpen = useSelector(mobileSecondaryNavigationOpenSelector) !== CollapseState.Closed;
    const isDemo = isDemoUser();
    const bannerHeightRef = useRef<number>(0);

    useDemoBannerHeight(bannerHeightRef);
    useEffect(() => {
        document.title = `Lexus - ${title}`;
    }, [title]);
    //#endregion

    useEffect(() => {
        const bottomNav = document && document.querySelector(".pwa-navigation");
        if (bottomNav) {
            const height = bottomNav.clientHeight;
            document.documentElement.style.setProperty("--pwa-navigation-height", `${height}px`);
        }
    }, []);

    useEffect(() => {
        document.documentElement.style.setProperty("--demo-banner-height", `${bannerHeightRef.current}px`);
    }, [isDemo]);

    const isReadyToRender = !!guestDetails || !!guestDetailsError;
    const lockScroll = lockScrollProp || mobileSecondaryNavigationOpen;

    return !isReadyToRender ? (
        <Spinner />
    ) : (
        <div
            className={classnames(
                bem(),
                { [bem(undefined, "lock-scroll")]: lockScroll },
                { [bem(undefined, "demo-user")]: isDemoUser() },
                className
            )}
        >
            {isDemoUser() && createPortal(<DemoBanner />, document.body)}
            <div className={classnames(bem("content"), { [bem(undefined, "demo-content")]: isDemoUser() })}>
                {children}
            </div>
            <PWANavigation />
        </div>
    );
};

export default Page;
