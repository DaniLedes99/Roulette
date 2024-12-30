import React, { useState, useEffect } from "react";
import ChipItem from "./ChipItem";
import "./Chip.css";

const Chip = ({
  setActiveChip,
  setChipValue,
  modoBorrado,
  setModoBorrado,
  isFollowing,
  setIsFollowing,
  isSpinning,
}) => {
  const [previewImagePos, setPreviewImagePos] = useState({ x: 0, y: 0 }); // donde te sigue la ficha?
  const [activeChipLocal, setActiveChipLocal] = useState(null);



  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isFollowing) {
        setPreviewImagePos({ x: e.clientX, y: e.clientY }); // -22 y -18
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isFollowing]);

  const handleChipClick = (chipType, value, isSpinning) => {
    if (isSpinning === false) {
      if (modoBorrado) {
        setModoBorrado(false);
      }

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
    } else {
      setIsFollowing(false);
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
        isSpinning={isSpinning}
      />
      <ChipItem
        chipType="Blue"
        activeChipLocal={activeChipLocal}
        isFollowing={isFollowing}
        previewImagePos={previewImagePos}
        onClick={handleChipClick}
        value={25}
        isSpinning={isSpinning}
      />
      <ChipItem
        chipType="Orange"
        activeChipLocal={activeChipLocal}
        isFollowing={isFollowing}
        previewImagePos={previewImagePos}
        onClick={handleChipClick}
        value={10}
        isSpinning={isSpinning}
      />
      <ChipItem
        chipType="Purple"
        activeChipLocal={activeChipLocal}
        isFollowing={isFollowing}
        previewImagePos={previewImagePos}
        onClick={handleChipClick}
        value={1}
        isSpinning={isSpinning}
      />
    </div>
  );
};

export default Chip;
