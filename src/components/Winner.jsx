import React from "react";
import styles from "../styles/Winner.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Winner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  let winnerMusic = new Audio("/music/winner.mp3");

  const xIsNext = useSelector((state) => state.tictactoe.nextPlayerTurn);
  const playerXColor = useSelector((state) => state.tictactoe.playerXColor);
  const playerYColor = useSelector((state) => state.tictactoe.playerYColor);

  return (
    <div className="text-center">

      <div className="bg-dark text-light py-2 d-flex justify-content-center align-items-center">
        <h3 className="text-center">Congratulation !! 🎉🎊</h3>
      <button className="btn btn-sm btn-outline-warning mx-3">
        <Link to="/">Home</Link>
      </button>
      <button className="btn btn-sm btn-warning">
        <Link to="/board">Board</Link>
      </button>
      </div>

      <div className="mt-4">
        <p
          className={state.data ? styles.heartbeatPara : styles.nextplayerDiv}
          style={{ backgroundColor: xIsNext ? playerXColor : playerYColor }}
        >
          {state.data
            ? winnerMusic.play() && state.data == "Draw"
              ? state.data
              : "Winner: "   + state.data  
            : "Next Player: " + (xIsNext ? "X" : "O")}
        </p>
      </div>

    </div>
  );
};

export default Winner;
