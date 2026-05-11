import React, { useEffect, useRef } from 'react';

/**
 * Matrix rain background — fills its parent container.
 * Tweakpane debug panel has been removed for the production build.
 * Customise the defaults below if needed.
 */
const DEFAULTS = {
  fps:     30,
  color:   '#06b6d4',   // cyan to match the Tic-Tac-Toe theme
  charset: '01アイウエオカキクケコ',
  size:    20,
};

export default function Matrix() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let drops    = [];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      drops = Array(Math.ceil(canvas.width / DEFAULTS.size)).fill(0);
    };

    const random = (str) => str[Math.floor(Math.random() * str.length)];

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = DEFAULTS.color;
      ctx.font      = `${DEFAULTS.size}px monospace`;

      drops = drops.map((y, i) => {
        ctx.fillText(random(DEFAULTS.charset), i * DEFAULTS.size, y);
        return y >= canvas.height || y >= 10000 * Math.random() ? 0 : y + DEFAULTS.size;
      });
    };

    window.addEventListener('resize', resize);
    resize();

    const interval = setInterval(draw, 1000 / DEFAULTS.fps);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'block',
        zIndex: 0,
      }}
    />
  );
}