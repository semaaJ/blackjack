import React, { useState } from 'react';
import Card from './components/Card/Card';
import Gamebar from './components/Gamebar/Gamebar';
import { startGame, initialiseGame, playerBet, playerHit, playerStand, nextHand, playerDoubleDown  } from './utils/BlackJack';
import './App.css';

export const renderHouseCards = (cards, showSecond) => {
  return cards[0] ? (
    <>
      { !showSecond && <Card rank={cards[0].rank} symbol={cards[0].symbol} colour={cards[0].colour} /> }
      { showSecond && cards.map(c => <Card rank={c.rank} symbol={c.symbol} clour={c.colour} />)}
    </>
  ) : (
    Array.from(Array(3).keys()).map(i => <div className="border-2 border-gray-800 px-3 shadow-xl ring-1 ring-gray-900/5 w-40 h-60 m-2" /> )
  ) 
}

export const renderPlayerCards = (cards) => {
  return (
    <>
      { cards.map(card => <Card rank={card.rank} symbol={card.symbol} colour={card.colour} />) }
      { Array.from(Array(5 - cards.length).keys()).map(i =>  
        <div className="border-2 border-gray-800 px-3 shadow-xl ring-1 ring-gray-900/5 w-40 h-60 m-2" /> )
      }
    </>
  )
}

export const bet = (state, setState, amount) => setState(playerBet(state, amount));
export const hit = (state, setState) => setState(playerHit(state));
export const doubleDown = (state, setState) => setState(playerDoubleDown(state));
export const stand = (state, setState) => {
  setState({ ...state, showSecond: true });
  setState(playerStand(state));
}
export const next = (state, setState) => {
  if (!state.inPlay) setState(startGame(state))
  else setState(nextHand(state, state.showSecond));  
}

function App() {
  const [state, setState] = useState(initialiseGame());
  
  return (
    <div className="w-screen h-screen flex flex-col items-center bg-slate-700">
        <div className="flex flex-col justify-evenly h-full max-w-7xl">
          <div className="flex justify-center">
            { renderHouseCards(state.house.cards, state.showSecond) }
          </div>

          <div className="flex items-center justify-center">
            <Gamebar 
              bet={bet} 
              hit={hit} 
              doubleDown={doubleDown}
              stand={stand} 
              next={next}
              state={state} 
              setState={setState}
            />
          </div>

          <div className="flex justify-center">
            { renderPlayerCards(state.player.cards) }
          </div>
        </div> 
    </div>
  );
}

export default App;
