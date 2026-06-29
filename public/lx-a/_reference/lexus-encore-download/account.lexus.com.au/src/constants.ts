import { UserEncoreTiers } from "Helpers/users";

export const breakpointNumeric = 1024;
export const desktopBreakpoint = `${breakpointNumeric}px`;
export const lexusHomeUrl = "https://lexus.com.au";

export const salesforceErrorCode601 = 601;
export const salesforceErrorCode602 = 602;
export const salesforceErrorCode605 = 605;
export const salesforceErrorCode608 = 608;
export const salesforceErrorCode609 = 609;
export const salesforceErrorCode614 = 614;

export const popTartTime = 2600;

//ensure this matches with the transition delay in "src/components/PopTart/PopTart.scss"
export const popTartTransitionTime = 300;

export const na = "NOT AVAILABLE";

type VehicleBenefit = {
    key: string;
    disabledFor: UserEncoreTiers[];
    packageDurationMonths?: number;
};

export const vehicleBenefitObject: VehicleBenefit[] = [
    { key: "drivecare", disabledFor: [] },
    { key: "serviceLoanCar", disabledFor: [] },
    {
        key: "connectedBenefits",
        disabledFor: [],
        packageDurationMonths: 60,
    },
];

export const hotelPartnershipKeys = ["oneOnly", "raes", "jackalope"];

export const numberToWords = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

export const IS_SHOWN_BANNER = "is_shown_banner";
export const IS_SHOWN_EXTRA_BANNER = "is_shown_extra_banner";
export const IS_DEMO_USER = "is_demo_user";

// path to the new online service booking page
export const OSB_CONTACT_SERVICE_PATH = "/contact/service";
