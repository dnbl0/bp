import "./WelcomeScreen.scss";

import React, { useState } from "react";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import { useNavigate } from "react-router";
import { LinkButton } from "lexus-style-guide";
import { RouteSection, routeString } from "Helpers/routes";
import { ButtonShade, ButtonStyle } from "lexus-style-guide/buttons/shared";
import lexusLogoFull from "Assets/images/lexus-white-with-tagline.svg";
import classnames from "classnames";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import WelcomeVideo from "Components/WelcomeVideo/WelcomeVIdeo";

const bem = createBemFn("welcome-page");

interface Props {
    showLoading?: boolean;
}

const WelcomeScreen: React.FC<Props> = ({ showLoading = false }) => {
    const [isLoading, setIsLoading] = useState(showLoading);
    const navigate = useNavigate();
    return (
        <div className={bem()}>
            <WelcomeVideo />
            <div className={bem("content")}>
                <div className={bem("content__logo")}>
                    <img className={bem("lexus-logo")} src={lexusLogoFull} />
                </div>
                <div className={bem("content__buttons")}>
                    <div className={bem("lexus-world")}>
                        <h2>discover</h2>
                        <h2 className={classnames("senkei-line", "senkei-line--left")}></h2>
                        <h2 className={bem("title")}>the world</h2>
                        <h2>of lexus</h2>
                    </div>
                    <div className={bem("button-group")}>
                        <LinkButton
                            className={bem("signin-button")}
                            field={{
                                href: routeString(RouteSection.SignIn),
                            }}
                            buttonStyle={ButtonStyle.Secondary}
                            shade={ButtonShade.Dark}
                            onClick={() => {
                                setIsLoading(true);
                                navigate(routeString(RouteSection.SignIn));
                            }}
                            disabled={isLoading}
                        >
                            log in
                        </LinkButton>
                        <LinkButton
                            className={bem("register-button")}
                            field={{
                                href: routeString(RouteSection.Register),
                            }}
                            buttonStyle={ButtonStyle.Primary}
                            shade={ButtonShade.Dark}
                            onClick={() => {
                                setIsLoading(true);
                                navigate(routeString(RouteSection.Register));
                            }}
                            disabled={isLoading}
                        >
                            register
                        </LinkButton>
                    </div>
                    {isLoading && (
                        <div className={bem("progress")}>
                            <ProgressBar />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export { WelcomeScreen };
