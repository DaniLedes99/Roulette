import React from "react";
import Black from "../../img/chip_black.png";
import Blue from "../../img/chip_blue.png";
import Orange from "../../img/chip_orange.png";
import Purple from "../../img/chip_purple.png";

const ChipItem = ({
  chipType,
  activeChipLocal,
  isFollowing,
  previewImagePos,
  onClick,
}) => {
  return (
    <div className="ChipContainer">
      <img
        className="ChipImage"
        src={getChipImage(chipType)}
        alt=""
        onClick={() => onClick(chipType)}
      />
      {activeChipLocal === chipType && isFollowing && (
        <img
          className="PreviewImage"
          src={getChipImage(chipType)}
          alt="Preview"
          style={{ left: previewImagePos.x, top: previewImagePos.y }}
        />
      )}
      <span className="span">{getChipValue(chipType)}</span>
    </div>
  );
};

// Función utilitaria para obtener la imagen del chip según el tipo
const getChipImage = (chipType) => {
  switch (chipType) {
    case "Black":
      return Black;
    case "Blue":
      return Blue;
    case "Orange":
      return Orange;
    case "Purple":
      return Purple;
    default:
      return null;
  }
};

// Función utilitaria para obtener el valor del chip según el tipo
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

export default ChipItem;
