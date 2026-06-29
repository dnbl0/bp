import { useDispatch } from "react-redux";
import { Dispatch } from "Types/general";

export const useThunkDispatch = <E = Record<string, unknown>>() => {
    return useDispatch<Dispatch<E>>();
};
