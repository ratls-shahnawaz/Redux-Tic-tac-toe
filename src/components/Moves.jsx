import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate,Link } from 'react-router-dom';
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
const Moves = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const historyR = useSelector((state) => state.tictactoe.history);
  const xIsNext = useSelector(state=> state.tictactoe.nextPlayerTurn)


  const handleHistoryClick = (arr, index) => {
    dispatch(setBoardR(arr));
    const showHistory = historyR.splice(historyR,index+1)
    dispatch(setHistoryR(showHistory));
    // dispatch(setHistoryR(index + 1))
    dispatch(setNextPlayerTurn(!xIsNext))
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
          </button>
          {ele}
        </li>
      );
    }
  });

  return (
    <div>
      <h1> All moves history</h1>

      <p>
      {historyR ? <ol>{moves}</ol> : null}
      </p>
    </div>
  );
};

export default Moves;
