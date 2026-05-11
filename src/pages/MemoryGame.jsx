import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';
import img7 from '../assets/img7.png';
import img8 from '../assets/img8.png';

const BASE_IMAGES = [
  { src: img1, matched: false },
  { src: img2, matched: false },
  { src: img3, matched: false },
  { src: img4, matched: false },
  { src: img7, matched: false },
  { src: img8, matched: false },
];

function shuffle(arr) {
  return [...arr, ...arr]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: crypto.randomUUID(), matched: false }));
}

export default function MemoryGame() {
  const [cards, setCards]             = useState([]);
  const [flipped, setFlipped]         = useState([]);   // at most 2 cards
  const [disabled, setDisabled]       = useState(false);
  const [moves, setMoves]             = useState(0);
  const [bestScore, setBestScore]     = useState(() => {
    const saved = localStorage.getItem('memoryBest');
    return saved ? parseInt(saved) : null;
  });

  const startGame = () => {
    setCards(shuffle(BASE_IMAGES));
    setFlipped([]);
    setDisabled(false);
    setMoves(0);
  };

  useEffect(() => { startGame(); }, []);

  // Check for a match whenever two cards are flipped
  useEffect(() => {
    if (flipped.length < 2) return;

    setDisabled(true);
    const [a, b] = flipped;

    if (a.src === b.src) {
      setCards((prev) =>
        prev.map((c) => c.src === a.src ? { ...c, matched: true } : c)
      );
      resetTurn();
    } else {
      setTimeout(resetTurn, 900);
    }
  }, [flipped]);

  // Save best score when all cards are matched
  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.matched)) {
      const current = moves + 1; // +1 for the last matching move
      if (!bestScore || current < bestScore) {
        setBestScore(current);
        localStorage.setItem('memoryBest', current);
      }
    }
  }, [cards]);

  const resetTurn = () => {
    setFlipped([]);
    setDisabled(false);
    setMoves((m) => m + 1);
  };

  const handleFlip = (card) => {
    if (disabled || card.matched) return;
    if (flipped.length === 1 && flipped[0].id === card.id) return; // same card
    setFlipped((prev) => [...prev, card]);
  };

  const matchedCount = cards.filter((c) => c.matched).length / 2;
  const totalPairs   = BASE_IMAGES.length;
  const allMatched   = matchedCount === totalPairs;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 60% 10%, #1e0a3c 0%, var(--clr-bg) 65%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
    }}>
      {/* Header */}
      <div className="fade-in" style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
          color: '#a78bfa',
          letterSpacing: '0.04em',
          marginBottom: '0.3rem',
        }}>
          🃏 Memory Game
        </h1>
        <p style={{ color: 'var(--clr-muted)', fontSize: '0.9rem' }}>
          Match all {totalPairs} pairs to win!
        </p>
      </div>

      {/* Stats row */}
      <div className="fade-in" style={{
        display: 'flex',
        gap: '1.2rem',
        marginBottom: '1.8rem',
        animationDelay: '0.1s',
      }}>
        {[
          { label: 'Moves',   value: moves },
          { label: 'Matched', value: `${matchedCount} / ${totalPairs}` },
          ...(bestScore ? [{ label: 'Best', value: bestScore }] : []),
        ].map(({ label, value }) => (
          <div key={label} style={{
            background: 'var(--clr-surface)',
            border: '1.5px solid var(--clr-border)',
            borderRadius: 'var(--radius-md)',
            padding: '0.6rem 1.2rem',
            textAlign: 'center',
            minWidth: '80px',
          }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#a78bfa' }}>{value}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--clr-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Card grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '0.85rem',
        maxWidth: '520px',
        width: '100%',
      }}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleFlip={handleFlip}
            flipped={flipped.some((f) => f.id === card.id) || card.matched}
          />
        ))}
      </div>

      {/* Win banner */}
      {allMatched && (
        <div className="fade-in" style={{
          marginTop: '2rem',
          background: 'linear-gradient(135deg, #4c1d95, #7c3aed)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem 2.5rem',
          textAlign: 'center',
          boxShadow: '0 12px 40px rgba(139,92,246,0.45)',
        }}>
          <div style={{ fontSize: '2.5rem' }}>🎉</div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#fff' }}>
            You won in {moves} moves!
          </p>
          {bestScore === moves && (
            <p style={{ color: '#fde68a', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              ⭐ New best score!
            </p>
          )}
        </div>
      )}

      {/* Restart button */}
      <button
        onClick={startGame}
        className="btn btn-violet fade-in"
        style={{ marginTop: '2rem', animationDelay: '0.2s' }}
      >
        🔄 New Game
      </button>
    </div>
  );
}