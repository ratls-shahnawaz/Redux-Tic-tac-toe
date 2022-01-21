import React, { useEffect, useRef, useState } from "react";
import Square from "./Square";
import styles from "../styles/Board.module.css";
import { calculateCustomWinner } from "../calculatecustomdynamicwin";
import { useNavigate, Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  setPlayerXColor,
  setPlayerYColor,
  setCustomWinR,
  setRowInputValR,
  setColumnInputValR,
  setBoardR,
  setHistoryR,
  setNextPlayerTurn,
} from "../reducers/reducer";

const Board = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rowInputValR = useSelector((state) => state.tictactoe.rowInputVal);
  const columnInputValR = useSelector(
    (state) => state.tictactoe.columnInputVal
  );
  const boardRedux = useSelector((state) => state.tictactoe.board);
  const custumWinR = useSelector((state) => state.tictactoe.customWin);
  const historyR = useSelector((state) => state.tictactoe.history);
  const playerXColor = useSelector((state) => state.tictactoe.playerXColor);
  const playerYColor = useSelector((state) => state.tictactoe.playerYColor);
  const xIsNext = useSelector((state) => state.tictactoe.nextPlayerTurn);

  const [color, setColor] = useState("white");

  // for music
  let audio = new Audio("/music/Ting.mp3");
  let winner = calculateCustomWinner(rowInputValR, boardRedux, custumWinR);

  if (winner) {
    navigate("/winner", { state: { data: winner } });
  }

  const handleBoxClick = (i) => {
    audio.play();
    const boardCopy = [...boardRedux];
    // If user click an occupied square or if game is won, return
    if (winner || boardCopy[i]) return;
    // Put an X or an O in the clicked square
    boardCopy[i] = xIsNext ? "X" : "O";

    dispatch(setBoardR(boardCopy));
    dispatch(setHistoryR([...historyR, boardCopy]));
    dispatch(setNextPlayerTurn(!xIsNext));
  };

  const resetButtonHandler = () => {
    dispatch(setCustomWinR(3));
    dispatch(setRowInputValR(3));
    dispatch(setColumnInputValR(3));

    dispatch(setBoardR(Array(9).fill(null)));
    dispatch(setHistoryR(Array(9).fill(null)));
    dispatch(setNextPlayerTurn(!xIsNext));
  };

  return (
    <>
      <div className={`${styles.boardMain}`}>
        <div className="p-4 bg-dark rounded">
          <div className="bg-light d-flex justify-content-center align-items-center p-2 mb-2 rounded">
            <button className="btn btn-sm btn-outline-dark me-3">
              <Link style={{ textDecoration: "none" }} to="/">
                Back
              </Link>
            </button>
            <button 
            className="btn btn-sm btn-dark me-3"
            onClick={resetButtonHandler}
            >
             Reset
            </button>

            <label className="mx-2">Select Board Color : </label>
            <input onChange={(e) => setColor(e.target.value)} type="color" />

            <label className="mx-2">Player X:</label>
            <input
              onChange={(e) => dispatch(setPlayerXColor(e.target.value))}
              type="color"
            />
            <label className="mx-2">Player O:</label>
            <input
              onChange={(e) => dispatch(setPlayerYColor(e.target.value))}
              type="color"
            />
          </div>

          {/* =========Showing board========= */}

          <div className="my-3 text-center">
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

          {/* ======== Showing Next Player ======== */}

          <div className="d-flex justify-content-around align-items-center">
            <p
              className="p-2 mt-3 d-inline-block rounded"
              style={{ backgroundColor: xIsNext ? playerXColor : playerYColor }}
            >
              {!winner ? "Next Player: " + (xIsNext ? "X" : "O") : null}
            </p>

            <button className="btn btn-light text-center">
              <Link style={{ textDecoration: "none" }} to="/moves">
                Click here for Moves
              </Link>
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default Board;
