
import { useState } from "react";
import "../styles/LevelTwo.css";

function LevelTwo({ onNextLevel }) {
  const words = [
    {
      word: "PLANET",
      hint: "I travel around a star.",
    },
    {
      word: "CLOCK",
      hint: "I have hands but cannot clap.",
    },
    {
      word: "BRIDGE",
      hint: "I help people cross over water.",
    },
    {
      word: "SHADOW",
      hint: "I follow you when there is light.",
    },
    {
      word: "CANDLE",
      hint: "I give light when you set me on fire.",
    },
  ];

  const [questionIndex, setQuestionIndex] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongAttempts, setWrongAttempts] = useState(0);

  const currentQuestion = words[questionIndex];
  const secretWord = currentQuestion.word;
  const maxAttempts = 5;

  const isWon = secretWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const isLost = wrongAttempts >= maxAttempts;

  function handleGuess(letter) {
    if (
      guessedLetters.includes(letter) ||
      isWon ||
      isLost
    ) {
      return;
    }

    setGuessedLetters([...guessedLetters, letter]);

    if (!secretWord.includes(letter)) {
      setWrongAttempts((previous) => previous + 1);
    }
  }

  function nextQuestion() {
    setQuestionIndex((previous) => previous + 1);
    setGuessedLetters([]);
    setWrongAttempts(0);
  }

  function restartLevel() {
    setQuestionIndex(0);
    setGuessedLetters([]);
    setWrongAttempts(0);
  }

  return (
    <div className="level-two">
      <h1>Word Hunter Game</h1>

      <h2>Level 2 — Hint Challenge 💡</h2>

      <p>
        <strong>Hint:</strong> {currentQuestion.hint}
      </p>

      <div className="word-display">
        {secretWord.split("").map((letter, index) => (
          <span key={index}>
            {guessedLetters.includes(letter) ? letter : "_"}
          </span>
        ))}
      </div>

      <p>
        Wrong attempts: {wrongAttempts}/{maxAttempts}
      </p>

     {isWon && (
      <div className="level-two-result level-two-win">
        <h2>You solved the mystery! 🎉</h2>
        <p>Amazing work, word detective!</p>
      </div>
    )}

    {isLost && (
      <div className="level-two-result level-two-loss">
        <h2>Oops! Game Over 💗</h2>
        <p>The secret word was <strong>{secretWord}</strong></p>
      </div>
    )}

      <h3>Choose a letter</h3>

      <div className="keyboard">
        {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
          <button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={
              guessedLetters.includes(letter) ||
              isWon ||
              isLost
            }
          >
            {letter}
          </button>
        ))}
      </div>

      {isWon && questionIndex < words.length - 1 && (
        <button onClick={nextQuestion}>
          Next Word →
        </button>
      )}

      {isWon && questionIndex === words.length - 1 && (
        <button onClick={onNextLevel}>
          Complete Level 2 →
        </button>
      )}

      {isLost && (
        <button onClick={restartLevel}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default LevelTwo;