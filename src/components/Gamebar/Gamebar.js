import Button from '../Button/Button';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti'

export const CHIPS = [
    { "value": 5, imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1151732/chip-5.png", alt: "Chip 5 value" },
    { "value": 10, imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1151732/chip-7.png", alt: "Chip 10 value" },
    { "value": 15, imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1151732/chip-4.png", alt: "Chip 15 value" },
    { "value": 50, imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1151732/chip-3.png", alt: "Chip 50 value" }
]

// this can certainly be better
export const getGameStateText = (state) => {
    if (state.blackJack && state.playerWins) {
        return "PLAYER BLACKJACK! YOU WIN"
    } else if (state.blackJack && state.tie) {
        return "TIE, BOTH THE HOUSE AND PLAYER HAVE A BLACK JACK!"
    } else if (state.blackJack && state.houseWins) {
        return "HOUSE BLACKJACK! YOU LOSE"
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
    const { 
        state, 
        setState,
        deal, 
        bet, 
        hit, 
        reset, 
        stand, 
        doubleDown 
    } = props;
    const { width, height } = useWindowSize();
    const disabled = state.initialBet || state.houseWins || state.playerWins;
    
    return (
        <div className="flex flex-col bg-white shadow-xl rounded-2xl border-4  border-white sm: w-full">
            {
                state.playerWins && (
                    <Confetti
                        aria-label='confetti'
                        width={width}
                        height={height}
                        numberOfPieces={50}
                    />
                )
            }
            
            <div className="text-center w-full mb-2 mt-2">
                <h1 className="text-gray-600 font-bold text-2xl">{ getGameStateText(state) }</h1>
            </div>

            <div className="flex justify-between">
                <Button id="deal" icon={0} text="DEAL" disabled={state.inPlay} onClick={() => deal(state, setState)}  />
                <Button id="hit" icon={1} text="HIT" disabled={disabled} onClick={() => hit(state, setState)}  />
                <Button id="doubleDown" icon={2} text="DOUBLE DOWN"  disabled={disabled} onClick={() => doubleDown(state, setState)} />
                <Button id="stand" icon={3} text="STAND"  disabled={disabled} onClick={() => stand(state, setState)} />
                <Button id="restart" icon={4} text="RESTART" disabled={!state.inPlay} onClick={() => reset(setState)} />
            </div>

            <div className="flex bg-gray-200 justify-center">
                <h1 className="bg-gray-200 text-gray-900 text-center text-lg mt-1">SCORE: { state.player.score }</h1>
                <h1 className="bg-gray-200 ml-20 text-gray-900 text-center text-lg mt-1">HOUSE: { state.houseWins || state.playerWins  ? state.house.score : "?" }</h1>

            </div>

            <div className="flex justify-evenly bg-gray-200 items-center rounded-bl-2xl rounded-br-2xl">
                <div className="flex text-center flex-col">
                    <h1 className="text-gray-700 text-lg sm:text-2xl sm:font-bold">BET</h1>
                    <h1 className="text-gray-700 text-lg sm:text-xl sm:font-bold">${ state.pot }</h1>
                </div>

                <div className="flex justify-center py-4">
                    { CHIPS.map((chip, i) => (
                            <img 
                                className={`${ !state.inPlay ? "sm:ml-4 sm:mr-4 w-12 h-12 sm:w-16 sm:h-16 grayscale" :
                                            "sm:ml-4 sm:mr-4 w-12 h-12 sm:w-16 sm:h-16 cursor-pointer hover:scale-110"}`}
                                key={i} 
                                src={chip.imageUrl}
                                alt={chip.alt} 
                                onClick={() => state.inPlay && bet(state, setState, chip.value)}
                            />
                        )) 
                    }
                </div>

                <div className="flex text-center flex-col">
                    <h1 className="text-gray-700 text-lg sm:text-2xl sm:font-bold">CHIPS</h1>
                    <h1 className="text-gray-700 text-lg sm:text-xl sm:font-bold">${ state.player.bank }</h1>
                </div>
            </div>
        </div>
    )
}

export default Gamebar;