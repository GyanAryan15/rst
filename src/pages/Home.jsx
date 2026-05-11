import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const GAMES = [
  {
    to: '/TicTacToe',
    label: 'Tic Tac Toe',
    emoji: '⭕',
    description: 'Classic 3×3 strategy battle',
    accent: '#06b6d4',
    glow: 'rgba(6,182,212,0.35)',
    tag: '2 players or vs AI',
  },
  {
    to: '/MemoryGame',
    label: 'Memory Game',
    emoji: '🃏',
    description: 'Flip cards and find the pairs',
    accent: '#8b5cf6',
    glow: 'rgba(139,92,246,0.35)',
    tag: 'Solo challenge',
  },
  {
    to: '/Mole',
    label: 'Whack-a-Mole',
    emoji: '🔨',
    description: 'Smash as many moles as you can',
    accent: '#f97316',
    glow: 'rgba(249,115,22,0.35)',
    tag: '30-second sprint',
  },
];

function GameCard({ to, label, emoji, description, accent, glow, tag, delay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={to}
      style={{ textDecoration: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="fade-in"
        style={{
          animationDelay: delay,
          background: hovered ? accent : 'var(--clr-surface)',
          border: `1.5px solid ${hovered ? accent : 'var(--clr-border)'}`,
          borderRadius: 'var(--radius-lg)',
          padding: '2rem 1.5rem',
          cursor: 'pointer',
          transition: 'all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: hovered ? 'translateY(-7px) scale(1.03)' : 'translateY(0) scale(1)',
          boxShadow: hovered ? `0 20px 48px ${glow}` : '0 2px 12px rgba(0,0,0,0.25)',
          textAlign: 'center',
          userSelect: 'none',
        }}
      >
        <div style={{
          fontSize: '3.2rem',
          lineHeight: 1,
          marginBottom: '0.9rem',
          transition: 'transform 0.22s',
          transform: hovered ? 'scale(1.25) rotate(-6deg)' : 'scale(1) rotate(0deg)',
        }}>
          {emoji}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.4rem',
          letterSpacing: '0.02em',
          marginBottom: '0.35rem',
          color: hovered ? '#fff' : 'var(--clr-text)',
          transition: 'color 0.2s',
        }}>
          {label}
        </h2>

        <p style={{
          fontSize: '0.875rem',
          color: hovered ? 'rgba(255,255,255,0.8)' : 'var(--clr-muted)',
          marginBottom: '0.6rem',
          transition: 'color 0.2s',
        }}>
          {description}
        </p>

        <span style={{
          display: 'inline-block',
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          padding: '3px 12px',
          borderRadius: '999px',
          background: hovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)',
          color: hovered ? '#fff' : 'var(--clr-muted)',
          marginBottom: '1.2rem',
          transition: 'all 0.2s',
        }}>
          {tag}
        </span>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span style={{
            padding: '0.45rem 1.6rem',
            borderRadius: '999px',
            fontSize: '0.88rem',
            fontWeight: 700,
            background: hovered ? 'rgba(255,255,255,0.22)' : accent,
            color: '#fff',
            border: hovered ? '1.5px solid rgba(255,255,255,0.4)' : '1.5px solid transparent',
            transition: 'all 0.2s',
            boxShadow: hovered ? 'none' : `0 4px 16px ${glow}`,
          }}>
            Play →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 60); }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 30% 20%, #1a1a3e 0%, var(--clr-bg) 60%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
    }}>
      <div className={loaded ? 'fade-in' : ''} style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ fontSize: '3.8rem', lineHeight: 1, marginBottom: '0.6rem' }}>🎮</div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.2rem, 7vw, 3.6rem)',
          background: 'linear-gradient(135deg, #06b6d4, #8b5cf6, #f97316)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '0.03em',
          lineHeight: 1.1,
          marginBottom: '0.5rem',
        }}>
          Game Arcade
        </h1>
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--clr-muted)',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}>
          Pick a game · start playing
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '1.25rem',
        width: '100%',
        maxWidth: '820px',
      }}>
        {GAMES.map((game, i) => (
          <GameCard key={game.to} {...game} delay={`${i * 0.1 + 0.1}s`} />
        ))}
      </div>

      <p style={{
        marginTop: '3rem',
        fontSize: '0.78rem',
        color: 'var(--clr-border)',
        fontWeight: 600,
        letterSpacing: '0.06em',
      }}>
        3 GAMES · ENDLESS FUN
      </p>
    </div>
  );
}