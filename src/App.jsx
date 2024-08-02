import React, { useState } from "react";
import "./App.css";
import Ruleta from "./Components/Ruleta";
import Board from "./Components/Board";
import Chip from "./Components/Chip";

function App() {
  const [activeChip, setActiveChip] = useState(null);
  return (
    <>
      <div className="container">
        <Ruleta />
        <Board activeChip={activeChip} />
        <Chip setActiveChip={setActiveChip} />
      </div>
    </>
  );
}

export default App;
