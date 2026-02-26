import { Provider, useDispatch, useSelector } from "react-redux";
import { reduxStore } from "./reduxStore";
import { increment, decrement, addBy } from "./reduxCounterSlice";
import type { ReduxRootState } from "./reduxStore";

/** Inner component that reads from Redux and dispatches actions */
function ReduxCounter() {
  const count = useSelector((state: ReduxRootState) => state.reduxCounter.value);
  const dispatch = useDispatch();

  return (
    <div className="rounded-lg border border-violet-500/50 bg-slate-800/80 p-4">
      <p className="mb-2 text-sm text-violet-300">Redux: useSelector + useDispatch</p>
      <p className="mb-3 text-2xl font-bold text-white">{count}</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded bg-violet-600 px-3 py-1.5 text-sm font-medium hover:bg-violet-500"
          onClick={() => dispatch(decrement())}
        >
          − Decrement
        </button>
        <button
          type="button"
          className="rounded bg-violet-600 px-3 py-1.5 text-sm font-medium hover:bg-violet-500"
          onClick={() => dispatch(increment())}
        >
          + Increment
        </button>
        <button
          type="button"
          className="rounded bg-violet-600 px-3 py-1.5 text-sm font-medium hover:bg-violet-500"
          onClick={() => dispatch(addBy(5))}
        >
          +5
        </button>
      </div>
    </div>
  );
}

/** Demo wrapper: Redux needs a Provider around the tree that uses the store */
export function ReduxDemo() {
  return (
    <Provider store={reduxStore}>
      <ReduxCounter />
    </Provider>
  );
}
