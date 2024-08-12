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
import Buttons from "./Buttons";
import { table0, table1, table2, table3, table4 } from "./MedidasTabla";

const Board = ({
  activeChip,
  chipValue,
  modoBorrado,
  setModoBorrado,
  setActiveChip,
  setIsFollowing,
}) => {
  const [fichas, setFichas] = useState([]);
  const [historialFichas, setHistorialFichas] = useState([]);
  const [deshechas, setDeshechas] = useState([]);
  const [nextId, setNextId] = useState(1);

  let APUESTAS = {
    menoresA12: 0,
    entre12y24: 0,
    entre24y36: 0,
    primeraFila: 0,
    segundaFila: 0,
    terceraFila: 0,
    igualOMenorA18: 0,
    igualOMayorA19: 0,
    par: 0,
    impar: 0,
    rojo: 0,
    negro: 0,
    cero: 0,
  };

  const toggleModoBorrado = () => {
    setActiveChip(null);
    setIsFollowing(false);
    setModoBorrado((prevState) => !prevState);
  };

  const imagenPos = { x: -1, y: -1 }; // Para almacenar la posición de la imagen de la ficha

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

  const clearAllChips = () => {
    setFichas([]);
  };

  const borrarFicha = (id) => {
    // Filtrar las fichas para eliminar la ficha con el id especificado
    const nuevasFichas = fichas.filter((ficha) => ficha.id !== id);
    setFichas(nuevasFichas);
  };

  const handleCellClickDownUp = (j, i, chipValue, tableId) => {
    if (activeChip != null) {
      let fichaExistente = fichas.find(
        (ficha) => ficha.x === j && ficha.y === i && ficha.tableId === tableId
      );
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

        setHistorialFichas([...historialFichas, [...fichas]]);
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
    } else {
      console.log("No se eligió ninguna chip");
    }
  };

  const deshacer = () => {
    if (historialFichas.length > 0) {
      const estadoAnterior = historialFichas.pop();
      setDeshechas([...deshechas, [...fichas]]);
      setFichas(estadoAnterior);
      setHistorialFichas([...historialFichas]);
    }
  };

  const rehacer = () => {
    if (deshechas.length > 0) {
      const estadoRehecho = deshechas.pop();
      setHistorialFichas([...historialFichas, [...fichas]]);
      setFichas(estadoRehecho);
      setDeshechas([...deshechas]);
    }
  };

  const renderTabla = (
    filas,
    columnas,
    alturasFilas,
    anchoColumna,
    functionasociate,
    activeChip,
    chipValue,
    tableId,
    modoBorrado
  ) => {
    const tabla = [];

    for (let i = 0; i < filas; i++) {
      const fila = [];
      for (let j = 0; j < columnas; j++) {
        const numeroCasilla = i * columnas + j + 1;
        fila.push(
          <td
            key={numeroCasilla}
            style={{
              padding: `${alturasFilas[i]}px ${anchoColumna[j]}px`,
              position: "relative",
            }}
            onClick={() => functionasociate(j, i, chipValue, tableId)}
          >
            {imagenPos.x === j &&
              imagenPos.y === i &&
              imagenPos.tableId === tableId &&
              activeChip && (
                <img
                  src={getChipImage(activeChip)}
                  alt="chip"
                  className="image-default"
                />
              )}

            {fichas
              .filter(
                (ficha) =>
                  ficha.x === j && ficha.y === i && ficha.tableId === tableId
              )
              .map((ficha) => (
                <div className="div-fichas">
                  <img
                    key={ficha.id}
                    src={getChipImage(ficha.chipType)}
                    alt="chip"
                    className="image-default"
                    onClick={(e) => {
                      if (modoBorrado) {
                        borrarFicha(ficha.id);
                      }
                    }}
                  />
                  <div className="texto-sobre-imagen">
                    <p>{ficha.chipValue}</p>
                  </div>
                </div>
              ))}
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
        <Buttons
          deshacer={deshacer}
          rehacer={rehacer}
          toggleModoBorrado={toggleModoBorrado}
          clearAllChips={clearAllChips}
          modoBorrado={modoBorrado}
          historialFichas={historialFichas}
          deshechas={deshechas}
        />
        <div className="Board-container-up">
          <div className="Tabla-overlay-up">
            <div className="container-img-table">
              <img className="Board-img" src={ZeroImage} alt="Board" />
              <table className="Tabla">
                <tbody>
                  {renderTabla(
                    table0.cantidadDeFilas,
                    table0.cantidadDeColumnas,
                    table0.anchoDeFilas,
                    table0.anchoDeColumnas,
                    handleCellClickDownUp,
                    activeChip,
                    chipValue,
                    "table0",
                    modoBorrado
                  )}
                </tbody>
              </table>
            </div>
            <div className="container-img-table">
              <img className="Board-img" src={BoardImage} alt="Board" />
              <table className="Tabla">
                <tbody>
                  {renderTabla(
                    table1.cantidadDeFilas,
                    table1.cantidadDeColumnas,
                    table1.anchoDeFilas,
                    table1.anchoDeColumnas,
                    handleCellClickDownUp,
                    activeChip,
                    chipValue,
                    "table1",
                    modoBorrado
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
                  {renderTabla(
                    table2.cantidadDeFilas,
                    table2.cantidadDeColumnas,
                    table2.anchoDeFilas,
                    table2.anchoDeColumnas,
                    handleCellClickDownUp,
                    activeChip,
                    chipValue,
                    "table2",
                    modoBorrado
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
                  table3.cantidadDeFilas,
                  table3.cantidadDeColumnas,
                  table3.anchoDeFilas,
                  table3.anchoDeColumnas,
                  handleCellClickDownUp,
                  activeChip,
                  chipValue,
                  "table3",
                  modoBorrado
                )}
              </tbody>
            </table>
            <table className="Tabla-down">
              <tbody>
                {renderTabla(
                  table4.cantidadDeFilas,
                  table4.cantidadDeColumnas,
                  table4.anchoDeFilas,
                  table4.anchoDeColumnas,
                  handleCellClickDownUp,
                  activeChip,
                  chipValue,
                  "table4",
                  modoBorrado
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
