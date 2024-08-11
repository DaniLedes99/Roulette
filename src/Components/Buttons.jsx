import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowRotateLeft, faArrowRotateRight, faEraser } from "@fortawesome/free-solid-svg-icons";
import "./Buttons.css";

const Buttons = ({
  deshacer,
  rehacer,
  toggleModoBorrado,
  clearAllChips,
  modoBorrado,
  historialFichas,
  deshechas,
}) => {
  return (
    <div className="buttons-container">
      <div className="cross-container">
        <FontAwesomeIcon
          onClick={deshacer}
          disabled={historialFichas.length === 0}
          icon={faArrowRotateLeft}
          size="3x"
          className="cross"
          color="red"
        />
      </div>
      <div className="cross-container">
        <FontAwesomeIcon
          icon={faArrowRotateRight}
          onClick={rehacer}
          disabled={deshechas.length === 0}
          size="3x"
          className="cross"
          color="red"
        />
      </div>
      <div className="cross-container">
        <FontAwesomeIcon
          icon={faEraser}
          size="3x"
          onClick={toggleModoBorrado}
          className="cross"
          color={modoBorrado ? "gray" : "inherit"}
        />
      </div>
      <div className="cross-container">
        <FontAwesomeIcon
          icon={faXmark}
          onClick={clearAllChips}
          className="cross"
          color="red"
          size="3x"
        ></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default Buttons;
