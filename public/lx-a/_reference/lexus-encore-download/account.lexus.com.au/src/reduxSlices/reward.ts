import { Dispatch, StateSelector } from "../types/general";
import {
    FetchAction,
    FetchActionPayload,
    FetchContainer,
    PromiseThunk,
    authorizedFetch,
    createFetchThunk,
    fetchActionPayloadToContainer,
    getFetchContainerError,
    getFetchContainerValue,
    initialFetchContainer,
    json,
    status,
} from "../helpers/fetch";
import {
    getAllRewardsCategoriesUrl,
    getCaltexCouponUrl,
    getRewardCouponUrl,
    getRewardsOnCategoryUrl,
} from "../apiHref";

import { LoadStatus } from "../types/loadStatus";
import { RootLevelAction } from "./rootLevelAction";
import { createSelector } from "reselect";
import { settingsPromise } from "../settings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CaltexRewardCoupon {
    caltexId: string;
    dailyClaimedStatus: string;
    lastRedemptionDate: string | null;
    memberId: string;
    vin: string;
}

export interface Rewards {
    name: string;
    description: string;
    link: string;
    backgroundImage: string;
    logo: string;
    encoreTier: string;
    date: string;
    locations: string[];
    offset: number;
    subtitle: string;
    tags: string[];
    total: number;
    category: string;
}

export interface RewardsCategoriesResponse {
    id: string;
    title: string;
    explorePageText: string;
    tags: RewardsTag[];
}

export interface RewardsTag {
    id: string;
    name: string;
}

type FetchCaltexRewardCouponFetchContainer = FetchContainer<CaltexRewardCoupon>;
type FetchRewardsFetchContainer = FetchContainer<Rewards[]>;
type FetchAllRewardsCategoriesFetchContainer = FetchContainer<RewardsCategoriesResponse[]>;

type FetchCaltexRewardCouponFetchActionPayload = FetchActionPayload<CaltexRewardCoupon>;
type FetchRewardsFetchActionPayload = FetchActionPayload<Rewards[]>;
type FetchRewardsCategoriesFetchActionPayload = FetchActionPayload<RewardsCategoriesResponse[]>;

export interface FetchAllRewardsFetchActionPayload {
    [key: string]: FetchRewardsFetchContainer;
}

export interface RewardState {
    caltexRewardCoupon: FetchCaltexRewardCouponFetchContainer;
    categories: FetchAllRewardsCategoriesFetchContainer;
    newRewards: FetchAllRewardsFetchActionPayload;
}

export const initialRewardState: RewardState = {
    caltexRewardCoupon: initialFetchContainer,
    categories: initialFetchContainer,
    newRewards: {},
};

export enum RewardAction {
    FetchCaltexRewardCoupon = "fetchCaltexRewardCoupon",
    FetchForYouRewards = "fetchForYouRewards",
    FetchExclusiveEventsRewards = "fetchExclusiveEventsRewards",
    FetchAllRewardsCategories = "fetchAllRewardsCategories",
    FetchNewRewards = "fetchNewRewards",
}

export const fetchCaltexRewardCouponThunk =
    (vin: string): PromiseThunk<CaltexRewardCoupon> =>
    async dispatch => {
        return getRewardCouponUrl(vin)
            .then(authorizedFetch)
            .then(status)
            .then(json)
            .then(rewardCoupon => getCaltexCouponUrl(rewardCoupon.caltexId))
            .catch(error => {
                dispatch(
                    fetchCaltexRewardCoupon({
                        action: FetchAction.Failure,
                        value: error,
                    })
                );
                return Promise.reject(error);
            })
            .then(caltexCouponUrl => dispatch(createFetchThunk(caltexCouponUrl, fetchCaltexRewardCoupon)));
    };

export const fetchRewardsOnCategory =
    (category: string) =>
    async (dispatch: Dispatch): Promise<PayloadAction<FetchRewardsFetchActionPayload> | void> => {
        const isRewardsEnabled = (await settingsPromise())?.reward?.isRewardsEnabled;
        if (isRewardsEnabled) {
            return getRewardsOnCategoryUrl(category)
                .then(authorizedFetch)
                .then(status)
                .then(json)
                .catch(error => {
                    dispatch(
                        fetchNewRewards({
                            action: FetchAction.Failure,
                            value: error,
                            status: LoadStatus.Failure,
                        })
                    );
                    return Promise.reject(error);
                })
                .then(results => {
                    dispatch(
                        fetchNewRewards({
                            action: FetchAction.Success,
                            status: LoadStatus.Success,
                            value: results as Rewards[],
                        })
                    );
                });
        } else {
            return Promise.resolve(
                dispatch(
                    fetchNewRewards({ action: FetchAction.Success, status: LoadStatus.Success, value: [] as Rewards[] })
                )
            );
        }
    };

export const fetchAllRewardsCategories =
    () =>
    async (dispatch: Dispatch): Promise<PayloadAction<FetchRewardsCategoriesFetchActionPayload> | void> => {
        const isRewardsEnabled = (await settingsPromise())?.reward?.isRewardsEnabled;
        if (isRewardsEnabled) {
            return getAllRewardsCategoriesUrl()
                .then(fetch)
                .then(status)
                .then(json)
                .catch(error => {
                    dispatch(
                        fetchAllRewardsCategoriesAction({
                            action: FetchAction.Failure,
                            value: error,
                        })
                    );
                    return Promise.reject(error);
                })
                .then(results => {
                    dispatch(
                        fetchAllRewardsCategoriesAction({
                            action: FetchAction.Success,
                            value: results as RewardsCategoriesResponse[],
                        })
                    );
                });
        } else {
            return Promise.resolve(
                dispatch(
                    fetchAllRewardsCategoriesAction({
                        action: FetchAction.Success,
                        value: [] as RewardsCategoriesResponse[],
                    })
                )
            );
        }
    };

const caltexRewardCouponContainerSelector: StateSelector<FetchCaltexRewardCouponFetchContainer> = state =>
    state.reward.caltexRewardCoupon;

export const newRewardsSelector: StateSelector<FetchAllRewardsFetchActionPayload> = state => state.reward.newRewards;

const allRewardsCategoriesContainerSelector: StateSelector<FetchAllRewardsCategoriesFetchContainer> = state =>
    state.reward.categories;

export const caltexRewardCouponStatusSelector: StateSelector<LoadStatus> = state =>
    caltexRewardCouponContainerSelector(state).status;

export const caltexRewardCouponSelector: StateSelector<CaltexRewardCoupon | undefined> = createSelector(
    caltexRewardCouponContainerSelector,
    getFetchContainerValue
);

export const caltexRewardCouponErrorSelector: StateSelector<Error | undefined> = createSelector(
    caltexRewardCouponContainerSelector,
    getFetchContainerError
);

export const allRewardsCategoriesSelector: StateSelector<RewardsCategoriesResponse[] | undefined> = createSelector(
    allRewardsCategoriesContainerSelector,
    getFetchContainerValue
);

const rewardSlice = createSlice({
    name: "reward",
    initialState: initialRewardState,
    reducers: {
        [RewardAction.FetchCaltexRewardCoupon]: (
            state,
            action: PayloadAction<FetchCaltexRewardCouponFetchActionPayload>
        ) => {
            state.caltexRewardCoupon = fetchActionPayloadToContainer(action.payload);
        },
        [RewardAction.FetchAllRewardsCategories]: (
            state,
            action: PayloadAction<FetchRewardsCategoriesFetchActionPayload>
        ) => {
            state.categories = fetchActionPayloadToContainer(action.payload);
        },
        [RewardAction.FetchNewRewards]: (
            state,
            action: PayloadAction<FetchRewardsFetchActionPayload & FetchRewardsFetchContainer>
        ) => {
            if (action.payload.action === "Success" && action.payload.value.length > 0) {
                const category = action.payload.value[0].category;
                state.newRewards = { [category]: action.payload };
            }
        },
        [RootLevelAction.Reset]: () => initialRewardState,
    },
});

const {
    fetchAllRewardsCategories: fetchAllRewardsCategoriesAction,
    fetchNewRewards,
    fetchCaltexRewardCoupon,
} = rewardSlice.actions;

export const { reducer: rewardReducer } = rewardSlice;
