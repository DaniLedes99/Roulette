import React from "react";
import boardImage from "../../img/Board.png";
import "./Board.css";

function Board() {
  let number = 0;

  //AL SERVICIO
  const RouletteWheelNumbers = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
    24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
  ];

  const getRouletteIndexFromNumber = (number) => {
    return RouletteWheelNumbers.indexOf(parseInt(number));
  };
  //FIN DEL SERVICIO
  const isRedOrBlackNumber = (number) => {
    const index = getRouletteIndexFromNumber(number);
    if (index % 2 !== 0 && index !== 0) {
      console.log("El número es rojo");
      return 1;
    } else if (index == 0) {
      console.log("el numero es cero, no es ni rojo ni negro");
      return 0;
    } else {
      console.log("El número es negro, MI NÚMERO ES NEGRO?");
      return 2;
    }
  };

  const isOddOrEvenNumber = (number) => {
    if (number % 2 !== 0 && number !== 0) {
      console.log("El número es impar");
      const oddNumber = 1;
      return oddNumber;
    } else if (number == 0) {
      console.log("el numero es cero, no es par ni impar");
      const notOddnotEvenZeroBaby = 1;
      return notOddnotEvenZeroBaby;
    } else {
      console.log("El número es par");
      const evenNumber = 1;
      return evenNumber;
    }
  };

  const isNumberDownto18 = (number) => {
    if (0 < number <= 18) {
      return 1; //true
    } else if (number == 0) {
      return 0; //is 0
    } else {
      return 2; //false
    }
  };

  isRedOrBlackNumber(number);
  isOddOrEvenNumber(number);
  console.log(isNumberDownto18(number));
  return (
    <div>
      <img className="Board" src={boardImage} alt="Board" />
    </div>
  );
}

export default Board;
