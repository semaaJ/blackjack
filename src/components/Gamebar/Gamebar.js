import Button from '../Button/Button';

const Gamebar = (props) => {
    const { start, next, bet, hit, stand, state } = props;

    // TODO: tidy up
    if (state.player.isBust) {
        return (
            <>
                <h1 className="text-white text-2xl px-8">YOU WENT BUST!</h1>
                <Button text="Deal" onClick={next} />
            </>
        )
    }

    if (state.house.isBust) {
        return (
            <>
                <h1 className="text-white text-2xl px-8">HOUSE WENT BUST!</h1>
                <Button text="Deal" onClick={next} />
            </>
        )
    }

    if (!state.inPlay) { 
        return (
            <Button text="Deal" onClick={start} />
        )   
    }

    if (state.initialBet) {
        return (
            <Button text="Bet" onClick={bet} />
        )
    }

    return (
        <>
            <Button text="Bet" onClick={bet} />
            <Button text="Hit" onClick={hit} />
            <Button text="Stand" onClick={stand} />
            <h1 className="text-white text-2xl px-8">Bank: ${ state.player.bank }</h1>
            <h1 className="text-white text-2xl px-8">Pot: ${ state.pot }</h1>
            <h1 className="text-white text-2xl px-8">Player/House Score: { state.player.score }/{ state.house.score }</h1>
        </>
    )
}

export default Gamebar;