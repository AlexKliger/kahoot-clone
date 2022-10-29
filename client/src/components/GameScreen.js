import Players from './Players'
import {resetGame, nextQuestion, prevQuestion, submitAnswer } from '../util/api'

const GameScreen = ({ game, setGame, playerId }) => {
    return (
        <section className="game-screen">
            <span className="question font-size--extra-large">{game.questions[game.currentQuestion].question}</span>
            <ul className="answer-choices">
                {game.questions[game.currentQuestion].choices.map((choice, key) => (
                    <li key={key}>
                        <button
                            className="answer-choices__choice font-size--extra-large"
                            onClick={() => submitAnswer(playerId, game.gameId, key)}
                        >
                            {choice}
                        </button>
                    </li>
                ))}   
            </ul>

            {game.hostId === playerId && 
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