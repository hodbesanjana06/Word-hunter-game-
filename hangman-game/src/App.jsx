import { useState } from "react";
import WordDisplay from "./components/WordDisplay";
import LevelTwo from "./components/LevelTwo";
import LevelThree from "./components/LevelThree";

function App() {
  const [currentLevel, setCurrentLevel] = useState(1);

  return (
    <>
      {currentLevel === 1 && (
        <WordDisplay
          onNextLevel={() => setCurrentLevel(2)}
        />
      )}

      {currentLevel === 2 && (
        <LevelTwo
          onNextLevel={() => setCurrentLevel(3)}
        />
      )}

      {currentLevel === 3 && (
        <LevelThree onNextLevel={(()=> setCurrentLevel(4))}/>
      )}

      {
        currentLevel === 4 && (
          <div>
            <h1>Word Hunter Game Completed!</h1>
            <p>You Conquered all three levels !</p>
            <button onClick={()=> setCurrentLevel(1)}>Play Again </button>
          </div>
        )
      }
    </>
  );
}

export default App;