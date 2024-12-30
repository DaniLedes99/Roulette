import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faArrowRotateLeft,
  faArrowRotateRight,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";
import "./Buttons.css";

const Buttons = ({
  deshacer,
  rehacer,
  toggleModoBorrado,
  clearAllChips,
  modoBorrado,
  historialFichas,
  deshechas,
  isSpinning,
  repeatBet,
}) => {
  return (
    <div className="buttons-container">
      <div className={`cross-container ${isSpinning ? "icon-disabled" : ""}`}>
        <FontAwesomeIcon
          onClick={deshacer}
          disabled={historialFichas.length === 0}
          icon={faArrowRotateLeft}
          size="3x"
          className="cross"
          color="red"
        />
      </div>
      <div className={`cross-container ${isSpinning ? "icon-disabled" : ""}`}>
        <FontAwesomeIcon
          icon={faArrowRotateRight}
          onClick={rehacer}
          disabled={deshechas.length === 0}
          size="3x"
          className="cross"
          color="red"
        />
      </div>
      <div className={`cross-container ${isSpinning ? "icon-disabled" : ""}`}>
        <FontAwesomeIcon
          icon={faEraser}
          size="3x"
          onClick={toggleModoBorrado}
          className="cross"
          color={modoBorrado ? "gray" : "inherit"}
        />
      </div>
      <div className={`cross-container ${isSpinning ? "icon-disabled" : ""}`}>
        <FontAwesomeIcon
          icon={faXmark}
          onClick={clearAllChips}
          className="cross"
          color="red"
          size="3x"
        ></FontAwesomeIcon>
      </div>
      <div className={`cross-container ${isSpinning ? "icon-disabled" : ""}`}>
        <button onClick={repeatBet}>Repetir la Apuesta</button>
      </div>
    </div>
  );
};

export default Buttons;
