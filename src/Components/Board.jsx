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
import { INITIAL_VALUES_APUESTAS } from "./BoardService";

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
  const [APUESTAS, setAPUESTAS] = useState(INITIAL_VALUES_APUESTAS);

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
    setAPUESTAS(INITIAL_VALUES_APUESTAS);
  };

  const borrarFicha = (id) => {
    const fichaAEliminar = fichas.find((ficha) => ficha.id === id);

    if (fichaAEliminar) {
      setAPUESTAS((prevAPUESTAS) => {
        const newAPUESTAS = { ...prevAPUESTAS };

        switch (fichaAEliminar.x) {
          case 0:
            newAPUESTAS.menoresA12 -= fichaAEliminar.chipValue;
            break;
          case 1:
            newAPUESTAS.entre12y24 -= fichaAEliminar.chipValue;
            break;
          case 2:
            newAPUESTAS.entre24y36 -= fichaAEliminar.chipValue;
            break;
        }
        return newAPUESTAS;
      });

      const nuevasFichas = fichas.filter((ficha) => ficha.id !== id);
      setFichas(nuevasFichas);
    }
  };

  const handleCellClickDownUp = (j, i, chipValue, tableId) => {
    if (activeChip != null) {
      if (tableId == "table0") {
        setAPUESTAS((prevAPUESTAS) => {
          const newAPUESTAS = { ...prevAPUESTAS };

          newAPUESTAS.cero += chipValue;

          return newAPUESTAS;
        });
      }

      if (tableId == "table1") {
        setAPUESTAS((prevAPUESTAS) => {
          const newAPUESTAS = { ...prevAPUESTAS };

          if (i === 0) {
            switch (j) {
              case 0:
                newAPUESTAS[3] += chipValue;
                break;
              case 1:
                newAPUESTAS["3y6"] += chipValue;
                break;
              case 2:
                newAPUESTAS[6] += chipValue;
                break;
              case 3:
                newAPUESTAS["6y9"] += chipValue;
                break;
              case 4:
                newAPUESTAS[9] += chipValue;
                break;
              case 5:
                newAPUESTAS["9y12"] += chipValue;
                break;
              case 6:
                newAPUESTAS[12] += chipValue;
                break;
              case 7:
                newAPUESTAS["12y15"] += chipValue;
                break;
              case 8:
                newAPUESTAS[15] += chipValue;
                break;
              case 9:
                newAPUESTAS["15y18"] += chipValue;
                break;
              case 10:
                newAPUESTAS[18] += chipValue;
                break;
              case 11:
                newAPUESTAS["18y21"] += chipValue;
                break;
              case 12:
                newAPUESTAS[21] += chipValue;
                break;
              case 13:
                newAPUESTAS["21y24"] += chipValue;
                break;
              case 14:
                newAPUESTAS[24] += chipValue;
                break;
              case 15:
                newAPUESTAS["24y27"] += chipValue;
                break;
              case 16:
                newAPUESTAS[27] += chipValue;
                break;
              case 17:
                newAPUESTAS["27y30"] += chipValue;
                break;
              case 18:
                newAPUESTAS[30] += chipValue;
                break;
              case 19:
                newAPUESTAS["30y33"] += chipValue;
                break;
              case 20:
                newAPUESTAS[33] += chipValue;
                break;
              case 21:
                newAPUESTAS["33y36"] += chipValue;
                break;
              case 22:
                newAPUESTAS[36] += chipValue;
                break;
              default:
                console.log("Columna no reconocida");
                break;
            }
          }
          if (i === 1) {
            switch (j) {
              case 0:
                newAPUESTAS["2y3"] += chipValue;
                console.log(chipValue);
                console.log(newAPUESTAS["2y3"]);

                break;
              case 1:
                newAPUESTAS["2y3y5y6"] += chipValue;
                break;
              case 2:
                newAPUESTAS["5y6"] += chipValue;
                break;
              case 3:
                newAPUESTAS["5y6y8y9"] += chipValue;
                break;
              case 4:
                newAPUESTAS["8y9"] += chipValue;
                break;
              case 5:
                newAPUESTAS["8y9y11y12"] += chipValue;
                break;
              case 6:
                newAPUESTAS["11y12"] += chipValue;
                break;
              case 7:
                newAPUESTAS["11y12y14y15"] += chipValue;
                break;
              case 8:
                newAPUESTAS["14y15"] += chipValue;
                break;
              case 9:
                newAPUESTAS["14y15y17y18"] += chipValue;
                break;
              case 10:
                newAPUESTAS["17y18"] += chipValue;
                break;
              case 11:
                newAPUESTAS["17y18y20y21"] += chipValue;
                break;
              case 12:
                newAPUESTAS["20y21"] += chipValue;
                break;
              case 13:
                newAPUESTAS["20y21y23y24"] += chipValue;
                break;
              case 14:
                newAPUESTAS["23y24"] += chipValue;
                break;
              case 15:
                newAPUESTAS["23y24y26y27"] += chipValue;
                break;
              case 16:
                newAPUESTAS["26y27"] += chipValue;
                break;
              case 17:
                newAPUESTAS["26y27y29y30"] += chipValue;
                break;
              case 18:
                newAPUESTAS["29y30"] += chipValue;
                break;
              case 19:
                newAPUESTAS["29y30y32y33"] += chipValue;
                break;
              case 20:
                newAPUESTAS["32y33"] += chipValue;
                break;
              case 21:
                newAPUESTAS["32y33y35y36"] += chipValue;
                break;
              case 22:
                newAPUESTAS["35y36"] += chipValue;
                break;
              default:
                console.log("Opción no reconocida");
                break;
            }
          }
          if (i === 2) {
            switch (j) {
              case 0:
                newAPUESTAS["2"] += chipValue;
                break;
              case 1:
                newAPUESTAS["2y5"] += chipValue;
                break;
              case 2:
                newAPUESTAS["5"] += chipValue;
                break;
              case 3:
                newAPUESTAS["5y8"] += chipValue;
                break;
              case 4:
                newAPUESTAS["8"] += chipValue;
                break;
              case 5:
                newAPUESTAS["8y11"] += chipValue;
                break;
              case 6:
                newAPUESTAS["11"] += chipValue;
                break;
              case 7:
                newAPUESTAS["11y14"] += chipValue;
                break;
              case 8:
                newAPUESTAS["14"] += chipValue;
                break;
              case 9:
                newAPUESTAS["14y17"] += chipValue;
                break;
              case 10:
                newAPUESTAS["17"] += chipValue;
                break;
              case 11:
                newAPUESTAS["17y20"] += chipValue;
                break;
              case 12:
                newAPUESTAS["20"] += chipValue;
                break;
              case 13:
                newAPUESTAS["20y23"] += chipValue;
                break;
              case 14:
                newAPUESTAS["23"] += chipValue;
                break;
              case 15:
                newAPUESTAS["23y26"] += chipValue;
                break;
              case 16:
                newAPUESTAS["26"] += chipValue;
                break;
              case 17:
                newAPUESTAS["26y29"] += chipValue;
                break;
              case 18:
                newAPUESTAS["29"] += chipValue;
                break;
              case 19:
                newAPUESTAS["29y32"] += chipValue;
                break;
              case 20:
                newAPUESTAS["32"] += chipValue;
                break;
              case 21:
                newAPUESTAS["32y35"] += chipValue;
                break;
              case 22:
                newAPUESTAS["35"] += chipValue;
                break;
              default:
                console.log("Opción no reconocida");
                break;
            }
          }
          if (i === 3) {
            switch (j) {
              case 0:
                newAPUESTAS["1y2"] += chipValue;
                break;
              case 1:
                newAPUESTAS["1y2y4y5"] += chipValue;
                break;
              case 2:
                newAPUESTAS["4y5"] += chipValue;
                break;
              case 3:
                newAPUESTAS["4y5y7y8"] += chipValue;
                break;
              case 4:
                newAPUESTAS["7y8"] += chipValue;
                break;
              case 5:
                newAPUESTAS["7y8y10y11"] += chipValue;
                break;
              case 6:
                newAPUESTAS["10y11"] += chipValue;
                break;
              case 7:
                newAPUESTAS["10y11y13y14"] += chipValue;
                break;
              case 8:
                newAPUESTAS["13y14"] += chipValue;
                break;
              case 9:
                newAPUESTAS["13y14y16y17"] += chipValue;
                break;
              case 10:
                newAPUESTAS["16y17"] += chipValue;
                break;
              case 11:
                newAPUESTAS["16y17y19y20"] += chipValue;
                break;
              case 12:
                newAPUESTAS["19y20"] += chipValue;
                break;
              case 13:
                newAPUESTAS["19y20y22y23"] += chipValue;
                break;
              case 14:
                newAPUESTAS["22y23y25y26"] += chipValue;
                break;
              case 15:
                newAPUESTAS["25y26"] += chipValue;
                break;
              case 16:
                newAPUESTAS["25y26y28y29"] += chipValue;
                break;
              case 17:
                newAPUESTAS["28y29"] += chipValue;
                break;
              case 18:
                newAPUESTAS["28y29y31y32"] += chipValue;
                break;
              case 19:
                newAPUESTAS["31y32"] += chipValue;
                break;
              case 20:
                newAPUESTAS["31y32y34y35"] += chipValue;
                break;
              case 21:
                newAPUESTAS["34y35"] += chipValue;
                break;
              default:
                console.log("Opción no reconocida");
                break;
            }
          }

          if (i === 4) {
            switch (j) {
              case 0:
                newAPUESTAS["1"] += chipValue;
                break;
              case 1:
                newAPUESTAS["1y4"] += chipValue;
                break;
              case 2:
                newAPUESTAS["4"] += chipValue;
                break;
              case 3:
                newAPUESTAS["4y7"] += chipValue;
                break;
              case 4:
                newAPUESTAS["7"] += chipValue;
                break;
              case 5:
                newAPUESTAS["7y10"] += chipValue;
                break;
              case 6:
                newAPUESTAS["10"] += chipValue;
                break;
              case 7:
                newAPUESTAS["10y13"] += chipValue;
                break;
              case 8:
                newAPUESTAS["13"] += chipValue;
                break;
              case 9:
                newAPUESTAS["13y16"] += chipValue;
                break;
              case 10:
                newAPUESTAS["16"] += chipValue;
                break;
              case 11:
                newAPUESTAS["16y19"] += chipValue;
                break;
              case 12:
                newAPUESTAS["19"] += chipValue;
                break;
              case 13:
                newAPUESTAS["19y22"] += chipValue;
                break;
              case 14:
                newAPUESTAS["22"] += chipValue;
                break;
              case 15:
                newAPUESTAS["22y25"] += chipValue;
                break;
              case 16:
                newAPUESTAS["25"] += chipValue;
                break;
              case 17:
                newAPUESTAS["25y28"] += chipValue;
                break;
              case 18:
                newAPUESTAS["28"] += chipValue;
                break;
              case 19:
                newAPUESTAS["28y31"] += chipValue;
                break;
              case 20:
                newAPUESTAS["31"] += chipValue;
                break;
              case 21:
                newAPUESTAS["31y34"] += chipValue;
                break;
              case 22:
                newAPUESTAS["34"] += chipValue;
                break;
              default:
                console.log("Opción no reconocida");
                break;
            }
          }

          return newAPUESTAS;
        });
      }

      if (tableId == "table2") {
        setAPUESTAS((prevAPUESTAS) => {
          const newAPUESTAS = { ...prevAPUESTAS };
          switch (i) {
            case 0:
              newAPUESTAS.primeraFila += chipValue;
              break;
            case 1:
              newAPUESTAS.segundaFila += chipValue;
              break;
            case 2:
              newAPUESTAS.terceraFila += chipValue;
              break;
            default:
              console.log("Opción no reconocida");
              break;
          }
          return newAPUESTAS;
        });
      }

      if (tableId == "table3") {
        setAPUESTAS((prevAPUESTAS) => {
          const newAPUESTAS = { ...prevAPUESTAS };
          switch (j) {
            case 0:
              newAPUESTAS.menoresA12 += chipValue;
              break;
            case 1:
              newAPUESTAS.entre12y24 += chipValue;
              break;
            case 2:
              newAPUESTAS.entre24y36 += chipValue;
              break;
            default:
              console.log("Opción no reconocida");
              break;
          }
          return newAPUESTAS;
        });
      }
      if (tableId == "table4") {
        setAPUESTAS((prevAPUESTAS) => {
          const newAPUESTAS = { ...prevAPUESTAS };
          switch (j) {
            case 0:
              newAPUESTAS.igualOMenorA18 += chipValue;
              break;
            case 1:
              newAPUESTAS.par += chipValue;
              break;
            case 2:
              newAPUESTAS.rojo += chipValue;
              break;
            case 3:
              newAPUESTAS.negro += chipValue;
              break;
            case 4:
              newAPUESTAS.impar += chipValue;
              break;
            case 5:
              newAPUESTAS.igualOMayorA19 += chipValue;
              break;
            default:
              console.log("Opción no reconocida");
              break;
          }
          return newAPUESTAS;
        });
      }
      settearPosiciónFicha(j, i, chipValue, tableId);
    } else {
      console.log("No se eligió ninguna chip");
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

  const deshacer = () => {
    if (historialFichas.length > 0) {
      const estadoAnterior = historialFichas.pop();
      setDeshechas([...deshechas, { fichas: fichas, apuestas: APUESTAS }]);
      setFichas(estadoAnterior.fichas);
      setAPUESTAS(estadoAnterior.apuestas);
      setHistorialFichas([...historialFichas]);
    }
  };

  const rehacer = () => {
    if (deshechas.length > 0) {
      const estadoRehecho = deshechas.pop();
      setHistorialFichas([
        ...historialFichas,
        { fichas: fichas, apuestas: APUESTAS },
      ]);
      setFichas(estadoRehecho.fichas);
      setAPUESTAS(estadoRehecho.apuestas);
      setDeshechas([...deshechas]);
    }
  };

  console.log(APUESTAS);
  //el apuestas en historial de fichas espera a q gregues una nueva ficha en un lugar distinto para actualizar su valor, no condiciona el funcionamiento de la ruleta pero ni idea por qué pasa

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
