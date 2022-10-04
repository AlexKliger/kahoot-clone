import { useCallback, useState } from 'react'

const NUMBER = {
    INTEGER: 'integer',
    FRACTION: 'fraction'
}

const OPERATOR = {
    ADD: '+',
    SUBTRACT: '-',
    MULTIPLY: 'x',
    DIVIDE: '/'
}

const CreateGamePage = ( { handleSubmit }) => {
    const [leftNum, setLeftNum] = useState(NUMBER.INTEGER)
    const [rightNum, setRightNum] = useState(NUMBER.INTEGER)
    const [operator, setOperator] = useState(OPERATOR.ADD)

    const onSubmit = useCallback((e) => {
        handleSubmit(leftNum, rightNum, operator)
        e.preventDefault()
    })

    return (
        <section className="create-game-page margin-centered">
            <h2 className="font-size--extra-large">Create New Game</h2>        

            <form onSubmit={onSubmit}>
                <label htmlFor="left-number">Left Number</label>
                <select value={leftNum} name="left-number" id="left-number" onChange={e => setLeftNum(e.target.value)}>
                    {Object.values(NUMBER).map((type, key) => (
                        <option value={type} key={key}>{type}</option>
                    ))}
                </select>

                <label htmlFor="operator">Operator</label>
                <select value={operator} name="operator" id="operator" onChange={e => setOperator(e.target.value)}>
                    {Object.values(OPERATOR).map((type, key) => (
                        <option value={type} key={key}>{type}</option>
                    ))}
                </select>

                <label htmlFor="right-number">Right Number</label>
                <select value={rightNum} name="right-number" id="right-number" onChange={e => setRightNum(e.target.value)}>
                    {Object.values(NUMBER).map((type, key) => (
                        <option value={type} key={key}>{type}</option>
                    ))}
                </select>

                <input type="submit" value="Create"></input>
            </form>
        </section>
    )
}

export default CreateGamePage