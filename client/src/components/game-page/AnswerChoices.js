import { useCallback } from 'react'
import { submitAnswer } from '../../networking/api'

const answerChoiceStyle = "border-4 hover:bg-blue-400 transition rounded-xl p-16 text-3xl cursor-pointer "

const AnswerChoices = ({ question, playerId }) => {
  const choiceIsSelected = useCallback((choiceIndex) => {
    const submittedAnswer = question.submittedAnswers[playerId]
    if (submittedAnswer) {
      return submittedAnswer.answerIndex === choiceIndex
    }

    return false
  }, [question, playerId])

  return (
    <ul className="grid grid-cols-2 gap-4 auto-cols-max">
    {question.choices.map((choice, key) => (
      <li
        className={answerChoiceStyle + (choiceIsSelected(key) && "bg-blue-400")}
        onClick={async () => await submitAnswer(question._id, playerId, key)}
        key={key}
      >
        {choice}
      </li>
    ))}   
    </ul>
  )
}

export default AnswerChoices