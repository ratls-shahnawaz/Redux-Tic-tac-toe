import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

const initialState = {
  board: Array(9).fill(null),
  customWin: 3,
  rowInputVal: 3,
  columnInputVal: 3,
  history: [],
  playerXColor:'grey',
  playerYColor:'pink',
  nextPlayerTurn:true
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
      // debugger;
      console.log('history-=-=->>>',action.payload)
      state.history = action.payload
      // state.history = state.history.splice(state.history,action.payload)
    },
    setPlayerXColor:(state,action)=>{
      state.playerXColor = action.payload
    },
    setPlayerYColor:(state,action)=>{
      state.playerYColor = action.payload
    },
    setNextPlayerTurn:(state,action)=>{
      state.nextPlayerTurn = action.payload
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
  setPlayerXColor,
  setPlayerYColor,
  setNextPlayerTurn,
  
 } = counterSlice.actions;

export default counterSlice.reducer;
