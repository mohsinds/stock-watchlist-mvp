import { useContext } from "react";
import { WatchlistContext } from "./context";

export function useWatchlist() {
    const ctx = useContext(WatchlistContext);
    if(!ctx) throw new Error("Must be inside WatchlistContext provider");

    return ctx;
}