import Black from "../../../img/chip_black.png";
import Blue from "../../../img/chip_blue.png";
import Orange from "../../../img/chip_orange.png";
import Purple from "../../../img/chip_purple.png";

const createColumnWidths = () => {
  const newArray = [];
  const firstValue = 30;
  const lastValue = 26;

  newArray.push(firstValue);

  const values = [4, 26];
  for (let i = 0; i < 21; i++) {
    newArray.push(values[i % 2]);
  }

  newArray.push(lastValue);

  return newArray;
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

const ANCHOCOLUMNASTABLA1 = createColumnWidths();

const imagenPos = { x: -1, y: -1 }; // Para almacenar la posición de la imagen de la ficha

export const renderTabla = (
  fichas,
  filas,
  columnas,
  alturasFilas,
  anchoColumna,
  areYouGoingtoBetOrClear,
  activeChip,
  chipValue,
  tableId,
  modoBorrado,
  isSpinning,
  borrarFicha
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
          onClick={(e) => {
            if (!isSpinning && activeChip) {
              areYouGoingtoBetOrClear({
                columnas: j,
                filas: i,
                chipValue,
                tableId,
                modoBorrado,
                word: "caca",
              });
            }
          }}
        >
          {imagenPos.x === j &&
            imagenPos.y === i &&
            imagenPos.tableId === tableId &&
            activeChip &&
            isSpinning === false && (
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
              <div className="div-fichas" key={ficha.id}>
                <img
                  src={getChipImage(ficha.chipType)}
                  alt="chip"
                  className="image-default"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isSpinning && modoBorrado) {
                      areYouGoingtoBetOrClear({
                        columnas: j,
                        filas: i,
                        chipValue,
                        tableId,
                        modoBorrado,
                        word: "pis",
                      });
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

export const tableMeasures0 = {
  cantidadDeFilas: 1,
  cantidadDeColumnas: 1,
  anchoDeFilas: [133],
  anchoDeColumnas: [40],
};

export const tableMeasures1 = {
  cantidadDeFilas: 5,
  cantidadDeColumnas: 24,
  anchoDeFilas: [42, 8, 34, 8, 38],
  anchoDeColumnas: ANCHOCOLUMNASTABLA1,
};

export const tableMeasures2 = {
  cantidadDeFilas: 3,
  cantidadDeColumnas: 1,
  anchoDeFilas: [46, 42, 44],
  anchoDeColumnas: [37],
};

export const tableMeasures3 = {
  cantidadDeFilas: 1,
  cantidadDeColumnas: 3,
  anchoDeFilas: [25],
  anchoDeColumnas: [41.5, 41.5, 42],
};

export const tableMeasures4 = {
  cantidadDeFilas: 1,
  cantidadDeColumnas: 6,
  anchoDeFilas: [32],
  anchoDeColumnas: [21.5, 20.5, 21, 20.5, 21, 21],
};
