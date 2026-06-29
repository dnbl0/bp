import "./PwaLoader.scss";

import { ProgressBar } from "Components/ProgressBar/ProgressBar";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import lexusLogoFull from "Assets/images/lexus-white-with-tagline.svg";

export const PwaLoader = () => {
    const bem = createBemFn("pwa-loader");

    return (
        <div className={bem()}>
            <div className={bem("logo")}>
                <img className={bem("lexus-logo")} src={lexusLogoFull} />
            </div>
            <ProgressBar />
        </div>
    );
};
