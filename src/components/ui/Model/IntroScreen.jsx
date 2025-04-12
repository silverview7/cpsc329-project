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
  const [playerName, setPlayerName] = useState('');

  const handlePlayClick = () => {
    setShowDifficultyModal(true);
  };

  const handleDifficultySelect = (difficulty) => {
    player.setName(playerName || 'Anonymous');
    player.setDifficulty(difficulty);
    player.setScore(0);
    player.resetLives();
    gameManager.start();
    setShowDifficultyModal(false);
    navigate('/game');
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
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="player-name">Enter Your Name: </label>
            <input
              id="player-name"
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Your name"
              style={{ padding: '0.5rem', fontSize: '1rem' }}
            />
          </div>
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
          <p>Welcome to Hangman! Here’s how to play:</p>
          <ul>
            <li><strong>Objective:</strong> Guess the hidden word by selecting letters.</li>
            <li><strong>Lives:</strong> You start with 5 lives. Each incorrect guess costs 1 life.</li>
            <li><strong>Scoring:</strong> Correct guesses earn 20 points; incorrect guesses deduct 10 points.</li>
            <li><strong>Difficulty:</strong> Choose Easy, Medium, or Hard. Higher difficulties may make the game more challenging.</li>
            <li><strong>Game End:</strong> The game ends if you run out of lives or complete all levels.</li>
            <li><strong>Topics:</strong> Questions cover Networks, Encryption and Passwords, and Threat Modelling.</li>
          </ul>
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
                      {score.name || 'Anonymous'}: {score.score} (Difficulty: {score.difficulty || 'N/A'})
                    </li>
                  ))}
              </ul>
              <button
                onClick={() => {
                  localStorage.removeItem('scores');
                  setShowScoreboardModal(false);
                }}
                style={{ marginTop: '1rem', backgroundColor: '#ff4d4d', color: 'white' }}
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