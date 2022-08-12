import React from 'react';
import renderer from 'react-test-renderer';
import Gamebar, { getGameStateText } from '../Gamebar';

const getGameState = () => {
    return {
        inPlay: false,
        initialBet: false,
        houseWins: false,
        houseBust: false,
        playerWins: false,
        playerBust: false,
        tie: false,
        player: {
            isBlackJack: false,
        }
    };
}

it('should render Deal button undisabled when inPlay is false', () => {
    const tree = renderer.create(<Gamebar state={getGameState()} />).toJSON();
    expect(tree).toMatchSnapshot();
});

it("should return BLACKJACK! YOU WIN on player black jack & no tie", () => {
    expect(getGameStateText({
        ...getGameState(),
        tie: false,
        player: {
            isBlackJack: true,
        }
    })).toBe("BLACKJACK! YOU WIN");
});

it("should return TIE when tie", () => {
    expect(getGameStateText({ 
        ...getGameState(),
        tie: true 
    })).toBe("TIE");
});

it("should return DEAL CARDS when if not in play", () => {
    expect(getGameStateText(getGameState())).toBe("DEAL CARDS");
});

it("should return YOU WENT BUST on player bust", () => {
    expect(getGameStateText({ 
        ...getGameState(),
        playerBust: true 
    })).toBe("YOU WENT BUST, DEAL CARDS");
});

it("should return HOUSE WENT BUST on house bust", () => {
    expect(getGameStateText({ 
        ...getGameState(),
        houseBust: true 
    })).toBe("THE HOUSE WENT BUST, DEAL CARDS");
});

it("should return YOU WON on player win", () => {
    expect(getGameStateText({ 
        ...getGameState(),
        playerWins: true 
    })).toBe("YOU WON, DEAL CARDS");
});

it("should return HOUSE WON on house win", () => {
    expect(getGameStateText({ 
        ...getGameState(),
        houseWins: true 
    })).toBe("THE HOUSE WON, DEAL CARDS");
});

it("should return MAKE A BET on inital bet", () => {
    expect(getGameStateText({ 
        ...getGameState(),
        initialBet: true, 
        inPlay: true,
    })).toBe("MAKE A BET");
});

it("should return HIT, DOUBLE DOWN OR STAND", () => {
    expect(getGameStateText({ 
        ...getGameState(),
        initialBet: false,
        inPlay: true
    })).toBe("HIT, DOUBLE DOWN OR STAND");
});