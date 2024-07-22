import React from "react";
import Black from "../../img/chip_black.png";
import Blue from "../../img/chip_blue.png";
import Orange from "../../img/chip_orange.png";
import Purple from "../../img/chip_purple.png";
import "./Chip.css";
import { useState, useEffect } from "react";

export default function Chip() {
  const [activeChip, setActiveChip] = useState(null); // Estado para el chip activo
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
    if (activeChip === chipType && isFollowing) {
      setIsFollowing(false); // Desactiva el seguimiento si se hace clic nuevamente en el chip activo
    } else {
      setActiveChip(chipType); // Establece el chip activo al hacer clic en él
      setIsFollowing(true); // Comienza a seguir el cursor al activar el chip
    }
  };
  return (
    <>
      <div className="ChipContainer-main">
        <div className="ChipContainer">
          <img
            className="ChipImage"
            src={Black}
            alt=""
            onClick={() => handleChipClick("Black")}
          />
          {activeChip === "Black" && isFollowing && (
            <img
              className="PreviewImage"
              src={Black}
              alt="Preview"
              style={{ left: previewImagePos.x, top: previewImagePos.y }}
            />
          )}
          <span className="span">100</span>
        </div>
        <div className="ChipContainer">
          <img
            className="ChipImage"
            src={Blue}
            alt=""
            onClick={() => handleChipClick("Blue")}
          />
          {activeChip === "Blue" && isFollowing && (
            <img
              className="PreviewImage"
              src={Blue}
              alt="Preview"
              style={{ left: previewImagePos.x, top: previewImagePos.y }}
            />
          )}
          <span className="span">25</span>
        </div>
        <div className="ChipContainer">
          <img
            className="ChipImage"
            src={Orange}
            alt=""
            onClick={() => handleChipClick("Orange")}
          />
          {activeChip === "Orange" && isFollowing && (
            <img
              className="PreviewImage"
              src={Orange}
              alt="Preview"
              style={{ left: previewImagePos.x, top: previewImagePos.y }}
            />
          )}
          <span className="span">10</span>
        </div>
        <div className="ChipContainer">
          <img
            className="ChipImage"
            src={Purple}
            alt=""
            onClick={() => handleChipClick("Purple")}
          />
          {activeChip === "Purple" && isFollowing && (
            <img
              className="PreviewImage"
              src={Purple}
              alt="Preview"
              style={{ left: previewImagePos.x, top: previewImagePos.y }}
            />
          )}
          <span className="span">1</span>
        </div>
      </div>
    </>
  );
}
