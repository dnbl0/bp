// FZ: This file contains types that are used my multiple redux slices, a slice is a top level part of appState.
export enum LoadStatus {
    NotStarted = "NotStarted",
    InProgress = "InProgress",
    Success = "Success",
    Failure = "Failure",
    Loading = "Loading",
    Loaded = "Loaded",
    Failed = "Failed",
}

export const loadStatusToTrilean = (status: LoadStatus): boolean | undefined =>
    status === LoadStatus.Success ? true : status === LoadStatus.Failure ? false : undefined;
