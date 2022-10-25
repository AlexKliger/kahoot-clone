import { useCallback } from 'react'
import Checkbox from './Checkbox'

const NUMBER = {
    INTEGER: 'integer',
    FRACTION: 'fraction',
    DECIMAL: 'decimal'
}

const NumberForm = ({ number, setNumber, label }) => {
    const handleSelectionChange = useCallback((e) => {
        let inputs = {type: e.target.value}
        if (e.target.value === NUMBER.FRACTION) {
            inputs = {...inputs, digitsInNum: 1, digitsInDen: 1}
        }
        setNumber({...number, ...inputs})
    })

    return (
        <section className="number-form">
            <label className="number-form__selector" htmlFor="left-number">
                {label}
                <select value={number.type} name="left-number" id="left-number" onChange={handleSelectionChange}>
                {Object.values(NUMBER).map((type, key) => (
                    <option value={type} key={key}>{type}</option>
                ))}
                </select>
            </label>

            <div className="number-form__options">
                {(number.type === NUMBER.INTEGER || number.type === NUMBER.DECIMAL) &&
                <>
                    <label>
                        Digits
                    </label>
                    <input
                        type="number"
                        value={number.digits}
                        onChange={e => {
                            setNumber({...number, digits: parseInt(e.target.value)})
                        }}
                    ></input>
                </>
                }

                {number.type === NUMBER.DECIMAL &&
                <>
                    <label>
                        Decimal places
                    </label>
                    <input
                        type="number"
                        value={number.decimalPlaces}
                        onChange={e => {
                            setNumber({...number, decimalPlaces: parseInt(e.target.value)})
                        }}
                    ></input>
                </>
                }

                {number.type === NUMBER.FRACTION &&
                <>
                    <label>
                        Digits in numerator
                    </label>
                    <input
                            type="number"
                            value={number.digitsInNum}
                            onChange={e => {
                                setNumber({...number, digitsInNum: parseInt(e.target.value)})
                            }}
                        ></input>

                    <label>
                        Digits in denominator
                    </label>
                    <input
                        type="number"
                        value={number.digitsInDen}
                        onChange={e => {
                            setNumber({...number, digitsInDen: parseInt(e.target.value)})
                        }}
                    ></input>
                </>
                }

                <Checkbox
                    label="Negative"
                    handleChange={e => setNumber({...number, sign: e.target.value ? 'negative' : 'positive'})}
                />
            </div>


        </section>
    )
}

export default NumberForm