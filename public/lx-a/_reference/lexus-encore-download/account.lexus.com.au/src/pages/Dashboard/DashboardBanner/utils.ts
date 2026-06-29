import { BreakpointContext } from "../../../context/BreakpointContext";
import { routeString, RouteSection } from "Helpers/routes";
import { UserEncoreStatus, UserEncoreTiers } from "Helpers/users";
import { useThunkDispatch } from "Hooks/thunk";
import { toggleBenefitsModal } from "ReduxSlices/general";
import { encoreTierSelector, dashboardBannerStatesSelector } from "ReduxSlices/user";
import { LoadStatus } from "Types/loadStatus";
import { EncorePackagePaymentStatus, VerifiedVehicle } from "Types/vehicle";
import { differenceInMonths, differenceInDays, format, isBefore } from "date-fns";
import { useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { parseDateString } from "Helpers/dateTime";
import { isEncorePackageErrorProp } from "Helpers/vehicle";
import { getEncorePackageGroups } from "Hooks/useEncorePackageGroups";

const EXPIRING_DURATION = 3;
export const DAYS_TO_HIDE_BANNER = 7;
interface BannerStates {
    bannerState: {
        status: UserEncoreStatus;
        packageExpiryDate?: string;
        packagePurchasePaylink?: string | null;
        hideCta?: boolean;
        disableCta?: boolean;
        showBanner: boolean;
    };
    extraBannerState?: { status: UserEncoreStatus };
}
interface BannerTokensProps {
    [key: string]: {
        headerToken?: { [key: string]: string };
        token?: { [key: string]: string | number };
    };
}

export const useOnClick = (membershipStatus: UserEncoreStatus) => {
    const dispatch = useThunkDispatch();
    const isMobile = useContext(BreakpointContext);
    const navigate = useNavigate();

    return useMemo(() => {
        const readMore = () => {
            isMobile
                ? navigate(routeString(RouteSection.PlatinumBenefitsExpiring))
                : dispatch(toggleBenefitsModal(true));
        };

        const startRenewal = () => {
            navigate(routeString(RouteSection.AccountSettings, RouteSection.EncoreInterest));
        };

        const addVehicle = () => {
            navigate(routeString(RouteSection.Vehicle, RouteSection.Add));
        };

        const refresh = () => window.location.reload();

        switch (membershipStatus) {
            case UserEncoreStatus.EXPIRED:
            case UserEncoreStatus.PAYMENT_UPGRADE_EXPIRED:
            case UserEncoreStatus.PAYMENT_RENEWAL_EXPIRED:
                return startRenewal;
            case UserEncoreStatus.NONE:
                return addVehicle;
            case UserEncoreStatus.EXPIRING_SOON:
                return readMore;
            case UserEncoreStatus.SERVICE_DOWN:
                return refresh;
            default:
                return undefined;
        }
    }, [dispatch, isMobile, membershipStatus, navigate]);
};

export const useBannerTokens = (bannerContent: UserEncoreStatus) => {
    const encoreTier = (useSelector(encoreTierSelector) || UserEncoreTiers.NONE) as UserEncoreTiers;
    const { expiryDate, membershipStatus } = useSelector(dashboardBannerStatesSelector);

    const expiryDateObject = parseDateString(expiryDate);
    if (!expiryDateObject) {
        return undefined;
    }
    const formattedExpiryDate = format(expiryDateObject, "dd MMMM yyyy");
    const monthsTilExpiry = differenceInMonths(expiryDateObject, new Date()) + 1;
    const suffix = monthsTilExpiry > 1 ? "s" : "";
    let bannerText = "purchase";
    if ([UserEncoreTiers.LEGACY, UserEncoreTiers.BASIC].includes(encoreTier)) {
        switch (membershipStatus) {
            case UserEncoreStatus.ACTIVE:
            case UserEncoreStatus.EXPIRING_SOON:
                bannerText = "upgrade";
                break;
            case UserEncoreStatus.EXPIRED:
                bannerText = "purchase";
                break;
            default:
                bannerText = "purchase";
        }
    }
    const tokens: BannerTokensProps = {
        [UserEncoreStatus.EXPIRING_SOON]: {
            headerToken: { encoreTier },
            // if expiry date is this month then monthsTillExpiry will be 0, need to set to 1 for readability
            token: { monthsTilExpiry, formattedExpiryDate, suffix },
        },
        [UserEncoreStatus.EXPIRED]: {
            headerToken: { encoreTier },
        },
        [UserEncoreStatus.RENEWAL_SUCCESSFUL]: {
            token: { formattedExpiryDate },
        },
        [UserEncoreStatus.PAYMENT_UPGRADE_EXPIRED]: {
            token: { bannerText },
        },
        [UserEncoreStatus.PAYMENT_RENEWAL_EXPIRED]: {
            token: { bannerText },
        },
        [UserEncoreStatus.PAYMENT_UPGRADE]: {
            token: { bannerText },
        },
    };
    return tokens[bannerContent] || undefined;
};

export const getExtraBannerStatusForPayment = (
    isExpired: boolean,
    encoreTier: UserEncoreTiers,
    packagePaymentStatus: EncorePackagePaymentStatus
): UserEncoreStatus => {
    if (packagePaymentStatus === EncorePackagePaymentStatus.PaymentPending)
        return isExpired ? UserEncoreStatus.START_RENEWAL : UserEncoreStatus.START_UPGRADE;
    if (packagePaymentStatus === EncorePackagePaymentStatus.PaylinkExpired) {
        switch (encoreTier) {
            case UserEncoreTiers.BASIC:
            case UserEncoreTiers.LEGACY:
                return isExpired ? UserEncoreStatus.PAYMENT_UPGRADE_EXPIRED : UserEncoreStatus.PAYMENT_UPGRADE;
            case UserEncoreTiers.PLATINUM:
            case UserEncoreTiers.ELEVATE:
                return UserEncoreStatus.PAYMENT_RENEWAL_EXPIRED;
        }
    }
    return UserEncoreStatus.NONE;
};

export const mapEncorePackageToBannerContent = (
    encoreTier: UserEncoreTiers,
    vehicle: VerifiedVehicle | undefined | null,
    vehicleStatus: LoadStatus
): BannerStates | undefined => {
    const { currentEncorePackage } = getEncorePackageGroups(vehicle?.encorePackages);
    // no vehicle flow
    if (vehicle === undefined || vehicleStatus === LoadStatus.Failure || currentEncorePackage === undefined)
        return {
            bannerState: {
                status: UserEncoreStatus.NONE,
                showBanner: true,
            },
        };
    // api error
    else if (isEncorePackageErrorProp(currentEncorePackage)) {
        return {
            bannerState: {
                status: UserEncoreStatus.SERVICE_DOWN,
                showBanner: true,
            },
        };
    } else if (vehicleStatus !== LoadStatus.Success) return undefined;
    else if (currentEncorePackage === null)
        return {
            bannerState: {
                status: UserEncoreStatus.PACKAGE_MISSING,
                showBanner: true,
            },
        };
    // If vehicle data is not returned yet, we don't setup any banner

    const { packageStartDate, packageExpiryDate, packagePaymentStatus, packagePurchasePaylink } =
        currentEncorePackage || {};
    const currentDate = new Date();
    const startDate = packageStartDate ? parseDateString(packageStartDate) : null;
    const expiryDate = packageExpiryDate ? parseDateString(packageExpiryDate) : null;
    const gapInMonths = expiryDate ? differenceInMonths(expiryDate, currentDate) : null;
    const isExpired = isDateExpired(packageExpiryDate);
    const isActive = gapInMonths && gapInMonths >= EXPIRING_DURATION;
    const shouldHideSuccessfulBanner =
        startDate &&
        packagePaymentStatus === EncorePackagePaymentStatus.PaymentCompleted &&
        differenceInDays(currentDate, startDate) > DAYS_TO_HIDE_BANNER;
    let membershipStatus = undefined;

    if (isActive) membershipStatus = UserEncoreStatus.ACTIVE;
    else if (isExpired) membershipStatus = UserEncoreStatus.EXPIRED;
    else membershipStatus = UserEncoreStatus.EXPIRING_SOON;

    if (
        (packagePaymentStatus &&
            [EncorePackagePaymentStatus.Eligible, EncorePackagePaymentStatus.NotEligible].includes(
                packagePaymentStatus
            )) ||
        shouldHideSuccessfulBanner
    ) {
        return {
            bannerState: { status: membershipStatus, packageExpiryDate, packagePurchasePaylink, showBanner: !isActive },
        };
    }

    if (!encoreTier) return undefined;

    switch (packagePaymentStatus) {
        case EncorePackagePaymentStatus.PaymentPending:
            return {
                // need to implicitly set banner states for membership card
                bannerState: {
                    status: isExpired ? UserEncoreStatus.EXPIRED : UserEncoreStatus.START_UPGRADE,
                    packageExpiryDate,
                    packagePurchasePaylink,
                    disableCta: true,
                    showBanner: isExpired,
                },
                extraBannerState: {
                    status: getExtraBannerStatusForPayment(isExpired, encoreTier, packagePaymentStatus),
                },
            };
        case EncorePackagePaymentStatus.PaylinkExpired:
            return {
                bannerState: {
                    status: membershipStatus,
                    packageExpiryDate,
                    packagePurchasePaylink,
                    hideCta: true,
                    showBanner: isExpired,
                },
                ...{
                    extraBannerState: {
                        status:
                            encoreTier && [UserEncoreTiers.BASIC, UserEncoreTiers.LEGACY].includes(encoreTier)
                                ? UserEncoreStatus.PAYMENT_UPGRADE_EXPIRED
                                : UserEncoreStatus.PAYMENT_RENEWAL_EXPIRED,
                    },
                },
            };
        case EncorePackagePaymentStatus.PaymentFailed:
            return {
                bannerState: { status: membershipStatus, packageExpiryDate, showBanner: false },
                ...{
                    extraBannerState: {
                        status: UserEncoreStatus.PAYMENT_ERROR,
                    },
                },
            };
        case EncorePackagePaymentStatus.PaymentCompleted:
            return {
                bannerState: {
                    status: UserEncoreStatus.RENEWAL_SUCCESSFUL,
                    packageExpiryDate,
                    showBanner: !shouldHideSuccessfulBanner,
                },
            };
    }

    return undefined;
};

export const isDateExpired = (packageExpiryDate?: string) => {
    if (!packageExpiryDate) return true;
    const expiryDate = parseDateString(packageExpiryDate);
    const currentDate = new Date();
    if (!expiryDate) return true;

    return isBefore(expiryDate, currentDate);
};

type BannerContent = {
    title: string;
    modifier: string;
    content: string;
    ctaText?: string | undefined;
    closeText?: string | undefined;
};

export const populateBannerContent = (
    membershipStatus: UserEncoreStatus,
    packageExpiryDate?: string,
    encoreTier?: string
): BannerContent | null => {
    const isExpired = isDateExpired(packageExpiryDate);
    switch (membershipStatus) {
        case UserEncoreStatus.NONE:
            return {
                title: "Register car for full benefits",
                modifier: "no-vehicle",
                content: `Continue your experience by registering your Lexus vehicle to this account.`,
                ctaText: "add vehicle",
            };
        case UserEncoreStatus.SERVICE_DOWN:
            return {
                title: "Service Down Temporarily",
                modifier: "error",
                content: `Please be patient as we as we speedily fix some minor issues with this feature 'Encore Membership Status'. Tap the refresh button to refresh and try again.`,
                ctaText: "refresh",
            };
        case UserEncoreStatus.EXPIRING_SOON:
            return {
                title: `Encore membership ending`,
                modifier: "expiring",
                content: `You have less than {monthsTilExpiry} month{suffix} to use your benefits.`,
                ctaText: "read more",
            };
        case UserEncoreStatus.EXPIRED:
            const expiredContent = () => {
                switch (encoreTier) {
                    case UserEncoreTiers.BASIC:
                    case UserEncoreTiers.LEGACY:
                        return `Your Encore membership has expired. To continue accessing a number of these exclusive benefits, join Encore Elevate. As an Encore Elevate member, you can borrow another Lexus with On Demand, experience seamless shopping with Valet Parking, and more.`;
                    case UserEncoreTiers.PLATINUM:
                        return `Your Encore Platinum membership has expired. To continue accessing a number of these exclusive benefits, join Encore Elevate. As an Encore Elevate member, you can still borrow another Lexus with On Demand, experience seamless shopping with Valet Parking, and more.`;
                    case UserEncoreTiers.ELEVATE:
                    default:
                        return `Your Encore Elevate membership has expired. To continue using your exclusive benefits, renew your membership today. As a member, you can borrow another Lexus with On Demand, experience seamless shopping with Valet Parking, and more.`;
                }
            };
            return {
                title:
                    encoreTier === UserEncoreTiers.BASIC || encoreTier === UserEncoreTiers.LEGACY
                        ? `Your encore membership has ended`
                        : `Your encore {encoreTier} membership has ended`,
                modifier: "error",
                ctaText: "start purchase",
                content: expiredContent(),
            };
        case UserEncoreStatus.START_RENEWAL:
        case UserEncoreStatus.START_UPGRADE:
            return {
                title: "Complete your purchase",
                modifier: "payment",
                ctaText: "pay now",
                content:
                    "To complete the purchase of your Encore Elevate membership, please proceed to payment. If you have already made your payment, please refresh the page.",
            };
        case UserEncoreStatus.RENEWAL_SUCCESSFUL:
            return {
                title: "Congratulations!",
                modifier: "success",
                content: `Your Encore Elevate membership has been activated. The new expiry date is {formattedExpiryDate}.`,
            };
        case UserEncoreStatus.PAYMENT_ERROR:
            return {
                title: "Payment error",
                modifier: "error",
                content: `We have encountered an error while processing your payment. For more information please contact us on Lexus Customer Assistance Centre on 1800 023 009.`,
            };
        case UserEncoreStatus.PAYMENT_UPGRADE_EXPIRED:
        case UserEncoreStatus.PAYMENT_UPGRADE:
        case UserEncoreStatus.PAYMENT_RENEWAL_EXPIRED:
            return {
                title: "please re-register your interest",
                modifier: "payment-expired",
                ctaText: isExpired ? "start purchase" : "start upgrade",
                content: `Your paylink has timed out after 4 days of inactivity. Please re-confirm your details to begin the {bannerText} process again.`,
                closeText: "Remind me later",
            };
        case UserEncoreStatus.PACKAGE_MISSING:
            return {
                title: "complete your encore enrolment",
                modifier: "package-missing",
                content: `Please contact your Lexus Dealership to finalise your enrolment and unlock the full suite of Encore benefits.`,
            };
    }
    return encoreTier
        ? null
        : {
              title: "Register car for full benefits",
              modifier: "no-vehicle",
              content: `Continue your experience by registering your Lexus vehicle to this account.`,
              ctaText: "add vehicle",
          };
};
