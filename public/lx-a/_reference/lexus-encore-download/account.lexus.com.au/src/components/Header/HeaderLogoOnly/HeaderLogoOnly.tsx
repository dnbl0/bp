import "./HeaderLogoOnly.scss";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import lexusLogoFull from "Assets/images/lexus-white-with-tagline.svg";
import React from "react";

const bem = createBemFn("logo-only");

const HeaderLogoOnly: React.FC = () => {
    return (
        <div className={bem("logo")}>
            <img className={bem("lexus-logo")} src={lexusLogoFull} />
        </div>
    );
};

export default HeaderLogoOnly;
