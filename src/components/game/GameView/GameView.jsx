import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GameView.css";
import Scene from "../Scene/Scene";
import Keyboard from "../Keyboard/Keyboard";
import Answer from "../Answer/Answer";
import gameManager from "../../../utils/GameManager";
import player from "../../../utils/Player";
import { RiInformation2Line } from "@remixicon/react";
import Model from "../../ui/Model/Model";
import Bonus from "./Bonus";

const GameView = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState(undefined);
  const [entries, setEntries] = useState(gameManager.getEntries());
  const [gameActive, setGameActive] = useState(gameManager.isActive());
  const [lives, setLives] = useState(player.getLives());
  const [level, setLevel] = useState(gameManager.getLevel());
  const [hasExited, setHasExited] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(100000);
  const [timerPaused, setTimerPaused] = useState(false);
  const [currentTopic, setCurrentTopic] = useState("");
  const [showAttributions, setShowAttributions] = useState(false);
  const [bonusAmount, setBonusAmount] = useState(0);
  const [showBonusAmount, setShowBonusAmount] = useState(false);

  const times = {
    Easy: 90,
    Medium: 60,
    Hard: 30,
  };

  useEffect(() => {
    gameManager.start();
    const newQuestion = gameManager.getNextQuestion();
    setQuestion(newQuestion);

    setLives(player.getLives());
    setCurrentTopic(gameManager.getCurrentTopic());
    setLevel(gameManager.getLevel());

    setTime(times[player.getDifficulty()]);
  }, []);

  useEffect(() => {
    if (!gameActive || timerPaused) return;

    if (time <= 0) {
      gameManager.end();
      setGameActive(gameManager.isActive());
      return;
    }

    const timer = setInterval(() => {
      setTime((oldTime) => oldTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, timerPaused, time]);

  const handleClick = (letter) => {
    gameManager.attempt(letter, question.answer);
    setEntries(new Set(gameManager.getEntries()));

    if (gameManager.correctAnswer(question.answer)) {
      setTimerPaused(true);

      const difficultyMapper = {
        Easy: 1,
        Medium: 4,
        Hard: 10,
      };

      const timeLeft = time;

      const bonus = Math.round(
        (timeLeft / times[player.getDifficulty()]) *
          difficultyMapper[player.getDifficulty()] *
          100
      );

      console.log("Bonus: ", bonus);

      if (bonus > 0) {
        setShowBonusAmount(true);
        player.setScore(player.getScore() + bonus);
        setBonusAmount(bonus);

        setTimeout(() => {
          setShowBonusAmount(false);
        }, 1000);
      }

      setTimeout(() => {
        setHasExited(true);
      }, 1000);

      setTimeout(() => {
        setHasExited(false);
        const newQuestion = gameManager.getNextQuestion();
        setQuestion(newQuestion);

        setLives(player.getLives());
        setGameActive(gameManager.isActive());
        setTime(times[player.getDifficulty()]);
        setEntries(new Set());
        setTimerPaused(false);
      }, 2500);
    } else {
      setLives(player.getLives());
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
            time={time}
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
                <button
                  onClick={() => {
                    setTimerPaused(true);
                    setShowAttributions(true);
                  }}
                >
                  <RiInformation2Line />
                </button>
              </div>
              <div>
                <span>Score: {score}</span>
              </div>
            </footer>
          </div>
          {showAttributions && (
            <Model
              handleClose={() => {
                setShowAttributions(false);
                setTimerPaused(false);
              }}
            >
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
                <li>
                  Clock in game instructions (Creative Commons License) -{" "}
                  <a href="https://cdn.iconscout.com/icon/free/png-256/free-clock-icon-download-in-svg-png-gif-file-formats--watch-timer-time-event-iconhub-pack-miscellaneous-icons-1093493.png">
                    Source
                  </a>
                </li>
                <li>Game wallpaper was AI generated</li>
              </ol>
              <button onClick={() => navigate("/")}>Back to Menu</button>{" "}
              {/* Moved back to main menu here */}
            </Model>
          )}
        </>
      ) : (
        <Model>
          <h1>Game Over</h1>
          <p>Your final score: {player.getScore()}</p>
          <button onClick={() => navigate("/")}>Back to Menu</button>
        </Model>
      )}
      <Bonus amount={bonusAmount} show={showBonusAmount} />
    </div>
  );
};

export default GameView;
