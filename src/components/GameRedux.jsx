import React, { useEffect, useState, useRef } from "react";
import Board from "./Board";
import styles from "../styles/Game.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setCustomWinR,
  setRowInputValR,
  setColumnInputValR,
  setBoardR,
  setHistoryR,
  setNextPlayerTurn,
} from "../reducers/reducer";

const Game = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rowInputValR = useSelector((state) => state.tictactoe.rowInputVal);
  const columnInputValR = useSelector(
    (state) => state.tictactoe.columnInputVal
  );
  const custumWinR = useSelector((state) => state.tictactoe.customWin);
  const xIsNext = useSelector((state) => state.tictactoe.nextPlayerTurn);

  const [errMsg, setErrMsg] = useState("");

  const refs = useRef(null);
  const refs1 = useRef(null);
  const refs2 = useRef(null);

  const rowHandler = (e) => {
    dispatch(setRowInputValR(Number(e.target.value)));
  };

  const columnHandler = (e) => {
    dispatch(setColumnInputValR(Number(e.target.value)));
  };

  const customWinInputHandler = (e) => {
    dispatch(setCustomWinR(Number(e.target.value)));
  };

  const resetButtonHandler = () => {
    dispatch(setCustomWinR(0));
    dispatch(setRowInputValR(3));
    dispatch(setColumnInputValR(3));

    dispatch(setBoardR(Array(9).fill(null)));
    dispatch(setHistoryR(Array(9).fill(null)));
    dispatch(setNextPlayerTurn(!xIsNext));
  };

  const applyClickHandler = () => {
    refs.current.value = "";
    refs1.current.value = "";
    refs2.current.value = "";

    if (custumWinR <= rowInputValR) {
      dispatch(setBoardR(Array(rowInputValR * columnInputValR).fill(null)));
      navigate("/board");
    } else {
      setErrMsg("Error !! Custom Win Should less than matrix");
    }
  };

  return (
    <>
        <h3 className="text-center bg-warning py-2">
          Welcome !! Tic Tac Toe Game
        </h3>
      <div className={`${styles.game}`}>
        <div className="bg-dark text-warning rounded p-4 col-md-6">
         
          <label className="text-start" for="cars">
            Choose Number of Rows:
          </label>
          <input
            min={0}
            name="row"
            ref={refs}
            onChange={rowHandler}
            type="number"
            className="form-control"
          />

          <label className="mt-2" for="cars">
            Choose Number of Columns:
          </label>
          <input
            min={0}
            name="column"
            ref={refs1}
            onChange={columnHandler}
            type="number"
            className="form-control"
          />

          <label className="mt-2">Select Custom Win :</label>

          <input
            min={0}
            name="column"
            ref={refs2}
            onChange={customWinInputHandler}
            type="number"
            className="form-control"
          />

          <p className="text-danger mt-2">{errMsg}</p>

          <button
            className="btn btn-sm btn-outline-light me-3 mt-2"
            onClick={applyClickHandler}
          >
            Apply
          </button>

          <button
            className="btn btn-sm btn-light mt-2"
            onClick={resetButtonHandler}
          >
            Reset
          </button>
         
        </div>
        
      </div>
    </>
  );
};

export default Game;
