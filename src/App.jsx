import React, { useState } from "react";
import "./App.css";
import Ruleta from "./Components/Ruleta";
import Board from "./Components/Board";
import Chip from "./Components/Chip";

function App() {
  const [activeChip, setActiveChip] = useState(null);
  const [chipValue, setChipValue] = useState(0);
  console.log(chipValue)
  return (
    <>
      <div className="container">
        <Ruleta />
        <Board activeChip={activeChip} chipValue={chipValue} />
        <Chip setActiveChip={setActiveChip}  setChipValue={setChipValue}/>
      </div>
    </>
  );
}

export default App;
