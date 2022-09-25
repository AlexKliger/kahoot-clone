const GAME_STATE = {
    WAITING_FOR_PLAYERS: 'waiting-for-players',
    GAME_STARTED: 'game-started'
}

const Game = ({ game, handleLeaveGame, startGame }) => {
    return (
        <section>
            {game.state === GAME_STATE.GAME_STARTED &&
            <div>
                <h2>Game Started</h2>
                <p>What is {game.questions[game.currentQuestion].question}?</p>
                <ul>
                    <h3>Options</h3>
                    {
                    game.questions[game.currentQuestion].choices.map((choice, key) => (
                        <li key={key}><button>{choice}</button></li>
                    ))
                    }   
                </ul>
            </div>}

            <ul>
                <h3>Players</h3>
                {game.players.map((playerId, key) => (
                    <li key={key}>{playerId}</li>
                ))}
            </ul>

            {game.state == GAME_STATE.WAITING_FOR_PLAYERS &&
            <button onClick={ () => startGame(game.gameId) }>Start Game</button>}
            <button onClick={ handleLeaveGame }>Leave Game</button>
        </section>   
    )
}

export default Game