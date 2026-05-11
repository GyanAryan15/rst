import React from 'react';

export default function Square({ value, onClick, highlight }) {
  const color = value === 'X' ? '#67e8f9' : '#f87171';

  return (
    <button
      onClick={onClick}
      style={{
        width: '88px',
        height: '88px',
        background: highlight
          ? 'rgba(6,182,212,0.15)'
          : value
            ? 'rgba(255,255,255,0.04)'
            : 'rgba(255,255,255,0.02)',
        border: `2px solid ${highlight ? '#06b6d4' : 'rgba(6,182,212,0.35)'}`,
        borderRadius: 'var(--radius-md)',
        fontSize: '2.2rem',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        color: value ? color : 'transparent',
        cursor: value ? 'default' : 'pointer',
        transition: 'background 0.2s, border-color 0.2s, transform 0.1s',
        transform: highlight ? 'scale(1.05)' : 'scale(1)',
        boxShadow: highlight ? '0 0 18px rgba(6,182,212,0.4)' : 'none',
      }}
      aria-label={value ? `Square ${value}` : 'Empty square'}
    >
      {value}
    </button>
  );
}