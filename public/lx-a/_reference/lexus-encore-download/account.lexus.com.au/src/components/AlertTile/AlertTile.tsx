import classnames, { Argument } from "classnames";
import { SVGWarning } from "lexus-style-guide/Components/SVGIcons/icons/static/SVGWarning";
import * as React from "react";
import "./AlertTile.scss";

import { createBemFn } from "lexus-style-guide/utilities/bem";

const bem = createBemFn("alert-tile");

export enum alertType {
    Error = "error",
    Information = "information",
    Success = "success",
}

interface Props {
    icon?: boolean;
    customIcon?: React.ReactNode;
    className?: Argument;
    type?: alertType;
}

const AlertTile: React.FC<React.PropsWithChildren<Props>> = ({
    children,
    icon = false,
    className,
    type = alertType.Information,
    customIcon,
}) => {
    return (
        <div className={classnames(bem(), className, bem(undefined, type))}>
            {icon && <div className={bem("left")}>{customIcon || <SVGWarning width={16} height={16} />}</div>}
            <div className={bem("right")}>{children}</div>
        </div>
    );
};

export default AlertTile;
