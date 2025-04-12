import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./GameView.css";
import Scene from "../Scene/Scene";
import Keyboard from "../Keyboard/Keyboard";
import Answer from "../Answer/Answer";
import gameManager from "../../../utils/GameManager";
import player from "../../../utils/Player";
import { RiInformation2Line } from "@remixicon/react";
import Model from "../../ui/Model/Model";

const GameView = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState(undefined);
  const [entries, setEntries] = useState(gameManager.getEntries());
  const [gameActive, setGameActive] = useState(gameManager.isActive());
  const [lives, setLives] = useState(player.getLives()); 
  const [level, setLevel] = useState(gameManager.getLevel());
  const [hasExited, setHasExited] = useState(false);
  const [score, setScore] = useState(0);
  const [currentTopic, setCurrentTopic] = useState("");
  const [showAttributions, setShowAttributions] = useState(false);

  useEffect(() => {
    gameManager.start();
    const newQuestion = gameManager.getNextQuestion();
    setQuestion(newQuestion);

    setLives(player.getLives());
    setCurrentTopic(gameManager.getCurrentTopic());
    setLevel(gameManager.getLevel());
  }, []);

  const handleClick = (letter) => {
    gameManager.attempt(letter, question.answer);

    if (gameManager.correctAnswer(question.answer)) {
      setTimeout(() => {
        setHasExited(true);
      }, 500);

      setTimeout(() => {
        setHasExited(false);
        const newQuestion = gameManager.getNextQuestion();
        setQuestion(newQuestion);

        setLives(player.getLives());
        setEntries(new Set(gameManager.getEntries()));
        setGameActive(gameManager.isActive());
      }, 2000);
    } else {
      setLives(player.getLives());
      setEntries(new Set(gameManager.getEntries()));
      setGameActive(gameManager.isActive());
    }

    setLevel(gameManager.getLevel());
    setScore(player.getScore());
    setCurrentTopic(gameManager.getCurrentTopic());
  };

  return (
    <div className="view">
      {gameActive && question !== undefined ? ( // Fix: Ensure question is defined
        <>
          <Scene
            lives={lives}
            level={level}
            score={score}
            hasExited={hasExited}
          />
          <div className="container">
            <div className="question-container">
              <span id="question">{question.question}</span>
            </div>
            <div className="controls">
              <Answer phrase={question.answer} guesses={entries} />
              <Keyboard entries={entries} handleClick={handleClick} />
            </div>
            <footer>
              <div>
                <span>
                  <b>
                    Current topic: <i>{currentTopic}</i>
                  </b>
                </span>
              </div>
              <div>
                <button onClick={() => navigate('/')}>Back to Menu</button> {/* Fix: Separate button */}
                <button onClick={() => setShowAttributions(true)}>
                  <RiInformation2Line />
                </button> {/* Fix: Separate button */}
              </div>
            </footer>
          </div>
          {showAttributions && (
            <Model handleClose={() => setShowAttributions(false)}>
              <h2>Attributions</h2>
              <ol>
                <li>
                  Icons (Info and heart) -{" "}
                  <a href="https://remixicon.com">Remix Icons</a>{" "}
                </li>
                <li>
                  Player Character (Creative Commons License) -{" "}
                  <a href="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5063fbef-34df-4e3f-adc0-b0e8030deaf5/dd94l9c-bc31b6d0-95e0-4d99-87f3-7ae815b03088.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzUwNjNmYmVmLTM0ZGYtNGUzZi1hZGMwLWIwZTgwMzBkZWFmNVwvZGQ5NGw5Yy1iYzMxYjZkMC05NWUwLTRkOTktODdmMy03YWU4MTViMDMwODguZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-S67V2bo5jlY_Jt9CzLCKqneV50tnDJk8PTVxNgx3Ug">
                    Source
                  </a>
                </li>
                <li>
                  Monster Character (Creative Commons License) -{" "}
                  <a href="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5d64d52c-015e-4b04-a4d5-7eca27080f8c/d7frqes-52f23256-d8ff-42c5-baa9-18a081ca45df.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzVkNjRkNTJjLTAxNWUtNGIwNC1hNGQ1LTdlY2EyNzA4MGY4Y1wvZDdmcnFlcy01MmYyMzI1Ni1kOGZmLTQyYzUtYmFhOS0xOGEwODFjYTQ1ZGYuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.iLTWp8x8wFBxMB5bBflCUoCpfrT4_e-Jf_wjTkhcjQc">
                    Source
                  </a>
                </li>
                <li>Game wallpaper was AI generated</li>
              </ol>
            </Model>
          )}
        </>
      ) : (
        <div className="container">
          <h2>Game Over</h2>
          <p>Your final score: {player.getScore()}</p>
          <button onClick={() => navigate('/')}>Back to Menu</button>
        </div>
      )}
    </div>
  );
};

export default GameView;
