import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Game() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [clickedLetters, setClickedLetters] = useState([]);

  const topic = searchParams.get("topic");
  const category = searchParams.get("category");

  const handleClick = (letter) => {
    //Add letter to clickedLetters array if it isn't there
    if (!clickedLetters.includes(letter)) {
      setClickedLetters([...clickedLetters, letter]);
    }
  };

  const displayKeyboard = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789"
      .toUpperCase()
      .split("");

    return (
      <div className="grid grid-cols-7 justify-items-center gap-2 p-2 md:mx-auto md:w-3/4 md:grid-cols-10 md:gap-4 lg:w-1/3">
        {alphabet.map((letter, index) => (
          <div
            key={index}
            className={`flex w-10 cursor-pointer items-center justify-center rounded-md border border-sky-950 bg-sky-200 p-3 shadow-md transition duration-75 hover:bg-sky-100 md:w-auto md:p-5 ${
              clickedLetters.includes(letter)
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

  return (
    <div className="flex flex-col items-center">
      <h1>Topic: {topic}</h1>
      <h1>Category: {category}</h1>
      <div className="sm:w-3/4">{displayKeyboard()}</div>
    </div>
  );
}

export default Game;
