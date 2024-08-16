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
  value, isSpinning
}) => {
  return (
    <div className="ChipContainer">
      <img
        className="ChipImage"
        src={getChipImage(chipType)}
        alt=""
        onClick={() => onClick(chipType,value,isSpinning)}
      />
      {activeChipLocal === chipType && isFollowing && (
        <img
          className="PreviewImage"
          src={getChipImage(chipType)}
          alt="Preview"
          style={{ left: previewImagePos.x, top: previewImagePos.y }}
        />
      )}
      <span className="span">{value}</span>
    </div>
  );
};


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



export default ChipItem;
