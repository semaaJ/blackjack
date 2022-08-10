import React, { useState } from 'react';
import { initialiseGame, dealRound, playerBet, playerHit } from './BlackJack';
import './App.css';

function App() {
  const [state, setState] = useState(initialiseGame());

  const init = () => setState(dealRound(state));
  const bet = (amount) => setState(playerBet(state, 100));
  const hit = () =>   setState(playerHit(state));

  return (
    <div className="w-screen h-screen bg-slate-700">
      
    </div>
  );
}

export default App;
