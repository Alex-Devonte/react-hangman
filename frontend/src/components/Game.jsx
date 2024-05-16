import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import HangmanService from "../HangmanService";
import { useNavigate, Link } from "react-router-dom";

function Game() {
  const defaultAttempts = 8;

  const [searchParams, setSearchParams] = useSearchParams();
  const [clickedLetters, setClickedLetters] = useState([]);
  const [word, setWord] = useState();
  const [dashes, setDashes] = useState([]);
  const [attempts, setAttempts] = useState(defaultAttempts);
  const [gameEnded, setGameEnded] = useState(false);
  const [gameOverMsg, setGameOverMsg] = useState("");

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
      <div className="flex w-11/12 flex-wrap justify-center gap-3 border p-2 md:w-3/4 md:gap-5 lg:w-1/3">
        {dashes.map((dash, index) => (
          <p className="text-3xl font-bold md:text-4xl" key={index}>
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
      setGameOverMsg("You lost!");
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
      <div className="mb-5 w-full bg-sky-950 p-5 text-sky-50">
        <Link
          to="/"
          className="text-3xl font-bold text-sky-50 hover:text-sky-200"
        >
          React Hangman
        </Link>
      </div>
      <div className="mb-5 text-center">
        <p className="mb-2 text-xl">
          Attempts Left: <span className="font-bold">{attempts}</span>
        </p>
        <h3 className="bg-sky-200 p-2 text-xl font-bold text-sky-950">
          {category}
        </h3>
      </div>
      {word && displayWordAsDashes()}
      <div className="mt-5 sm:w-3/4">{displayKeyboard()}</div>
      {gameEnded && (
        <div className="my-10 flex flex-col items-center gap-5 rounded-xl bg-sky-950 p-10 text-sky-50 shadow-2xl">
          <p className="text-2xl font-bold">{gameOverMsg}</p>
          <button
            className="w-full rounded-md bg-sky-200 p-3 font-bold text-sky-950 shadow-md transition duration-100 hover:bg-sky-800 hover:text-sky-50 active:bg-sky-500 disabled:opacity-55 disabled:hover:bg-sky-200 disabled:hover:text-black md:col-auto"
            onClick={() => reset()}
          >
            Play again with word from: {category}
          </button>
          <button
            className="w-full rounded-md bg-sky-200 p-3 font-bold text-sky-950 shadow-md transition duration-100 hover:bg-sky-800 hover:text-sky-50 active:bg-sky-500 disabled:opacity-55 disabled:hover:bg-sky-200 disabled:hover:text-black md:col-auto"
            onClick={() => navigate("/")}
          >
            Choose new category
          </button>
        </div>
      )}
    </div>
  );
}

export default Game;
