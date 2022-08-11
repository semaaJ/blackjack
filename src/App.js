import React, { useState } from 'react';
import Card from './components/Card/Card';
import Gamebar from './components/Gamebar/Gamebar';
import { startGame, initialiseGame, playerBet, playerHit, playerStand, nextHand  } from './utils/BlackJack';
import Button from './components/Button/Button';

import './App.css';


function App() {
  const [state, setState] = useState(initialiseGame());

  const resetState = () => setState(initialiseGame())

  const start = () => setState(startGame(state));
  const bet = (amount) => setState(playerBet(state, 100));
  const hit = () => setState(playerHit(state));
  const stand = () => setState(playerStand(state));
  const next = () => setState(nextHand(state));  

  const firstCard = state.house.cards[0];

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-slate-700">
        <div className="flex flex-col justify-evenly h-full max-w-7xl">
          <div className="flex justify-center">
            { firstCard ? (
              <Card rank={firstCard.rank} symbol={firstCard.symbol} colour={firstCard.colour} />
            ) :(
               Array.from(Array(3 - state.house.cards.length).keys()).map(i =>         
                <div className="cursor-pointer border-2 border-gray-800 px-3 shadow-xl ring-1 ring-gray-900/5 w-40 h-60 m-4" /> )
              )
            }
          </div>

          <div className="flex items-center justify-center">
            <Gamebar 
              start={start} 
              bet={bet} 
              hit={hit} 
              stand={stand} 
              next={next}
              state={state} 
            />
          </div>
          <Button onClick={resetState} />

          <div className="flex justify-center">
            { state.player.cards.map(card => <Card rank={card.rank} symbol={card.symbol} colour={card.colour} />) }
            { Array.from(Array(5 - state.player.cards.length).keys()).map(i =>  
              <div className="cursor-pointer border-2 border-gray-800 px-3 shadow-xl ring-1 ring-gray-900/5 w-40 h-60 m-4" /> )
            }
          </div>
        </div> 
    </div>
  );
}

export default App;
