import React, { useEffect, useState } from "react";
import "./App.css";
import Ruleta from "./Components/Roulette/Ruleta";
import Board from "./Components/Board/Board";
import Chip from "./Components/Chip/Chip";
import { INITIAL_VALUES_APUESTAS } from "./Components/Board/BoardService";
import MoneyCount from "./Components/MoneyCount/MoneyCount";

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
  const [matchingBets, setMatchingBets] = useState([]);
  const [money, setMoney] = useState(1000);

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
        <MoneyCount money={money} />
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
        <Board
          activeChip={activeChip}
          chipValue={chipValue}
          modoBorrado={modoBorrado}
          setModoBorrado={setModoBorrado}
          setActiveChip={setActiveChip}
          setIsFollowing={setIsFollowing}
          isSpinning={isSpinning}
          fichas={fichas}
          setFichas={setFichas}
          historialFichas={historialFichas}
          setHistorialFichas={setHistorialFichas}
          APUESTAS={APUESTAS}
          setAPUESTAS={setAPUESTAS}
          deshechas={deshechas}
          setDeshechas={setDeshechas}
          deshacer={deshacer}
          clearAllChips={clearAllChips}
          rehacer={rehacer}
          lastPlay={lastPlay}
          setLastPlay={setLastPlay}
          lastBet={lastBet}
        />
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
