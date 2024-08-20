import { useState, useEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import imagenRuleta from "../../img/roulette_2.png";
import imagenContornoRuleta from "../../img/roulette_1.png";
import imagenContornoRuleta1 from "../../img/roulette_3.png";
import imagenContornoRuleta2 from "../../img/roulette_4.png";
import imagenContornoRuleta3 from "../../img/roulette_5.png";
import "./Ruleta.css";
import {ROULETTE_VALUE_TO_POSSIBLE_OUTCOME} from "./BoardService"
import GirarRuleta from "./GirarRuleta"

const Ruleta= ({isSpinning,setIsSpinning, setFichas, clearAllChips, APUESTAS}) => {
  const [currentNumber, setCurrentNumber] = useState(23); // el número que viene del servidor
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (currentNumber !== null) {
      spinWheel(currentNumber);
      setIsSpinning(true);
      setShowText(false)
    }
  }, [currentNumber]);

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * RouletteWheelNumbers.length);
    const randomNumber = RouletteWheelNumbers[randomIndex];
    setCurrentNumber(randomNumber);
  };

  const RouletteWheelNumbers = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
    24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
  ];

  const spinningDuration=3000

  const wheelMinNumberOfSpins = 2;
  const wheelMaxNumberOfSpins = 4;

  const getRouletteIndexFromNumber = (number) => {
    return RouletteWheelNumbers.indexOf(parseInt(number));
  };

  const getRotationFromNumber = (number) => {
    const index = getRouletteIndexFromNumber(number);
    return (360 / RouletteWheelNumbers.length) * index;
  };

  const getZeroEndRotation = (totalRotation) => {
    return 360 - Math.abs(totalRotation % 360);
  };

  const getBallEndRotation = (zeroEndRotation, currentNumber) => {
    return Math.abs(zeroEndRotation) + getRotationFromNumber(currentNumber);
  };

  const getBallNumberOfRotations = (minNumberOfSpins, maxNumberOfSpins) => {
    const numberOfSpins = anime.random(minNumberOfSpins, maxNumberOfSpins);
    return 360 * numberOfSpins;
  };

  const getRandomEndRotation = (minNumberOfSpins, maxNumberOfSpins) => {
    const rotateTo = anime.random(
      minNumberOfSpins * RouletteWheelNumbers.length,
      maxNumberOfSpins * RouletteWheelNumbers.length
    );
    return (360 / RouletteWheelNumbers.length) * rotateTo;
  };

const [nonZeroBets, setNonZeroBets] = useState({});

const getNonZeroBets = (apuestas) => {
  if (!apuestas || typeof apuestas !== 'object') {
    console.error("El objeto de apuestas no es válido.");
    return {};
  }

  let nonZeroBets = {};

  for (const [betNumber, betAmountAndMultiplier] of Object.entries(apuestas)) {
    if (betAmountAndMultiplier.valor !== 0) {
      nonZeroBets[betNumber] = betAmountAndMultiplier;
    }
  }

  return nonZeroBets;
};

const processBets = (APUESTAS, currentNumber) => {
  const bets = getNonZeroBets(APUESTAS);
  setNonZeroBets(bets);
  console.log('Apuestas distintas de 0:', bets);  

  const betKeys = Object.keys(bets);
  const matchingBets = [];
  const nonMatchingBets = [];
  let totalMatchingValue = 0;
  let totalNonMatchingValue = 0;

  betKeys.forEach(key => {
    const { valor, multiplicador } = bets[key];
    const result = valor * multiplicador;
    if (ROULETTE_VALUE_TO_POSSIBLE_OUTCOME[currentNumber].includes(key)) {
      matchingBets.push({ key, valorMultiplicado: result });  
      totalMatchingValue += result; 
      console.log(`GANASTE $${result}`);
    } else {
      nonMatchingBets.push({ key, valor });  
      totalNonMatchingValue += valor;  
      console.log(`PERDISTE $${valor}`);
    }
  });

  matchingBets.push({ valortotal: totalMatchingValue });
  nonMatchingBets.push({ valortotal: totalNonMatchingValue });

  console.log('Apuestas ganadoras:', matchingBets);
  console.log('Apuestas perdedoras:', nonMatchingBets);

  return { matchingBets, nonMatchingBets };
};

  const spinWheel = (number) => {
    const bezier = [0.165, 0.84, 0.44, 1.005];
    const singleSpinDuration = spinningDuration;
    const endRotation = -getRandomEndRotation(
      wheelMinNumberOfSpins,
      wheelMaxNumberOfSpins
    ); // número aleatorio de giros
    const zeroFromEndRotation = getZeroEndRotation(endRotation);
    const ballEndRotation =
      getBallNumberOfRotations(wheelMinNumberOfSpins, wheelMaxNumberOfSpins) +
      getBallEndRotation(zeroFromEndRotation, number);

    anime.set([".ruleta-principal", ".ruleta-contorno2"], {
      rotate: getRotationFromNumber(number.toString()),
    });
    anime.set(".ball-container", {
      rotate: 0,
    });

    anime({
      targets: [".ruleta-principal", ".ruleta-contorno2"],
      rotate: endRotation,
      duration: singleSpinDuration,
      easing: `cubicBezier(${bezier.join(",")})`,
      complete: () => {
        setCurrentNumber(number);
        const { matchingBets, nonMatchingBets } = processBets(APUESTAS, currentNumber);
        console.log(matchingBets)
        console.log(nonMatchingBets)
        setIsSpinning(false)
        setShowText(true)
        clearAllChips()
        setFichas([])
      },
    });

    anime({
      targets: ".ball-container",
      translateY: [
        { value: 0, duration: 2000 },
        { value: 40, duration: 1000 },
        { value: 65, duration: 900 },
        { value: 75, duration: 1000 },
      ],
      rotate: [{ value: ballEndRotation, duration: singleSpinDuration }],
      loop: 1,
      easing: `cubicBezier(${bezier.join(",")})`,
    });
  };

  return (
    <>
    {showText ? <p>{`Salió el número ${currentNumber}`}</p> : <p>Esperando...</p>}
      <div className="ruleta-container">
        <img
          style={{ transform: "rotate(0deg)" }}
          className="ruleta-principal"
          src={imagenRuleta}
          alt="La Ruleta principal de los números"
        />
        <img
          className="ruleta-contorno"
          src={imagenContornoRuleta}
          alt="Contorno de la ruleta"
        />
        <img className="ruleta-contorno1" src={imagenContornoRuleta1} />
        <img className="ruleta-contorno2" src={imagenContornoRuleta2} />
        <img className="ruleta-contorno3" src={imagenContornoRuleta3} />
        <div className={"ball-container"}>
          <div
            className={"ball"}
            style={{ transform: "translate(-5px, -175px)" }} //posición inicial de la bola
          ></div>
        </div>
      </div>
       <button onClick={handleClick} disabled={isSpinning}>
        {isSpinning ? 'Girando...' : 'Girar Ruleta'}
      </button>
      <br />
    </>
  );
}

export default Ruleta;
