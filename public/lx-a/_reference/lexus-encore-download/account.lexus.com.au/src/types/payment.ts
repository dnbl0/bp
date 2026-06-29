export enum CardElementValidationErrorCodes {
    INVALID_NUMBER = "invalid_number",
    INVALID_EXPIRY_MONTH_PAST = "invalid_expiry_month_past",
    INVALID_EXPIRY_YEAR_PAST = "invalid_expiry_year_past",
    INCOMPLETE_CVC = "incomplete_cvc",
}

export enum PaymentSetupIntentErrorTypes {
    CARD_ERROR = "card_error",
    UNKNOWN = "unknown",
}

export enum PaymentSetupIntentErrorCodes {
    INCORRECT_CVC = "incorrect_cvc",
}

export enum CardType {
    VISA = "visa",
    MASTERCARD = "mastercard",
    AMEX = "amex",
}

export interface PaymentMethod {
    id: string;
    isDefault: boolean;
    billingDetails: {
        name: string;
    };
    card: {
        last4: string;
        expMonth: string;
        expYear: string;
        type: CardType;
    };
}
