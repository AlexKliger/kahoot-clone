import Players from './Players'
import WaitingRoom from './WaitingRoom'
import { startGame, resetGame, nextQuestion, prevQuestion, submitAnswer } from '../util/api'

const GAME_STATE = {
    WAITING_FOR_PLAYERS: 'waiting-for-players',
    GAME_STARTED: 'game-started',
    GAME_ENDED: 'game-ended'
}

const Game = ({ game, handleLeaveGame, setGame, playerId }) => {
    return (
        <section className="game flex-centered margin-centered">
            {(game.state === GAME_STATE.WAITING_FOR_PLAYERS ||
            game.state === GAME_STATE.GAME_ENDED) &&
            <WaitingRoom game={game} setGame={setGame} playerId={playerId} />
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
            <button onClick={ handleLeaveGame }>Leave Game</button>
        </section>   
    )
}

export default Game