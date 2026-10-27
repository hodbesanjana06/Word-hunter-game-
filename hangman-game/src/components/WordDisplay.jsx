import { useState } from "react";
import "../styles/WordDisplay.css"

function WordDisplay({onNextLevel}){
    const categories = {                              
        Fruits : ["APPLE" , "MANGO" , "ORANGE" , "GRAPES" , "GUAVA"],
        Animals : ["TIGER" , "LION" , 'MONKEY' , 'ELEPHANT' , 'RABBIT'],
        Countries : ['INDIA' , 'JAPAN' , 'CANADA' , 'BRAZIL' , 'FRANCE'],

    }
    const [category, setCategory] = useState("Fruits");
    const [secretWord , setSecretWord] = useState(()=> {
        const words = categories["Fruits"];
        return words[Math.floor(Math.random() * words.length)]
    });
    const [guessedLetters , setGuessedLetters] = useState([]);
    const [wrongAttempts , setWrongAttempts] = useState(0)

    const maxAttempts =6

    const isWon = secretWord.split("").every((letter)=> guessedLetters.includes(letter));
    const isLost = wrongAttempts >= maxAttempts;


    function restartGame(){
        let words = categories[category]
        let newWord;
        do{
            newWord = words[Math.floor(Math.random() * words.length)];

        }while(newWord === secretWord);

        setSecretWord(newWord);
        setGuessedLetters([]);
        setWrongAttempts(0);
    }

    function handleGuess(letter){
        if(guessedLetters.includes(letter) || isWon || isLost){
            return;
        }
        setGuessedLetters([...guessedLetters, letter])

        if(!secretWord.includes(letter)){
            setWrongAttempts(wrongAttempts + 1)
        }
    }


    function changeCategory(newCategory) {
         setCategory(newCategory);

        const words = categories[newCategory];
        const newWord =
        words[Math.floor(Math.random() * words.length)];

        setSecretWord(newWord);
        setGuessedLetters([]);
        setWrongAttempts(0);
  }

    return(
        <>
           <div className="game-container">
                <h1>Word Hunter Game</h1>

                  <h2>Level 1 — Category Challenge</h2>

                <div className="category">
                    <label htmlFor="category">Choose Category : </label>
                    <select id="category" value={category} onChange={(e)=> changeCategory(e.target.value)} disabled = {isWon || isLost}>
                        {
                            Object.keys(categories).map((item) => (
                                <option value={item} key={item}>{item}</option>
                            ))
                        }
                    </select>
                </div>


                <div className="word-display">
                   {
                    secretWord.split("").map((letter , index)=>(
                        <span key={index}>{guessedLetters.includes(letter) ? letter : "_"}</span>
                    ))
                   }
                </div>

                <p>Wrong attempts : {wrongAttempts}/{maxAttempts}</p>

                {isWon && <h2>You Win ! 🎉</h2>}

                {isLost && (
                     <h2>Game Over ! 😢 The Word was {secretWord}</h2>
                )}

                <h2>Choose a letter</h2>

                <div className="keyboard">
                    {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter)=>(
                        <button key={letter} 
                            onClick={()=>{
                                handleGuess(letter)
                            }}
                            disabled={guessedLetters.includes(letter) || isWon || isLost}
                        >
                            {letter}</button>
                    ))}
                </div>

                {
                    isWon && (
                        <button onClick={onNextLevel}>Next Level </button>
                )}
                {
                    (isWon || isLost) && (
                        <button className="restart-btn" onClick={restartGame}>Play Again</button>
                    )
                }
           </div>
        </>
    )

}
export default WordDisplay;