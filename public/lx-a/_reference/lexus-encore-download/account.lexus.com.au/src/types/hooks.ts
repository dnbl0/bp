export type ReactUseStateSet<T> = (newState: T | ((currentState: T) => T)) => void;
