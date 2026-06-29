import * as React from "react";
import * as ReactDOM from "react-dom";
import "./Portal.scss";

const modalRoot = document.getElementById("modal-root");
interface Props {
    className?: string;
}

export const Portal: React.FC<React.PropsWithChildren<Props>> = ({ children, className = "" }) => {
    const el = document.createElement("div");
    el.classList.add("portal");
    className && el.classList.add(className);

    React.useEffect(() => {
        if (modalRoot) {
            modalRoot.appendChild(el);
        }
        return () => {
            if (modalRoot) {
                modalRoot.removeChild(el);
            }
        };
    });

    return ReactDOM.createPortal(children, el);
};
