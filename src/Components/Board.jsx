import ZeroImage from "../../img/0.png";
import BoardImage from "../../img/BoardMin.png";
import Right from "../../img/right.png";
import boardImageDown from "../../img/boarddown.png";
import "./Board.css";
import React, { useState } from "react";
import Buttons from "./Buttons";
import { tableMeasures0, tableMeasures1, tableMeasures2, tableMeasures3, tableMeasures4, renderTabla } from "./MedidasTabla";
import { tables } from "./ApuestasService";

const Board = ({
  activeChip,
  chipValue,
  modoBorrado,
  setModoBorrado,
  setActiveChip,
  setIsFollowing,
  isSpinning,
  APUESTAS,
  setAPUESTAS,
  rehacer,
  deshacer,clearAllChips,borrarFicha, fichas, setFichas, historialFichas, setHistorialFichas, deshechas, setDeshechas
}) => {

  const [nextId, setNextId] = useState(1);


  const toggleModoBorrado = () => {
    setActiveChip(null);
    setIsFollowing(false);
    setModoBorrado((prevState) => !prevState);
  };


  const areYouGoingtoBetOrClear = ({columnas, filas, chipValue, tableId, isSpinning, modoBorrado}) => {
    if ((activeChip || modoBorrado) && !isSpinning && tables[tableId]) {
      setAPUESTAS((prevAPUESTAS) => {
        const newAPUESTAS = { ...prevAPUESTAS };
        newAPUESTAS[tables[tableId][filas][columnas]] = modoBorrado ? 0 : newAPUESTAS[tables[tableId][filas][columnas]] + chipValue;
        return newAPUESTAS;
      });
      if (!modoBorrado) settearPosiciónFicha(columnas, filas, chipValue, tableId);
    } else {
      console.log("No se eligió ninguna chip o Table ID no encontrado");
    }
  };

  const settearPosiciónFicha = (j, i, chipValue, tableId) => {
    let fichaExistente = fichas.find(
      (ficha) => ficha.x === j && ficha.y === i && ficha.tableId === tableId
    );
    if (fichaExistente) {
      const nuevoValor = fichaExistente.chipValue + chipValue;

      let nuevoChipType = "Purple";
      if (nuevoValor > 99) {
        nuevoChipType = "Black";
      } else if (nuevoValor > 24) {
        nuevoChipType = "Blue";
      } else if (nuevoValor > 9) {
        nuevoChipType = "Orange";
      }

      const nuevasFichas = fichas.map((ficha) =>
        ficha.id === fichaExistente.id
          ? { ...ficha, chipValue: nuevoValor, chipType: nuevoChipType }
          : ficha
      );
      setFichas(nuevasFichas);
    } else {
      let nuevoChipType = activeChip;
      if (chipValue > 99) {
        nuevoChipType = "Black";
      } else if (chipValue > 24) {
        nuevoChipType = "Blue";
      } else if (chipValue > 9) {
        nuevoChipType = "Orange";
      }

      setHistorialFichas([...historialFichas, { fichas, apuestas: APUESTAS }]);
      setDeshechas([]);

      setFichas([
        ...fichas,
        {
          id: nextId,
          x: j,
          y: i,
          tableId: tableId,
          chipType: nuevoChipType,
          chipValue: chipValue,
        },
      ]);
      setNextId(nextId + 1);
    }
  };

  //el apuestas en historial de fichas espera a q gregues una nueva ficha en un lugar distinto para actualizar su valor, no condiciona el funcionamiento de la ruleta pero ni idea por qué pasa
  console.log(APUESTAS);

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
        />
        
        <div className="Board-container-up">
          <div className="Tabla-overlay-up">
            <div className="container-img-table">
              <img className="Board-img" src={ZeroImage} alt="Board" />
              <table className="Tabla">
                <tbody>
                  {renderTabla(fichas,
                    tableMeasures0.cantidadDeFilas,
                    tableMeasures0.cantidadDeColumnas,
                    tableMeasures0.anchoDeFilas,
                    tableMeasures0.anchoDeColumnas,
                    areYouGoingtoBetOrClear,
                    activeChip,
                    chipValue,
                    "table0",
                    modoBorrado,
                    isSpinning,
                    borrarFicha
                  )}
                </tbody>
              </table>
            </div>
            <div className="container-img-table">
              <img className="Board-img" src={BoardImage} alt="Board" />
              <table className="Tabla">
                <tbody>
                  {renderTabla(fichas,
                    tableMeasures1.cantidadDeFilas,
                    tableMeasures1.cantidadDeColumnas,
                    tableMeasures1.anchoDeFilas,
                    tableMeasures1.anchoDeColumnas,
                    areYouGoingtoBetOrClear,
                    activeChip,
                    chipValue,
                    "table1",
                    modoBorrado,
                    isSpinning,
                    borrarFicha
                  )}
                </tbody>
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
                <tbody>
                  {renderTabla(fichas,
                    tableMeasures2.cantidadDeFilas,
                    tableMeasures2.cantidadDeColumnas,
                    tableMeasures2.anchoDeFilas,
                    tableMeasures2.anchoDeColumnas,
                    areYouGoingtoBetOrClear,
                    activeChip,
                    chipValue,
                    "table2",
                    modoBorrado,
                    isSpinning,
                    borrarFicha
                  )}
                </tbody>
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
              <tbody>
                {renderTabla(
                  fichas,
                  tableMeasures3.cantidadDeFilas,
                  tableMeasures3.cantidadDeColumnas,
                  tableMeasures3.anchoDeFilas,
                  tableMeasures3.anchoDeColumnas,
                  areYouGoingtoBetOrClear,
                  activeChip,
                  chipValue,
                  "table3",
                  modoBorrado,
                  isSpinning,
                  borrarFicha
                )}
              </tbody>
            </table>
            <table className="Tabla-down">
              <tbody>
                {renderTabla(
                  fichas,
                  tableMeasures4.cantidadDeFilas,
                  tableMeasures4.cantidadDeColumnas,
                  tableMeasures4.anchoDeFilas,
                  tableMeasures4.anchoDeColumnas,
                  areYouGoingtoBetOrClear,
                  activeChip,
                  chipValue,
                  "table4",
                  modoBorrado,
                  isSpinning,
                  borrarFicha
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
