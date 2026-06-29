import * as React from "react";
import "./Spinner.scss";

const SmallSpinner: React.FC<{ className?: string }> = ({ className = "" }) => (
    <svg className={`spinner ${className}`} viewBox="0 0 50 50">
        <circle className="path" cx="25" cy="25" r="10" fill="none" strokeWidth="3" />
    </svg>
);

export default SmallSpinner;
