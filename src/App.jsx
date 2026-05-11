import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home       from './pages/Home';
import TicTacToe  from './pages/TicTacToe';
import MemoryGame from './pages/MemoryGame';
import Mole       from './pages/Mole';

function App() {
  return (
    <Routes>
      <Route path="/"           element={<Home />}       />
      <Route path="/TicTacToe"  element={<TicTacToe />}  />
      <Route path="/MemoryGame" element={<MemoryGame />} />
      <Route path="/Mole"       element={<Mole />}       />
    </Routes>
  );
}

export default App;