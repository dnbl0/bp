import "./ButtonWithSpinner.scss";

import * as React from "react";

import { Button } from "lexus-style-guide/buttons/Button";
import SmallSpinner from "../Spinner/SmallSpinner";
import classnames from "classnames";
import { createBemFn } from "lexus-style-guide/utilities/bem";

const bem = createBemFn("button-with-spinner");

const ButtonWithSpinner: React.FC<LXS.Button.ButtonProps> = ({ className, ...props }) => (
    <Button className={classnames(bem(), className)} selected={true} {...props}>
        <SmallSpinner />
    </Button>
);

export default ButtonWithSpinner;
