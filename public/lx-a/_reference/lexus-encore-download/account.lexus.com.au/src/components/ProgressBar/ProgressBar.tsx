import { createBemFn } from "lexus-style-guide/utilities/bem";
import "./ProgressBar.scss";

export const ProgressBar = () => {
    const bem = createBemFn("progress-bar");

    return (
        <div className={bem()}>
            <div className={bem("value")}></div>
        </div>
    );
};
