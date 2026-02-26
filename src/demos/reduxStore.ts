import { configureStore } from "@reduxjs/toolkit";
import { reduxCounterSlice } from "./reduxCounterSlice";

export const reduxStore = configureStore({
  reducer: {
    reduxCounter: reduxCounterSlice.reducer,
  },
});

export type ReduxRootState = ReturnType<typeof reduxStore.getState>;
