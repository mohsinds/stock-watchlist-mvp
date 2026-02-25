import { WatchlistActionTypes}  from "./enum";
import type { Stock } from "./types";

// import type { WatchEventType } from "node:fs";

type Action = 
    | { actionType: typeof WatchlistActionTypes.ADD, stockInfo: Stock}
    | { actionType: typeof WatchlistActionTypes.REMOVE, stockId: string}

