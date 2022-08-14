import React, { useState } from 'react';
import Card from './components/Card/Card';
import Gamebar from './components/Gamebar/Gamebar';
import { dealRound, initialiseGame, playerBet, playerHit, playerStand, playerDoubleDown  } from './utils/BlackJack';
import './App.css';

// fix
export const renderHouseCards = (cards, showSecond) => {
  return cards.length > 0 ? (
    <>
      { <Card rank={cards[0].rank} symbol={cards[0].symbol} colour={cards[0].colour} /> }
      { showSecond ? 
          <Card rank={cards[1].rank} symbol={cards[1].symbol} clour={cards[1].colour} /> : 
          <div className="bg-slate-500 -ml-28 px-3 w-40 h-60 shadow-xl rounded-lg sm:m-2 sm:ml-0" /> 
      }
      { showSecond && cards.length === 3 ? 
          <Card rank={cards[2].rank} symbol={cards[2].symbol} clour={cards[2].colour} /> :
          <div className="bg-slate-500 -ml-28 px-3 w-40 h-60 shadow-xl rounded-lg sm:m-2 sm:ml-0" />
      }
    </>
  ) : (
    Array.from(Array(3).keys()).map(i => <div className="bg-slate-500 -ml-28 px-3 w-40 h-60 shadow-xl rounded-lg sm:m-2 sm:ml-0" />)
  ) 
}

// fix
export const renderPlayerCards = (cards) => {
  return cards.length > 0 ?( 
    <>
      { cards.map(card => <Card rank={card.rank} symbol={card.symbol} colour={card.colour} />) }
      { Array.from(Array(5 - cards.length).keys()).map(i => <div className="bg-slate-500 -ml-28 px-3 w-40 h-60 shadow-xl rounded-lg sm:m-2 sm:ml-0" /> ) }
    </>
  ) : (
    Array.from(Array(5).keys()).map(i => <div className="bg-slate-500 -ml-28 px-3 w-40 h-60 shadow-xl rounded-lg sm:m-2 sm:ml-0" /> )
  )
}

// mock these and just check that setState is being called
export const bet = (state, setState, amount) => setState(playerBet(state, amount));
export const hit = (state, setState) => setState(playerHit(state));
export const doubleDown = (state, setState) => setState(playerDoubleDown(state));
export const stand = (state, setState) => setState({ ...playerStand(state), showSecond: true });
export const deal = (state, setState) => setState(dealRound(state));
export const reset = (setState) => setState(initialiseGame());

function App() {
  const [state, setState] = useState(initialiseGame());
  return (
      <div className="w-screen overflow-x-hidden h-screen flex flex-col items-center bg-green-800 font-roboto">
        <div className="flex flex-col justify-evenly h-full max-w-7xl">
          <div className="flex translate-x-14 w-full justify-center md:transform-none">
            { renderHouseCards(state.house.cards, state.showSecond) }
          </div>


          <div className="flex items-center justify-center">
            <Gamebar 
              state={state} 
              setState={setState}
              bet={bet} 
              hit={hit} 
              doubleDown={doubleDown}
              stand={stand} 
              deal={deal}
              reset={reset}
            />
          </div>

          <div className="flex translate-x-14 w-full justify-center md:transform-none">
              { renderPlayerCards(state.player.cards) }
          </div>
        </div> 
    </div>  
  );
}

export default App;
