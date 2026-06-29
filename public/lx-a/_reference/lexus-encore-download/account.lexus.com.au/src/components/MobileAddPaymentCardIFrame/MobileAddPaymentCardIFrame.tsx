import "./MobileAddPaymentCardIFrame.scss";

import * as React from "react";

import AlertTile, { alertType } from "../AlertTile/AlertTile";
import { ButtonShade, ButtonStyle } from "lexus-style-guide/buttons/shared";
import { GTMForms, pushToGTMAddPaymentFormFieldSubmitted, pushToGTMFormFieldChanged } from "Helpers/gtm";
import { ReactStripeElements, injectStripe } from "react-stripe-elements";
import { addPaymentMethodUrl, onDemandGetAccountInfoUrl, updateGuestDetailsUrl } from "../../apiHref";
import { addStripePaymentMethodStatusSelector, getDefaultPaymentMethodFromStripeResponse } from "ReduxSlices/payments";
import { confirmStripeCardSetup, confirmStripeCardSetupPublic } from "Helpers/stripe";
import { encoreTierSelector, salesforceAccountIdSelector } from "ReduxSlices/user";
import { useEffect, useState } from "react";

import { Button } from "lexus-style-guide/buttons/Button";
import ButtonWithSpinner from "../ButtonWithSpinner/ButtonWithSpinner";
import FormGrid from "../FormGrid/FormGrid";
import { LoadStatus } from "Types/loadStatus";
import MobileDeleteCardButtonIFrame from "./MobileDeleteCardButtonIFrame";
import { PaymentMethod } from "Types/payment";
import SVGLock from "../SVGLock/SVGLock";
import SVGPoweredByStripe from "Components/SVGPoweredByStripe/SVGPoweredByStripe";
import Spinner from "../Spinner/Spinner";
import StripeCardElement from "../StripeElements/StripeCardElement/StripeCardElement";
import { TextField } from "lexus-style-guide/Components/Form/TextField/TextField";
import { UserEncoreTiers } from "Helpers/users";
import { authorizedFetch } from "Helpers/fetch";
import classNames from "classnames";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import { useSelector } from "react-redux";

const bem = createBemFn("add-payment-card");
const buttonProps: LXS.Button.ButtonProps = {
    className: bem("submit-button"),
    buttonStyle: ButtonStyle.Primary,
    shade: ButtonShade.Dark,
};

type Props = ReactStripeElements.InjectedStripeProps;

declare function invokeCSharpAction(a: string): void;

enum ErrorTexts {
    CARDHOLDER = "Cardholder name is invalid. Please make sure you have included first and last name.",
    CARD_DECLINED = "This card has been declined. Please contact your card issuer for more information.",
    INCORRECT_CVC = "Card's security code is invalid. Please check the card's security code.",
}

const getGuestDetails = async (token: string) => {
    const loginResponse = await authorizedFetch(await updateGuestDetailsUrl(), {}, token);
    return loginResponse.json();
};

const MobileAddPaymentCardIFrame: React.FC<Props> = ({ stripe }) => {
    const [cardHolderName, setCardHolderName] = useState("");
    const [cardElementComplete, setCardElementComplete] = useState(false);
    const [cardError, setCardError] = useState<string | undefined>(undefined);
    const [cardholderNameValid, setCardholderNameValid] = useState(true);
    const [defaultPaymentMethod, setDefaultPaymentMethod] = useState<PaymentMethod>();
    const [idToken, setIdToken] = useState("");
    const [keazToken, setKeazToken] = useState("");
    const [keazId, setKeazId] = useState("");
    const [showDelete, setShowDelete] = useState(false);
    const setupCardWithStripeStatus = useSelector(addStripePaymentMethodStatusSelector);

    const [isLoading, setIsLoading] = useState(false);
    const [isFullPageLoading, setIsFullPageLoading] = useState(true);
    const isCardholderNameValid = () => cardHolderName.trim().split(" ").length > 1;
    const isCardholderNameEmpty = cardHolderName.length === 0;
    const addButtonEnabled = isCardholderNameValid() && cardElementComplete;

    const encoreTier = useSelector(encoreTierSelector) || UserEncoreTiers.NONE;
    const accountId = useSelector(salesforceAccountIdSelector);

    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.has("token") ? searchParams.get("token") : "";

    const keazRetrieve = async (token: string, loginData: Partial<LXS.GuestDetails>) => {
        const keazFullName = `${loginData.firstname} ${loginData.lastname}`;
        const keazLoginResponse = await authorizedFetch(
            await onDemandGetAccountInfoUrl(loginData.accountId || "", keazFullName, loginData.email || ""),
            {},
            token
        );
        return keazLoginResponse.json();
    };

    const stripeRetrieve = async (token: string, stripeCustomerId: string) => {
        const stripeResponse = await authorizedFetch(
            `${await addPaymentMethodUrl()}?customerId=${stripeCustomerId}`,
            {},
            token
        );
        return stripeResponse.json();
    };

    useEffect(() => {
        const retrieveUserInfoViaToken = async () => {
            try {
                if (!token) {
                    return;
                }
                const loginData = await getGuestDetails(token);
                const keazLoginData = await keazRetrieve(token, loginData);
                setKeazId(keazLoginData?.user?.id);
                setKeazToken(keazLoginData?.token);
                const stripeCustomerId = loginData?.stripeCustomerId;
                if (!stripeCustomerId) {
                    return;
                }
                const stripeData = await stripeRetrieve(token, stripeCustomerId);
                setIdToken(token);
                const defaultPaymentMethodAvailable = getDefaultPaymentMethodFromStripeResponse(stripeData);
                if (defaultPaymentMethodAvailable) {
                    const defaultPaymentName = defaultPaymentMethodAvailable.billingDetails?.name || "";
                    setDefaultPaymentMethod(defaultPaymentMethodAvailable);
                    setCardHolderName(defaultPaymentName);
                    setShowDelete(true);
                }
            } catch {
                // Do nothing
            } finally {
                setIsFullPageLoading(false);
            }
        };

        retrieveUserInfoViaToken();
    }, []);

    const cardHolderNameOnChange = (newCardHolderName: string) => {
        setCardHolderName(newCardHolderName);
        pushToGTMFormFieldChanged(GTMForms.CARDHOLDER_NAME, encoreTier, accountId ?? "");
    };

    const onCardholderNameBlur = () => {
        setCardholderNameValid(isCardholderNameValid());
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!addButtonEnabled || !stripe) {
            return;
        }
        setIsLoading(true);
        setCardError(undefined);

        pushToGTMAddPaymentFormFieldSubmitted(encoreTier, accountId ?? "");

        try {
            let stripeFn = confirmStripeCardSetupPublic;
            if (idToken) {
                await getGuestDetails(idToken);
                stripeFn = confirmStripeCardSetup;
            }
            stripeFn(stripe, cardHolderName, idToken)
                .then(({ paymentMethodId }) => {
                    setIsLoading(false);
                    onCreditCardAddSuccess(paymentMethodId, cardHolderName);
                })
                .catch(error => {
                    setIsLoading(false);
                    callCSharpAction(error);
                });
        } catch {
            setIsLoading(false);
            onTokenExpired();
        }
    };

    const onStripeCardComplete = (complete: boolean) => {
        setCardElementComplete(complete);
        setCardError(undefined);
    };

    const CardError = () =>
        cardError ? (
            <AlertTile icon className={bem("error")} type={alertType.Error}>
                <p>{cardError}</p>
            </AlertTile>
        ) : null;

    const SubmitButton = () =>
        setupCardWithStripeStatus === LoadStatus.InProgress ? (
            <ButtonWithSpinner {...buttonProps} type="button" />
        ) : (
            <Button {...buttonProps} disabled={!addButtonEnabled} type="submit">
                {!!defaultPaymentMethod ? "Save Changes" : "Add To Account"}
            </Button>
        );

    const PoweredByStripeImage = () => (
        <div className={bem("powered-by-stripe")}>
            <SVGPoweredByStripe />
        </div>
    );

    const onBlur = () => {
        window.scrollTo(0, 0);
    };

    const callCSharpAction = (data: Record<string, unknown>) => {
        typeof invokeCSharpAction !== "undefined" && typeof invokeCSharpAction === "function"
            ? invokeCSharpAction(JSON.stringify(data))
            : null;
    };

    const onCreditCardAddSuccess = (paymentMethodId: string, cardHolderName: string) =>
        callCSharpAction({
            paymentMethodId,
            cardHolderName,
        });
    const onTokenExpired = () => callCSharpAction({ tokenExpired: true });
    const onDeleteSuccess = () => callCSharpAction({ deleteCardSuccess: true });

    const form = (
        <form onSubmit={onSubmit} className={classNames(bem(), "is-bg-type-dark")}>
            <p className={bem("description")}>
                {!!defaultPaymentMethod ? "Update your payment method." : "Add a payment method to your account."}
            </p>
            <TextField
                className={bem("cardholder-name")}
                label="Cardholder Name"
                type="text"
                value={cardHolderName}
                onChange={cardHolderNameOnChange}
                onBlur={onCardholderNameBlur}
                isError={!isCardholderNameEmpty && !cardholderNameValid}
                errorText={ErrorTexts.CARDHOLDER}
            />
            <StripeCardElement
                onComplete={onStripeCardComplete}
                data={defaultPaymentMethod}
                onBlur={onBlur}
                onEdit={() => setShowDelete(c => !c)}
            />
            <CardError />
            <SubmitButton />
            {showDelete && (
                <MobileDeleteCardButtonIFrame
                    data={defaultPaymentMethod}
                    onTokenExpired={onTokenExpired}
                    onDeleteSuccess={onDeleteSuccess}
                    callCSharpAction={callCSharpAction}
                    keazId={keazId}
                    keazToken={keazToken}
                    idToken={idToken}
                />
            )}
            <PoweredByStripeImage />
            <AlertTile icon customIcon={<SVGLock />} className={bem("warning")} type={alertType.Success}>
                <p className="margin-bottom-zero">
                    <strong>Stripe validates card information when it saves</strong>. As a result of this process, you
                    may see a temporary authorisation for $1 on your card statement.
                </p>
            </AlertTile>
        </form>
    );

    return isFullPageLoading ? (
        <Spinner />
    ) : (
        <>
            {isLoading && <Spinner />}
            <FormGrid form={form} />
        </>
    );
};

export default injectStripe(MobileAddPaymentCardIFrame);
