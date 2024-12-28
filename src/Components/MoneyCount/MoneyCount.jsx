import React, { useState } from "react";

export default function MoneyCount({ money, moneyBet }) {
  return (
    <div>
      <div>
        <p>Money: ${money}</p>
        <p>Bet: ${moneyBet}</p>
        <p></p>
      </div>
    </div>
  );
}
