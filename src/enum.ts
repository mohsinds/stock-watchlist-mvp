export const WatchlistActionTypes = {
    ADD: "ADD", 
    REMOVE: "REMOVE",
    LOADING: "LOADING",
    FAKE_DELAY: "FAKE_DELAY",
    UPDATE_FAKE_DELAY: "UPDATE_FAKE_DELAY"
} as const;

export type WatchlistActionTypes = typeof WatchlistActionTypes[keyof typeof WatchlistActionTypes];