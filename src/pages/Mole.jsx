
import React, { useState, useEffect } from 'react';
import MoleHole from '../components/MoleHole';

const Mole = () => {
  const [moleIndex, setMoleIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // Set the time limit to 30 seconds
  const holes = Array.from({ length: 9 });
  const [isGameActive, setIsGameActive] = useState(true); // Track if the game is active

  useEffect(() => {
    const interval = setInterval(() => {
      if (isGameActive) {
        const randomIndex = Math.floor(Math.random() * holes.length);
        setMoleIndex(randomIndex);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameActive]);

  useEffect(() => {
    if (timeLeft > 0 && isGameActive) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsGameActive(false); // Stop the game when time is up
    }
  }, [timeLeft, isGameActive]);

  const handleClick = (index) => {
    if (index === moleIndex && isGameActive) {
      setScore((prevScore) => prevScore + 1);
      setMoleIndex(null);
    }
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(30); // Reset the time to 30 seconds
    setIsGameActive(true); // Restart the game
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl mt-10 mb-4">Whack-a-Mole</h1>
      <p className="text-xl mb-4">Score: {score}</p>
      <p className="text-xl mb-4">Time Left: {timeLeft}s</p>
      <div className="grid grid-cols-3">
        {holes.map((_, index) => (
          <MoleHole
            key={index}
            onClick={() => handleClick(index)}
            moleVisible={index === moleIndex}
          />
        ))}
      </div>
      {!isGameActive && (
        <div className="mt-4">
          <h2 className="text-2xl">Time's up!</h2>
          <button
            onClick={resetGame}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Mole;
