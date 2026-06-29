import * as React from "react";

import DeleteCardWarning from "../PaymentMethods/AddPaymentCardModal/AddPaymentCardForm/DeleteCardWarning/DeleteCardWarning";
import MobileDeleteCardLinkIFrame from "./MobileDeleteCardLinkIFrame";
import { PaymentMethod } from "../../types/payment";
import Spinner from "../Spinner/Spinner";
import { authorizedFetch } from "Helpers/fetch";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import { getCheckDeleteCreditCardUrl } from "../../apiHref";

const bem = createBemFn("add-payment-card");

interface Prop {
    data?: PaymentMethod;
    onTokenExpired: () => void;
    onDeleteSuccess: () => void;
    callCSharpAction: (error: Record<string, unknown>) => void;
    keazId?: string;
    keazToken?: string;
    idToken?: string;
}

const MobileDeleteCardButtonIFrame: React.FC<Prop> = ({
    data,
    onTokenExpired,
    onDeleteSuccess,
    callCSharpAction,
    idToken,
    keazToken,
    keazId,
}) => {
    const [canDelete, setCanDelete] = React.useState(false);
    const [finishLoading, setFinishLoading] = React.useState(false);

    const checkCanDelete = async () => {
        try {
            const keazCheckResponse = await authorizedFetch(
                await getCheckDeleteCreditCardUrl(keazId ? keazId : ""),
                { headers: { token: keazToken || "" } },
                idToken
            );
            const keazCheckData = await keazCheckResponse.json();
            if (keazCheckData.succeed) {
                setCanDelete(keazCheckData.result);
            }
        } catch {
            onTokenExpired();
        }
        setFinishLoading(true);
    };

    React.useEffect(() => {
        if (keazId && idToken) {
            checkCanDelete();
        } else {
            callCSharpAction({ error: "API Error" });
            setFinishLoading(true);
        }
    }, [keazId, idToken]);

    const Content = () =>
        canDelete && data ? (
            <MobileDeleteCardLinkIFrame
                data={data}
                onTokenExpired={onTokenExpired}
                onDeleteSuccess={onDeleteSuccess}
                keazId={keazId}
                keazToken={keazToken}
                idToken={idToken}
            />
        ) : (
            <DeleteCardWarning data={data} />
        );

    const Loader = () => (!finishLoading ? <Spinner /> : <Content />);

    return (
        <div className={bem("delete")}>
            <Loader />
        </div>
    );
};

export default MobileDeleteCardButtonIFrame;
