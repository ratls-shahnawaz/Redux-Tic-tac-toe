import React, { useEffect, useRef, useState } from "react";
import Square from "./Square";
import styles from "../styles/Board.module.css";
import { calculateWinnerDynamic } from "../calculatewinnerdynamic";

const Board = ({ squares, onClick, colBox, rowBox, playerX, playerY }) => {
  const [color, setColor] = useState("white");
  // const Refs = useRef(null);

  const [customWin, setCustomWin] = useState();

  const customWinInputHandler = (e) => {
    setCustomWin(Number(e.target.value));
  };

  // const applyClickHandler = () => {
  //   Refs.current.value = "";
  //   calculateWinnerDynamic(
  //     dynamicWin,
  //     Array(dynamicWin * dynamicWin).fill(null)
  //   );
  // };

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
            gridTemplate: `repeat(${rowBox}, 0fr) / repeat(${colBox}, 0fr)`,
          }}
          className={`${styles.board}`}
        >
          {squares.map((ele, i) => (
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
