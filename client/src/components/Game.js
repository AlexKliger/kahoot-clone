import Players from './Players'
import { startGame, resetGame, nextQuestion, prevQuestion, submitAnswer } from '../util/api'

const GAME_STATE = {
    WAITING_FOR_PLAYERS: 'waiting-for-players',
    GAME_STARTED: 'game-started',
    GAME_ENDED: 'game-ended'
}

const Game = ({ game, handleLeaveGame, setGame, playerId }) => {
    return (
        <section className="game flex-centered margin-centered">
            {game.state === GAME_STATE.WAITING_FOR_PLAYERS &&
            <section className="game__waiting-room">
                <h2 className="font-size--extra-large">Waiting for players...</h2>
                <Players players={game.players} />
                {game.host === playerId &&
                <button onClick={ async () => setGame(await startGame(game.gameId)) }>Start Game</button>
                }       
            </section>
            }

            {game.state === GAME_STATE.GAME_STARTED &&
            <section className="game__screen">
                <div className="question">
                    <h3 className="font-size--large">Question: {game.currentQuestion+1}/{game.questions.length}</h3>
                    <p>What is {game.questions[game.currentQuestion].question}?</p>
                    <ul className="answer-choices">
                        {game.questions[game.currentQuestion].choices.map((choice, key) => (
                            <li key={key}>
                                <button
                                    className="answer-choices__choice font-size--large"
                                    onClick={() => submitAnswer(playerId, game.gameId, key)}
                                >
                                    {choice}
                                </button>
                            </li>
                        ))}   
                    </ul>
                </div>

                {game.host === playerId && 
                <div className="host-controls">
                    <button className="host-controls__prev-button" onClick={async () => setGame(await prevQuestion(game.gameId))}>Prev</button>
                    <button className="host-controls__next-button" onClick={async () => setGame(await nextQuestion(game.gameId))}>Next</button>
                    <button className="host-controls__reset-button" onClick={ async () => setGame(await resetGame(game.gameId)) }>Reset Game</button>
                </div>
                }

                <Players players={game.players} />
            </section>
            }

            {
            game.state === GAME_STATE.GAME_ENDED &&
            <section>
                <h2 className="font-size--extra-large">Game Ended</h2>
                <Players players={game.players} />
                {game.host === playerId &&
                <button className="host-panel__reset-button" onClick={ async () => setGame(await resetGame(game.gameId)) }>Reset Game</button>
                }
            </section>
            }

            <button onClick={ handleLeaveGame }>Leave Game</button>
        </section>   
    )
}

export default Game