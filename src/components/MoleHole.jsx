import React from 'react';

export default function MoleHole({ onClick, moleVisible }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        aspectRatio: '1',
        borderRadius: 'var(--radius-md)',
        background: 'var(--clr-surface)',
        border: `2px solid ${moleVisible ? '#fb923c' : 'var(--clr-border)'}`,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        overflow: 'hidden',
        cursor: moleVisible ? 'crosshair' : 'default',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: moleVisible ? '0 0 20px rgba(249,115,22,0.4)' : 'none',
      }}
    >
      {/* Dirt / hole visual */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        width: '80%',
        height: '30%',
        background: '#3b1e0a',
        borderRadius: '50% 50% 0 0',
        zIndex: 1,
      }} />

      {/* Mole */}
      {moleVisible && (
        <span
          className="mole-pop"
          style={{
            fontSize: '2.4rem',
            position: 'absolute',
            bottom: '15%',
            zIndex: 2,
            lineHeight: 1,
            userSelect: 'none',
          }}
          role="img"
          aria-label="mole"
        >
          🐹
        </span>
      )}
    </div>
  );
}