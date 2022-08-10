import { flatten } from 'underscore';

export const SYMBOLS = [
    { symbol: "S", name: "spade", unicode: "U+2660", colour: "black"},
    { symbol: "C", name: "club", unicode: "U+2663", colour: "black"},
    { symbol: "H", name: "heart", unicode: "U+2665", colour: "red"},
    { symbol: "D", name: "diamond", unicode: "U+2666", colour: "red"}
];

export const RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];


export const GAME_STATE = {
    pot: 0,
    player: {
        cards: [],
        bank: 1000,
        playerScore: 0,
    },
    house: {
        deck: [],
        cards: [],
        playerScore: 0,
    }
}

export const createDeck = () => flatten(SYMBOLS.map(symbol => 
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
        }
    }
}

export const dealRound = (state) => {
    const { player, house } = state;
    const pCards = [house.deck.pop(), house.deck.pop()];
    const hCards = [house.deck.pop(), house.deck.pop()];

    return {
        ...state,
        player: {
            ...player,
            cards: pCards
        },
        house: {
            deck: house.deck,
            cards: hCards
        }
    }
}

export const playerBet = (state, bet) => {
    const { pot, player } = state;
    const pBank = player.bank;
    return {
        ...state,
        pot: pot + bet,
        player: {
            ...player,
            bank: pBank - bet,
        },
    }
}

export const playerHit = (state) => {
    const { house, player } = state;
    const card = house.deck.pop();
    return {
        ...state,
        house: {
            ...house,
            deck: house.deck
        },
        player: {
            ...player,
            cards: [...player.cards, card]
        }
    }
}

export const calculateScore = (cards) => {
    return cards.reduce((total, card) => {
        switch(card.rank) {
            case("K"): 
            case("Q"): 
            case("J"): return total + 10;;
            case("A"): return total + 11;
            default: return total + parseInt(card.rank); break; 
        }
    }, 0);
}