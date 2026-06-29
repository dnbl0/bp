import * as React from "react";

import OwnershipLinkInternal, { OwnershipLinkInternalSize } from "../OwnershipLinkInternal/OwnershipLinkInternal";

import DeleteCardConfirmationCard from "../PaymentMethods/AddPaymentCardModal/AddPaymentCardForm/DeleteCardConfirmationCard/DeleteCardConfirmationCard";
import { PaymentMethod } from "../../types/payment";
import PopTart from "../PopTart/PopTart";
import Toast from "../Toast/Toast";
import { authorizedFetch } from "../../helpers/fetch";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import { getDeleteCreditCardUrl } from "../../apiHref";

const bem = createBemFn("add-payment-card");

interface Prop {
    data: PaymentMethod;
    onTokenExpired: () => void;
    onDeleteSuccess: () => void;
    keazId?: string;
    keazToken?: string;
    idToken?: string;
}

const MobileDeleteCardLinkIFrame: React.FC<Prop> = ({
    data,
    onTokenExpired,
    onDeleteSuccess,
    idToken,
    keazToken,
    keazId,
}) => {
    const [confirmDelete, setConfirmDelete] = React.useState<boolean>(false);
    const [popTartText, setPopTartText] = React.useState("");
    const toggleToast = () => setConfirmDelete(e => !e);

    const onSave = async () => {
        if (!keazId || !keazToken || !idToken) {
            setPopTartText("can't delete card");
            toggleToast();
            return;
        }
        try {
            const keazCheckResponse = await authorizedFetch(
                await getDeleteCreditCardUrl(keazId ? keazId : "", data.id),
                {
                    method: "DELETE",
                    headers: {
                        token: keazToken || "",
                    },
                },
                idToken
            );
            const keazCheckData = await keazCheckResponse.json();
            if (keazCheckData.succeed) {
                onDeleteSuccess();
            } else {
                setPopTartText("can't delete card");
            }
        } catch {
            onTokenExpired();
        }
        toggleToast();
    };

    const DeleteLink = () => (
        <span className={bem("link")}>
            <OwnershipLinkInternal size={OwnershipLinkInternalSize.Small} onClick={toggleToast}>
                Delete Card
            </OwnershipLinkInternal>
        </span>
    );

    const ConfirmationToast = () => (
        <Toast>
            <DeleteCardConfirmationCard onSave={onSave} onCancel={toggleToast} />
        </Toast>
    );

    const RenderDeleteLink = () => (data ? <DeleteLink /> : null);

    return (
        <>
            {popTartText ? <PopTart textData={popTartText} /> : null}
            {confirmDelete ? <ConfirmationToast /> : <RenderDeleteLink />}
        </>
    );
};

export default MobileDeleteCardLinkIFrame;
