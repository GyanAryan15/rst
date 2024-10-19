// src/components/MoleHole.jsx
import React from 'react';

const MoleHole = ({ onClick, moleVisible }) => {
  return (
    <div
      className={`w-24 h-24 border border-gray-400 rounded relative flex items-center justify-center bg-green-300 m-2`}
      onClick={onClick}
    >
      {moleVisible && (
        <div className="absolute w-12 h-12 bg-brown rounded-full animate-bounce">
          <span role="img" aria-label="mole" className="text-4xl">
            🐹
          </span>
        </div>
      )}
    </div>
  );
};

export default MoleHole;
