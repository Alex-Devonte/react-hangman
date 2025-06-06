function HangmanFigure({ wrongGuesses = 0 }) {
  return (
    <svg height="250" width="250" className="mx-auto mt-8 stroke-black">
      {/* Gallows */}
      <line x1="10" y1="240" x2="250" y2="240" strokeWidth="4" /> {/* base */}
      <line x1="40" y1="20" x2="40" y2="240" strokeWidth="4" /> {/* vertical */}
      <line x1="40" y1="20" x2="180" y2="20" strokeWidth="4" /> {/* top bar */}
      <line x1="180" y1="20" x2="180" y2="50" strokeWidth="4" /> {/* rope */}
      {/* Hangman parts */}
      {wrongGuesses > 0 && (
        // Head
        <circle cx="180" cy="70" r="20" strokeWidth="4" fill="none" />
      )}
      {wrongGuesses > 1 && (
        // Body
        <line x1="180" y1="90" x2="180" y2="150" strokeWidth="4" />
      )}
      {wrongGuesses > 2 && (
        // Left arm
        <line x1="180" y1="110" x2="160" y2="130" strokeWidth="4" />
      )}
      {wrongGuesses > 3 && (
        // Right arm
        <line x1="180" y1="110" x2="200" y2="130" strokeWidth="4" />
      )}
      {wrongGuesses > 4 && (
        // Left leg
        <line x1="180" y1="150" x2="160" y2="180" strokeWidth="4" />
      )}
      {wrongGuesses > 5 && (
        // Right leg
        <line x1="180" y1="150" x2="200" y2="180" strokeWidth="4" />
      )}
    </svg>
  );
}

export default HangmanFigure;
