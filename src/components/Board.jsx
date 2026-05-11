import React, { useState, useEffect } from 'react';
import Square from './Square';

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6],             // diagonals
];

function calculateWinner(squares) {
  for (const [a, b, c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

function getBestMove(squares) {
  const empty = squares.map((v, i) => v === null ? i : null).filter((v) => v !== null);
  if (!empty.length || calculateWinner(squares)) return null;

  let best = -Infinity, bestMove;
  for (const move of empty) {
    squares[move] = 'O';
    const score = minimax(squares, 0, false);
    squares[move] = null;
    if (score > best) { best = score; bestMove = move; }
  }
  return bestMove;
}

function minimax(squares, depth, isMax) {
  const result = calculateWinner(squares);
  if (result?.winner === 'O') return 10 - depth;
  if (result?.winner === 'X') return depth - 10;
  if (!squares.includes(null)) return 0;

  const empty = squares.map((v, i) => v === null ? i : null).filter((v) => v !== null);
  if (isMax) {
    let best = -Infinity;
    for (const m of empty) {
      squares[m] = 'O';
      best = Math.max(best, minimax(squares, depth + 1, false));
      squares[m] = null;
    }
    return best;
  } else {
    let best = Infinity;
    for (const m of empty) {
      squares[m] = 'X';
      best = Math.min(best, minimax(squares, depth + 1, true));
      squares[m] = null;
    }
    return best;
  }
}

export default function Board({ gameMode, difficulty }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const result   = calculateWinner(squares);
  const isDraw   = !result && !squares.includes(null);
  const isOver   = !!result || isDraw;

  // Computer move
  useEffect(() => {
    if (isOver || isXNext || gameMode !== 'vs-computer') return;
    const delay = setTimeout(() => {
      const newSquares = squares.slice();
      const move = difficulty === 'hard' ? getBestMove(newSquares) : randomMove(newSquares);
      if (move !== null && move !== undefined) {
        newSquares[move] = 'O';
        setSquares(newSquares);
        setIsXNext(true);
      }
    }, 350);
    return () => clearTimeout(delay);
  }, [isXNext, squares, gameMode, difficulty, isOver]);

  function randomMove(sq) {
    const empty = sq.map((v, i) => v === null ? i : null).filter((v) => v !== null);
    return empty[Math.floor(Math.random() * empty.length)];
  }

  const handleClick = (i) => {
    if (squares[i] || isOver) return;
    if (gameMode === 'vs-computer' && !isXNext) return; // wait for computer
    const next = squares.slice();
    next[i] = isXNext ? 'X' : 'O';
    setSquares(next);
    setIsXNext(!isXNext);
  };

  const reset = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  // Status message
  let statusText, statusColor;
  if (result) {
    const name = gameMode === 'vs-computer'
      ? result.winner === 'X' ? '🎉 You win!' : '🤖 Computer wins'
      : `🏆 Player ${result.winner} wins!`;
    statusText  = name;
    statusColor = result.winner === 'X' ? '#67e8f9' : '#f87171';
  } else if (isDraw) {
    statusText  = "🤝 It's a draw!";
    statusColor = '#fbbf24';
  } else {
    const whose = gameMode === 'vs-computer'
      ? isXNext ? 'Your turn (X)' : 'Computer thinking…'
      : `Player ${isXNext ? 'X' : 'O'}'s turn`;
    statusText  = whose;
    statusColor = '#a1a1aa';
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>
      {/* Status */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 700,
        fontSize: '1rem',
        color: statusColor,
        letterSpacing: '0.02em',
        minHeight: '1.5rem',
        transition: 'color 0.3s',
      }}>
        {statusText}
      </p>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
      }}>
        {squares.map((value, i) => (
          <Square
            key={i}
            value={value}
            onClick={() => handleClick(i)}
            highlight={result?.line?.includes(i)}
          />
        ))}
      </div>

      {/* Reset */}
      <button onClick={reset} className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
        Reset Game
      </button>
    </div>
  );
}