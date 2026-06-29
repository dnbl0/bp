import * as React from "react";

import { ButtonShade, ButtonStyle } from "lexus-style-guide/buttons/shared";

import { Button } from "lexus-style-guide";
import classnames from "classnames";
import { createBemFn } from "lexus-style-guide/utilities/bem";

const bem = createBemFn("error-card-button");

const ErrorCardButton: React.FC<LXS.Button.ButtonProps> = ({
    className,
    buttonStyle = ButtonStyle.Primary,
    shade = ButtonShade.Light,
    ...rest
}) => <Button {...rest} className={classnames(className, bem())} buttonStyle={buttonStyle} shade={shade} />;

export default ErrorCardButton;
