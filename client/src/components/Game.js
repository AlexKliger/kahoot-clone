import { startGame, resetGame, nextQuestion, prevQuestion, submitAnswer } from '../util/api'

const GAME_STATE = {
    WAITING_FOR_PLAYERS: 'waiting-for-players',
    GAME_STARTED: 'game-started',
    GAME_ENDED: 'game-ended'
}

const Game = ({ game, handleLeaveGame, setGame, playerId }) => {
    return (
        <section>
            {
            game.state === GAME_STATE.WAITING_FOR_PLAYERS &&
            <div>
                <ul>
                    <h2>Waiting for players...</h2>
                    {game.players.map((player, key) => (
                    <li key={key}>{player.playerId}</li>
                    ))}
                </ul>
                <button onClick={ async () => setGame(await startGame(game.gameId)) }>Start Game</button>
            </div>
            }

            {
            game.state === GAME_STATE.GAME_STARTED &&
            <div>
                <h2>Game Started</h2>
                <p>What is {game.questions[game.currentQuestion].question}?</p>
                <ul>
                    <h3>Options</h3>
                    {
                    game.questions[game.currentQuestion].choices.map((choice, key) => (
                        <li key={key}><button onClick={() => submitAnswer(playerId, game.gameId, key)}>{choice}</button></li>
                    ))
                    }   
                </ul>

                {
                game.host === playerId && 
                <div>
                    <button onClick={async () => setGame(await prevQuestion(game.gameId))}>Prev</button>
                    <button onClick={async () => setGame(await nextQuestion(game.gameId))}>Next</button>
                </div>
                }


                <ul>
                    <h3>Players</h3>
                    {game.players.map((player, key) => (
                    <li key={key}>{player.playerId} score: {player.score}</li>
                    ))}
                </ul>
            </div>
            }

            {
            game.state === GAME_STATE.GAME_ENDED &&
            <ul>
                <h2>Waiting for players...</h2>
                {game.players.map((player, key) => (
                <li key={key}>{player.playerId} score: {player.score}</li>
            ))}
            </ul>
            }

            <button onClick={ handleLeaveGame }>Leave Game</button>

            {
            game.host === playerId &&
            <button onClick={ async () => setGame(await resetGame(game.gameId)) }>Reset Game</button>
            }
        </section>   
    )
}

export default Game