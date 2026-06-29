import * as React from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import { useSettingsPromise } from "../../../hooks/usePromiseState";
import NobelFont from "lexus-style-guide/typography/fonts/Nobel-Book.woff2";

const StripeElementsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const stripeApiKey = useSettingsPromise(settings => settings.payments.publishableKey);
    const url = `url(\"${window.location.origin}${NobelFont}\")`;
    return stripeApiKey ? (
        <StripeProvider apiKey={stripeApiKey}>
            <Elements
                fonts={[
                    {
                        family: "Nobel",
                        src: url,
                    },
                ]}
            >
                {children}
            </Elements>
        </StripeProvider>
    ) : null;
};

export default StripeElementsProvider;
