import ZeroImage from "../../../img/0.png";
import BoardImage from "../../../img/BoardMin.png";
import Right from "../../../img/right.png";
import boardImageDown from "../../../img/boarddown.png";
import "./Board.css";
import React, { useState, useMemo } from "react";
import Buttons from "../Buttons/Buttons";
import {
  tableMeasures0,
  tableMeasures1,
  tableMeasures2,
  tableMeasures3,
  tableMeasures4,
  renderTabla,
} from "../Board/MedidasTabla";

const Board = ({
  activeChip,
  chipValue,
  modoBorrado,
  setModoBorrado,
  setActiveChip,
  setIsFollowing,
  isSpinning,
  setAPUESTAS,
  rehacer,
  deshacer,
  clearAllChips,
  fichas,
  setFichas,
  historialFichas,
  deshechas,
  lastPlay,
  lastBet,
  areYouGoingToBetOrClear,
}) => {
  const toggleModoBorrado = () => {
    setActiveChip(null);
    setIsFollowing(false);
    setModoBorrado((prevState) => !prevState);
  };

  const borrarFicha = (id) => {
    const nuevasFichas = fichas.filter((ficha) => ficha.id !== id);
    setFichas(nuevasFichas);
  };

  const repeatBet = () => {
    setFichas(lastPlay);
    setAPUESTAS(lastBet);
  };

  const tabla0 = useMemo(
    () =>
      renderTabla(
        fichas,
        tableMeasures0.cantidadDeFilas,
        tableMeasures0.cantidadDeColumnas,
        tableMeasures0.anchoDeFilas,
        tableMeasures0.anchoDeColumnas,
        areYouGoingToBetOrClear,
        activeChip,
        chipValue,
        "table0",
        modoBorrado,
        isSpinning,
        borrarFicha
      ),
    [fichas, activeChip, chipValue, modoBorrado, isSpinning, borrarFicha]
  );

  const tabla1 = useMemo(
    () =>
      renderTabla(
        fichas,
        tableMeasures1.cantidadDeFilas,
        tableMeasures1.cantidadDeColumnas,
        tableMeasures1.anchoDeFilas,
        tableMeasures1.anchoDeColumnas,
        areYouGoingToBetOrClear,
        activeChip,
        chipValue,
        "table1",
        modoBorrado,
        isSpinning,
        borrarFicha
      ),
    [fichas, activeChip, chipValue, modoBorrado, isSpinning, borrarFicha]
  );

  const tabla2 = useMemo(
    () =>
      renderTabla(
        fichas,
        tableMeasures2.cantidadDeFilas,
        tableMeasures2.cantidadDeColumnas,
        tableMeasures2.anchoDeFilas,
        tableMeasures2.anchoDeColumnas,
        areYouGoingToBetOrClear,
        activeChip,
        chipValue,
        "table2",
        modoBorrado,
        isSpinning,
        borrarFicha
      ),
    [fichas, activeChip, chipValue, modoBorrado, isSpinning, borrarFicha]
  );

  const tabla3 = useMemo(
    () =>
      renderTabla(
        fichas,
        tableMeasures3.cantidadDeFilas,
        tableMeasures3.cantidadDeColumnas,
        tableMeasures3.anchoDeFilas,
        tableMeasures3.anchoDeColumnas,
        areYouGoingToBetOrClear,
        activeChip,
        chipValue,
        "table3",
        modoBorrado,
        isSpinning,
        borrarFicha
      ),
    [fichas, activeChip, chipValue, modoBorrado, isSpinning, borrarFicha]
  );

  const tabla4 = useMemo(
    () =>
      renderTabla(
        fichas,
        tableMeasures4.cantidadDeFilas,
        tableMeasures4.cantidadDeColumnas,
        tableMeasures4.anchoDeFilas,
        tableMeasures4.anchoDeColumnas,
        areYouGoingToBetOrClear,
        activeChip,
        chipValue,
        "table4",
        modoBorrado,
        isSpinning,
        borrarFicha
      ),
    [fichas, activeChip, chipValue, modoBorrado, isSpinning, borrarFicha]
  );

  return (
    <>
      <div className="Board-container-main">
        <Buttons
          deshacer={deshacer}
          rehacer={rehacer}
          toggleModoBorrado={toggleModoBorrado}
          clearAllChips={clearAllChips}
          modoBorrado={modoBorrado}
          historialFichas={historialFichas}
          deshechas={deshechas}
          isSpinning={isSpinning}
          repeatBet={repeatBet}
        />

        <div className="Board-container-up">
          <div className="Tabla-overlay-up">
            <div className="container-img-table">
              <img className="Board-img" src={ZeroImage} alt="Board" />
              <table className="Tabla">
                <tbody>{tabla0}</tbody>
              </table>
            </div>
            <div className="container-img-table">
              <img className="Board-img" src={BoardImage} alt="Board" />
              <table className="Tabla">
                <tbody>{tabla1}</tbody>
              </table>
            </div>
            <div className="container-img-table">
              <img
                className="Board-img"
                id="arreglatecocol"
                src={Right}
                alt="Board"
              />
              <table className="Tabla">
                <tbody>{tabla2}</tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="Board-container-down">
          <img
            className="Board-img-down"
            src={boardImageDown}
            alt="Board-down"
          />
          <div className="Tabla-overlay-down">
            <table className="Tabla-down">
              <tbody>{tabla3}</tbody>
            </table>
            <table className="Tabla-down">
              <tbody>{tabla4}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
