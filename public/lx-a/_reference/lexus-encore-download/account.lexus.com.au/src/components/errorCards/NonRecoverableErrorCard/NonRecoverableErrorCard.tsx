import * as React from "react";
import ErrorCardFinePrint from "../ErrorCard/ErrorCardFinePrint/ErrorCardFinePrint";
import ErrorCardButton from "../ErrorCard/ErrorCardButton/ErrorCardButton";
import ErrorCardLcac from "../ErrorCard/ErrorCardLcac/ErrorCardLcac";
import { StateSelector } from "../../../types/general";
import { useError } from "../ErrorCard/useError";
import ErrorCard from "../ErrorCard/ErrorCard";
import ErrorCardCaseNumber from "../ErrorCard/ErrorCardCaseNumber/ErrorCardCaseNumber";
import { useThunkDispatch } from "../../../hooks/thunk";
import { logoutThunk } from "ReduxSlices/user";
import { RouteSection, routeString } from "../../../helpers/routes";
import { resetAll } from "ReduxSlices/rootLevelAction";
import { useNavigate } from "react-router-dom";

const description = "We can't contact our servers right now. Please try signing in later.";

interface Props {
    errorSelector?: StateSelector<Error | undefined>;
}

const NonRecoverableErrorCard: React.FC<Props> = ({ errorSelector }) => {
    const navigate = useNavigate();
    const error = useError(errorSelector);
    const dispatch = useThunkDispatch();

    const logout = () => {
        dispatch(resetAll());
        dispatch(logoutThunk);
        navigate(routeString(RouteSection.SignIn), { replace: true });
    };

    return (
        <ErrorCard>
            <ErrorCardFinePrint>{description}</ErrorCardFinePrint>
            <ErrorCardButton onClick={logout}>okay</ErrorCardButton>
            <ErrorCardCaseNumber error={error} />
            <ErrorCardLcac />
        </ErrorCard>
    );
};

export default NonRecoverableErrorCard;
