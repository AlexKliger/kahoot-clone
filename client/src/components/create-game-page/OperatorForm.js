import Checkbox from '../core/Checkbox'

const OPERATOR = {
    PLUS: '+',
    MINUS: '-',
    TIMES: 'x',
    DIVIDE_BY: '/'
}

const OperatorForm = ({ operator, setOperator }) => {
    return (
        <section className="operator-form">
            <div className="operator-form__selector">
                <label htmlFor="operator">
                    Operator
                </label>
                <select
                    className="font-size--medium"
                    value={operator.type}
                    name="operator"
                    id="operator"
                    onChange={e => setOperator({...operator, type: e.target.value})}>
                    {Object.values(OPERATOR).map((type, key) => (
                        <option value={type} key={key}>{type}</option>
                    ))}
                </select>
            </div>

            <div className="operator-form__options">
                {(operator.type === OPERATOR.PLUS ||
                operator.type === OPERATOR.MINUS ||
                operator.type === OPERATOR.TIMES) &&
                <Checkbox
                    label="Regrouping"
                    handleChange={e => setOperator({...operator, regrouping: e.target.value})}
                />}

                {operator.type === OPERATOR.DIVIDE_BY &&
                <Checkbox
                    label="Has Remainder"
                    handleChange={e => setOperator({...operator, hasRemainder: e.target.value})}
                />}

                <Checkbox
                    label="Common denominators"
                    handleChange={e => setOperator({...operator, commonDenominators: e.target.value})}
                />
            </div>

        </section>
    )
}

export default OperatorForm