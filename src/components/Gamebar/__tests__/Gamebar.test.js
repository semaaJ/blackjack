import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, screen } from '@testing-library/react';
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

it('should call deal on deal button click', () => {
    const mock = jest.fn();
    render(<Gamebar deal={mock} state={getGameState()} />);
    fireEvent.click(screen.getByText("DEAL"));
    expect(mock).toHaveBeenCalled()
});

it('should call hit on hit button click', () => {
    const mock = jest.fn();
    render(<Gamebar hit={mock} state={getGameState()} />);
    fireEvent.click(screen.getByText("HIT"));
    expect(mock).toHaveBeenCalled()
});

it('should call doubleDown on doubleDown button click', () => {
    const mock = jest.fn();
    render(<Gamebar doubleDown={mock} state={getGameState()} />);
    fireEvent.click(screen.getByText("DOUBLE DOWN"));
    expect(mock).toHaveBeenCalled()
});

it('should call stand on stand button click', () => {
    const mock = jest.fn();
    render(<Gamebar stand={mock} state={getGameState()} />);
    fireEvent.click(screen.getByText("STAND"));
    expect(mock).toHaveBeenCalled()
});

it('should call reset on reset button click', () => {
    const mock = jest.fn();
    render(<Gamebar reset={mock} state={{ ...getGameState(), inPlay: true }} />);
    fireEvent.click(screen.getByText("RESTART"));
    expect(mock).toHaveBeenCalled()
});

it('should call bet on chip click when in play', () => {
    const mock = jest.fn();
    render(<Gamebar bet={mock} state={{ ...getGameState(), inPlay: true, initialBet: true }} />);
    fireEvent.click(screen.getByAltText("Chip 5 value"));
    expect(mock).toHaveBeenCalled()
});

it('should display confetti on player win', () => {
    const tree = renderer.create(<Gamebar state={{ ...getGameState(), playerWins: true, house: { score: 0 }, player: { score: 21 } }} />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('should render Deal button undisabled when inPlay is false', () => {
    const tree = renderer.create(<Gamebar state={getGameState()} />).toJSON();
    expect(tree).toMatchSnapshot();
});

it("should return PLAYER BLACKJACK! YOU WIN on player black jack & no tie", () => {
    expect(getGameStateText({
        ...getGameState(),
        tie: false,
        blackJack: true,
        playerWins: true,
    })).toBe("PLAYER BLACKJACK! YOU WIN");
});

it("should return TIE when tie", () => {
    expect(getGameStateText({ 
        ...getGameState(),
        tie: true 
    })).toBe("TIE");
});

it("should return TIE when both players have a black jack", () => {
    expect(getGameStateText({ 
        ...getGameState(),
        blackJack: true,
        tie: true 
    })).toBe("TIE, BOTH THE HOUSE AND PLAYER HAVE A BLACK JACK!");
});

it("should return HOUSE BLACKJACK when house has a blackjack", () => {
    expect(getGameStateText({ 
        ...getGameState(),
        inPlay: true,
        blackJack: true,
        houseWins: true,
    })).toBe("HOUSE BLACKJACK! YOU LOSE");
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