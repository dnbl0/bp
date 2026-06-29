import { isDemoUser } from "Helpers/demoUser";
import { memoize, uniqueId } from "lodash";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

type Updater<T> = (newValue: T | ((currentValue: T) => T)) => void;

export const createHookStateSubscribers = <State>(): {
    subscribers: Set<Updater<State>>;
    subscribe: (setVehicles: Updater<State>) => () => boolean;
} => {
    const subscribers = new Set<Updater<State>>();
    const subscribe = (setVehicles: Updater<State>) => {
        subscribers.add(setVehicles);
        return () => subscribers.delete(setVehicles);
    };
    return { subscribers, subscribe };
};

export const createUseFetchState = <State>(
    doFetch: () => Promise<State>
): {
    useFetchState: () => State | undefined;
    reFetch: () => void;
    reset: () => void;
} => {
    const cacheKey = uniqueId("fetch");
    const memoizedDoFetch = memoize(doFetch, () => cacheKey);
    const { subscribers, subscribe } = createHookStateSubscribers<State | undefined>();
    const reFetch = () => {
        const nextPromise = doFetch();
        memoizedDoFetch.cache.set(cacheKey, nextPromise);
        nextPromise.then(state => {
            subscribers.forEach(updateSubscriber => {
                updateSubscriber(state);
            });
        });
    };
    const reset = () => {
        memoizedDoFetch.cache.delete(cacheKey);
        subscribers.forEach(updateSubscriber => {
            updateSubscriber(undefined);
        });
    };
    const useFetchState = (): State | undefined => {
        const [fetchState, setFetchState] = useState<State | undefined>(undefined);
        useEffect(() => {
            const unsubscribe = subscribe(setFetchState);
            memoizedDoFetch().then(newFetchState => {
                setFetchState(newFetchState);
            });
            return () => {
                unsubscribe();
            };
        }, []);

        return fetchState;
    };
    return { useFetchState, reFetch, reset };
};

export const useScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
};

export const useDemoBannerHeight = (bannerHeightRef: React.MutableRefObject<number>) => {
    const isDemo = isDemoUser();

    useEffect(() => {
        if (isDemo) {
            const demoBanner = document && document.querySelector(".demo-banner");
            if (demoBanner) {
                const height = demoBanner.clientHeight;
                bannerHeightRef.current = height;
            }
        }
    }, [bannerHeightRef, isDemo]);
};
