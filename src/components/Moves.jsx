import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
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
const Moves = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const historyR = useSelector((state) => state.tictactoe.history);
  const xIsNext = useSelector((state) => state.tictactoe.nextPlayerTurn);

  const handleHistoryClick = (arr, index) => {
    dispatch(setBoardR(arr));
    const showHistory = [...historyR].splice(historyR, index + 1);
    // dispatch(setHistoryR(index+1));
    dispatch(setHistoryR(showHistory));
    
    dispatch(setNextPlayerTurn(!xIsNext));
  };

  const moves = historyR.map((ele, index) => {
    if (ele !== null) {
      return (
        <li key={index}>
          <button
            onClick={() => handleHistoryClick(ele, index)}
            className="btn btn-sm btn-dark mb-2"
          >
            <Link to="/board"> go to move</Link>
            {/* go to move */}
          </button>
          {/* {ele} */}
        </li>
      );
    }
  });

  return (
    <div className="text-center">
      <div className="bg-dark text-light py-2 d-flex justify-content-center align-items-center">
        <h3 > All moves history</h3>

        <button className="btn btn-sm btn-outline-warning mx-3">
          <Link style={{ textDecoration: "none" }} to="/">
            Home
          </Link>
        </button>
        <button className="btn btn-sm btn-warning">
          <Link style={{ textDecoration: "none" }} to="/board">
            Board
          </Link>
        </button>
      </div>

      <br />
      {historyR ? <ol className="d-inline-block">{moves}</ol> : null}
    </div>
  );
};

export default Moves;
