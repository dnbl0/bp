import * as React from "react";

import { createBemFn } from "lexus-style-guide/utilities/bem";

const bem = createBemFn("error-card-case-number");

const isSalesforceError = (error?: Error) => error !== undefined && (error as any).caseNumber !== undefined;

interface Props {
    error?: Error;
}

const ErrorCardCaseNumber: React.FC<Props> = ({ error }) => {
    const salesforceErrorCaseNumber = isSalesforceError(error) ? (error as any).caseNumber : undefined;

    if (salesforceErrorCaseNumber === undefined) {
        return null;
    }

    return (
        <h5 className={bem()}>
            case number: <strong>{salesforceErrorCaseNumber}</strong>
        </h5>
    );
};

export default ErrorCardCaseNumber;
