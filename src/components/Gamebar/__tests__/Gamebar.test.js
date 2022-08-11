import React from 'react';
import renderer from 'react-test-renderer';
import Gamebar from '../Gamebar';

const gameState = {
    inPlay: false,
    initialBet: false,
    player: {
        isBust: false,
    },
    house: {
        isBust: false,
    }
}

it('should render bust text when player bust', () => {
    const tree = renderer.create(
        <Gamebar 
            state={{ ...gameState, player: { isBust: true }}} 
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
});

  it('should render bust text when house bust', () => {
    const tree = renderer.create(
        <Gamebar 
            state={{ ...gameState, inPlay: true, house: { isBust: true }}} 
        />
    ).toJSON();    
    expect(tree).toMatchSnapshot();
});

it('should render deal button when not in play', () => {
    const tree = renderer.create(
        <Gamebar 
            state={{ ...gameState, inPlay: false }} 
        />
    ).toJSON();    
    expect(tree).toMatchSnapshot();
});

it('should only render bet button on inital bet', () => {
    const tree = renderer.create(
        <Gamebar 
            state={{ ...gameState, inPlay: true, initalBet: true }} 
        />
    ).toJSON();    
    expect(tree).toMatchSnapshot();
});

it('should render all buttons when no players are bust, if a game is active and not an initial bet', () => {
    const tree = renderer.create(<Gamebar state={{...gameState, inPlay: true }} />).toJSON();
    expect(tree).toMatchSnapshot();
});

