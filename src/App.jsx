import React, { useEffect, useState, useCallback, useMemo } from "react";
import "./App.css";
import Ruleta from "./Components/Roulette/Ruleta";
import Board from "./Components/Board/Board";
import Chip from "./Components/Chip/Chip";
import { INITIAL_VALUES_APUESTAS } from "./Components/Board/BoardService";
import MoneyCount from "./Components/MoneyCount/MoneyCount";
import { TABLES } from "./Components/ApuestasService";

function App() {
  const [activeChip, setActiveChip] = useState(null);
  const [chipValue, setChipValue] = useState(0);
  const [modoBorrado, setModoBorrado] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [fichas, setFichas] = useState([]);
  const [historialFichas, setHistorialFichas] = useState([]);
  const [deshechas, setDeshechas] = useState([]);
  const [APUESTAS, setAPUESTAS] = useState(INITIAL_VALUES_APUESTAS);
  const [lastPlay, setLastPlay] = useState([]);
  const [lastBet, setLastBet] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [money, setMoney] = useState(1000);
  const [moneyBet, setMoneyBet] = useState(0);
  const [nextId, setNextId] = useState(1);

  const clearAllChips = () => {
    setFichas([]);
    setAPUESTAS((prevApuestas) => {
      const newApuestas = {};
      for (let key in prevApuestas) {
        newApuestas[key] = { ...prevApuestas[key], valor: 0 };
      }
      return newApuestas;
    });
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

  const settearPosiciónFicha = (j, i, chipValue, tableId) => {
    const fichaExistente = fichas.find(
      (ficha) => ficha.x === j && ficha.y === i && ficha.tableId === tableId
    );

    if (fichaExistente) {
      const newChipValue = fichaExistente.chipValue + chipValue;
      const chipColor = chipValueToColor(newChipValue);

      const nuevasFichas = fichas.map((ficha) =>
        ficha.id === fichaExistente.id
          ? { ...ficha, chipValue: newChipValue, chipType: chipColor }
          : ficha
      );
      setFichas(nuevasFichas);
      setMoneyBet(newChipValue);
    } else {
      setHistorialFichas([...historialFichas, { fichas, apuestas: APUESTAS }]);
      setDeshechas([]);
      setFichas([
        ...fichas,
        {
          id: nextId,
          x: j,
          y: i,
          tableId: tableId,
          chipType: chipValueToColor(chipValue),
          chipValue: chipValue,
        },
      ]);
      setNextId(nextId + 1);
      setMoneyBet(chipValue);
    }
  };

  const areYouGoingToBetOrClear = useCallback(
    ({ columnas, filas, chipValue, tableId, modoBorrado, word }) => {
      if (!activeChip || !TABLES[tableId]) {
        console.log("No se eligió ninguna chip o Table ID no encontrado");
        return;
      }

      const bettedNumbers = TABLES[tableId][filas][columnas];

      setAPUESTAS((prevApuestas) => {
        const nuevoEstado = { ...prevApuestas };

        if (modoBorrado) {
          if (nuevoEstado[bettedNumbers]) {
            nuevoEstado[bettedNumbers].valor = 0;
            setMoneyBet((prevMoneyBet) => prevMoneyBet - chipValue);
          }
        }
        return nuevoEstado;
      });

      if (!modoBorrado) {
        settearPosiciónFicha(columnas, filas, chipValue, tableId);
      }
    },
    [activeChip, TABLES, setAPUESTAS, setMoneyBet, settearPosiciónFicha]
  );

  const chipValueToColor = (nuevoValor) => {
    console.log(nuevoValor, "nuevoValor");
    if (nuevoValor > 99) {
      return "Black";
    } else if (nuevoValor > 24) {
      return "Blue";
    } else if (nuevoValor > 9) {
      return "Orange";
    }
    return "Purple";
  };

  const boardProps = useMemo(
    () => ({
      activeChip,
      chipValue,
      modoBorrado,
      setModoBorrado,
      setActiveChip,
      setIsFollowing,
      isSpinning,
      setAPUESTAS,
      rehacer,
      deshacer,
      clearAllChips,
      fichas,
      setFichas,
      historialFichas,
      deshechas,
      lastPlay,
      lastBet,
      areYouGoingToBetOrClear,
    }),
    [activeChip, chipValue, modoBorrado, areYouGoingToBetOrClear]
  );

  const dontFollowmeImSpinning = (isSpinning, setIsFollowing) => {
    if (isSpinning) {
      setIsFollowing(false);
    }
  };

  useEffect(() => {
    dontFollowmeImSpinning(isSpinning, setIsFollowing);
  }, [isSpinning]);

  return (
    <>
      <div className="container">
        <MoneyCount money={money} moneyBet={moneyBet} />
        <Ruleta
          isSpinning={isSpinning}
          setIsSpinning={setIsSpinning}
          clearAllChips={clearAllChips}
          setFichas={setFichas}
          fichas={fichas}
          APUESTAS={APUESTAS}
          lastplay={lastPlay}
          setLastPlay={setLastPlay}
          setLastBet={setLastBet}
          currentNumber={currentNumber}
          setCurrentNumber={setCurrentNumber}
          money={money}
          setMoney={setMoney}
        />
        <Board {...boardProps} />
        <Chip
          setActiveChip={setActiveChip}
          setChipValue={setChipValue}
          modoBorrado={modoBorrado}
          setModoBorrado={setModoBorrado}
          isFollowing={isFollowing}
          setIsFollowing={setIsFollowing}
          isSpinning={isSpinning}
        />
      </div>
    </>
  );
}

export default App;
