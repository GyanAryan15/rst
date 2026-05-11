import React, { useState } from 'react';
import Board from '../components/Board';
import CanvasBackground from '../components/Matrix';

export default function TicTacToe() {
  const [gameMode,   setGameMode]   = useState('2-player');
  const [difficulty, setDifficulty] = useState('easy');

  const selectStyle = {
    background: 'var(--clr-surface)',
    color: 'var(--clr-text)',
    border: '1.5px solid var(--clr-border)',
    borderRadius: 'var(--radius-sm)',
    padding: '0.4rem 0.8rem',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    cursor: 'pointer',
    outline: 'none',
  };

  const labelStyle = {
    color: 'var(--clr-muted)',
    fontSize: '0.85rem',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    marginBottom: '0.4rem',
    display: 'block',
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000' }}>
      {/* Animated matrix background */}
      <CanvasBackground />

      {/* Game panel */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        zIndex: 10,
      }}>
        <div style={{
          background: 'rgba(10, 10, 26, 0.88)',
          backdropFilter: 'blur(12px)',
          border: '1.5px solid #06b6d4',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem 2.5rem',
          boxShadow: '0 0 60px rgba(6,182,212,0.2)',
          maxWidth: '420px',
          width: '100%',
        }}>
          {/* Title */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.2rem',
            color: '#67e8f9',
            textAlign: 'center',
            marginBottom: '1.6rem',
            letterSpacing: '0.05em',
            textShadow: '0 0 20px rgba(6,182,212,0.6)',
          }}>
            Tic Tac Toe
          </h1>

          {/* Mode selector */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Game mode</label>
            <select
              value={gameMode}
              onChange={(e) => setGameMode(e.target.value)}
              style={selectStyle}
            >
              <option value="2-player">2 Players</option>
              <option value="vs-computer">vs Computer</option>
            </select>
          </div>

          {/* Difficulty — only shown in vs-computer mode */}
          {gameMode === 'vs-computer' && (
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                style={selectStyle}
              >
                <option value="easy">Easy</option>
                <option value="hard">Hard (Minimax)</option>
              </select>
            </div>
          )}

          {/* Board */}
          <Board gameMode={gameMode} difficulty={difficulty} />
        </div>
      </div>
    </div>
  );
}