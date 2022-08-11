import { isEqual } from 'underscore';
import { 
    GAME_STATE, 
    createDeck, 
    shuffleDeck, 
    startGame,
    dealRound,
    playerBet, 
    playerHit, 
    calculateScore,
    playerStand,
    isBlackJack,
    isBust,
    calculateWin,
    clearCards,
    nextHand,
    showSecondCard
} from '../BlackJack';

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
        card.colour === 'text-rose-500' ? count.red += 1 : count.black += 1;
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

it("should start the game", () => {
    const state = createGameState();
    const start = startGame(state);
    expect(start.inPlay).toBe(true);
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
    // Pot will be 200 here as house matches player bet
    expect(betState.pot === 200).toBe(true);
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
   expect(calculateScore(cards)).toBe(16);
});

it("should calculate king, jack and queen score correctly", () => {
    const cards = [
         { rank: "J"},
         { rank: "K" },
         { rank: "Q" },
    ];
    expect(calculateScore(cards)).toBe(30);
 });

 it("should calculate score with ace when total is over 21", () => {
    const cards = [{ rank: "A"}, { rank: "K"}, { rank: "3"}];
    expect(calculateScore(cards)).toBe(14);
 });

it("should recognise a blackjack", () => {
    const cards = [{ rank: "A"}, { rank: "K" }];
    expect(isBlackJack(cards)).toBe(true);
});

it("should return true when a player's score is > 21", () => {
    const player = { score: 25 };
    expect(isBust(player)).toBe(true);
});

it("should return false when a player's score is > 21", () => {
    const player = { score: 1 };
    expect(isBust(player)).toBe(false);
});

it("should remove the cards from house/players hands and place at the bottom of the deck", () => {
    const state = createGameState();
    const cleared = clearCards({
        ...state,
        house: {
            ...state.house,
            deck: state.house.deck.slice(0, state.house.deck.length - 5),
            cards: [{ rank: "A"}, { rank: "K"}, { rank: "3"}]
        },
        player: {
            ...state.player,
            cards: [{ rank: "A"}, { rank: "K"}]
        },
    });
    expect(cleared.house.deck.length).toBe(52);
    expect(cleared.house.cards.length).toBe(0);
    expect(cleared.player.cards.length).toBe(0);
});

it("should set showSecond to true", () => {
    const state = createGameState();
    expect(state.house.showSecond).toBe(false);
    const second = showSecondCard(state);
    expect(second.house.showSecond).toBe(true);
});

it("should give players new cards & win variables to false", () => {
    const state = createGameState();
    const next = nextHand({
        ...state,
        initialBet: true,
        house: {
            ...state.house,
            isWin: false,
            isBust: true,
            cards: [{ rank: "A"}, { rank: "K"}, { rank: "3"}]
        },
        player: {
            ...state.player,
            isWin: true,
            isBust: false,
            cards: [{ rank: "A"}]
        },
    });
    expect(next.house.cards.length).toBe(2);
    expect(next.player.cards.length).toBe(2);
    expect(next.initialBet).toBe(false);
    expect(next.house.isBust).toBe(false);
    expect(next.player.isWin).toBe(false);
})







