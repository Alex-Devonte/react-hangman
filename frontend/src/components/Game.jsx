import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import HangmanService from "../HangmanService";
import { useNavigate } from "react-router-dom";

function Game() {
  const defaultAttempts = 8;

  const [searchParams, setSearchParams] = useSearchParams();
  const [clickedLetters, setClickedLetters] = useState([]);
  const [word, setWord] = useState();
  const [dashes, setDashes] = useState([]);
  const [attempts, setAttempts] = useState(defaultAttempts);
  const [gameEnded, setGameEnded] = useState(false);
  const [gameOverMsg, setGameOverMsg] = useState("");

  const topic = searchParams.get("topic");
  const category = searchParams.get("category");
  const navigate = useNavigate();

  //Fetch word from backend and set it to a state variable
  const fetchWord = async () => {
    try {
      const wordData = await HangmanService.getWordFromCategory(category);
      //Turn word into array of letters
      setWord(wordData.toUpperCase().split(""));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWord();
  }, []);

  //Create dash array after word has been loaded
  useEffect(() => {
    let dashArr = [];
    //Create array with dashes for each letter
    if (word) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] === " ") {
          dashArr.push(" ");
        } else {
          dashArr.push("_");
        }
      }
    }
    setDashes(dashArr);
  }, [word]);

  //Check for game win/lose conditions
  useEffect(() => {
    if (!gameEnded && word) {
      if (attempts === 0) {
        setGameEnded(true);
        endGame(false);
      }
      if (checkWin(dashes, word)) {
        setGameEnded(true);
        endGame(true);
      }
    }
  }, [dashes, word, attempts, gameEnded]);

  const displayWordAsDashes = () => {
    return (
      <div className="flex justify-center gap-3 border p-2 md:w-3/4  lg:w-1/3">
        {dashes.map((dash, index) => (
          <p className="text-3xl font-bold" key={index}>
            {dash}
          </p>
        ))}
      </div>
    );
  };

  const displayKeyboard = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789"
      .toUpperCase()
      .split("");

    return (
      <div className="grid grid-cols-7 justify-items-center gap-2 p-2 md:mx-auto md:grid-cols-10 md:gap-4 lg:w-1/3">
        {alphabet.map((letter, index) => (
          <div
            key={index}
            className={`flex w-10 cursor-pointer items-center justify-center rounded-md border border-sky-950 bg-sky-200 p-3 shadow-md transition duration-75 hover:bg-sky-100 md:w-auto md:p-5 ${
              clickedLetters.includes(letter) || gameEnded
                ? "cursor-default bg-sky-950 text-sky-50 line-through opacity-40 hover:bg-sky-950"
                : ""
            }`}
            onClick={() => handleClick(letter)}
          >
            {letter}
          </div>
        ))}
      </div>
    );
  };

  const handleClick = (letter) => {
    //Add letter to clickedLetters array if it isn't there
    if (!gameEnded && !clickedLetters.includes(letter)) {
      setClickedLetters([...clickedLetters, letter]);
      checkLetter(letter);
    }
  };

  const checkLetter = (letter) => {
    let updatedDashes = [...dashes];
    let match = false;

    for (let i = 0; i < word.length; i++) {
      if (letter === word[i]) {
        updatedDashes[i] = word[i];
        match = true;
      }
    }
    //Update the dashes with letters if a match was found, otherwise subtract an attempt
    if (match) {
      setDashes(updatedDashes);
    } else {
      setAttempts(attempts - 1);
    }
  };

  const checkWin = (dashes, word) => {
    if (dashes.join("") === word.join("")) {
      return true;
    } else {
      return false;
    }
  };

  const endGame = (gameWon) => {
    setGameEnded(true);
    if (gameWon) {
      setGameOverMsg("Congrats! You win!");
    } else {
      setGameOverMsg("You lost");
      //Show the completed word
      setDashes(word);
    }
  };

  const reset = () => {
    setGameEnded(false);
    setAttempts(defaultAttempts);
    setClickedLetters([]);
    setDashes([]);
    fetchWord();
  };

  if (!word) {
    return <p>Loading . . . </p>;
  }

  return (
    <div className="flex flex-col items-center">
      <h1>Topic: {topic}</h1>
      <h1>Category: {category}</h1>
      <h1>Attempts Left: {attempts}</h1>
      {word && displayWordAsDashes()}
      <div className="sm:w-3/4">{displayKeyboard()}</div>
      {gameEnded && (
        <>
          <p>{gameOverMsg}</p>
          <button onClick={() => reset()}>
            Play again with word from: {category}
          </button>
          <button onClick={() => navigate("/")}>Choose new category</button>
        </>
      )}
    </div>
  );
}

export default Game;
