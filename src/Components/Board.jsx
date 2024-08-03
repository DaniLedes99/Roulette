import ZeroImage from "../../img/0.png";
import BoardImage from "../../img/BoardMin.png";
import Right from "../../img/right.png";
import boardImageDown from "../../img/boarddown.png";
import "./Board.css";
import Black from "../../img/chip_black.png";
import Blue from "../../img/chip_blue.png";
import Orange from "../../img/chip_orange.png";
import Purple from "../../img/chip_purple.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";


const Board = ({ activeChip, chipValue }) => {
  const [imagenPos, setImagenPos] = useState({ x: -1, y: -1 }); // Para almacenar la posición de la imagen
  const [chipTipo, setChipTipo] = useState(null); 
  const [fichas, setFichas] = useState([]);
  const [historialFichas, setHistorialFichas] = useState([]);
const [deshechas, setDeshechas] = useState([]);
const [nextId, setNextId] = useState(1);


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

  const clearAllChips = () => {
    setFichas([]);
  };

  const borrarFicha = (id) => {
    // Filtrar las fichas para eliminar la ficha con el id especificado
    const nuevasFichas = fichas.filter(ficha => ficha.id !== id);
    setFichas(nuevasFichas);
  };
  

  const handleCellClickDownUp = (j, i, chipValue, APUESTAS, tableId) => {
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
      setHistorialFichas([...historialFichas, [...fichas]]);
      setDeshechas([]);
  
      // Añadir una nueva ficha al estado con un id único
      setFichas([...fichas, { id: nextId, x: j, y: i, tableId: tableId, chipType: activeChip }]);
      setNextId(nextId + 1);
    } else {
      console.log("No se eligió ninguna chip");
    }
  };

  const deshacer = () => {
    if (historialFichas.length > 0) {
      const estadoAnterior = historialFichas.pop(); // Obtener el estado anterior
      setDeshechas([...deshechas, [...fichas]]); // Guardar el estado actual en deshechas
      setFichas(estadoAnterior); // Restaurar el estado anterior
      setHistorialFichas([...historialFichas]); // Actualizar el historial
    }
  };
  
  const rehacer = () => {
    if (deshechas.length > 0) {
      const estadoRehecho = deshechas.pop(); // Obtener el estado rehecho
      setHistorialFichas([...historialFichas, [...fichas]]); // Guardar el estado actual en historial
      setFichas(estadoRehecho); // Restaurar el estado rehecho
      setDeshechas([...deshechas]); // Actualizar la pila de deshechas
    }
  };

  

  const getImageClass = (tableId) => {
    switch (tableId) {
      case 'table0':
        return 'image-table0';
      case 'table1':
        return 'image-table1';
      case 'table2':
        return 'image-table2';
      case 'table3':
        return 'image-table3';
      case 'table4':
        return 'image-table4';
      default:
        return '';
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
    APUESTAS,
    tableId
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
            onClick={() => functionasociate(j, i, chipValue, APUESTAS, tableId)}
          >
            {imagenPos.x === j && imagenPos.y === i && imagenPos.tableId === tableId && activeChip && (
              <img
                src={getChipImage(activeChip)}
                alt="chip"
                className={`image-default ${getImageClass(tableId)}`} 
              />
            )}
  
            {/* Renderizar las fichas existentes en esta celda */}
            {fichas.filter(ficha => ficha.x === j && ficha.y === i && ficha.tableId === tableId).map(ficha => (
              <img
                key={ficha.id}
                src={getChipImage(ficha.chipType)}
                alt="chip"
                className={`image-default ${getImageClass(tableId)}`}
                onClick={(e) => {
                  e.stopPropagation(); // Evita que el clic en la ficha active la celda
                  borrarFicha(ficha.id);
                }}
      
              />
            ))}
          </td>
        );
      }
      tabla.push(<tr key={i}>{fila}</tr>);
    }
    return tabla;
  };

  const firstValue = 30; 
  const lastValue = 26;  
  const newArray = [];
  
  newArray.push(firstValue);

  const values = [4, 26];
  for (let i = 0; i < 21; i++) {
    newArray.push(values[i % 2]);
  }

  newArray.push(lastValue);


  const [modoBorrado, setModoBorrado] = useState(false);

const toggleModoBorrado = () => {
  setModoBorrado(!modoBorrado);
};

  return (
    <>
      <div className="Board-container-main">
        <div className="buttons-container">
        <p>Chip: {activeChip} {chipValue}</p>
        <div class="cross-container">
        <FontAwesomeIcon  onClick={deshacer} disabled={historialFichas.length === 0} icon={faArrowRotateLeft} size="3x" className="cross" color="red" />
        </div>
        <div class="cross-container">
        <FontAwesomeIcon icon={faArrowRotateRight} onClick={rehacer} disabled={deshechas.length === 0} size="3x" className="cross" color="red"/>
        </div>
        <div class="cross-container">
        <FontAwesomeIcon icon={faEraser}  size="3x" onClick={toggleModoBorrado} className="cross" />
      </div>
      <div class="cross-container">
      <FontAwesomeIcon icon={faXmark}onClick={clearAllChips} className="cross" color="red" size="3x"></FontAwesomeIcon> 
      </div>
        </div>
        <div className="Board-container-up">
          <div className="Tabla-overlay-up">
            <div className="container-img-table">
              <img className="Board-img" src={ZeroImage} alt="Board" />
              <table className="Tabla">
                <tbody>{renderTabla(1, 1, [133], [40], handleCellClickDownUp, activeChip, chipValue, APUESTAS, 'table0')}</tbody>
              </table>
            </div>
            <div className="container-img-table">
              <img className="Board-img" src={BoardImage} alt="Board" />
              <table className="Tabla">
                <tbody>
                  {renderTabla(
                    5,
                    24,
                    [42, 8, 34, 8, 38],newArray
                    ,
                    handleCellClickDownUp, activeChip, chipValue, APUESTAS, 'table1'
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
                  {renderTabla(3, 1, [46, 42, 44], [37], handleCellClickDownUp, activeChip, chipValue, APUESTAS, 'table2')}
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
                  APUESTAS,
                  'table3'
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
                  handleCellClickDownUp,
                  activeChip,
                  chipValue,
                  APUESTAS,
                  'table4'
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
