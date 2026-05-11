import React, { useState, useEffect, useCallback } from 'react';
import MoleHole from '../components/MoleHole';

const TOTAL_HOLES  = 9;
const GAME_SECONDS = 30;

export default function Mole() {
  const [moleIndex,    setMoleIndex]    = useState(null);
  const [score,        setScore]        = useState(0);
  const [timeLeft,     setTimeLeft]     = useState(GAME_SECONDS);
  const [isActive,     setIsActive]     = useState(false);
  const [hasStarted,   setHasStarted]   = useState(false);
  const [highScore,    setHighScore]    = useState(() => {
    const saved = localStorage.getItem('moleHighScore');
    return saved ? parseInt(saved) : 0;
  });

  // Move the mole every second while game is active
  useEffect(() => {
    if (!isActive) return;
    const id = setInterval(() => {
      setMoleIndex(Math.floor(Math.random() * TOTAL_HOLES));
    }, 800);
    return () => clearInterval(id);
  }, [isActive]);

  // Count down the timer
  useEffect(() => {
    if (!isActive) return;
    if (timeLeft <= 0) {
      setIsActive(false);
      setMoleIndex(null);
      return;
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [isActive, timeLeft]);

  const handleWhack = useCallback((index) => {
    if (!isActive || index !== moleIndex) return;
    setScore((s) => s + 1);
    setMoleIndex(null); // mole ducks back immediately
  }, [isActive, moleIndex]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_SECONDS);
    setIsActive(true);
    setHasStarted(true);
    setMoleIndex(null);
  };

  // Save high score when game ends
  useEffect(() => {
    if (hasStarted && !isActive && timeLeft === 0) {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('moleHighScore', score);
      }
    }
  }, [isActive]);

  const timerPct  = (timeLeft / GAME_SECONDS) * 100;
  const timerColor = timeLeft > 10 ? '#10b981' : timeLeft > 5 ? '#f59e0b' : '#ef4444';
  const gameOver  = hasStarted && !isActive && timeLeft === 0;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 50% 0%, #1a2e1a 0%, var(--clr-bg) 65%)',
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
          color: '#fb923c',
          letterSpacing: '0.04em',
          marginBottom: '0.3rem',
        }}>
          🔨 Whack-a-Mole
        </h1>
        <p style={{ color: 'var(--clr-muted)', fontSize: '0.9rem' }}>
          Hit as many moles as you can in {GAME_SECONDS} seconds!
        </p>
      </div>

      {/* Stats */}
      <div className="fade-in" style={{
        display: 'flex',
        gap: '1.2rem',
        marginBottom: '1.5rem',
        animationDelay: '0.1s',
      }}>
        {[
          { label: 'Score',      value: score },
          { label: 'Best',       value: highScore },
          { label: 'Time Left',  value: `${timeLeft}s`, color: timerColor },
        ].map(({ label, value, color }) => (
          <div key={label} style={{
            background: 'var(--clr-surface)',
            border: '1.5px solid var(--clr-border)',
            borderRadius: 'var(--radius-md)',
            padding: '0.6rem 1.2rem',
            textAlign: 'center',
            minWidth: '80px',
          }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: color || '#fb923c' }}>{value}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--clr-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Timer bar */}
      {hasStarted && (
        <div style={{
          width: '100%',
          maxWidth: '420px',
          height: '6px',
          background: 'var(--clr-border)',
          borderRadius: '999px',
          marginBottom: '1.5rem',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${timerPct}%`,
            background: timerColor,
            borderRadius: '999px',
            transition: 'width 1s linear, background 0.4s',
          }} />
        </div>
      )}

      {/* Mole grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        maxWidth: '420px',
        width: '100%',
        marginBottom: '2rem',
      }}>
        {Array.from({ length: TOTAL_HOLES }).map((_, i) => (
          <MoleHole
            key={i}
            onClick={() => handleWhack(i)}
            moleVisible={i === moleIndex}
          />
        ))}
      </div>

      {/* Game-over banner */}
      {gameOver && (
        <div className="fade-in" style={{
          background: 'linear-gradient(135deg, #431407, #c2410c)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem 2.5rem',
          textAlign: 'center',
          marginBottom: '1.5rem',
          boxShadow: '0 12px 40px rgba(249,115,22,0.4)',
        }}>
          <div style={{ fontSize: '2.5rem' }}>⏰</div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#fff' }}>
            Time's up! You scored {score}
          </p>
          {score > 0 && score === highScore && (
            <p style={{ color: '#fde68a', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              ⭐ New high score!
            </p>
          )}
        </div>
      )}

      {/* Start / Play again button */}
      <button onClick={startGame} className="btn btn-orange fade-in" style={{ animationDelay: '0.2s' }}>
        {hasStarted ? '🔄 Play Again' : '▶ Start Game'}
      </button>
    </div>
  );
}