# Stock Watchlist MVP

A React app for managing a stock watchlist, built with **React 19**, **TypeScript**, and **Vite**. It demonstrates several state-management approaches: React Context + reducer (main watchlist), **Redux (RTK)**, and **Zustand** via simple counter demos.

## Tech stack

- **React 19** + **TypeScript**
- **Vite** – build and dev server
- **Tailwind CSS** – styling
- **Redux Toolkit** + **react-redux** – Redux demo
- **Zustand** – Zustand demo

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Build and lint:

```bash
npm run build
npm run lint
```

## Project structure

```
src/
├── App.tsx           # Main UI: watchlist table, add/remove, delay control, state demos
├── main.tsx           # Entry: renders App inside WatchlistProvider
├── context.tsx        # Watchlist state: React Context + useReducer
├── hooks.ts           # useWatchlist() – consumes WatchlistContext
├── types.ts           # Stock, WatchlistContextType
├── enum.ts            # WatchlistActionTypes (ADD, REMOVE, LOADING, etc.)
├── demos/             # Redux and Zustand counter demos (for learning)
│   ├── ReduxDemo.tsx
│   ├── reduxCounterSlice.ts
│   ├── reduxStore.ts
│   ├── ZustandDemo.tsx
│   └── ZustandCounterStore.ts
├── App.css
└── index.css
```

## How state is managed

### Watchlist (main feature)

- **Context + reducer** in `context.tsx`:
  - `WatchlistProvider` wraps the app in `main.tsx`.
  - State: `stocks[]`, `loading`, `error`, `fakeDelay`.
  - Actions: `ADD`, `REMOVE`, `LOADING`, `UPDATE_FAKE_DELAY`.
  - Components use `useWatchlist()` from `hooks.ts` to read state and call `addStock`, `removeStock`, `updateFakeDelay`.
- Add/remove use a configurable **fake delay** (ms) to simulate async work; the delay is stored in context and can be changed via the input in the UI.

### Redux and Zustand demos

At the bottom of the app, two small **counter** demos run side by side:

- **Redux (RTK):** slice in `reduxCounterSlice.ts`, store in `reduxStore.ts`, `<Provider>` in `ReduxDemo.tsx`. Components use `useSelector` and `useDispatch`.
- **Zustand:** single store in `ZustandCounterStore.ts`, no provider. Components use `useZustandCounterStore(selector)`.

Same behavior (increment, decrement, add by 5) so you can compare patterns.

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start Vite dev server    |
| `npm run build`| Type-check + production build |
| `npm run lint` | Run ESLint               |
| `npm run preview` | Preview production build |

---

## Vite + React template notes

This project was bootstrapped with the React + TypeScript + Vite template. The [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) plugin enables Fast Refresh. For stricter ESLint type-aware rules, see the [TypeScript ESLint docs](https://typescript-eslint.io/).
