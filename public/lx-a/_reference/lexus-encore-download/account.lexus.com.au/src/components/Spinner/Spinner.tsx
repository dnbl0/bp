import * as React from "react";
import "./Spinner.scss";
import classNames from "classnames";

type Props = {
    isSmall?: boolean;
};

const Spinner: React.FC<Props> = ({ isSmall }) => (
    <svg
        className={classNames("spinner", {
            "custom-small": isSmall,
        })}
        viewBox="0 0 50 50"
    >
        <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
    </svg>
);

export default Spinner;
