import classnames from "classnames";
import PrimaryNavigationSC10 from "Components/PrimaryNavigation/PrimaryNavigationSC10";
import { isIFrameRequest, RouteSection, routeString } from "Helpers/routes";
import { useThunkDispatch } from "Hooks/thunk";
import { useSettingsPromise } from "Hooks/usePromiseState";
import { useTransitionStates } from "lexus-style-guide/Components/helpers/transition";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import * as React from "react";
import { useSelector } from "react-redux";
import { AuthSection, firstNameSelector, setAuthSection } from "ReduxSlices/user";
import SuccessTick from "../SuccessTick/SuccessTick";
import "./Layout.scss";
import { useLocation } from "react-router-dom";
import { isStandAlone } from "Helpers/general";
import HeaderLogoOnly from "Components/Header/HeaderLogoOnly/HeaderLogoOnly";
import { WelcomeScreen } from "Pages/WelcomeScreen/WelcomeScreen";

enum TransitionState {
    IN_ONE = "in-1",
    IN_TWO = "in-2",
    IN_THREE = "in-3",
    PAUSE = "pause",
    OUT_ONE = "out-1",
    FINISHED = "finished",
}

const bem = createBemFn("layout");

const transitionDurations = {
    in1: 500,
    in2: 2000,
    in3: 3000,
    pause: 2000,
    out1: 1000,
};

const signInTransition = [
    { state: TransitionState.IN_ONE, time: transitionDurations.in1 },
    { state: TransitionState.IN_THREE, time: transitionDurations.in3 },
    { state: TransitionState.PAUSE, time: transitionDurations.pause },
    { state: TransitionState.OUT_ONE, time: transitionDurations.out1 },
    { state: TransitionState.FINISHED },
];

const accountTransition = [
    { state: TransitionState.IN_ONE, time: transitionDurations.in1 },
    { state: TransitionState.IN_TWO, time: transitionDurations.in2 },
    { state: TransitionState.IN_THREE, time: transitionDurations.in3 },
    { state: TransitionState.PAUSE, time: transitionDurations.pause },
    { state: TransitionState.OUT_ONE, time: transitionDurations.out1 },
    { state: TransitionState.FINISHED },
];

interface Props {
    playTransition?: boolean;
    appLoading?: boolean;
}

const Layout: React.FC<React.PropsWithChildren<Props>> = ({ playTransition, appLoading, children }) => {
    const location = useLocation();
    const primaryNavigationSC10ContentPath = useSettingsPromise(
        settings => settings.general.primaryNavigationSC10ContentPath
    );
    const isIFrame = isIFrameRequest(location.search);

    //#region hooks
    const dispatch = useThunkDispatch();
    const firstName = useSelector(firstNameSelector);

    const isFromRegister = location.pathname.startsWith(routeString(RouteSection.Register));
    const { transitionState, startTransition } = useTransitionStates(
        isFromRegister ? accountTransition : signInTransition
    );

    React.useEffect(() => {
        if (transitionState === undefined && playTransition) {
            startTransition();
        }
    }, [playTransition]);
    //#endregion

    React.useEffect(() => {
        if (transitionState === TransitionState.FINISHED) {
            dispatch(setAuthSection(AuthSection.App));
        }
    }, [transitionState]);

    return appLoading ? (
        <div className={classnames(bem(), "is-bg-type-dark", transitionState && `transition-${transitionState}`)}>
            <WelcomeScreen showLoading={true} />
        </div>
    ) : (
        <>
            <div className={bem("primary-nav")}>
                {isStandAlone() ? (
                    <HeaderLogoOnly />
                ) : (
                    primaryNavigationSC10ContentPath && !isIFrame && <PrimaryNavigationSC10 />
                )}
            </div>
            <div className={classnames(bem(), "is-bg-type-dark", transitionState && `transition-${transitionState}`)}>
                <div className={bem("left")}>
                    <div className={bem("content")}>{children}</div>
                    {isFromRegister && transitionState !== null && transitionState === TransitionState.IN_TWO && (
                        <SuccessTick duration={transitionDurations.in2}>
                            Account
                            <br />
                            Created
                        </SuccessTick>
                    )}
                </div>
                {!isIFrame && (
                    <div className={bem("image")}>
                        <div className={bem("image-overlay")} />
                        <div className={bem("image-text")}>
                            <h1 className={bem("image-text-1")}>welcome to lexus, {firstName}</h1>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Layout;
