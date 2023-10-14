import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GameDispatchContext } from '../../context/GameContext'
import MainForm from './MainForm/_index'
import OptionsForm from './OptionsForm/_index'

const NUMBER = {
    INTEGER: 'integer',
    DECIMAL: 'decimal',
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

const CreateGamePage = () => {
    const [number, setNumber] = useState({
        type: NUMBER.INTEGER,
        sign: SIGN.POSITIVE,
        digits: 1
    })
    const [operator, setOperator] = useState({
        type: OPERATOR.PLUS,
        regrouping: false
    })

    const { createGame } = useContext(GameDispatchContext)

    const navigate = useNavigate()

    async function onSubmit(e) {
        e.preventDefault()
        const gameOptions = {left: number, right: number, operator: operator}
        await createGame(gameOptions)
        navigate('/game/play', { replace: true })
    }

    return (
        <section className="page margin-centered">
            <form onSubmit={onSubmit}>
                <div className="flex gap-6 mb-6">
                    <MainForm
                        operator={ operator }
                        setOperator={ setOperator }
                        number={ number }
                        setNumber={ setNumber }
                    />
                    
                    <OptionsForm
                        operator={ operator }
                        setOperator={ setOperator }
                        number={ number }
                        setNumber={ setNumber }
                    />
                </div>

                <input
                    className="border-2 border-stone-800 rounded bg-stone-700 px-6 py-4 text-xl cursor-pointer"
                    type="submit"
                    value="Create"
                ></input>
            </form>
        </section>
    )
}

export default CreateGamePage