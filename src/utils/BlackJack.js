import { flatten } from 'underscore';

export const SYMBOLS = [
    { symbol: "♠", name: "spade", colour: "text-black" },
    { symbol: "♣", name: "club",  colour: "text-black" },
    { symbol: "♥", name: "heart", colour: "text-rose-500" },
    { symbol: "♦", name: "diamond", colour: "text-rose-500" }
];

export const RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

export const GAME_STATE = {
    inPlay: false,
    initialBet: true,
    pot: 0,
    player: {
        cards: [],
        bank: 1000,
        score: 0,
        isWin: false,
        isBust: false,
    },
    house: {
        showSecond: false,
        deck: [],
        cards: [],
        bank: 1000,
        score: 0,
        isWin: false,
        isBust: false,
    }
}

export const createDeck = () => flatten(
    SYMBOLS.map(symbol => 
         RANKS.map(rank => { return {
             rank: rank,
             symbol: symbol.symbol,
             name: symbol.name,
             colour: symbol.colour
            } 
         }
    )
));

export const shuffleDeck = (deck) => {
    let i = deck.length;
    while (--i > 0) {
      let rInd = Math.floor(Math.random() * (i + 1));
      [deck[rInd], deck[i]] = [deck[i], deck[rInd]];
    }
    return deck;
}

export const initialiseGame = () => {
    return {
        ...GAME_STATE,
        house: {
            ...GAME_STATE.house,
            deck: shuffleDeck(createDeck())
        },
        player: {
            ...GAME_STATE.player,
        }
    }
}

export const startGame = (state) => {
    const dealState = dealRound(state);
    return {
        ...dealState,
        inPlay: true
    }
}

export const dealRound = (state) => {
    const { player, house } = state;
    const pCards = [house.deck.pop(), house.deck.pop()];
    const hCards = [house.deck.pop(), house.deck.pop()];

    const userScore = calculateScore(pCards);
    const houseScore = calculateScore(hCards);

    return {
        ...state,
        player: {
            ...player,
            cards: pCards,
            score: userScore
        },
        house: {
            ...house,
            deck: house.deck,
            cards: hCards,
            score: houseScore
        }
    }
}

export const playerBet = (state, bet) => {
    const { pot, player, house } = state;
    return {
        ...state,
        initialBet: false,
        pot: pot + (bet * 2),
        player: {
            ...player,
            bank: player.bank - bet,
        },
        house : {
            ...house,
            bank: player.bank - bet,
        }
    }
}

export const playerHit = (state) => {
    const { house, player } = state;
    const cards = [...player.cards, house.deck.pop()];
    const score = calculateScore(cards);

    return calculateWin({
        ...state,
        house: {
            ...house,
            deck: house.deck
        },
        player: {
            ...player,
            cards: cards,
            score: score,
        }
    })
}

export const calculateScore = (cards) => {
    let aces = 0;
    const total = cards.reduce((total, card) => {
        switch(card.rank) {
            case("K"): 
            case("Q"): 
            case("J"): return total + 10;;
            case("A"): aces+=1; return total + 1;
            default: return total + parseInt(card.rank); 
        }
    }, 0);

    if (total > 21 && aces > 0) {
        total += 10;
    }

    return total;
}

export const playerStand = (state) => {
    const { player, house } = state;
    
    if (house.score < 17) {
        const cards = [...house.cards, house.deck.pop()];
        const score = calculateScore(cards);

        return calculateWin({
            ...state,
            house: {
                ...house,
                cards: cards,
                score: score,
            }
        })
    }
    return state;
}

export const isBlackJack = (cards) => {
    const ranks = cards.map(card => card.rank);
    return ranks.includes("A") && ranks.filter(val => ["10", "J", "Q", "K"].includes(val)).length > 0
}

export const isBust = (player) => player.score > 21;
 

export const calculateWin = (state, type) => {
    const { player, house } = state;

    // isBlackJack(state.player.cards)
    
    if (player.score === 21) {
        return {
            ...state,
            player: {
                ...player,
                isWin: true
            }
        }
    }

    if (isBust(player)) {
        return {
            ...state,
            pot: 0,
            player: {
                ...player,
                isBust: true
            },
            house: {
                ...house,
                isWin: true,
                bank: house.bank + state.pot
            }
        }
    }
    return state;
}

export const clearCards = (state) => {
    const { house, player } = state;
    return {
        ...state,
        house: {
            ...house,
            deck: [...house.cards, ...player.cards, ...house.deck],
            cards: []
        },
        player: {
            ...player,
            cards: []
        }
    }
}

export const nextHand = (state) => {
    const cleared = clearCards(state);
    return dealRound({
        ...cleared,
        initialBet: false,
        player: {
            ...cleared.player,
            isWin: false,
            isBust: false,
        },
        house: {
            ...cleared.house,
            isWin: false,
            isBust: false
        }
    });
}

export const showSecondCard = (state) => {
    return {
        ...state,
        house: {
            ...state.house,
            showSecond: true
        }
    }
} 