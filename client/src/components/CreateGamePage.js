import { useCallback, useState } from 'react'
import NumberForm from './NumberForm'
import OperatorForm from './OperatorForm'

const NUMBER = {
    INTEGER: 'integer',
    FRACTION: 'fraction'
}

const SIGN = {
    POSITIVE: 'positive',
    NEGATIVE: 'negative'
}

const OPERATOR = {
    PLUS: '+',
    MINUS: '-',
    TIMES: 'x',
    DIVIDE_BY: '/'
}

const CreateGamePage = ( { handleSubmit }) => {
    const [leftNum, setLeftNum] = useState({type: NUMBER.INTEGER, sign: SIGN.POSITIVE, digits: 1})
    const [rightNum, setRightNum] = useState({type: NUMBER.INTEGER, sign: SIGN.POSITIVE, digits: 1})
    const [operator, setOperator] = useState({type: OPERATOR.PLUS, regrouping: false})

    const onSubmit = useCallback(e => {
        console.log('onSubmit -> leftNum:', leftNum, 'rightNum:', rightNum, 'operator:', operator)
        handleSubmit(leftNum, rightNum, operator)
        e.preventDefault()
    }, [leftNum, rightNum, operator, handleSubmit])

    return (
        <section className="create-game-page margin-centered">
            <h2 className="font-size--extra-large">Create New Game</h2>        

            <form style={{"width": "100%"}} onSubmit={onSubmit}>
                <NumberForm number={leftNum} setNumber={setLeftNum} label={"Left Number"}/>

                <OperatorForm operator={operator} setOperator={setOperator} />

                <NumberForm number={rightNum} setNumber={setRightNum} label={"Right Number"} />

                <input type="submit" value="Create"></input>
            </form>
        </section>
    )
}

export default CreateGamePage