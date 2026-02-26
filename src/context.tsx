import { createContext, useContext, useReducer, type ReactNode } from "react";
import { WatchlistActionTypes } from "./enum";
import type { Stock, WatchlistContextType } from "./types";

// import type { WatchEventType } from "node:fs";

type WatchlistActions =
    | { actionType: typeof WatchlistActionTypes.ADD, stockInfo: Stock }
    | { actionType: typeof WatchlistActionTypes.REMOVE, stockId: string }
    | { actionType: typeof WatchlistActionTypes.LOADING, display: boolean }
    // | { actionType: typeof WatchlistActionTypes.FAKE_DELAY}
    | { actionType: typeof WatchlistActionTypes.UPDATE_FAKE_DELAY, delay: number}


interface Watchlist {
    stocks: Stock[],
    loading: boolean,
    error: string | null,
    fakeDelay: number
}

function reducer(watchlist: Watchlist, action: WatchlistActions): Watchlist {
    switch (action.actionType) {
        case WatchlistActionTypes.ADD:
            if (watchlist.stocks.some(s => s.id === action.stockInfo.id))
                return watchlist;

            return {
                ...watchlist,
                stocks: [...watchlist.stocks, action.stockInfo]
            }

        case WatchlistActionTypes.REMOVE:
            // return watchlist.stocks.filter(s => s.id !== action.stockId)
            return {
                ...watchlist,
                stocks: watchlist.stocks.filter(s => s.id !== action.stockId)
            }

        case WatchlistActionTypes.LOADING:
            return {
                ...watchlist,
                loading: action.display
            };
        
        case WatchlistActionTypes.UPDATE_FAKE_DELAY:
            return {
                ...watchlist,
                fakeDelay: action.delay
            };

        default:
            return watchlist;
    }
}

export const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children } : {children:ReactNode}) {
    const initialState : Watchlist = {
        stocks: [],
        loading: false,
        error: null,
        fakeDelay: 1000
    };
    const [state, dispatch] = useReducer(reducer, initialState);
/**
    stocks: Stock[];
    addStock: (symbol: string) => Promise<void>;
    removeStock: (id: string) => void;
    loading: boolean;
    error: string | null;
 */

    const value : WatchlistContextType = {
        stocks: state.stocks,
        addStock: async (stock: Stock) => {

            dispatch({actionType: WatchlistActionTypes.LOADING, display: true})

            const interval: any = setTimeout(() => {
                dispatch({actionType: WatchlistActionTypes.ADD, stockInfo: stock})
                dispatch({actionType: WatchlistActionTypes.LOADING, display: false})

                clearTimeout(interval);

            }, state.fakeDelay);
        },
        removeStock: (id: string) => {
            dispatch({actionType: WatchlistActionTypes.LOADING, display: true})
            const interval: any = setTimeout(() => {
                dispatch({actionType: WatchlistActionTypes.REMOVE, stockId: id})
                dispatch({actionType: WatchlistActionTypes.LOADING, display: false})

                clearTimeout(interval);

            }, state.fakeDelay);   
        },
        loading: state.loading,
        error: state.error,
        fakeDelay: state.fakeDelay,
        updateFakeDelay: (delay: number) => {
            dispatch({ actionType: WatchlistActionTypes.UPDATE_FAKE_DELAY, delay: delay})
        }
    };

    return (
        <WatchlistContext.Provider value={value}>
            {children}
        </WatchlistContext.Provider>
    );
    
}
// export function useWatchlist() {
//     const ctx = useContext(WatchlistContext);
//     if(!ctx) throw new Error("Must be inside WatchlistContext provider");

//     return ctx;
// }