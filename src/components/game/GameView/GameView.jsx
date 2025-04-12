import React, { useEffect, useState } from "react";
import "./GameView.css";
import Scene from "../Scene/Scene";
import Keyboard from "../Keyboard/Keyboard";
import Answer from "../Answer/Answer";
import gameManager from "../../../utils/GameManager";
import player from "../../../utils/Player";

const GameView = () => {
  const [question, setQuestion] = useState(undefined);
  const [entries, setEntries] = useState(gameManager.getEntries());
  const [gameActive, setGameActive] = useState(gameManager.isActive());
  const [lives, setLives] = useState(player.getLives());

  useEffect(() => {
    gameManager.start();
    const question = gameManager.getNextQuestion();
    setQuestion(question);
  }, []);

  const handleClick = (letter) => {
    // Update entries
    gameManager.attempt(letter, question.answer);

    // Check if correctly guessed phrase
    if (gameManager.correctAnswer(question.answer)) {
      const question = gameManager.getNextQuestion();
      setQuestion(question);
    }

    setLives(player.getLives());
    setEntries(new Set(gameManager.getEntries()));

    // Update game is active in case player lost
    setGameActive(gameManager.isActive());
  };

  return (
    <div className="view">
      {gameActive && question !== undefined && (
        <>
          <Scene life={lives} />
          <div>
            <h1 style={{ textAlign: "center" }}>{question.question}</h1>
            <div className="controls">
              <Answer phrase={question.answer} guesses={entries} />
              <Keyboard entries={entries} handleClick={handleClick} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GameView;
