import ZeroImage from "../../img/0.png";
import BoardImage from "../../img/BoardMin.png";
import Right from "../../img/right.png";
import boardImageDown from "../../img/boarddown.png";
import "./Board.css";
import Black from "../../img/chip_black.png";
import Blue from "../../img/chip_blue.png";
import Orange from "../../img/chip_orange.png";
import Purple from "../../img/chip_purple.png";
import React, { useState } from "react";

const Board = ({ activeChip, chipValue }) => {
 

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

  const getChipImage = (chipType) => {
    switch (chipType) {
      case "Black":
        return Black;
      case "Blue":
        return Blue;
      case "Orange":
        return Orange;
      case "Purple":
        return Purple;
      default:
        return null;
    }
  };

  const [imagenPos, setImagenPos] = useState({ x: -1, y: -1 }); // Para almacenar la posición de la imagen
  const [chipTipo, setChipTipo] = useState(null); //

  

  const handleCellClick = (j, i) => {
    if (activeChip !== null) {
      setImagenPos({ x: j, y: i });
      setChipTipo(activeChip);
    }
    console.log(i, j);
  };
  const handleCellClickDownUp = (j, i, activeChip, chipValue, APUESTAS) => {
    if (activeChip != null) {
      switch (j) {
        case 0:
          APUESTAS["menoresA12"] += chipValue;
          break;
        case 1:
          APUESTAS["entre12y24"] += chipValue;
          break;
        case 2:
          APUESTAS["entre24y36"] += chipValue;
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
            style={{ padding: `${alturasFilas[i]}px ${anchoColumna[j]}px`, position: 'relative' }}
            onClick={() => handleCellClick(j, i)}
          >
            {imagenPos.x === j && imagenPos.y === i && chipTipo && (
              <img
                src={getChipImage(chipTipo)}
                alt="chip"
                style={{
                  position: 'absolute',
                  top: '30px', // Ajusta según sea necesario para que la imagen esté arriba de la celda
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '40px', // Ajusta el tamaño según sea necesario
                  height: 'auto',
                }}
              />
            )}
          </td>
        );
      }
      tabla.push(<tr key={i}>{fila}</tr>);
    }
    return tabla;
  };

  return (
    <>
      <div className="Board-container-main">
        <p>Active Chip: {activeChip}{chipValue}</p>

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
                  chipValue,
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
                  chipValue,
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
