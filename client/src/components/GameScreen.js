import { submitAnswer } from '../util/api'

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

        </section>
    )
}

export default GameScreen