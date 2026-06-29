import * as React from "react";
import { Container, getSurfaceProps, LoadingSpinner } from "@tmca/lexus-kit/css-in-js";
import "./LoadingSpinnerOverlay.scss";
import cn from "classnames";

export type LoadingSpinnerOverlayProps = {
    isLoading: boolean;
    children: React.ReactNode;
};

const LoadingSpinnerOverlay: React.FC<LoadingSpinnerOverlayProps> = ({ isLoading, children }) => {
    if (!isLoading) {
        // eslint-disable-next-line react/jsx-no-useless-fragment
        return <>{children}</>;
    }

    return (
        <div className="lx-loading-spinner-overlay__wrapper">
            <Container className={cn(getSurfaceProps().className, "lx-loading-spinner-overlay__background")}>
                {children}
            </Container>
            <LoadingSpinner size={24} className="lx-loading-spinner-overlay__spinner" />
        </div>
    );
};

export default LoadingSpinnerOverlay;
