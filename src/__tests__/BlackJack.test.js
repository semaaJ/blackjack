import { isEqual } from 'underscore';
import { GAME_STATE, createDeck, shuffleDeck, dealRound, playerBet, playerHit, calculateScore } from '../BlackJack';

const createGameState = () => {
    const deck = createDeck();
    return {
        ...GAME_STATE,
        house: {
            ...GAME_STATE.house,
            deck: deck
        }
    }
}

it("should create the deck succesfully", () => {
    const count = {
        red: 0,
        black: 0,
        heart: 0,
        diamond: 0,
        spade: 0,
        club: 0
    }
    const deck = createDeck();
    expect(deck.length).toBe(52);

    deck.forEach(card => {
        card.colour === 'red' ? count.red += 1 : count.black += 1;
        count[card.name] += 1
    });

    expect(count.black).toBe(26);
    expect(count.red).toBe(26);
    expect(count.heart).toBe(13);
    expect(count.diamond).toBe(13);
    expect(count.spade).toBe(13);
    expect(count.club).toBe(13);
});

it("should shuffle the deck", () => {
    const deck = createDeck();
    const clone = Object.assign({}, deck);
    shuffleDeck(clone);
    expect(isEqual(deck, clone)).toBe(false);
});

it("should deal two cards to the house and player on dealers round", () => {
    const state = createGameState();
    const dealState = dealRound(state);
    expect(dealState.house.cards.length).toBe(2);
    expect(dealState.player.cards.length ).toBe(2);
    expect(dealState.house.deck.length ).toBe(48);
});

it("should allow the player to bet & remove from their balance", () => {
    const betState = playerBet(GAME_STATE, 100);
    expect(betState.pot === 100).toBe(true);
    expect(betState.player.bank === 900).toBe(true);
});

it("should allow the player to hit", () => {
    const state = createGameState();
    const hitState = playerHit(state);
    expect(hitState.player.cards.length).toBe(1);
});

it("should calculate basic score", () => {
   const cards = [
        { rank: "3"},
        { rank: "4" },
        { rank: "9" },
   ];
   expect(calculateScore(cards)).toBe(16)
});

it("should calculate king, jack and queen score correctly", () => {
    const cards = [
         { rank: "J"},
         { rank: "K" },
         { rank: "Q" },
    ];
    expect(calculateScore(cards)).toBe(30)
 });

 it("should calculate ace score", () => {
    const cards = [{ rank: "A"}];
    expect(calculateScore(cards)).toBe(11)
 });