import { create } from "zustand";

interface ZustandCounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  addBy: (n: number) => void;
}

export const useZustandCounterStore = create<ZustandCounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  addBy: (n) => set((state) => ({ count: state.count + n })),
}));
