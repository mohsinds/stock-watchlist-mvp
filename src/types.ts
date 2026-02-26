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
    addStock: (stock: Stock) => Promise<void>;
    removeStock: (id: string) => void;
    loading: boolean;
    error: string | null;
    fakeDelay: number;
    updateFakeDelay: (delay: number) => void;
}