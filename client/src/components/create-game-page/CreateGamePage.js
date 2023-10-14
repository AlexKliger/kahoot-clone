import { useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GameDispatchContext } from '../../context/GameContext'
import ConfigList from './ConfigList'
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
    const [configs, setConfigs] = useState([])

    const { createGame } = useContext(GameDispatchContext)

    const navigate = useNavigate()

    const onSubmit = useCallback(async e => {
        e.preventDefault()
        await createGame(configs)
        navigate('/game/play', { replace: true })
    }, [configs])

    return (
        <section className="page margin-centered">
            <form onSubmit={onSubmit}>
                <div className="flex gap-6">
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

                <div>
                    <div style={{"margin-bottom": "1rem","display": "flex", "justifyContent": "center", "gap": "1rem"}}>
                        <h3 className="font-size--large">Configs</h3>
                        <button
                            type="button"
                            onClick={() => setConfigs([...configs, {left: number, right: number, operator: operator}])}
                        >+</button>
                    </div>
                    <ConfigList configs={configs} setConfigs={setConfigs} />
                </div>

                <input style={{"padding": "0.5rem 1rem"}} className="font-size--medium" type="submit" value="Create"></input>
            </form>
        </section>
    )
}

export default CreateGamePage