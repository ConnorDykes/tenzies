import "./App.css";
import Die from "./Die.js";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rollCount, setRollCount] = React.useState(1);
  const [previousGames, setPreviousGames] = React.useState();

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allValueEqual = dice.every((die) => die.value === firstValue);
    if (allHeld && allValueEqual) {
      setTenzies(true);
      console.log("Tenzies!");
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function hold(id) {
    setDice((prev) =>
      prev.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );
    setRollCount((prevCount) => prevCount + 1);
  }

  function newGame() {
    setDice(allNewDice());
    setTenzies(false);
    setRollCount(1);
  }

  const diceElements = dice.map((die) => (
    <Die
      holdDice={() => hold(die.id)}
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
    />
  ));

  // const previousGameElements = previousGames.map((score) => (
  //   <p style={{ fontSize: "12px" }}>{score}</p>
  // ));

  const buttonStyles = {
    backgroundColor: tenzies ? "#5035ff" : "blue",
  };

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button
        className="roll-dice"
        onClick={tenzies ? newGame : rollDice}
        style={buttonStyles}
      >
        {tenzies ? " New Game" : "Roll"}
      </button>
      <p className="title">Roll Count: {rollCount}</p>
      {/* {previousGameElements} */}
    </main>
  );
}
