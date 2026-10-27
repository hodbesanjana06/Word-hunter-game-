
import { useState } from "react";

const mysteryRooms = [
  {
    word: "RAINBOW",
    clue: "I appear in the sky after rain and have many colours.",
  },
  {
    word: "KEYBOARD",
    clue: "I have many keys, but I cannot open a door.",
  },
  {
    word: "CANDLE",
    clue: "I give light when I burn, but I become shorter over time.",
  },
  {
    word: "GIRAFFE",
    clue: "I have a very long neck and eat leaves from tall trees.",
  },
  {
    word: "COMPASS",
    clue: "I help travellers find directions.",
  },
];

function LevelThree({ onNextLevel }) {
  const [currentRoom, setCurrentRoom] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongAttempts, setWrongAttempts] = useState(0);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const { word: secretWord, clue } = mysteryRooms[currentRoom];

  const hasWon = secretWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const hasLost = wrongAttempts >= 4;

  const gameOver = hasWon || hasLost;

  const allRoomsCompleted = currentRoom === mysteryRooms.length - 1 && hasWon;

  function handleGuess(letter) {
    if (guessedLetters.includes(letter) || gameOver) {
      return;
    }

    setGuessedLetters((previous) => [...previous, letter]);

    if (!secretWord.includes(letter)) {
      setWrongAttempts((previous) => previous + 1);
    }
  }

  function handleRetry() {
    setGuessedLetters([]);
    setWrongAttempts(0);
  }

  function handleNextRoom() {
    if (currentRoom < mysteryRooms.length - 1) {
      setCurrentRoom((previous) => previous + 1);
      setGuessedLetters([]);
      setWrongAttempts(0);
    }
  }

  if (allRoomsCompleted) {
    return (
      <div className="level-three">
        <h1>🏆 Congratulations!</h1>
        <h2>You completed all five mystery rooms!</h2>
        <p>You are a true Word Hunter! 🎉</p>

        <button onClick={onNextLevel}>
          Finish Game
        </button>
      </div>
    );
  }

  return (
    <div className="level-three">
      <h1>🔐 Word Hunter: Mystery Escape</h1>

      <h2>
        Level 3 — Room {currentRoom + 1} of {mysteryRooms.length}
      </h2>

      <p className="mystery-clue">
        🔍 Mystery Clue: {clue}
      </p>

      <div className="secret-word">
        {secretWord.split("").map((letter, index) => (
          <span key={index} className="letter-box">
            {guessedLetters.includes(letter) ? letter : "_"}
          </span>
        ))}
      </div>

      <p>⏱️ Time Left: 30 seconds</p>

      <p>Wrong Attempts: {wrongAttempts}/4</p>

      {hasWon && (
        <h2>🎉 Excellent! You solved the mystery!</h2>
      )}

      {hasLost && (
        <div>
          <h2>😢 You lost this round!</h2>
          <p>The correct word was: {secretWord}</p>
        </div>
      )}

      <div className="keyboard">
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.includes(letter) || gameOver}
          >
            {letter}
          </button>
        ))}
      </div>

      {hasLost && (
        <button onClick={handleRetry}>
          🔄 Try Again
        </button>
      )}

      {hasWon && !allRoomsCompleted && (
        <button onClick={handleNextRoom}>
          ➡️ Next Room
        </button>
      )}
    </div>
  );
}

export default LevelThree;