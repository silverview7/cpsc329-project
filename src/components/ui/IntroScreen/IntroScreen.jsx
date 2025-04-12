import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./IntroScreen.css";
import Model from "../Model/Model";
import player from "../../../utils/Player";
import gameManager from "../../../utils/GameManager";
import { RiHeart3Fill } from "@remixicon/react";

const IntroScreen = () => {
  const navigate = useNavigate();
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(0);
  const [showScoreboardModal, setShowScoreboardModal] = useState(false);
  const [playerName, setPlayerName] = useState("");

  const handlePlayClick = () => {
    setShowDifficultyModal(true);
  };

  const handleDifficultySelect = (difficulty) => {
    player.setName(playerName || "Anonymous");
    player.setDifficulty(difficulty);
    player.setScore(0);
    player.resetLives();
    gameManager.start();
    setShowDifficultyModal(false);
    navigate("/game");
  };

  const handleRulesClick = () => {
    setShowRulesModal(1);
  };

  const handleScoreboardClick = () => {
    setShowScoreboardModal(true);
  };

  const scores = JSON.parse(localStorage.getItem("scores") || "[]");

  return (
    <div className="intro-screen">
      <h1>CPSC 329 - Quiz Game</h1>
      <h3>Let's see how well you learned the course</h3>
      <div className="button-container">
        <button className="intro-button" onClick={handlePlayClick}>
          Play
        </button>
        <button className="intro-button" onClick={handleRulesClick}>
          Rules
        </button>
        <button className="intro-button" onClick={handleScoreboardClick}>
          Scoreboard
        </button>
      </div>
      {/* Difficulty Selection Modal */}
      {showDifficultyModal && (
        <Model handleClose={() => setShowDifficultyModal(false)}>
          <h2>Select Difficulty</h2>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="player-name">Enter Your Name: </label>
            <input
              id="player-name"
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Your name"
              style={{ padding: "0.5rem", fontSize: "1rem" }}
            />
          </div>
          <div className="difficulty-buttons">
            <button
              className="intro-button"
              onClick={() => handleDifficultySelect("Easy")}
            >
              Easy
            </button>
            <button
              className="intro-button"
              onClick={() => handleDifficultySelect("Medium")}
            >
              Medium
            </button>
            <button
              className="intro-button"
              onClick={() => handleDifficultySelect("Hard")}
            >
              Hard
            </button>
          </div>
        </Model>
      )}
      {/* Rules Modal */}
      {showRulesModal === 1 && (
        <Model handleClose={() => setShowRulesModal(0)}>
          <span>
            The goal of this game is to test your knowledge on CPSC 329 Topics
            including:
          </span>
          <ul>
            <li>Networks</li>
            <li>Encryption</li>
            <li>Passwords</li>
            <li>Threat Modelling</li>
          </ul>
          <button className="intro-button" onClick={() => setShowRulesModal(2)}>
            Next
          </button>
        </Model>
      )}

      {showRulesModal === 2 && (
        <Model handleClose={() => setShowRulesModal(0)}>
          <img
            src="/assets/keyboard-intro.png"
            width={200}
            alt="keyboard-info"
          />
          <br />
          <span>
            Use the on screen keyboard or your own keyboard to answer questions
          </span>
          <button className="intro-button" onClick={() => setShowRulesModal(3)}>
            Next
          </button>
        </Model>
      )}

      {showRulesModal === 3 && (
        <Model handleClose={() => setShowRulesModal(0)}>
          <RiHeart3Fill color="red" size={90} />
          <p>
            Each new question you have <b>5</b> lives
          </p>
          <p>But with every wrong answer the monster gets closer</p>
          <button className="intro-button" onClick={() => setShowRulesModal(4)}>
            Next
          </button>
        </Model>
      )}

      {showRulesModal === 4 && (
        <Model handleClose={() => setShowRulesModal(0)}>
          <img src="/assets/clock-icon.png" width={200} alt="clock-info" />
          <br />
          <span>
            Based on the difficulty you select. The time you get changes
          </span>{" "}
          <br />
          <ul>
            <li>Easy: 1:30 minutes</li>
            <li>Medium: 1:00 minutes</li>
            <li>Hard: 30 seconds</li>
          </ul>
          <button className="intro-button" onClick={() => setShowRulesModal(5)}>
            Next
          </button>
        </Model>
      )}

      {showRulesModal === 5 && (
        <Model handleClose={() => setShowRulesModal(0)}>
          <span>
            For each correct answer you get <b>+20 points</b> but for each wrong
            answer <b>-10 points</b>
          </span>
          <span>Based on how fast you answer you get a bonus</span>
          <span>Bonuses are higher in higher difficulties</span>
          <button className="intro-button" onClick={() => setShowRulesModal(6)}>
            Next
          </button>
        </Model>
      )}

      {showRulesModal === 6 && (
        <Model handleClose={() => setShowRulesModal(0)}>
          <h2>There are 3 levels and 3 stages per level</h2>
          <span>
            The game ends when when you either clear all these levels, lose all
            your lives, or time runs out!{" "}
          </span>
          <button className="intro-button" onClick={() => setShowRulesModal(0)}>
            Got it!
          </button>
        </Model>
      )}

      {/* Scoreboard Modal */}
      {showScoreboardModal && (
        <Model handleClose={() => setShowScoreboardModal(false)}>
          <h2>Scoreboard</h2>
          {scores.length > 0 ? (
            <>
              <ul>
                {[...scores]
                  .sort((a, b) => b.score - a.score)
                  .map((score, index) => (
                    <li key={index}>
                      {score.name || "Anonymous"}: {score.score} (Difficulty:{" "}
                      {score.difficulty || "N/A"})
                    </li>
                  ))}
              </ul>
              <button
                onClick={() => {
                  localStorage.removeItem("scores");
                  setShowScoreboardModal(false);
                }}
                style={{
                  marginTop: "1rem",
                  backgroundColor: "#ff4d4d",
                  color: "white",
                }}
              >
                Clear Scores
              </button>
            </>
          ) : (
            <p>No scores yet. Play a game to see your score here!</p>
          )}
        </Model>
      )}
    </div>
  );
};

export default IntroScreen;
