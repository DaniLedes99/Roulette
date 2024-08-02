import React, { useState, useEffect } from "react";
import ChipItem from "./ChipItem";
import "./Chip.css";

const Chip = ({ setActiveChip, setActiveChipValue }) => {
  const [activeChipLocal, setActiveChipLocal] = useState(null); // Estado local para el chip activo
  const [isFollowing, setIsFollowing] = useState(false); // Estado para verificar si se está siguiendo el cursor
  const [previewImagePos, setPreviewImagePos] = useState({ x: 0, y: 0 }); // Estado para la posición de la imagen de vista previa

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isFollowing) {
        setPreviewImagePos({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isFollowing]);

  const handleChipClick = (chipType) => {
    if (activeChipLocal === chipType && isFollowing) {
      setIsFollowing(false); // Desactiva el seguimiento si se hace clic nuevamente en el chip activo
      setActiveChip(null); // Reinicia el activeChip en el componente padre
      setActiveChipValue(0);
    } else {
      setActiveChip(chipType); // Establece el chip activo en el componente padre
      setActiveChipLocal(chipType); // Establece el chip activo localmente
      setIsFollowing(true);
      setActiveChipValue(getChipValue(chipType)); // Comienza a seguir el cursor al activar el chip
    }
  };
  const getChipValue = (chipType) => {
    switch (chipType) {
      case "Black":
        return 100;
      case "Blue":
        return 25;
      case "Orange":
        return 10;
      case "Purple":
        return 1;
      default:
        return 0;
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
      />
      <ChipItem
        chipType="Blue"
        activeChipLocal={activeChipLocal}
        isFollowing={isFollowing}
        previewImagePos={previewImagePos}
        onClick={handleChipClick}
      />
      <ChipItem
        chipType="Orange"
        activeChipLocal={activeChipLocal}
        isFollowing={isFollowing}
        previewImagePos={previewImagePos}
        onClick={handleChipClick}
      />
      <ChipItem
        chipType="Purple"
        activeChipLocal={activeChipLocal}
        isFollowing={isFollowing}
        previewImagePos={previewImagePos}
        onClick={handleChipClick}
      />
    </div>
  );
};

export default Chip;
