import React from "react";
import StripeElementsProvider from "../StripeElements/StripeElementsProvider/StripeElementsProvider";
import MobileAddPaymentCardIFrame from "./MobileAddPaymentCardIFrame";
import { Portal } from "../Portal/Portal";

const Index: React.FC = () => {
    React.useEffect(() => {
        document.title = "Mobile Add Payment Card ";
    }, []);

    return (
        <Portal>
            <div className="mobile-iframe">
                <StripeElementsProvider>
                    <MobileAddPaymentCardIFrame />
                </StripeElementsProvider>
            </div>
        </Portal>
    );
};

export default Index;
