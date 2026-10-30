import { useState } from "react";
import WordDisplay from "./components/WordDisplay";
import LevelTwo from "./components/LevelTwo";
import LevelThree from "./components/LevelThree";
import "./App.css";

function App() {
  const [currentLevel, setCurrentLevel] = useState(3);

  return (
    <>
      {currentLevel === 1 && (
        <WordDisplay onNextLevel={() => setCurrentLevel(2)} />
      )}

      {currentLevel === 2 && (
        <LevelTwo onNextLevel={() => setCurrentLevel(3)} />
      )}

      {currentLevel === 3 && (
        <LevelThree onNextLevel={() => setCurrentLevel(4)} />
      )}

      {currentLevel === 4 && (
        <div className="completion-screen">
          <div className="confetti confetti-one">🎉</div>
          <div className="confetti confetti-two">⭐</div>
          <div className="confetti confetti-three">🎊</div>
          <div className="confetti confetti-four">✨</div>

          <div className="completion-card">
            <div className="trophy-container">
              <span className="trophy">🏆</span>
              <span className="trophy-sparkle sparkle-one">✨</span>
              <span className="trophy-sparkle sparkle-two">⭐</span>
            </div>

            <span className="completion-badge">
              🥇 CHAMPION UNLOCKED
            </span>

            <h1>You Did It!</h1>

            <p className="completion-subtitle">
              You're a Word Hunter Champion!
            </p>

            <div className="completion-stats">
              <div className="stat-box stat-purple">
                <span>🎯</span>
                <strong>LEVEL 1</strong>
                <small>Word Hunter</small>
              </div>

              <div className="stat-box stat-pink">
                <span>💡</span>
                <strong>LEVEL 2</strong>
                <small>Hint Master</small>
              </div>

              <div className="stat-box stat-yellow">
                <span>🔐</span>
                <strong>LEVEL 3</strong>
                <small>Mystery Solver</small>
              </div>
            </div>

            <p className="completion-message">
              Amazing job! You conquered all three levels.
              <br />
              Ready for another adventure?
            </p>

            <button
              className="play-again-button"
              onClick={() => setCurrentLevel(1)}
            >
              <span>🔄</span> Play Again!
            </button>

            
          </div>
        </div>
      )}
    </>
  );
}

export default App;
