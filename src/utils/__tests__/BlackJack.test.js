import { isEqual } from 'underscore';
import { 
    GAME_STATE, 
    createDeck, 
    shuffleDeck, 
    dealRound,
    playerBet, 
    playerHit, 
    calculateScore,
    playerStand,
    isBlackJack,
    isBust,
    makeMove,
    resetDeck,
    showSecondCard,
    playerDoubleDown
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

it("should reset the deck", () => {
    const state = createGameState();
    const resetState = resetDeck(state);
    expect(isEqual(state, resetState)).toBe(false);
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

it("should allow the player to hit and reset deck if < 4", () => {
    const state = createGameState();
    const hitState = playerHit({
        ...state,
        house: {
            ...state.house,
            deck: [{}, {}, {}]
        }
    });
    expect(hitState.house.deck.length).toBe(51);
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

 it("should calculate score with two aces correctly", () => {
    const cards = [{ rank: "A"}, { rank: "A"}];
    expect(calculateScore(cards)).toBe(12);
 });

it("should return true on blackjack", () => {
    const cards = [{ rank: "A"}, { rank: "K" }];
    expect(isBlackJack(cards)).toBe(true);
});

it("should return false on !blackjack", () => {
    const cards = [{ rank: "9"}, { rank: "1" }, { rank: "1" }];
    expect(isBlackJack(cards)).toBe(false);
});

it("should return true when a player's score is > 21", () => expect(isBust(25)).toBe(true));

it("should return false when a player's score is > 21", () => expect(isBust(1)).toBe(false));

it("should set showSecond to true", () => {
    const state = createGameState();
    expect(state.house.showSecond).toBe(false);
    const second = showSecondCard(state);
    expect(second.house.showSecond).toBe(true);
});

it("should allow a player to win on stand if house bust", () => {
    const state = createGameState();
    const standState = playerStand({
        ...state,
        pot: 100,
        player: {
            ...state.player,
            cards: [{ rank: "K", rank: "A"}]
        },
        house: {
            ...state.house,
            cards: [{ rank: "K" }, { rank: "9"}, { rank: "9"} ]
        }
    });
    expect(standState.playerWins).toBe(true);
    expect(standState.player.bank).toBe(1200);
});

it("should pull a new card from the deck on stand when house score < 17", () => {
    const state = createGameState();
    const standState = playerStand({
        ...state,
        pot: 100,
        player: {
            ...state.player,
            cards: [{ rank: "K", rank: "A"}]
        },
        house: {
            ...state.house,
            cards: [{ rank: "2" }, { rank: "9"} ]
        }
    });
    expect(standState.house.cards.length).toBe(3);
});

it("should allow a player to win  on stand when their score is closer to 21 than houses", () => {
    const state = createGameState();
    const standState = playerStand({
        ...state,
        pot: 100,
        player: {
            ...state.player,
            score: 20,
            cards: [{ rank: "K", rank: "10"}]
        },
        house: {
            ...state.house,
            score: 19,
            cards: [{ rank: "10" }, { rank: "9"} ]
        }
    });
    expect(standState.playerWins).toBe(true);
});

it("should allow house to win  on stand when their score is closer to 21 than player", () => {
    const state = createGameState();
    const standState = playerStand({
        ...state,
        pot: 100,
        player: {
            ...state.player,
            score: 19,
            cards: [{ rank: "K", rank: "9"}]
        },
        house: {
            ...state.house,
            score: 20,
            cards: [{ rank: "10" }, { rank: "K"} ]
        }
    });
    expect(standState.houseWins).toBe(true);
});

it("should tie on equal score", () => {
    const state = createGameState();
    const standState = playerStand({
        ...state,
        pot: 100,
        player: {
            ...state.player,
            score: 20,
            cards: [{ rank: "K", rank: "10"}]
        },
        house: {
            ...state.house,
            score: 20,
            cards: [{ rank: "K" }, { rank: "10"} ]
        }
    });
    expect(standState.tie).toBe(true);
});

it("should bust on hit when player score > 21", () => {
    const state = createGameState();
    const standState = playerHit({
        ...state,
        pot: 100,
        player: {
            ...state.player,
            cards: [{ rank: "10"}, { rank: "10" }, { rank: "10"}]
        },
        house: {
            ...state.house,
            cards: [{ rank: "K" }, { rank: "9" }]
        }
    });
    expect(standState.playerBust).toBe(true);
    expect(standState.player.bank).toBe(900);
});

it("should split pot when both house/player have blackjack", () => {
    const state = createGameState();
    const standState = makeMove({
        ...state,
        pot: 100,
        house: {
            ...state.house,
            isBlackJack: true
        },
        player: {
            ...state.player,
            isBlackJack: true
        }
    }, 'blackjack');
    expect(standState.tie).toBe(true);
    expect(standState.player.bank).toBe(1050);
});

it("should return state on dealRound when not BlackJack", () => {
    const state = createGameState();
    const drState = dealRound({
        ...state,
        house: {
            ...state.house,
            deck: [{ rank: "1"}, { rank: "2" }, { rank: "2" }, { rank: "2" }]
        }
    });
    expect(drState.player.isBlackJack).toBe(false);
});

it("should reset deck if deck < 4 on dealRound ", () => {
    const state = createGameState();
    const hitState = dealRound({
        ...state,
        house: {
            ...state.house,
            deck: [{}, {}, {}]
        }
    });
    expect(hitState.house.deck.length).toBe(48);
});

it("should return 1.5 wager when player blackjack", () => {
    const state = createGameState();
    const standState = makeMove({
        ...state,
        pot: 100,
        house: {
            ...state.house,
            isBlackJack: false
        },
        player: {
            ...state.player,
            isBlackJack: true
        }
    }, 'blackjack');
    expect(standState.playerWins).toBe(true);
    expect(standState.player.bank).toBe(1150);
});

it("should double the wager when playerDoubleDown called", () => {
    const state = createGameState();
    const ddState = playerDoubleDown({
        ...state,
        pot: 200,
        player: {
            bank: 800,
        }
    });
    expect(ddState.pot).toBe(400);
    expect(ddState.player.bank).toBe(600);
});









