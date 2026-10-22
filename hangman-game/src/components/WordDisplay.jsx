import { useState } from "react";
import "../styles/WordDisplay.css"

function WordDisplay(){
    const categories = {
        Fruits : ["APPLE" , "MANGO" , "ORANGE" , "GRAPES" , "GUAVA"],
        Animals : ["TIGER" , "LION" , 'MONKEY' , 'ELEPHANT' , 'RABBIT'],
        Countries : ['INDIA' , 'JAPAN' , 'CANADA' , 'BRAZIL' , 'FRANCE'],

    }

    const [secretWord , setSecretword] = useState(()=> {
        const words = categories["Fruits"];
        return words[Math.floor(Math.random() * words.length)]
    });
    const [guessedLetters , setGuessedLetters] = useState([]);
    const [wrongAttempts , setWrongAttempts] = useState(0)
    const [category , setCategory] = useState("Fruits")

    const isWon = secretWord.split("").every((letter)=> guessedLetters.includes(letter));
    const isLost = wrongAttempts >= 6;



    function restartGame(){
        let words = categories[category]
        let newWord;
        do{
            newWord = words[Math.floor(Math.random() * words.length)];

        }while(newWord === secretWord);

        setSecretword(newWord);
        setGuessedLetters([]);
        setWrongAttempts(0);
    }

    return(
        <>
           <div className="game-container">
                <h1>Word Hunter Game</h1>

                <div className="category">
                    <label htmlFor="category">Choose Category : </label>
                    <select id="category" value={category} onChange={(e)=> setCategory(e.target.value)}>
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

                <p>Wrong attempts : {wrongAttempts}/6</p>
                {isWon && <h2>You Win ! 🎉</h2>}
                {isLost && <h2>Game Over ! 😢</h2>}

                <h2>Choose a letter</h2>

                <div className="keyboard">
                    {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter)=>(
                        <button key={letter} 
                            onClick={()=>{
                                setGuessedLetters([...guessedLetters , letter]);
                                if(!secretWord.includes(letter)){
                                    setWrongAttempts(wrongAttempts + 1)
                                }
                            }}
                            disabled={guessedLetters.includes(letter) || isWon || isLost}
                        >
                            {letter}</button>
                    ))}
                </div>

                <button className="restart-btn" onClick={restartGame}>Restart Button</button>
           </div>
        </>
    )

}
export default WordDisplay;