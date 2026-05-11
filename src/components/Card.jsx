import React from 'react';

export default function Card({ card, handleFlip, flipped }) {
  return (
    <div
      className={`card-scene${flipped ? ' flipped' : ''}${card.matched ? ' matched' : ''}`}
      onClick={() => !card.matched && handleFlip(card)}
      style={{
        width: '100%',
        aspectRatio: '3 / 4',
        cursor: card.matched ? 'default' : 'pointer',
        borderRadius: 'var(--radius-md)',
      }}
      aria-label={flipped ? 'card face' : 'card back'}
    >
      <div className="card-inner">
        {/* Back face — shown when not flipped */}
        <div
          className="card-face"
          style={{
            background: 'linear-gradient(135deg, #4c1d95, #7c3aed)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #6d28d9',
          }}
        >
          <span style={{ fontSize: '1.8rem', opacity: 0.5 }}>🃏</span>
        </div>

        {/* Front face — shown when flipped */}
        <div
          className="card-face card-back"
          style={{
            border: card.matched ? '2px solid #a78bfa' : '2px solid var(--clr-border)',
            opacity: card.matched ? 0.75 : 1,
            transition: 'opacity 0.3s',
          }}
        >
          <img
            src={card.src}
            alt="card"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </div>
    </div>
  );
}