//Función creada para la parte más compleja de la tabla

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

const ANCHOCOLUMNASTABLA1 = createColumnWidths();

export const table0 = {
    cantidadDeFilas: 1,
    cantidadDeColumnas: 1,
    anchoDeFilas: [133],
    anchoDeColumnas: [40],
};

export const table1 = {
    cantidadDeFilas: 5,
    cantidadDeColumnas: 24,
    anchoDeFilas: [42, 8, 34, 8, 38],
    anchoDeColumnas: ANCHOCOLUMNASTABLA1,
};

export const table2 = {
    cantidadDeFilas: 3,
    cantidadDeColumnas: 1,
    anchoDeFilas: [46, 42, 44],
    anchoDeColumnas: [37],
};

export const table3 = {
    cantidadDeFilas: 1,
    cantidadDeColumnas: 3,
    anchoDeFilas: [25],
    anchoDeColumnas: [41.5, 41.5, 42],
};

export const table4 = {
    cantidadDeFilas: 1,
    cantidadDeColumnas: 6,
    anchoDeFilas: [32],
    anchoDeColumnas: [21.5, 20.5, 21, 20.5, 21, 21],
};
