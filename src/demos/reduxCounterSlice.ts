import { createSlice } from "@reduxjs/toolkit";

export const reduxCounterSlice = createSlice({
  name: "reduxCounter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    addBy: (state, action: { payload: number }) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, addBy } = reduxCounterSlice.actions;
