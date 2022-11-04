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
        <section className="page margin-centered">
            <form className="create-game-form" onSubmit={onSubmit}>
                <NumberForm number={leftNum} setNumber={setLeftNum} label={"Left Number"}/>

                <OperatorForm operator={operator} setOperator={setOperator} />

                <NumberForm number={rightNum} setNumber={setRightNum} label={"Right Number"} />

                <input style={{"padding": "0.5rem 1rem"}} className="font-size--medium" type="submit" value="Create"></input>
            </form>
        </section>
    )
}

export default CreateGamePage