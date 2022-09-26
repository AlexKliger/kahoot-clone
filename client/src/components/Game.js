import { startGame, nextQuestion, prevQuestion, submitAnswer } from '../util/api'

const GAME_STATE = {
    WAITING_FOR_PLAYERS: 'waiting-for-players',
    GAME_STARTED: 'game-started'
}

const Game = ({ game, handleLeaveGame, setGame, playerId }) => {
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
                        <li key={key}><button onClick={() => submitAnswer(playerId, game.gameId, choice)}>{choice}</button></li>
                    ))
                    }   
                </ul>
                <button onClick={async () => setGame(await prevQuestion(game.gameId))}>Prev</button>
                <button onClick={async () => setGame(await nextQuestion(game.gameId))}>Next</button>
            </div>}

            <ul>
                <h3>Players</h3>
                {game.players.map((player, key) => (
                    <li key={key}>{player.playerId}</li>
                ))}
            </ul>

            {game.state === GAME_STATE.WAITING_FOR_PLAYERS &&
            <button onClick={ async () => setGame(await startGame(game.gameId)) }>Start Game</button>}
            <button onClick={ handleLeaveGame }>Leave Game</button>
        </section>   
    )
}

export default Game