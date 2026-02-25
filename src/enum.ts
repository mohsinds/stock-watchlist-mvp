export const WatchlistActionTypes = {
    ADD: "ADD", 
    REMOVE: "REMOVE"
} as const;

export type WatchlistActionTypes = typeof WatchlistActionTypes[keyof typeof WatchlistActionTypes];