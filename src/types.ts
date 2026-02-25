export interface Stock {
    id: string;
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
}
export interface WatchlistContextType {
    stocks: Stock[];
    addStock: (symbol: string) => Promise<void>;
    removeStock: (symbol: string) => void;
    loading: boolean;
    error: string | null;
}