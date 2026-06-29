export enum BookVehicleStatus {
    Available = "available",
    Unavailable = "unavailable",
}

export enum VehicleFeatureId {
    AirConditioning = "7",
    BoatLicence = "9",
    AppleCarPlay = "12",
    AndroidAuto = "13",
    WirelessPhoneCharger = "23",
    AppleCarPlayOrAndroidAuto = "28",
}

export enum OnDemandAction {
    GetAccountInfo = "getAccountInfo",
    SetSelectedLocation = "setSelectedLocation",
    FetchLocations = "fetchLocations",
    FetchPublicHolidays = "fetchPublicHolidays",
    UpdateUser = "updateUser",
    MakeBooking = "makeBooking",
    FetchOnDemandVehicles = "fetchOnDemandVehicles",
    FetchOnDemandFlexiBooking = "fetchOnDemandFlexiBooking",
    ResetFlexiBooking = "resetFlexiBooking",
    SetOnDemandFlexiCheckedDates = "setOnDemandFlexiCheckedDates",
    ResetOnDemandFlexiCheckedDates = "resetOnDemandFlexiCheckedDates",
    SetBookingInProgressPickUpAndDropOffDateTimes = "setBookingInProgressPickUpAndDropOffDateTimes",
    ResetBookingInProgressPickUpAndDropOffDateTimes = "resetBookingInProgressPickUpAndDropOffDateTimes",
    SetBookingInProgressFlightNumbers = "setBookingInProgressFlightNumbers",
    ResetBookingInProgressFlightNumbers = "resetBookingInProgressFlightNumbers",
    SetSelectedVehicle = "setSelectedVehicle",
    ResetSelectedVehicle = "resetSelectedVehicle",
    ResetBookVehicle = "resetBookVehicle",
    GetBookingHistory = "getBookingHistory",
    ResetCancelBooking = "resetCancelBooking",
    CancelBooking = "cancelBooking",
    ResetBookingHistory = "resetBookingHistory",
    InitializeBookingInProgress = "initializeBookingInProgress",
    SetCurrentBooking = "setCurrentBooking",
    ResetCurrentBooking = "resetCurrentBooking",
    UpdateBooking = "updateBooking",
    FlexiBookingType = "flexiBookingType",
    SetOnDemandSettings = "setOnDemandSettings",
}

export const defaultMaxBookingDurationInDays = 8;
