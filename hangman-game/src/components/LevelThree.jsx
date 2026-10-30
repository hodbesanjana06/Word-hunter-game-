import { useState } from "react";
import "../styles/LevelThree.css";

const puzzles = [
  {
    title: "Crack the Secret Code",
    type: "number",
    emoji: "🔐",
    clue: "Find the three-digit code.",
    question:
      "The first digit is 2. The second digit is double the first digit. The third digit is the sum of the first two digits.",
    answer: "246",
    hint: "The digits are 2, 4, and 2 + 4.",
    successMessage: "You cracked the secret code!",
  },
  {
    title: "Find the Missing Number",
    type: "number",
    emoji: "🧠",
    clue: "Find the pattern to continue the sequence.",
    question: "2, 6, 12, 20, 30, ?",
    answer: "42",
    hint: "The differences are +4, +6, +8, and +10. What comes next?",
    successMessage: "Amazing! You discovered the pattern!",
  },
{
  title: "The Logic Challenge",
  type: "choice",
  emoji: "🔎",
  clue: "Find the box containing the treasure.",
  question:
    "There are three boxes: A, B, and C. The treasure is in exactly one box. Box A says, 'The treasure is in Box B.' Box B says, 'The treasure is in Box C.' Box C says, 'The treasure is not in Box C.' Exactly one statement is true. Which box contains the treasure?",
  options: ["Box A", "Box B", "Box C"],
  answer: "Box A",
  hint:
    "If the treasure is in Box A, the statements are false, false, and true. Exactly one statement is true.",
  successMessage: "You solved the logic challenge!",
},

  {
    title: "Unscramble the Word",
    type: "text",
    emoji: "🔤",
    clue: "Put the letters in the correct order.",
    question: "Unscramble these letters: TCA",
    answer: "CAT",
    hint: "It's an animal that says meow.",
    successMessage: "Great! You solved the word puzzle!",
  },
  {
    title: "The Final Escape Code",
    type: "number",
    emoji: "🗝️",
    clue: "Solve the final puzzle to escape!",
    question:
      "A treasure chest has a four-digit code. The first digit is 1. The second digit is 2 more than the first. The third digit is the sum of the first two digits. The fourth digit is the difference between the third and first digits.",
    answer: "1342",
    hint: "The first digit is 1. The second is 3. The third is 1 + 3. The fourth is 4 - 1.",
    successMessage: "You escaped! You're a Mystery Master!",
  },
];

const MAX_ATTEMPTS = 3;

function LevelThree({ onNextLevel }) {
  const [currentRoom, setCurrentRoom] = useState(0);
  const [answer, setAnswer] = useState("");
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [message, setMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completedRooms, setCompletedRooms] = useState([]);

  const puzzle = puzzles[currentRoom];

  const hasLost = wrongAttempts >= MAX_ATTEMPTS && !isCorrect;
  const allRoomsCompleted = completedRooms.length === puzzles.length;

  function checkAnswer(event) {
    event.preventDefault();

    if (isCorrect || hasLost || !answer.trim()) {
      return;
    }

    const normalizedAnswer = answer.trim().toUpperCase();
    const correctAnswer = puzzle.answer.toUpperCase();

    if (normalizedAnswer === correctAnswer) {
      setIsCorrect(true);
      setMessage(puzzle.successMessage);

      setCompletedRooms((previous) =>
        previous.includes(currentRoom)
          ? previous
          : [...previous, currentRoom]
      );
    } else {
      const nextWrongAttempts = wrongAttempts + 1;
      setWrongAttempts(nextWrongAttempts);

      if (nextWrongAttempts >= MAX_ATTEMPTS) {
        setMessage(`Room locked! The answer was ${puzzle.answer}.`);
      } else {
        setMessage(
          `Not quite! You have ${
            MAX_ATTEMPTS - nextWrongAttempts
          } attempts left.`
        );
      }
    }

    setAnswer("");
  }

  function handleNextRoom() {
    if (currentRoom < puzzles.length - 1 && isCorrect) {
      setCurrentRoom((previous) => previous + 1);
      setAnswer("");
      setWrongAttempts(0);
      setMessage("");
      setIsCorrect(false);
      setShowHint(false);
    }
  }

  function handleRetry() {
    setAnswer("");
    setWrongAttempts(0);
    setMessage("");
    setIsCorrect(false);
    setShowHint(false);
  }

  if (allRoomsCompleted) {
    return (
      <div className="level-three">
        <div className="escape-card final-victory">
          <div className="puzzle-emoji">🏆</div>
          <h1>Mystery Escape Completed!</h1>
          <p>You solved all five puzzles and escaped!</p>
          <p className="completion-count">
            Rooms unlocked: {completedRooms.length}/{puzzles.length}
          </p>

          <button className="escape-button" onClick={onNextLevel}>
            Finish Game 🎉
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="level-three">
      <header className="escape-header">
        <p className="escape-label">THE ULTIMATE PUZZLE ADVENTURE</p>
        <h1>🔐 Mystery Escape</h1>
        <p>Use your brain to unlock every room!</p>
      </header>

      <div className="room-progress">
        {puzzles.map((room, index) => (
          <div
            key={room.title}
            className={`progress-room ${
              completedRooms.includes(index) ? "completed" : ""
            } ${currentRoom === index ? "active" : ""}`}
          >
            {completedRooms.includes(index) ? "✓" : index + 1}
          </div>
        ))}
      </div>

      <main className="escape-card">
        <div className="room-heading">
          <span className="room-emoji">{puzzle.emoji}</span>
          <div>
            <p className="room-number">
              ROOM {currentRoom + 1} OF {puzzles.length}
            </p>
            <h2>{puzzle.title}</h2>
          </div>
        </div>

        <p className="puzzle-clue">{puzzle.clue}</p>

        <div className="puzzle-question">
          <p>{puzzle.question}</p>
        </div>

        {puzzle.type === "choice" ? (
          <div className="answer-options">
            {puzzle.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setAnswer(option)}
                className={`answer-option ${
                  answer === option ? "selected" : ""
                }`}
                disabled={isCorrect || hasLost}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <form onSubmit={checkAnswer} className="answer-form">
            <label htmlFor="puzzle-answer">Your answer</label>
            <input
              id="puzzle-answer"
              type="text"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder="Enter your answer..."
              disabled={isCorrect || hasLost}
              autoComplete="off"
            />

            <button
              type="submit"
              className="escape-button"
              disabled={isCorrect || hasLost || !answer.trim()}
            >
              Unlock Room 🔓
            </button>
          </form>
        )}

        {puzzle.type === "choice" && (
          <button
            type="button"
            className="escape-button"
            onClick={checkAnswer}
            disabled={isCorrect || hasLost || !answer.trim()}
          >
            Check Answer
          </button>
        )}

        {!isCorrect && !hasLost && (
          <button
            type="button"
            className="hint-button"
            onClick={() => setShowHint((previous) => !previous)}
          >
            {showHint ? "Hide Hint" : "💡 Need a Hint?"}
          </button>
        )}

        {showHint && !isCorrect && !hasLost && (
          <p className="puzzle-hint">{puzzle.hint}</p>
        )}

        <div
          className={`puzzle-feedback ${
            isCorrect ? "feedback-success" : hasLost ? "feedback-error" : ""
          }`}
          aria-live="polite"
        >
          {message}
        </div>

        <p className="attempt-counter">
          Attempts used: {wrongAttempts}/{MAX_ATTEMPTS}
        </p>

        {hasLost && (
          <button className="escape-button" onClick={handleRetry}>
            🔄 Retry Room
          </button>
        )}

        {isCorrect && currentRoom < puzzles.length - 1 && (
          <button className="escape-button" onClick={handleNextRoom}>
            Next Room ➜
          </button>
        )}

        {isCorrect && currentRoom === puzzles.length - 1 && (
          <p className="final-message">
            🎉 Final puzzle solved! Preparing your victory screen...
          </p>
        )}
      </main>
    </div>
  );
}

export default LevelThree;
