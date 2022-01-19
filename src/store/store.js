import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../reducers/reducer";

export const store = configureStore({
  reducer: {
    tictactoe: counterSlice,
  },
});