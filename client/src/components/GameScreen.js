import Players from './Players'
import { startGame, resetGame, nextQuestion, prevQuestion, submitAnswer } from '../util/api'


const GameScreen = ({ game, setGame, playerId }) => {
    return (
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
    )
}

export default GameScreen