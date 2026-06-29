import "./Toast.scss";

import * as React from "react";

import { Portal } from "./Portal";
import { SVGCross } from "lexus-style-guide/Components/SVGIcons/icons/static/SVGCross";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import { lxColor } from "lexus-style-guide/colors/variables";

const bem = createBemFn("toasts");

interface Props {
    close?: () => void;
}

const Toast: React.FC<React.PropsWithChildren<Props>> = ({ children, close }) => (
    <Portal>
        <div className={bem()}>
            <div className={bem("content")}>
                {close && (
                    <SVGCross
                        className={bem("close")}
                        height={14}
                        width={14}
                        onClick={close}
                        color={lxColor("black", "absolute")}
                    />
                )}
                {children}
            </div>
        </div>
    </Portal>
);

export default Toast;
