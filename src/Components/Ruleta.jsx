import { useState, useEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import imagenRuleta from "../../img/roulette_2.png";
import imagenContornoRuleta from "../../img/roulette_1.png";
import imagenContornoRuleta1 from "../../img/roulette_3.png";
import imagenContornoRuleta2 from "../../img/roulette_4.png";
import imagenContornoRuleta3 from "../../img/roulette_5.png";
import "./Ruleta.css";
<<<<<<< Updated upstream

function Ruleta() {
  const [currentNumber, setCurrentNumber] = useState(0); // el número que viene del servidor
=======
import { ROULETTE_VALUE_TO_POSSIBLE_OUTCOME } from "./BoardService";
import RouletteService from "./RouletteService";
import axios from "axios"

const Ruleta = ({
  isSpinning,
  setIsSpinning,
  setFichas,
  clearAllChips,
  APUESTAS,
}) => {
  const [currentNumber, setCurrentNumber] = useState(23); // el número que viene del servidor
  const [showText, setShowText] = useState(false);
  const [nothingToDo, setNothingToDo] = useState(false);
>>>>>>> Stashed changes

  useEffect(() => {
    if (currentNumber !== null) {
      spinWheel(currentNumber);
    }
  }, [currentNumber]);

<<<<<<< Updated upstream
=======
 

>>>>>>> Stashed changes
  const RouletteWheelNumbers = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
    24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
  ];

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
<<<<<<< Updated upstream
=======
    
>>>>>>> Stashed changes
    return (360 / RouletteWheelNumbers.length) * rotateTo;
  };

  const spinWheel = (number) => {
    const bezier = [0.165, 0.84, 0.44, 1.005];
    const singleSpinDuration = 5000;
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
<<<<<<< Updated upstream
=======
        const { matchingBets } = processBets(APUESTAS, currentNumber);
        const winningBets = matchingBets.filter((bet) => bet.win);
        const LosingBets = matchingBets.filter((bet) => !bet.win);
        console.log(matchingBets)
        setIsSpinning(false);
        setShowText(true);
        clearAllChips();
        setFichas([]);
>>>>>>> Stashed changes
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

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * RouletteWheelNumbers.length);
    const randomNumber = RouletteWheelNumbers[randomIndex];
    setCurrentNumber(randomNumber);

    if (!nothingToDo) {
      enviar();
      setNothingToDo(true); 
  };}


  const currentDate = new Date();
  let hora = currentDate.getHours();
  let minuto = currentDate.getMinutes() + 2; 
  
  const enviar = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/enviarmensaje', {
        hora: hora,
        minuto: minuto
      });
      console.log("probando")
    } catch (error) {
      console.log(`Error: ${error.response ? error.response.data.message : error.message}`);
    }
  };


  return (
    <>
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

      <br />
    </>
  );
}

export default Ruleta;
