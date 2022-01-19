import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

const initialState = {
  board: Array(9).fill(null),
  customWin: 0,
  rowInputVal: 3,
  columnInputVal: 3,
  history: [],
};

export const counterSlice = createSlice({
  name: "tictactoe",
  initialState,
  reducers: {

    setCustomWinR: (state, action) => {
      state.customWin = action.payload;
    },
    setRowInputValR: (state, action) => {
      state.rowInputVal = action.payload;
    },
    setColumnInputValR: (state, action) => {
      state.columnInputVal = action.payload;
    },
    setBoardR:(state,action)=>{
      state.board = action.payload
    },
    setHistoryR:(state,action)=>{
      state.history = action.payload
    },

    getRemoveFunction: (state, action) => {
      state.task = action.payload.splice(0, action.payload.length);
    },
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const { 
  setCustomWinR,
  setRowInputValR,
  setColumnInputValR,
  setBoardR,
  setHistoryR,
  getRemoveFunction } = counterSlice.actions;

export default counterSlice.reducer;
