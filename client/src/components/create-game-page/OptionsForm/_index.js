import Checkbox from "../../core/Checkbox"
import FractionOptions from "./FractionOptions"

const NUMBER = {
    INTEGER: 'integer',
    DECIMAL: 'decimal',
    FRACTION: 'fraction'
}

const OPERATOR = {
    PLUS: '+',
    MINUS: '-',
    TIMES: 'x',
    DIVIDE_BY: '/'
}

const OptionsForm = ({operator, setOperator, number, setNumber}) => {
    return (
        <div className="w-72 min-w-fit bg-white rounded text-black p-6">
            <Checkbox
                    label="Negative"
                    handleChange={e => setNumber({...number, sign: e.target.value ? 'negative' : 'positive'})}
            />
            
            {(operator.type === OPERATOR.PLUS ||
            operator.type === OPERATOR.MINUS ||
            operator.type === OPERATOR.TIMES) &&
            (number.type == NUMBER.INTEGER || 
            number.type == NUMBER.DECIMAL) &&
            <Checkbox
                label="Regrouping"
                handleChange={e => setOperator({...operator, regrouping: e.target.value})}
            />}

            {operator.type === OPERATOR.DIVIDE_BY &&
            number.type == NUMBER.INTEGER &&
            <Checkbox
                label="Remainders"
                handleChange={e => setOperator({...operator, hasRemainder: e.target.value})}
            />}

            <div className="flex flex-col config-form--number__options">
                {(number.type === NUMBER.INTEGER || number.type === NUMBER.DECIMAL) &&
                <label className="mt-6">
                    <input
                        className="text-black w-16"
                        type="number"
                        value={number.digits}
                        onChange={e => {
                            setNumber({...number, digits: parseInt(e.target.value)})
                        }}
                    ></input>
                    {`digit${number.digits > 1 ? "s" : ""}`}
                </label>
                }

                {number.type === NUMBER.DECIMAL &&
                <label>
                    <input
                        className="text-black w-16"
                        type="number"
                        value={number.decimalPlaces}
                        onChange={e => {
                            setNumber({...number, decimalPlaces: parseInt(e.target.value)})
                        }}
                    ></input>
                    {`decimal place${number.decimalPlaces > 1 ? "s" : ""}`}
                </label>
                }

                <FractionOptions
                    number={ number }
                    setNumber={ setNumber }
                />
            </div>
        </div>
    )
}

export default OptionsForm