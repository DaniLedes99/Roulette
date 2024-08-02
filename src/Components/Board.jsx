import ZeroImage from "../../img/0.png";
import BoardImage from "../../img/BoardMin.png";
import Right from "../../img/right.png";
import boardImageDown from "../../img/boarddown.png";
import "./Board.css";
import React, { useState } from "react";

const Board = ({ activeChip, activeChipValue }) => {
  let APUESTAS = {
    menoresA12: 0,
    entre12y24: 0,
    entre24y36: 0,
    par: 0,
    impar: 0,
    rojo: 0,
    negro: 0,
    cero: 0,
  };

  const handleCellClick = (j, i) => {
    console.log(j, i);
  };
  const handleCellClickDownUp = (
    j,
    i,
    activeChip,
    activeChipValue,
    APUESTAS
  ) => {
    if (activeChip != null) {
      switch (j) {
        case 0:
          APUESTAS["menoresA12"] += activeChipValue;
          break;
        case 1:
          APUESTAS["entre12y24"] += activeChipValue;
          break;
        case 2:
          APUESTAS["entre24y36"] += activeChipValue;
          break;
        default:
          console.log("Opción no reconocida");
          break;
      }
      console.log(APUESTAS);
    } else {
      console.log("No se eligió ninguna chip");
    }
  };
  const handleCellClickDownDown = (j, i) => {
    console.log(j, i);
  };

  const renderTabla = (
    filas,
    columnas,
    alturasFilas,
    anchoColumna,
    functionasociate,
    activeChip,
    cantidad,
    APUESTAS
  ) => {
    const tabla = [];

    for (let i = 0; i < filas; i++) {
      const fila = [];
      for (let j = 0; j < columnas; j++) {
        const numeroCasilla = i * columnas + j + 1;

        fila.push(
          <td
            key={numeroCasilla}
            style={{ padding: `${alturasFilas[i]}px ${anchoColumna[j]}px` }}
            onClick={() =>
              functionasociate(j, i, activeChip, cantidad, APUESTAS)
            }
          ></td>
        );
      }
      tabla.push(<tr key={i}>{fila}</tr>);
    }

    return tabla;
  };

  return (
    <>
      <div className="Board-container-main">
        <p>
          Active Chip: {activeChip}
          {activeChipValue}
        </p>

        <div className="Board-container-up">
          <div className="Tabla-overlay-up">
            <div className="container-img-table">
              <img className="Board-img" src={ZeroImage} alt="Board" />
              <table className="Tabla">
                <tbody>{renderTabla(1, 1, [133], [40], handleCellClick)}</tbody>
              </table>
            </div>
            <div className="container-img-table">
              <img className="Board-img" src={BoardImage} alt="Board" />
              <table className="Tabla">
                <tbody>
                  {renderTabla(
                    5,
                    24,
                    [44.5, 4, 37.5, 4, 41],
                    [
                      3, 31.8, 3, 31.3, 3, 31, 3, 31.5, 3, 31.5, 3, 31, 3, 31.3,
                      3, 31, 3, 31, 3, 31, 3, 31, 3, 31, 3, 31,
                    ],
                    handleCellClick
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
                  {renderTabla(3, 1, [46, 42, 44], [37], handleCellClick)}
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
                  1,
                  3,
                  [25],
                  [41.5, 41.5, 42],
                  handleCellClickDownUp,
                  activeChip,
                  activeChipValue,
                  APUESTAS
                )}
              </tbody>
            </table>
            <table className="Tabla-down">
              <tbody>
                {renderTabla(
                  1,
                  6,
                  [32],
                  [21.5, 20.5, 21, 20.5, 21, 21],
                  handleCellClickDownDown,
                  activeChip,
                  activeChipValue,
                  APUESTAS
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
