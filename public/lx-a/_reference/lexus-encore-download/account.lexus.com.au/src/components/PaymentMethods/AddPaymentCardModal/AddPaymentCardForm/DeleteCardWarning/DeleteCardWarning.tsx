import "./DeleteCardWarning.scss";

import * as React from "react";

import AlertTile, { alertType } from "../../../../AlertTile/AlertTile";

import { PaymentMethod } from "../../../../../types/payment";
import { createBemFn } from "lexus-style-guide/utilities/bem";

const bem = createBemFn("add-payment-card");

interface Prop {
    data?: PaymentMethod;
}

const DeletCardWarning: React.FC<Prop> = ({ data }) => {
    return data ? (
        <AlertTile icon className={bem("warning")} type={alertType.Information}>
            <p className="margin-bottom-zero">
                This card can’t be deleted as it’s associated with an upcoming On Demand booking. You are still able to
                edit the card if required.
            </p>
        </AlertTile>
    ) : null;
};

export default DeletCardWarning;
