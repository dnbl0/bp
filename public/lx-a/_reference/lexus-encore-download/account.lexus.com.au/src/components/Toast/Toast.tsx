import "./Toast.scss";

import React, { MouseEventHandler } from "react";

import { SVGCross } from "lexus-style-guide/Components/SVGIcons/icons/static/SVGCross";
import classnames from "classnames";
import { closeToastUrl } from "../../helpers/routes";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import { lxColor } from "lexus-style-guide/colors/variables";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "@tmca/lexus-kit/css-in-js";

const bem = createBemFn("toast");

type SideEffectFunction = () => void;

interface Props {
    close?: SideEffectFunction | boolean;
}

const Toast: React.FC<React.PropsWithChildren<Props>> = ({ close: closeProp = false, children }) => {
    const hideCloseButton = closeProp === false;
    const location = useLocation();
    const navigate = useNavigate();

    const close: MouseEventHandler<SVGElement> = () => {
        if (closeProp === true) {
            navigate(closeToastUrl(location.pathname));
        } else if (typeof closeProp === "function") {
            closeProp();
        }
    };

    return (
        <Modal isPopover={true} defaultOpen={true}>
            <div className={classnames(bem(), { [bem(undefined, "hide-close-button")]: hideCloseButton })}>
                <div className={bem("content")}>
                    <SVGCross
                        className={bem("close")}
                        height={14}
                        width={14}
                        onClick={close}
                        color={lxColor("black", "absolute")}
                    />
                    {children}
                </div>
            </div>
        </Modal>
    );
};

export default Toast;
