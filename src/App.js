import logo from "./logo.svg";
import "./App.css";

import GameRedux from "./components/GameRedux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Board from "./components/Board";
import Winner from "./components/Winner";
import Moves from "./components/Moves";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
         
          <Route exact path="/" element={ <GameRedux />} />
          <Route exact path="/board" element={<Board/>} />
          <Route exact path="/winner" element={<Winner/>} />
          <Route exact path="/moves" element={<Moves/>} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
