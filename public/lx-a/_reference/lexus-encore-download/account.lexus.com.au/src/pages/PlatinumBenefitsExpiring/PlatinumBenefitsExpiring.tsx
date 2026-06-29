import "./PlatinumBenefitsExpiring.scss";

import * as React from "react";

import { currentBenefitModalStatusSelector, toggleBenefitsModal } from "ReduxSlices/general";
import { useContext, useEffect, useState } from "react";

import { Button } from "lexus-style-guide";
import { ButtonShade } from "lexus-style-guide/buttons/shared";
import { createBemFn } from "lexus-style-guide/utilities/bem";
import { useSelector } from "react-redux";
import { useThunkDispatch } from "Hooks/thunk";
import {
    dashboardBannerStatesSelector,
    encoreTierSelector,
    firstNameSelector,
    salesforceAccountIdSelector,
} from "ReduxSlices/user";
import { useBannerTokens } from "Pages/Dashboard/DashboardBanner/utils";
import { BreakpointContext } from "Context/BreakpointContext";
import { RouteSection, routeString } from "Helpers/routes";
import { createSectionHeader } from "Helpers/sectionHeader";
import { PageType } from "Types/general";
import Header from "Components/Header/Header";
import Page from "Components/Page/Page";
import PageContent from "Components/PageContent/PageContent";
import { UserEncoreStatus, UserEncoreTiers } from "Helpers/users";
import { pushToGTMEncoreDashboardButtonClicked } from "Helpers/gtm";
import { useNavigate } from "react-router-dom";

const bem = createBemFn("platinum-benefits-expiring");

interface BenefitExpiringModalProps {
    firstName: string;
    encoreTier: string;
    membershipStatus: UserEncoreStatus;
    accountId?: string;
    closeModal: () => void;
    isMobile: boolean;
    token: {
        [key: string]: string | number;
    };
    title: string;
}

const RenderBenefitExpiringModal: React.FC<BenefitExpiringModalProps> = ({
    firstName,
    closeModal,
    isMobile,
    token,
    encoreTier,
    membershipStatus,
    accountId,
    title,
}) => (
    <div className={bem("container")}>
        {!isMobile && <h2>{title}</h2>}
        <div>
            <p>
                Hi {firstName},
                <br />
                <br />
                {(encoreTier === UserEncoreTiers.BASIC || encoreTier === UserEncoreTiers.LEGACY) && (
                    <>
                        Your Encore membership expires on {token.formattedExpiryDate}. To continue accessing a number of
                        exclusive benefits, join Encore Elevate.
                        <br />
                        <br />
                        Encore Elevate gives you access to a suite of privileges designed to enhance your lifestyle. As
                        a member, you can borrow another Lexus with On Demand, experience seamless shopping with Valet
                        Parking, and more.
                    </>
                )}
                {encoreTier === UserEncoreTiers.PLATINUM && (
                    <>
                        Your Encore Platinum membership expires on {token.formattedExpiryDate}. To continue accessing a
                        number of these exclusive benefits, join Encore Elevate.
                        <br />
                        <br />
                        Encore Elevate gives you access to a suite of privileges designed to enhance your lifestyle. As
                        a member, you can still borrow another Lexus with On Demand, experience seamless shopping with
                        Valet Parking, and more.
                    </>
                )}
                {encoreTier === UserEncoreTiers.ELEVATE && (
                    <>
                        Your Encore Elevate membership expires on {token.formattedExpiryDate}. To continue using your
                        exclusive benefits, renew your membership today.
                        <br />
                        <br />
                        As a member, you can borrow another Lexus with On Demand, experience seamless shopping with
                        Valet Parking, and more.
                    </>
                )}
                <br />
                <br />A 12-month membership can be purchased for $1,899.*
                <br />
                <br />
                Speak to your local Lexus dealer to find out more. Complete the Encore Elevate purchase request to join
                today.
                <br />
                <br />
                <p className={bem("tandc")}>
                    *Terms and conditions apply. See{" "}
                    <a href="http://lexus.com.au/smallprint/encore-terms" target="_blank" rel="noreferrer">
                        http://lexus.com.au/smallprint/encore-terms
                    </a>{" "}
                    for details.
                </p>
            </p>
        </div>
        <Button
            shade={ButtonShade.Dark}
            onClick={() => {
                pushToGTMEncoreDashboardButtonClicked({
                    encoreTier,
                    accountId,
                    membershipStatus,
                    bannerTitle: title,
                    buttonText: "CLOSE",
                });
                closeModal();
            }}
        >
            close
        </Button>
    </div>
);

const PlatinumBenefitsExpiring = () => {
    const navigate = useNavigate();
    const isMobile = useContext(BreakpointContext);
    const encoreTier = useSelector(encoreTierSelector) || "";
    const isShown = useSelector(currentBenefitModalStatusSelector);
    const firstName = useSelector(firstNameSelector) || "";
    const membershipStatus = useSelector(dashboardBannerStatesSelector).membershipStatus;
    const accountId = useSelector(salesforceAccountIdSelector);
    const { token } = useBannerTokens(membershipStatus) || {};
    const [showModal, setShowModal] = useState(isMobile ? isMobile : isShown);
    const dispatch = useThunkDispatch();
    useEffect(() => {
        !isMobile && setShowModal(isShown);
    }, [isShown]);

    const closeModal = () => {
        isMobile ? navigate(routeString(RouteSection.Dashboard)) : dispatch(toggleBenefitsModal(false));
    };

    if (token === undefined || !showModal) return null;

    const title =
        encoreTier === UserEncoreTiers.BASIC || encoreTier === UserEncoreTiers.LEGACY
            ? `Encore Benefits Expiring`
            : `${encoreTier} Benefits Expiring`;

    const Title = createSectionHeader({
        title,
        pageType: PageType.Sub,
        backRoute: routeString(RouteSection.Dashboard),
        className: bem("title"),
    });

    const modalRender = (
        <RenderBenefitExpiringModal
            encoreTier={encoreTier}
            firstName={firstName}
            closeModal={closeModal}
            isMobile={isMobile}
            token={token}
            accountId={accountId}
            membershipStatus={membershipStatus}
            title={title}
        />
    );

    return isMobile ? (
        <Page title={title}>
            <Header>
                <Title />
            </Header>
            <PageContent>{modalRender}</PageContent>
        </Page>
    ) : (
        <div className={bem()}>{modalRender}</div>
    );
};
export default PlatinumBenefitsExpiring;
