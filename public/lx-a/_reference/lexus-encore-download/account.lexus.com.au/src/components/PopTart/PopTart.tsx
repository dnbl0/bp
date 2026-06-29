import "./PopTart.scss";

import * as React from "react";

import { closePopTart, currentPopTartSelector } from "ReduxSlices/general";
import { popTartTime, popTartTransitionTime } from "../../constants";

import classnames from "classnames";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import { useSelector } from "react-redux";
import { useThunkDispatch } from "../../hooks/thunk";

const bem = createBemFn("pop-tart");

interface PopTartProps {
    textData?: string;
}

const PopTart: React.FC<PopTartProps> = ({ textData }) => {
    const dispatch = useThunkDispatch();
    const textSelector = useSelector(currentPopTartSelector);
    const text = textData || textSelector;
    const [show, setShow] = React.useState(text !== undefined);
    const [present, setPresent] = React.useState(false);

    React.useEffect(() => {
        let hideTimeout: NodeJS.Timeout | undefined;
        let closeTimeout: NodeJS.Timeout | undefined;
        if (text !== undefined) {
            setShow(true);
            setPresent(true);
            hideTimeout = setTimeout(() => {
                setShow(false);
                closeTimeout = setTimeout(() => {
                    dispatch(closePopTart());
                    setTimeout(() => {
                        setPresent(false);
                    }, popTartTransitionTime);
                }, popTartTransitionTime);
            }, popTartTime - popTartTransitionTime);
        }
        return () => {
            if (hideTimeout !== undefined) {
                clearTimeout(hideTimeout);
            }
            if (closeTimeout !== undefined) {
                clearTimeout(closeTimeout);
            }
        };
    }, [text]);

    return (
        <div
            className={classnames(
                bem(),
                { [bem(undefined, "show")]: show },
                { [bem(undefined, "present")]: show || present }
            )}
        >
            <div className={bem("content")}>
                <h4 className={bem("text")}>{text}</h4>
            </div>
        </div>
    );
};

export default PopTart;
