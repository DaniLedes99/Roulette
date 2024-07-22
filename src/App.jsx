import React, { useState } from "react";
import "./App.css";
import Ruleta from "./Components/Ruleta";
import Board from "./Components/Board";
import Chip from "./Components/Chip";

function App() {
  return (
    <>
      <div className="container">
        <Ruleta />
        <Board />
        <Chip />
      </div>
    </>
  );
}

export default App;
