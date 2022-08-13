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
    tie: false,
    // lets make this cleaner
    houseWins: false,
    playerWins: false,
    houseBust: false,
    playerBust: false,
    player: {
        canSplit: false,
        cards: [],
        bank: 1000,
        score: 0,
        isBlackJack: false
    },
    house: {
        showSecond: false,
        deck: [],
        cards: [],
        score: 0,
        isBlackJack: false
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
    }
} 

export const dealRound = (state) => {
    let mutatedState = Object.assign({}, state);    
    if (state.house.deck.length < 4) {
        mutatedState = resetDeck(mutatedState);
    }

    const { house, player } = mutatedState;

    const playerCards = [house.deck.pop(), house.deck.pop()];
    const houseCards = [house.deck.pop(), house.deck.pop()];

    const playerScore = calculateScore(playerCards);
    const houseScore = calculateScore(houseCards);

    if (isBlackJack(playerCards)) {
        const houseBlackJack = isBlackJack(houseCards);

        return makeMove({
            ...state,
            inPlay: true,
            //
            houseWins: false,
            playerWins: false,
            houseBust: false,
            playerBust: false,
            showSecond: false,
            tie: false,
            //
            player: {
                ...player,
                isBlackJack: true,
                cards: playerCards,
                score: playerScore,
            },
            house: {
                ...house,
                deck: house.deck,
                cards: houseCards,
                score: houseScore,
                isBlackJack: houseBlackJack
            }
            
        }, "blackjack");
    }

    return {
        ...state,
        //
        inPlay: true,
        houseWins: false,
        playerWins: false,
        houseBust: false,
        playerBust: false,
        showSecond: false,
        tie: false,
        //
        player: {
            ...player,
            cards: playerCards,
            score: playerScore,
        },
        house: {
            ...house,
            deck: house.deck,
            cards: houseCards,
            score: houseScore,
        }
    }
}

export const playerBet = (state, bet) => {
    const { pot, player } = state;
    return {
        ...state,
        initialBet: false,
        pot: pot + bet,
        player: {
            ...player,
            bank: player.bank - bet,
        }
    }
}

export const playerStand = (state) => makeMove(state, 'stand');

export const resetDeck = (state) => {
    return {
        ...state,
        house: {
            ...state.house,
            deck: shuffleDeck(createDeck())
        }
    }
}

export const playerHit = (state) => {
    let mutatedState = Object.assign({}, state);    
    if (state.house.deck.length < 4) {
        mutatedState = resetDeck(mutatedState);
    }

    const { house, player } = mutatedState;
    const cards = [...player.cards, house.deck.pop()];
    const score = calculateScore(cards);

    return makeMove({
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
    }, "hit")
}

export const playerDoubleDown = (state) => {
    return {
        ...state,
        pot: state.pot * 2,
        player: {
            ...state.player,
            bank: state.player.bank - state.pot,
        }
    }
}

export const makeMove = (state, type) => {
    const { pot, player, house } = state;

    switch(type) {
        case("blackjack"):
            // if the house also has a blackjack split the pot
            if (state.house.isBlackJack) {
                return {
                    ...state,
                    pot: 0,
                    tie: true,
                    initialBet: true,
                    inPlay: false,
                    player: {
                        ...player,
                        bank: player.bank + (pot / 2),
                    },
                }
            }
            // otherwise pay out 1.5x the wager
            return {
                ...state,
                pot: 0,
                playerWins: true,    
                initialBet: true,    
                inPlay: false,           
                player: {
                    ...player,
                    bank: player.bank + (state.pot * 1.5) 
                },
            }
        case("stand"):
            let houseCards = [];
            // if the dealer is less than 17, take additional hit card
            if (house.score < 17) {
                houseCards = [...house.cards, house.deck.pop()];
            } else {
                houseCards = house.cards;
            }
            const houseScore = calculateScore(houseCards);

            // if house busts, pay 1 times player's wager
            if (isBust(houseScore)) {
                return {
                    ...state,
                    pot: 0,
                    initialBet: true,
                    showSecond: true,
                    playerWins: true,
                    houseBust: true,
                    inPlay: false,
                    player: {
                        ...player,
                        bank: player.bank + (pot * 2) 
                    },
                    house: {
                        ...house,
                        cards: houseCards
                    }
                }
            } 
        
            // player wins
            if (21 - player.score < 21 - houseScore) {
                return {
                    ...state,
                    pot: 0,
                    initialBet: true,
                    showSecond: true,
                    playerWins: true,
                    inPlay: false,
                    player: {
                        ...player,
                        bank: player.bank + (pot * 2) 
                    },
                    house: {
                        ...state.house,
                        cards: houseCards
                    }
                }
            } else if (player.score === houseScore) {
                return {
                    ...state,
                    pot: 0,
                    initialBet: true,
                    showSecond: true,
                    tie: true,
                    inPlay: false,
                    player: {
                        ...player,
                        bank: player.bank + (pot /2) 
                    },
                    house: {
                        ...house,
                        cards: houseCards
                    }
                }
            } 
           // house wins
            return {
                ...state,
                pot: 0,
                showSecond: true,
                houseWins: true,
                initialBet: true,
                inPlay: false,
                player: {
                    ...player,
                    bank: player.bank - pot
                },
                house: {
                    ...house,
                    cards: houseCards
                }
            }

        case("hit"):
            if (isBust(player.score)) {
                return {
                    ...state,
                    pot: 0,
                    playerBust: true,
                    houseWins: true,
                    showSecond: true,
                    initialBet: true,
                    inPlay: false,
                    player: {
                        ...player,
                        bank: player.bank - state.pot
                    }
                }
            }
        return state;
}}

export const calculateScore = (cards) => {
    let aces = 0;
    let total = cards.reduce((total, card) => {
        switch(card.rank) {
            case("K"): 
            case("Q"): 
            case("J"): return total + 10;;
            case("A"): aces+=1; return total + 1;
            default: return total + parseInt(card.rank); 
        }
    }, 0);
    if (aces > 0 && total + 10 <= 21) total += 10;
    return total;
}

export const isBlackJack = (cards) => {
    // edge case for non-initial move
    if (cards.length === 2) {
        const ranks = cards.map(card => card.rank);
        return ranks.includes("A") && ranks.filter(val => ["10", "J", "Q", "K"].includes(val)).length > 0
    }
    return false;
}

export const isBust = (score) => score > 21;

export const showSecondCard = (state) => {
    return {
        ...state,
        house: {
            ...state.house,
            showSecond: true
        }
    }
} 