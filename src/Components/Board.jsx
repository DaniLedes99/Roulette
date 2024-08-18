import ZeroImage from "../../img/0.png";
import BoardImage from "../../img/BoardMin.png";
import Right from "../../img/right.png";
import boardImageDown from "../../img/boarddown.png";
import "./Board.css";
import React, { useState } from "react";
import Buttons from "./Buttons";
  import { tableMeasures0, tableMeasures1, tableMeasures2, tableMeasures3, tableMeasures4, renderTabla } from "./MedidasTabla";


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

  const table0=[["cero"]]
  const table1 = {
    0: [
      3,
      [3, 6],
      6,
      [6, 9],
      9,
      [9, 12],
      12,
      [12, 15],
      15,
      [15, 18],
      18,
      [18, 21],
      21,
      [21, 24],
      24,
      [24, 27],
      27,
      [27, 30],
      30,
      [30, 33],
      33,
      [33, 36],
      36,
    ],
    1: [
      [2, 3],
      [2, 3, 5, 6],
      [5, 6],
      [5, 6, 8, 9],
      [8, 9],
      [8, 9, 11, 12],
      [11, 12],
      [11, 12, 14, 15],
      [14, 15],
      [14, 15, 17, 18],
      [17, 18],
      [17, 18, 20, 21],
      [20, 21],
      [20, 21, 23, 24],
      [23, 24],
      [23, 24, 26, 27],
      [26, 27],
      [26, 27, 29, 30],
      [29, 30],
      [29, 30, 32, 33],
      [32, 33],
      [32, 33, 35, 36],
      [35, 36],
    ],
    2: [
      2,
      [2, 5],
      5,
      [5, 8],
      8,
      [8, 11],
      11,
      [11, 14],
      14,
      [14, 17],
      17,
      [17, 20],
      20,
      [20, 23],
      23,
      [23, 26],
      26,
      [26, 29],
      29,
      [29, 32],
      32,
      [32, 35],
      35,
    ],
    3: [
      [1, 2],
      [1, 2, 4, 5],
      [4, 5],
      [4, 5, 7, 8],
      [7, 8],
      [7, 8, 10, 11],
      [10, 11],
      [10, 11, 13, 14],
      [13, 14],
      [13, 14, 16, 17],
      [16, 17],
      [16, 17, 19, 20],
      [19, 20],
      [19, 20, 22, 23],
      [22, 23, 25, 26],
      [25, 26],
      [25, 26, 28, 29],
      [28, 29],
      [28, 29, 31, 32],
      [31, 32],
      [31, 32, 34, 35],
      [34, 35],
    ],
    4: [
      1,
      [1, 4],
      4,
      [4, 7],
      7,
      [7, 10],
      10,
      [10, 13],
      13,
      [13, 16],
      16,
      [16, 19],
      19,
      [19, 22],
      22,
      [22, 25],
      25,
      [25, 28],
      28,
      [28, 31],
      31,
      [31, 34],
      34,
    ],
  };

  const table2 = [
    ["primeraFila", "segundaFila", "terceraFila"]
  ];
  
  const table3 = [
    ["menoresA12"], 
    ["entre12y24"], 
    ["entre24y36"]
  ];

  const table4 = [
    ["igualOMenorA18"], 
    ["par"],            
    ["rojo"],          
    ["negro"],          
    ["impar"],          
    ["igualOMayorA19"]  
  ];

  const tables = {
    table0: table0,
    table1: table1,
    table2: table2,
    table3: table3,
    table4: table4,
  };
  
 
  const areYouGoingtoBetOrWhat = (j, i, chipValue, tableId, isSpinning, modoBorrado) => {
    if ((activeChip || modoBorrado) && !isSpinning && tables[tableId]) {
      setAPUESTAS((prevAPUESTAS) => {
        const newAPUESTAS = { ...prevAPUESTAS };
        newAPUESTAS[tables[tableId][i][j]] = modoBorrado ? 0 : newAPUESTAS[tables[tableId][i][j]] + chipValue;
        return newAPUESTAS;
      });
      if (!modoBorrado) settearPosiciónFicha(j, i, chipValue, tableId);
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
                    areYouGoingtoBetOrWhat,
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
                    areYouGoingtoBetOrWhat,
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
                    areYouGoingtoBetOrWhat,
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
                  areYouGoingtoBetOrWhat,
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
                  areYouGoingtoBetOrWhat,
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
