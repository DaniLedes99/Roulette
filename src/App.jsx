import React, { useState } from "react";
import "./App.css";
import Ruleta from "./Components/Ruleta";
import Board from "./Components/Board";

function App() {
  return (
    <>
      <div className="container">
        <Ruleta />
        <Board />
      </div>
    </>
  );
}

export default App;
