import "./SignOut.scss";

import * as React from "react";

import { AuthSection, authSectionSelector, logoutThunk } from "ReduxSlices/user";
import { useEffect } from "react";
import { encoreTierSelector, salesforceAccountIdSelector } from "ReduxSlices/user";

import { useNavigate } from "react-router-dom";
import Spinner from "Components/Spinner/Spinner";
import { UserEncoreTiers } from "Helpers/users";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import { pushToGTMTermsAndConditionFormSubmitted } from "Helpers/gtm";
import { useSelector } from "react-redux";
import { useThunkDispatch } from "Hooks/thunk";
import { RouteSection, routeString } from "../../helpers/routes";

const bem = createBemFn("sign-out");

const SignOut: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useThunkDispatch();
    const authSection = useSelector(authSectionSelector);
    const isLoggedIn = authSection === AuthSection.App;
    const encoreTier = useSelector(encoreTierSelector);
    const accountId = useSelector(salesforceAccountIdSelector);

    useEffect(() => {
        dispatch(logoutThunk);

        pushToGTMTermsAndConditionFormSubmitted(encoreTier || UserEncoreTiers.NONE, accountId ?? "");
    }, []);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate(routeString(RouteSection.SignIn));
        }
    }, [isLoggedIn]);

    if (isLoggedIn) {
        return (
            <div className={bem()}>
                <Spinner />
            </div>
        );
    }

    return null;
};

export { SignOut };
