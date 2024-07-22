import React, { useState, useEffect } from "react";
import Black from "../../img/chip_black.png";
import Blue from "../../img/chip_blue.png";
import Orange from "../../img/chip_orange.png";
import Purple from "../../img/chip_purple.png";
import "./Chip.css";

const Chip = ({ onChipDrop }) => {
  const [activeChip, setActiveChip] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [previewImagePos, setPreviewImagePos] = useState({ x: 0, y: 0 });

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
      setIsFollowing(false);
      onChipDrop({ x: previewImagePos.x, y: previewImagePos.y, chipType });
    } else {
      setActiveChip(chipType);
      setIsFollowing(true);
    }
  };

  return (
    <>
      <div className="ChipContainer-main">
        <div className="ChipContainer">
          <img
            className="ChipImage"
            src={Black}
            alt="original"
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
            alt="original"
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
            alt="original"
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
            alt="original"
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
};

export default Chip;
