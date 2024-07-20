import boardImage from "../../img/Board.png";
import boardImageDown from "../../img/boarddown.png";
import "./Board.css";
import React, { useState } from "react";

function Board() {
  const handleCellClick = (numeroCasilla, j, i) => {
    console.log(`Se ha seleccionado la casilla ${numeroCasilla}`);
    console.log(j, i);
  };

  const renderTabla = (filas, columnas, alturasFilas, anchoColumna) => {
    const tabla = [];

    for (let i = 0; i < filas; i++) {
      const fila = [];
      for (let j = 0; j < columnas; j++) {
        const numeroCasilla = i * columnas + j + 1;

        fila.push(
          <td
            key={numeroCasilla}
            style={{ padding: `${alturasFilas[i]}px ${anchoColumna[j]}px` }}
            onClick={() => handleCellClick(numeroCasilla, j, i)}
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
          <img className="Board-img" src={boardImage} alt="Board" />
          <div className="Tabla-overlay-up">
            <table className="Tabla">
              <tbody>{renderTabla(1, 1, [130], [42])}</tbody>
            </table>
            <table className="Tabla">
              <tbody>
                {renderTabla(
                  5,
                  24,
                  [43, 5, 37, 5, 40],
                  [
                    3, 31, 3, 31, 3, 31, 3, 31, 3, 31, 3, 31, 3, 31, 3, 30, 3,
                    30, 3, 32, 3, 30, 3, 31, 3, 30,
                  ]
                )}
              </tbody>
            </table>
            <table className="Tabla">
              <tbody>{renderTabla(3, 1, [45, 42, 44], [37])}</tbody>
            </table>
          </div>
        </div>
        <div className="Board-container-down">
          <img
            className="Board-img-down"
            src={boardImageDown}
            alt="Board-down"
          />
          <div className="Tabla-overlay-down">
            <table className="Tabla">
              <tbody>{renderTabla(1, 3, [25], [41.5, 41.5, 42])}</tbody>
            </table>
            <table className="Tabla">
              <tbody>
                {renderTabla(1, 6, [30], [21.5, 20.5, 21, 20.5, 21, 21])}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Board;
