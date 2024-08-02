import React, { useState } from "react";
import "./App.css";
import Ruleta from "./Components/Ruleta";
import Board from "./Components/Board";
import Chip from "./Components/Chip";

function App() {
  const [activeChip, setActiveChip] = useState(null);
  const [activeChipValue, setActiveChipValue] = useState(0);
  return (
    <>
      <div className="container">
        <Ruleta />
        <Board activeChip={activeChip} activeChipValue={activeChipValue} />
        <Chip
          setActiveChip={setActiveChip}
          setActiveChipValue={setActiveChipValue}
        />
      </div>
    </>
  );
}

export default App;
