import React from 'react';
import App, { renderHouseCards, renderPlayerCards } from './App';
import renderer from 'react-test-renderer';

const cards = [
    { rank: "K", symbol: "K", colour:"text-rose-500"}, 
    { rank: "K", symbol: "K", colour:"text-rose-500"}
];

it("should render", () => {
    const tree = renderer.create(<App />).toJSON();    
    expect(tree).toMatchSnapshot();
});

it("should only show one dealer card on secondShow is false", () => {
    const tree = renderer.create(renderHouseCards(cards)).toJSON();    
    expect(tree).toMatchSnapshot();
});

it("should render all house cards on secondShow", () => {
    const tree = renderer.create(renderHouseCards(cards, true)).toJSON();    
    expect(tree).toMatchSnapshot();
});

it("should render player cards", () => {
    const tree = renderer.create(renderPlayerCards(cards)).toJSON();    
    expect(tree).toMatchSnapshot();
});