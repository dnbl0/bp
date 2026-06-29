import { ReactStripeElements } from "react-stripe-elements";
import StripeProps = ReactStripeElements.StripeProps;
import { authorizedFetch, json, status } from "./fetch";
import { paymentsSetupIntentUrl } from "../apiHref";
import { PaymentSetupIntentErrorTypes } from "../types/payment";
type SetupIntentStatus = stripe.setupIntents.SetupIntentStatus;

const SETUP_INTENT_SUCCESS_STATUS: SetupIntentStatus = "succeeded";

interface ConfirmStripeCardSetupPayload {
    paymentMethodId: string;
}

export const confirmStripeCardSetup = async (
    stripe: StripeProps,
    cardholderName: string,
    idToken?: string
): Promise<ConfirmStripeCardSetupPayload> => {
    return authorizedFetch(
        await paymentsSetupIntentUrl(),
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        },
        idToken
    )
        .then(status)
        .then(json)
        .then(async value => {
            const stripeResponse = await stripe.handleCardSetup(value.clientSecret, {
                payment_method_data: {
                    billing_details: {
                        name: cardholderName,
                    },
                },
            });
            if (
                !stripeResponse.error &&
                stripeResponse.setupIntent &&
                stripeResponse.setupIntent.payment_method &&
                stripeResponse.setupIntent.status === SETUP_INTENT_SUCCESS_STATUS
            ) {
                return Promise.resolve({
                    paymentMethodId: stripeResponse.setupIntent.payment_method,
                });
            } else {
                const error = new Error();
                if (stripeResponse.error) {
                    error.name = stripeResponse.error.type || PaymentSetupIntentErrorTypes.UNKNOWN;
                    error.message = stripeResponse.error.code || "";
                    error.stack = stripeResponse.error.message || "";
                }
                return Promise.reject(error);
            }
        });
};

export const confirmStripeCardSetupPublic = async (
    stripe: StripeProps,
    cardholderName: string,
    _dummyToken?: string
): Promise<ConfirmStripeCardSetupPayload> => {
    return fetch(await paymentsSetupIntentUrl(), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(status)
        .then(json)
        .then(async value => {
            const stripeResponse = await stripe.handleCardSetup(value.clientSecret, {
                payment_method_data: {
                    billing_details: {
                        name: cardholderName,
                    },
                },
            });
            if (
                !stripeResponse.error &&
                stripeResponse.setupIntent &&
                stripeResponse.setupIntent.payment_method &&
                stripeResponse.setupIntent.status === SETUP_INTENT_SUCCESS_STATUS
            ) {
                return Promise.resolve({
                    paymentMethodId: stripeResponse.setupIntent.payment_method,
                });
            } else {
                const error = new Error();
                if (stripeResponse.error) {
                    error.name = stripeResponse.error.type || PaymentSetupIntentErrorTypes.UNKNOWN;
                    error.message = stripeResponse.error.code || "";
                    error.stack = stripeResponse.error.message || "";
                }
                return Promise.reject(error);
            }
        });
};
