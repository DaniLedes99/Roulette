import React, { useEffect, useState } from "react";
import "./App.css";
import Ruleta from "./Components/Ruleta";
import Board from "./Components/Board";
import Chip from "./Components/Chip";
import { INITIAL_VALUES_APUESTAS } from "./Components/BoardService";
import WhatsAppButton from "./Components/Wpp";

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

  const clearAllChips = () => {
    setFichas([]);
    setAPUESTAS(INITIAL_VALUES_APUESTAS);
  };

  const borrarFicha = (id) => {
    const nuevasFichas = fichas.filter((ficha) => ficha.id !== id);
    setFichas(nuevasFichas);
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
    if (isSpinning === true) {
      setIsFollowing(false);
    }
  };
  useEffect(() => {
    dontFollowmeImSpinning(isSpinning, setIsFollowing);
  }, [isSpinning]);

  return (
    <>
      <div className="container">
        <WhatsAppButton />
        <Ruleta
          isSpinning={isSpinning}
          setIsSpinning={setIsSpinning}
          clearAllChips={clearAllChips}
          setFichas={setFichas}
          APUESTAS={APUESTAS}
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
          borrarFicha={borrarFicha}
          rehacer={rehacer}
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
