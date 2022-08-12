import Button from '../Button/Button';

export const CHIPS = [
    { "value": 5, imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1151732/chip-5.png", alt: "Chip 5 value" },
    { "value": 10, imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1151732/chip-7.png", alt: "Chip 10 value" },
    { "value": 15, imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1151732/chip-4.png", alt: "Chip 15 value" },
    { "value": 50, imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1151732/chip-3.png", alt: "Chip 50 value" }
]

export const getGameStateText = (state) => {
    if (state.player.isBlackJack && !state.tie) {
        return "BLACKJACK! YOU WIN"
    } else if (state.tie) {
        return "TIE"
    } if (state.playerBust || state.houseBust) {
        return state.playerBust ? "YOU WENT BUST, DEAL CARDS" : "THE HOUSE WENT BUST, DEAL CARDS";
    } else if (state.playerWins || state.houseWins) {
        return state.playerWins ? "YOU WON, DEAL CARDS" : "THE HOUSE WON, DEAL CARDS";
    } else if (!state.inPlay) {
        return "DEAL CARDS"
    } else if (state.initialBet && state.inPlay) {
        return "MAKE A BET"
    } else {
        return "HIT, DOUBLE DOWN OR STAND"
    }
}

const Gamebar = (props) => {
    const { next, bet, hit, stand, doubleDown, state, setState } = props;
    const disabled = state.initialBet || state.houseWins || state.playerWins;
    
    return (
        <div className="flex flex-col">
            <div className="text-center w-full mb-2">
                <h1 className="text-white text-2xl">{ getGameStateText(state) }</h1>
            </div>

            <div className="flex justify-between">
                <Button text="DEAL" disabled={state.inPlay} onClick={() => next(state, setState)}  />
                <Button text="HIT" disabled={disabled} onClick={() => hit(state, setState)}  />
                <Button text="DOUBLE DOWN"  disabled={disabled} onClick={() => doubleDown(state, setState)} />
                <Button text="STAND"  disabled={disabled} onClick={() => stand(state, setState)} />
            </div>

            <div className="flex justify-evenly bg-gray-200 items-center">
                <div className="flex text-center flex-col">
                    <h1 className="text-gray-700 text-3xl font-semibold">BET</h1>
                    <h1 className="text-gray-700 text-xl font-semibold">${ state.pot }</h1>
                </div>

                <div className="flex justify-center py-4 mt-2 px-2">
                    { CHIPS.map((chip, i) => (
                        <img key={i} className="ml-4 mr-4 w-16 h-16 cursor-pointer" src={chip.imageUrl} alt={chip.alt} onClick={() => bet(state, setState, chip.value)} />
                    )) }
                </div>

                <div className="flex text-center flex-col">
                    <h1 className="text-gray-700 text-3xl font-semibold">CHIPS</h1>
                    <h1 className="text-gray-700 text-xl font-semibold">${ state.player.bank }</h1>
                </div>
            </div>
        </div>
    )
}

export default Gamebar;