import "./SuccessTick.scss";

import * as React from "react";

import classnames, { Argument } from "classnames";

import { ReactSVG } from "react-svg";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import { lxColor } from "lexus-style-guide/colors/variables";
import tick from "Assets/images/success-tick.svg";

const bem = createBemFn("success-tick");
const durationDefault = 3000;

interface SuccessTickProps {
    color?: string;
    duration?: number;
    children?: React.ReactNode;
    className?: Argument;
    animation?: Animation;
}

export enum Animation {
    In,
    InOut,
    None,
}

const SuccessTick: React.FC<SuccessTickProps> = ({
    color = lxColor("smoke"),
    duration = durationDefault,
    children,
    className,
    animation: animation = Animation.InOut,
}) => {
    return (
        <div
            className={classnames(
                bem(),
                className,
                { [bem(undefined, "dont-animate")]: animation === Animation.None },
                { [bem(undefined, "animate-in")]: animation === Animation.In }
            )}
            style={{ color, stroke: color, animationDuration: `${duration}ms` }}
        >
            <ReactSVG src={tick} />
            {children !== undefined && <h3 className={bem("text")}>{children}</h3>}
        </div>
    );
};

export default SuccessTick;
