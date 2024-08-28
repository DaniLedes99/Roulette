import ZeroImage from "../../../img/0.png";
import BoardImage from "../../../img/BoardMin.png";
import Right from "../../../img/right.png";
import boardImageDown from "../../../img/boarddown.png";
import "./Board.css";
import React, { useState } from "react";
import Buttons from "../Buttons/Buttons";
import { tableMeasures0, tableMeasures1, tableMeasures2, tableMeasures3, tableMeasures4, renderTabla } from "../Board/MedidasTabla";
import { TABLES } from "../ApuestasService";


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
  deshacer,clearAllChips, fichas, setFichas, historialFichas, setHistorialFichas, deshechas, setDeshechas, lastPlay, lastBet
}) => {

  const [nextId, setNextId] = useState(1);

    const toggleModoBorrado = () => {
    setActiveChip(null);
    setIsFollowing(false);
    setModoBorrado((prevState) => !prevState);
  };
  
  const borrarFicha = (id) => {
     const nuevasFichas = fichas.filter((ficha) => ficha.id !== id);
    setFichas(nuevasFichas);
}
 
  const repeatBet = () => {
    setFichas(lastPlay);
    setAPUESTAS(lastBet)
};


const areYouGoingtoBetOrClear = ({ columnas, filas, chipValue, tableId, modoBorrado }) => {

  if (!activeChip || !TABLES[tableId]) {
    console.log("No se eligió ninguna chip o Table ID no encontrado");
  }

  const bettedNumbers = TABLES[tableId][filas][columnas];
  console.log(`bettedNumbers: ${bettedNumbers}`);

  setAPUESTAS((prevApuestas) => {
    const nuevoEstado = { ...prevApuestas };

    if (modoBorrado) {
      if (nuevoEstado[bettedNumbers]) {
        nuevoEstado[bettedNumbers].valor = 0;
      }
    } else {
      if (nuevoEstado[bettedNumbers]) {
        nuevoEstado[bettedNumbers].valor += chipValue;
      }
    }

    return nuevoEstado;
  });

  if (!modoBorrado) {
    settearPosiciónFicha(columnas, filas, chipValue, tableId);
  }
};

  
  const chipValueToColor=(nuevoValor) =>{
      if (nuevoValor > 99) {
       return "Black";
      } else if (nuevoValor > 24) {
        return "Blue";
      } else if (nuevoValor > 9) {
       return "Orange";
      }
  return "Purple"
  }
 
  const settearPosiciónFicha = (j, i, chipValue, tableId) => {
  
  
    const fichaExistente = fichas.find(
      (ficha) => ficha.x === j && ficha.y === i && ficha.tableId === tableId
    );
   
    if (fichaExistente) {
  
        const newChipValue = fichaExistente.chipValue + chipValue;
        const chipColor = chipValueToColor(newChipValue);
      
        const nuevasFichas = fichas.map((ficha) =>
        ficha.id === fichaExistente.id
          ? { ...ficha, chipValue: newChipValue, chipType: chipColor }
          : ficha
      );
      setFichas(nuevasFichas);
    } else {

      setHistorialFichas([...historialFichas, { fichas, apuestas: APUESTAS }]);
      setDeshechas([]);
      setFichas([
        ...fichas,
        {
          id: nextId,
          x: j,
          y: i,
          tableId: tableId,
          chipType: chipValueToColor(chipValue),
          chipValue: chipValue,
        },
      ]);
      setNextId(nextId + 1);
    }
  };


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
