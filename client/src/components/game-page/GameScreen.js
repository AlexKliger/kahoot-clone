import AnswerChoices from './AnswerChoices'
import Question from './Question'

const GameScreen = ({ question, setGame, playerId }) => {


  return (
    <section className="game-screen">
      <Question question={ question.question } />

      <AnswerChoices
        question={ question }
        setGame={ setGame }
        playerId={ playerId }
      />
    </section>
  )
}

export default GameScreen