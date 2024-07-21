import boardImage from "../../img/Board.png";
import ZeroImage from "../../img/0.png";
import Board from "../../img/BoardMin.png";
import Right from "../../img/right.png";
import boardImageDown from "../../img/boarddown.png";
import "./Board.css";
import React, { useState } from "react";

function Board() {
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

  const CHIP = true;
  const cantidad = 500;
  const handleCellClick = (j, i) => {
    console.log(j, i);
  };
  const handleCellClickDownUp = (j, i, CHIP, cantidad, APUESTAS) => {
    if ((CHIP = true)) {
      switch (j) {
        case 0:
          APUESTAS["menoresA12"] += cantidad;
          break;
        case 1:
          APUESTAS["entre12y24"] += cantidad;
          break;
        case 2:
          APUESTAS["entre24y36"] += cantidad;
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
    CHIP,
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
            onClick={() => functionasociate(j, i, CHIP, cantidad, APUESTAS)}
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
        <div className="Board-container-up">
          <div className="Tabla-overlay-up">
            <table className="Tabla">
              <img className="Board-img" src={ZeroImage} alt="Board" />
              <tbody>{renderTabla(1, 1, [130], [42], handleCellClick)}</tbody>
            </table>
            <table className="Tabla">
              <img className="Board-img" src={Board} alt="Board" />
              <tbody>
                {renderTabla(
                  5,
                  24,
                  [43, 5, 37, 5, 40],
                  [
                    3, 32, 3, 31, 3, 31, 3, 31, 3, 31, 3, 31, 3, 31, 3, 30, 3,
                    31, 3, 32, 3, 31, 3, 31.5, 3, 38,
                  ],
                  handleCellClick
                )}
              </tbody>
            </table>
            <table className="Tabla">
              <img className="Board-img" src={Right} alt="Board" />
              <tbody>
                {renderTabla(3, 1, [45, 42, 44], [30], handleCellClick)}
              </tbody>
            </table>
          </div>
        </div>
        <div className="Board-container-down">
          <img className="Board-img" src={boardImageDown} alt="Board-down" />
          <div className="Tabla-overlay-down">
            <table className="Tabla">
              <tbody>
                {renderTabla(
                  1,
                  3,
                  [25],
                  [41.5, 41.5, 42],
                  handleCellClickDownUp,
                  CHIP,
                  cantidad,
                  APUESTAS
                )}
              </tbody>
            </table>
            <table className="Tabla">
              <tbody>
                {renderTabla(
                  1,
                  6,
                  [30],
                  [21.5, 20.5, 21, 20.5, 21, 21],
                  handleCellClickDownDown,
                  CHIP,
                  cantidad,
                  APUESTAS
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Board;
