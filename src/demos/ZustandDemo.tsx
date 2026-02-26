import { useZustandCounterStore } from "./ZustandCounterStore";

/**
 * Zustand demo: no Provider needed.
 * Use the store hook and pick only what you need (count + actions).
 */
export function ZustandDemo() {
  const count = useZustandCounterStore((state) => state.count);
  const increment = useZustandCounterStore((state) => state.increment);
  const decrement = useZustandCounterStore((state) => state.decrement);
  const addBy = useZustandCounterStore((state) => state.addBy);

  return (
    <div className="rounded-lg border border-amber-500/50 bg-slate-800/80 p-4">
      <p className="mb-2 text-sm text-amber-300">Zustand: useStore(selector)</p>
      <p className="mb-3 text-2xl font-bold text-white">{count}</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded bg-amber-600 px-3 py-1.5 text-sm font-medium hover:bg-amber-500"
          onClick={decrement}
        >
          − Decrement
        </button>
        <button
          type="button"
          className="rounded bg-amber-600 px-3 py-1.5 text-sm font-medium hover:bg-amber-500"
          onClick={increment}
        >
          + Increment
        </button>
        <button
          type="button"
          className="rounded bg-amber-600 px-3 py-1.5 text-sm font-medium hover:bg-amber-500"
          onClick={() => addBy(5)}
        >
          +5
        </button>
      </div>
    </div>
  );
}
