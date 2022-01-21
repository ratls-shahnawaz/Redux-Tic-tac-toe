import React, { useEffect, useRef, useState } from "react";
import Square from "./Square";
import styles from "../styles/Board.module.css";
import { calculateCustomWinner } from "../calculatecustomdynamicwin";
import { useNavigate,Link } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";
import {
  setPlayerXColor,
  setPlayerYColor,
  setCustomWinR,
  setRowInputValR,
  setColumnInputValR,
  setBoardR,
  setHistoryR,
  setNextPlayerTurn
} from "../reducers/reducer";

const Board = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rowInputValR = useSelector(state => state.tictactoe.rowInputVal);
  const columnInputValR = useSelector(state => state.tictactoe.columnInputVal);
  const boardRedux = useSelector((state) => state.tictactoe.board);
  const custumWinR = useSelector((state) => state.tictactoe.customWin);
  const historyR = useSelector((state) => state.tictactoe.history);
  const playerXColor = useSelector((state) => state.tictactoe.playerXColor);
  const playerYColor = useSelector((state) => state.tictactoe.playerYColor);
  const xIsNext = useSelector(state=> state.tictactoe.nextPlayerTurn)

  const [color, setColor] = useState("white");

  // for music
  let audio = new Audio("/music/Ting.mp3");
  // let winnerMusic = new Audio("/music/winner.mp3");

  let winner = calculateCustomWinner(rowInputValR, boardRedux, custumWinR);

  if(winner){
    navigate('/winner', {state:{data:winner}}) 
    // navigate('/viewpost',{state:{data:ele}})
  }


  const handleBoxClick = (i) => {
    audio.play();
    const boardCopy = [...boardRedux];
    // If user click an occupied square or if game is won, return
    if (winner || boardCopy[i]) return;
    // Put an X or an O in the clicked square
    boardCopy[i] = xIsNext ? "X" : "O";

    dispatch(setBoardR(boardCopy));
    dispatch(setNextPlayerTurn(!xIsNext))
    dispatch(setHistoryR([...historyR, boardCopy]));
  };

  return (
    <>
      <div className=" container row d-flex align-items-center my-5">

        <button><Link to="/">Home</Link></button>
        <div className="col-md-3">
          <label for="colorpicker">Select Board Color :</label>
          <input
            onChange={(e) => setColor(e.target.value)}
            type="color"
            name=""
            id=""
          />
        </div>
      </div>

      <div className="text-center">
        <div
          style={{
            backgroundColor: color,
            gridTemplate: `repeat(${rowInputValR}, 0fr) / repeat(${columnInputValR}, 0fr)`,
          }}
          className={`${styles.board}`}
        >
          {boardRedux.map((ele, i) => (
            <Square key={i} value={ele} onClick={() => handleBoxClick(i)} />
          ))}
        </div>
      </div>

      <div className="d-flex my-2">
        <label className="mx-2">Player X:</label>
        <input
          onChange={(e) => dispatch(setPlayerXColor(e.target.value))}
          type="color"
        />
        <label className="mx-2">Player Y:</label>
        <input
          onChange={(e) => dispatch(setPlayerYColor(e.target.value))}
          type="color"
        />
      </div>

      <button className="btn btn-dark text-center">
      <Link to="/moves">Click here for Moves</Link>
      </button>

    
    </>
  );
};

export default Board;
