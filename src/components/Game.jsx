import React, { useEffect, useState, useRef } from "react";
import Board from "./Board";
import styles from "../styles/Game.module.css";

import { calculateWinnerDynamic } from "../calculatewinnerdynamic";

const Game = () => {

  // to show dynamic win or custom win
  const [dynamicShow,setDynamicShow] = useState(true) 
  const [customWin, setCustomWin] = useState();

  const refs = useRef(null);
  const refs1 = useRef(null);

  const [rowInputVal, setRowInputVal] = useState(3);

  const [col, setCol] = useState(3);
  const [columnInputVal, setColumnInputVal] = useState(col);

  const [board, setBoard] = useState(Array(9).fill(null));
  if(dynamicShow == true){

    var winner = calculateWinnerDynamic(rowInputVal, board);
  }
  else{
    var winner = calculateWinnerDynamic(customWin, board);

  }
  const [xIsNext, setXisNext] = useState(true);

  const rowHandler = (e) => {
    if (
      e.target.value == 0 ||
      e.target.value == null ||
      e.target.value == undefined
    ) {
      setRowInputVal(3);
    } else {
      setRowInputVal(Number(e.target.value));
    }
  };

  const columnHandler = (e) => {
    if (
      e.target.value == 0 ||
      e.target.value == null ||
      e.target.value == undefined
    ) {
      setColumnInputVal(3);
    } else {
      setCol(Number(e.target.value));
    }
  };

  const [history, setHistory] = useState([]);

  const handleClick = (i) => {
    const boardCopy = [...board];
    // If user click an occupied square or if game is won, return
    if (winner || boardCopy[i]) return;
    // Put an X or an O in the clicked square
  
      if(dynamicShow == true){
        const boardCopy = [...board];
        boardCopy[i] = xIsNext ? "X" : "O";
        setBoard(boardCopy);
        setXisNext(!xIsNext)
      }
      else{
        const boardCopy = [...board];
        boardCopy[i] = xIsNext ? "X" : "O";
        setBoard(boardCopy);
        setXisNext(!xIsNext)
      }

    setHistory([...history, boardCopy]);
  };

  const handleHistoryClick = (arr, index) => {
    setBoard(arr);
    setHistory(history.splice(history, index + 1));
    // if((history.length % 2) === 0){
    setXisNext(!xIsNext);
    // }
  };

  const moves = history.map((ele, index) => {
    if (ele !== null) {
      return (
        <li key={index}>
          <button onClick={() => handleHistoryClick(ele, index)}>
            go to move {index}
          </button>
          {ele}
        </li>
      );
    }
  });

  const resetButtonHandler = () => {
    refs.current.value = "";
    refs1.current.value = "";
    setColumnInputVal(3);
    setRowInputVal(3);
    setBoard(Array(9).fill(null));
    setHistory(board);
    setXisNext(!xIsNext);
    setCustomWin(0)
  };

  const applyClickHandler = () => {
    refs.current.value = "";
    refs1.current.value = "";
    setColumnInputVal(col);

    if(customWin == undefined || customWin == null || customWin == 0){
      setBoard(Array(rowInputVal * columnInputVal).fill(null));
      setDynamicShow(true)
    }
    else{
      setBoard(Array(customWin * customWin).fill(null));
      setDynamicShow(false)
    }

  };

  const [playerXColor, setPlayerXColor] = useState("white");
  const [playerYColor, setPlayerYColor] = useState("red");

  const customWinInputHandler = (e) => {
    setCustomWin(Number(e.target.value));
  };


  return (
    <div className="container bg-light">
      <h3 className="text-center bg-dark text-warning py-2">
        Welcome !! Tic Tac Toe Game
      </h3>
      <div className="py-3 row  text-start">
        <div className="col-md-6 offset-3">
          <label for="cars">Choose Number of Rows:</label>
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

         <label htmlFor="">Select Custom Win :</label>

         <input
            min={0}
            name="column"
            ref={refs1}
            onChange={customWinInputHandler}
            type="number"
            className="form-control"
          />

          <button
            className="btn btn-sm btn-primary me-3 mt-3"
            onClick={applyClickHandler}
          >
            Apply
          </button>

          <button
            className="btn btn-sm btn-danger mt-3"
            onClick={resetButtonHandler}
          >
            Reset
          </button>
        </div>
      </div>

      <br />

      <Board
        playerX={playerXColor}
        playerY={playerYColor}
        colBox={columnInputVal}
        rowBox={rowInputVal}
        squares={dynamicShow?board: Array(columnInputVal * rowInputVal).fill(null)}
        onClick={handleClick}
      />
      <div className="d-flex my-2">
        <label className="mx-2">Player X:</label>
        <input onChange={(e) => setPlayerXColor(e.target.value)} type="color" />
        <label className="mx-2">Player Y:</label>
        <input onChange={(e) => setPlayerYColor(e.target.value)} type="color" />
      </div>

      <div>
        <p
          className={winner ? styles.heartbeatPara : styles.nextplayerDiv}
          style={{ backgroundColor: xIsNext ? playerXColor : playerYColor }}
        >
          {winner
            ? winner == "draw"
              ? winner
              : "Winner: " + winner
            : "Next Player: " + (xIsNext ? "X" : "O")}
        </p>
      </div>

      <br />
      <br />

      {history ? <ol>{moves}</ol> : null}
    </div>
  );
};

export default Game;
