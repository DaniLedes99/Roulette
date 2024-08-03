import React, { useState, useEffect } from "react";
import ChipItem from "./ChipItem";
import "./Chip.css";

const Chip = ({ setActiveChip, setChipValue }) => {
  const [activeChipLocal, setActiveChipLocal] = useState(null); 
  const [isFollowing, setIsFollowing] = useState(false); 
  const [previewImagePos, setPreviewImagePos] = useState({ x: 0, y: 0 }); // Estado para el follow
  

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isFollowing) {
        setPreviewImagePos({ x: e.clientX , y: e.clientY }); // -22 y -18
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isFollowing]);


  const handleChipClick = (chipType, value) => {
    if (activeChipLocal === chipType && isFollowing) {
      setIsFollowing(false); 
      setActiveChip(null); 
      setChipValue(0);
    } else {
      setActiveChip(chipType); 
      setChipValue(value); 
      setActiveChipLocal(chipType); 
      setIsFollowing(true);
    }
  };

  return (
    <div className="ChipContainer-main">
      <ChipItem
        chipType="Black"
        activeChipLocal={activeChipLocal}
        isFollowing={isFollowing}
        previewImagePos={previewImagePos}
        onClick={handleChipClick}
        value={100}
      />
      <ChipItem
        chipType="Blue"
        activeChipLocal={activeChipLocal}
        isFollowing={isFollowing}
        previewImagePos={previewImagePos}
        onClick={handleChipClick}
        value={25}
      />
      <ChipItem
        chipType="Orange"
        activeChipLocal={activeChipLocal}
        isFollowing={isFollowing}
        previewImagePos={previewImagePos}
        onClick={handleChipClick}
        value={10}
      />
      <ChipItem
        chipType="Purple"
        activeChipLocal={activeChipLocal}
        isFollowing={isFollowing}
        previewImagePos={previewImagePos}
        onClick={handleChipClick}
        value={1}

      />
    </div>
  );
};



export default Chip;
