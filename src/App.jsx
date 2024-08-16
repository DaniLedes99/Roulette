import React, { useEffect, useState} from "react";
import "./App.css";
import Ruleta from "./Components/Ruleta";
import Board from "./Components/Board";
import Chip from "./Components/Chip";


function App() {
  const [activeChip, setActiveChip] = useState(null);
  const [chipValue, setChipValue] = useState(0);
  const [modoBorrado, setModoBorrado] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSpinning,setIsSpinning]= useState(false)

  const dontFollowmeImSpinning = (isSpinning,setIsFollowing)=>{
    if (isSpinning===true){
      setIsFollowing(false)
    }

  }
  useEffect(() => {
    dontFollowmeImSpinning(isSpinning,setIsFollowing)
  }, [isSpinning]);
 

  return (
    <>
      <div className="container">
        <Ruleta isSpinning={isSpinning} setIsSpinning={setIsSpinning} />
        <Board activeChip={activeChip} chipValue={chipValue}  modoBorrado={modoBorrado} 
          setModoBorrado={setModoBorrado}  setActiveChip={setActiveChip} setIsFollowing={setIsFollowing} isSpinning={isSpinning}  />
        <Chip setActiveChip={setActiveChip} setChipValue={setChipValue}    modoBorrado={modoBorrado} 
          setModoBorrado={setModoBorrado} isFollowing={isFollowing} setIsFollowing={setIsFollowing} isSpinning={isSpinning}/>
      </div>
    </>
  );
}

export default App;
