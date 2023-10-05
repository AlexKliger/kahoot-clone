import AnswerChoices from './AnswerChoices'
import Question from './Question'

const GameScreen = ({ question, playerId }) => {


  return (
    <section className="game-screen">
      <Question question={ question.question } />

      <AnswerChoices
        question={ question }
        playerId={ playerId }
      />
    </section>
  )
}

export default GameScreen