import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './IntroScreen.css';
import Model from './Model';
import player from '../../utils/Player';
import gameManager from '../../utils/GameManager';

const IntroScreen = () => {
  const navigate = useNavigate();
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showScoreboardModal, setShowScoreboardModal] = useState(false);

  const handlePlayClick = () => {
    setShowDifficultyModal(true); // Show difficulty selection modal
  };

  const handleDifficultySelect = (difficulty) => {
    player.setDifficulty(difficulty);
    gameManager.start();
    setShowDifficultyModal(false);
    navigate('/game'); // Navigate to GameView
  };

  const handleRulesClick = () => {
    setShowRulesModal(true);
  };

  const handleScoreboardClick = () => {
    setShowScoreboardModal(true);
  };

  const scores = JSON.parse(localStorage.getItem('scores') || '[]');

  return (
    <div className="intro-screen">
      <h1>Hangman</h1>
      <div className="button-container">
        <button onClick={handlePlayClick}>Play</button>
        <button onClick={handleRulesClick}>Rules</button>
        <button onClick={handleScoreboardClick}>Scoreboard</button>
      </div>

      {/* Difficulty Selection Modal */}
      {showDifficultyModal && (
        <Model handleClose={() => setShowDifficultyModal(false)}>
          <h2>Select Difficulty</h2>
          <div className="difficulty-buttons">
            <button onClick={() => handleDifficultySelect('Easy')}>Easy</button>
            <button onClick={() => handleDifficultySelect('Medium')}>Medium</button>
            <button onClick={() => handleDifficultySelect('Hard')}>Hard</button>
          </div>
        </Model>
      )}

      {/* Rules Modal */}
      {showRulesModal && (
        <Model handleClose={() => setShowRulesModal(false)}>
          <h2>Game Rules</h2>
          <p>Guess the word by selecting letters. You have 5 lives. Correct guesses earn 20 points, incorrect guesses deduct 10 points and cost a life. The game ends if you run out of lives or complete all levels.</p>
          <p>Topics include: Networks, Encryption and Passwords, and Threat Modelling.</p>
        </Model>
      )}

      {/* Scoreboard Modal */}
      {showScoreboardModal && (
        <Model handleClose={() => setShowScoreboardModal(false)}>
          <h2>Scoreboard</h2>
          {scores.length > 0 ? (
            <ul>
              {scores.map((score, index) => (
                <li key={index}>
                  {score.name || 'Anonymous'}: {score.score} (Difficulty: {score.difficulty || 'N/A'})
                </li>
              ))}
            </ul>
          ) : (
            <p>No scores yet. Play a game to see your score here!</p>
          )}
        </Model>
      )}
    </div>
  );
};

export default IntroScreen;