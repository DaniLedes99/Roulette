
const terminaronLasApuestas = (isSpinning)=>{
  if (isSpinning===false){
    clearAllChips()
    setFichas([])
  }
}

terminaronLasApuestas(isSpinning)

// Función para actualizar las apuestas
const actualizarApuesta = (newAPUESTAS, key, chipValue) => {
  newAPUESTAS[key] += chipValue;
};

// Función para manejar la lógica de la tabla1
const manejarTabla1 = (newAPUESTAS, i, j, chipValue) => {
  const tabla1Mapping = {
    0: [
      "3",
      "3y6",
      "6",
      "6y9",
      "9",
      "9y12",
      "12",
      "12y15",
      "15",
      "15y18",
      "18",
      "18y21",
      "21",
      "21y24",
      "24",
      "24y27",
      "27",
      "27y30",
      "30",
      "30y33",
      "33",
      "33y36",
      "36",
    ],
    1: [
      "2y3",
      "2y3y5y6",
      "5y6",
      "5y6y8y9",
      "8y9",
      "8y9y11y12",
      "11y12",
      "11y12y14y15",
      "14y15",
      "14y15y17y18",
      "17y18",
      "17y18y20y21",
      "20y21",
      "20y21y23y24",
      "23y24",
      "23y24y26y27",
      "26y27",
      "26y27y29y30",
      "29y30",
      "29y30y32y33",
      "32y33",
      "32y33y35y36",
      "35y36",
    ],
    2: [
      "2",
      "2y5",
      "5",
      "5y8",
      "8",
      "8y11",
      "11",
      "11y14",
      "14",
      "14y17",
      "17",
      "17y20",
      "20",
      "20y23",
      "23",
      "23y26",
      "26",
      "26y29",
      "29",
      "29y32",
      "32",
      "32y35",
      "35",
    ],
    3: [
      "1y2",
      "1y2y4y5",
      "4y5",
      "4y5y7y8",
      "7y8",
      "7y8y10y11",
      "10y11",
      "10y11y13y14",
      "13y14",
      "13y14y16y17",
      "16y17",
      "16y17y19y20",
      "19y20",
      "19y20y22y23",
      "22y23y25y26",
      "25y26",
      "25y26y28y29",
      "28y29",
      "28y29y31y32",
      "31y32",
      "31y32y34y35",
      "34y35",
    ],
    4: [
      "1",
      "1y4",
      "4",
      "4y7",
      "7",
      "7y10",
      "10",
      "10y13",
      "13",
      "13y16",
      "16",
      "16y19",
      "19",
      "19y22",
      "22",
      "22y25",
      "25",
      "25y28",
      "28",
      "28y31",
      "31",
      "31y34",
      "34",
    ],
  };

  actualizarApuesta(newAPUESTAS, tabla1Mapping[i][j], chipValue);
};

// Función para manejar la lógica de otras tablas
const manejarTabla2 = (newAPUESTAS, i, chipValue) => {
  const mapping = ["primeraFila", "segundaFila", "terceraFila"];
  actualizarApuesta(newAPUESTAS, mapping[i], chipValue);
};

const manejarTabla3 = (newAPUESTAS, j, chipValue) => {
  const mapping = ["menoresA12", "entre12y24", "entre24y36"];
  actualizarApuesta(newAPUESTAS, mapping[j], chipValue);
};

const manejarTabla4 = (newAPUESTAS, j, chipValue) => {
  const mapping = [
    "igualOMenorA18",
    "par",
    "rojo",
    "negro",
    "impar",
    "igualOMayorA19",
  ];
  actualizarApuesta(newAPUESTAS, mapping[j], chipValue);
};

// Función principal
const handleCellClickDownUp = (j, i, chipValue, tableId) => {
  if (activeChip != null) {
    setAPUESTAS((prevAPUESTAS) => {
      const newAPUESTAS = { ...prevAPUESTAS };

      if (tableId === "table0") {
        actualizarApuesta(newAPUESTAS, "cero", chipValue);
      } else if (tableId === "table1") {
        manejarTabla1(newAPUESTAS, i, j, chipValue);
      } else if (tableId === "table2") {
        manejarTabla2(newAPUESTAS, i, chipValue);
      } else if (tableId === "table3") {
        manejarTabla3(newAPUESTAS, j, chipValue);
      } else if (tableId === "table4") {
        manejarTabla4(newAPUESTAS, j, chipValue);
      }

      return newAPUESTAS;
    });

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
