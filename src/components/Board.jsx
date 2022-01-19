import React, { useEffect, useRef, useState } from "react";
import Square from "./Square";
import styles from "../styles/Board.module.css";

import { useSelector, useDispatch } from "react-redux";

const Board = ({ onClick, playerX, playerY }) => {
  
  const rowInputValR = useSelector((state)=> state.tictactoe.rowInputVal)
  const columnInputValR = useSelector((state)=> state.tictactoe.columnInputVal)
  const boardRedux = useSelector((state) => state.tictactoe.board);

  const [color, setColor] = useState("white");


  return (
    <>
      <div className="row d-flex align-items-center mb-3">
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
            <Square
              playerX={playerX}
              playerY={playerY}
              key={i}
              value={ele}
              onClick={() => onClick(i)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Board;
