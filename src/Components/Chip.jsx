import React, { useState, useEffect } from "react";
import ChipItem from "./ChipItem";
import "./Chip.css";

const Chip = ({ setActiveChip, setChipValue }) => {
  const [activeChipLocal, setActiveChipLocal] = useState(null); // Estado local para el chip activo
  const [isFollowing, setIsFollowing] = useState(false); // Estado para verificar si se está siguiendo el cursor
  const [previewImagePos, setPreviewImagePos] = useState({ x: 0, y: 0 }); // Estado para la posición de la imagen de vista previa

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isFollowing) {
        setPreviewImagePos({ x: e.clientX -20, y: e.clientY-18 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isFollowing]);


  const handleChipClick = (chipType, value) => {
    if (activeChipLocal === chipType && isFollowing) {
      setIsFollowing(false); // Desactiva el seguimiento si se hace clic nuevamente en el chip activo
      setActiveChip(null); // Reinicia el activeChip en el componente padre
      setChipValue(0);
    } else {
      setActiveChip(chipType); // Establece el chip activo en el componente padre
      setChipValue(value); // Establece el valor del chip en el componente padre
      setActiveChipLocal(chipType); // Establece el chip activo localmente
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
