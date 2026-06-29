import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    FetchVehiclesPayload,
    fetchVehiclesThunk,
    fetchVehiclesThunkCached,
    vehiclesSelector,
} from "ReduxSlices/vehicle";
import { useThunkDispatch } from "./thunk";

export const useVehicles = (cached = false): FetchVehiclesPayload | undefined => {
    const vehicles = useSelector(vehiclesSelector);
    const dispatch = useThunkDispatch();
    useEffect(() => {
        dispatch(cached ? fetchVehiclesThunkCached : fetchVehiclesThunk);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return vehicles;
};
