import React, { useState } from "react";
import "./MoneyCount.css";

export default function MoneyCount({ money, moneyBet, shake }) {
  return (
    <div>
      <div className="money-container">
        <p className={`money ${shake ? "alert" : ""}`}>Money: ${money}</p>
        <p className="money">Bet: ${moneyBet}</p>
        <p></p>
      </div>
    </div>
  );
}
