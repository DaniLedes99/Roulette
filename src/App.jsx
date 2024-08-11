import React, { useState} from "react";
import "./App.css";
import Ruleta from "./Components/Ruleta";
import Board from "./Components/Board";
import Chip from "./Components/Chip";


function App() {
  const [activeChip, setActiveChip] = useState(null);
  const [chipValue, setChipValue] = useState(0);
  const [modoBorrado, setModoBorrado] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <>
      <div className="container">
        <Ruleta />
        <Board activeChip={activeChip} chipValue={chipValue}  modoBorrado={modoBorrado} 
          setModoBorrado={setModoBorrado}  setActiveChip={setActiveChip} setIsFollowing={setIsFollowing}  />
        <Chip setActiveChip={setActiveChip} setChipValue={setChipValue}    modoBorrado={modoBorrado} 
          setModoBorrado={setModoBorrado} isFollowing={isFollowing} setIsFollowing={setIsFollowing}/>
      </div>
    </>
  );
}

export default App;
