import React from "react";
import styles from "../styles/Winner.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate,Link , useLocation} from 'react-router-dom';

const Winner = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {state} = useLocation() 

  let winnerMusic = new Audio("/music/winner.mp3");

  const xIsNext = useSelector(state=> state.tictactoe.nextPlayerTurn)
  const playerXColor = useSelector((state) => state.tictactoe.playerXColor);
  const playerYColor = useSelector((state) => state.tictactoe.playerYColor);
  


  return (
    <div>
       <button><Link to="/">Home</Link></button>
       <button><Link to="/board">Board</Link></button>
      <h1 className="text-center">Winner Show here</h1>

      <div>
        <p
          className={state.data ? styles.heartbeatPara : styles.nextplayerDiv}
          style={{ backgroundColor: xIsNext ? playerXColor : playerYColor }}
        >
          {state.data
            ? winnerMusic.play() && state.data == "Draw"
              ? state.data
              : "Winner: " + state.data
            : "Next Player: " + (xIsNext ? "X" : "O")}
        </p>
      </div>
    </div>
  );
};

export default Winner;
