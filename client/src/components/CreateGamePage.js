import { useCallback, useState } from 'react'
import Checkbox from './Checkbox'

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
        handleSubmit(leftNum, rightNum, operator)
        e.preventDefault()
    }, [leftNum, rightNum, operator, handleSubmit])

    return (
        <section className="create-game-page margin-centered">
            <h2 className="font-size--extra-large">Create New Game</h2>        

            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="left-number">Left Number</label>
                    <select value={leftNum.type} name="left-number" id="left-number" onChange={e => setLeftNum({...leftNum, type: e.target.value})}>
                        {Object.values(NUMBER).map((type, key) => (
                            <option value={type} key={key}>{type}</option>
                        ))}
                    </select>

                    <Checkbox
                        label="Negative"
                        handleChange={e => setLeftNum({...leftNum, sign: e.target.value ? 'negative' : 'positive'})}
                    />

                    <label>
                        Digits
                        <input
                            type="number"
                            value={leftNum.digits}
                            onChange={e => {
                                setLeftNum({...leftNum, digits: e.target.value})
                            }}
                        ></input>
                    </label>
                </div>

                <div>
                    <label htmlFor="operator">Operator</label>
                    <select value={operator.type} name="operator" id="operator" onChange={e => setOperator({...operator, type: e.target.value})}>
                        {Object.values(OPERATOR).map((type, key) => (
                            <option value={type} key={key}>{type}</option>
                        ))}
                    </select>

                    {(operator.type === OPERATOR.PLUS ||
                    operator.type === OPERATOR.MINUS ||
                    operator.type === OPERATOR.TIMES) &&
                    <Checkbox
                        label="Regrouping"
                        handleChange={e => setOperator({...operator, regrouping: true})}
                    />}

                    {operator.type === OPERATOR.DIVIDE_BY &&
                    <Checkbox
                        label="Has Remainder"
                        handleChange={e => setOperator({...operator, hasRemainder: e.target.value})}
                    />}
                </div>

                <div>
                    <label htmlFor="right-number">Right Number</label>
                    <select value={rightNum.type} name="right-number" id="right-number" onChange={e => setRightNum({...rightNum, type: e.target.value})}>
                        {Object.values(NUMBER).map((type, key) => (
                            <option value={type} key={key}>{type}</option>
                        ))}
                    </select>

                    <Checkbox
                        label="Negative"
                        handleChange={(e) => setRightNum({...rightNum, sign: e.target.value ? 'negative' : 'positive'})}
                    />

                    <label>
                        Digits
                        <input
                            type="number"
                            value={rightNum.digits}
                            onChange={e => {
                                setRightNum({...rightNum, digits: e.target.value})
                            }}
                        ></input>
                    </label>
                </div>


                <input type="submit" value="Create"></input>
            </form>
        </section>
    )
}

export default CreateGamePage