import { useCallback } from 'react'
import Checkbox from '../core/Checkbox'

const NUMBER = {
    INTEGER: 'integer',
    DECIMAL: 'decimal',
    FRACTION: 'fraction'
}

const NumberForm = ({ number, setNumber, label }) => {
    const handleSelectionChange = useCallback((e) => {
        let inputs = {type: e.target.value}
        if (e.target.value === NUMBER.DECIMAL) {
            inputs = {...inputs, decimalPlaces: 1}
        } else if (e.target.value === NUMBER.FRACTION) {
            inputs = {...inputs, digitsInNum: 1, digitsInDen: 1}            
        }
        setNumber({...number, ...inputs})
    })

    return (
        <section className="config-form">
            <div className="config-form__selector">
                <label htmlFor="left-number">
                    {label}
                </label>
                <select
                    className="font-size--medium"
                    value={number.type}
                    name="left-number"
                    id="left-number"
                    onChange={handleSelectionChange}
                >
                    {Object.values(NUMBER).map((type, key) => (
                        <option value={type} key={key}>{type}</option>
                    ))}
                </select>
            </div>

            <div className="config-form__options config-form--number__options">
                {(number.type === NUMBER.INTEGER || number.type === NUMBER.DECIMAL) &&
                <div>
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
                </div>
                }

                {number.type === NUMBER.DECIMAL &&
                <div>
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
                </div>
                }

                {number.type === NUMBER.FRACTION &&
                <>
                    <div>
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
                    </div>

                    <div>
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
                    </div>

                    <Checkbox
                        label="Allow improper?"
                        handleChange={e => setNumber({...number, allowImproper: e.target.value})}
                    />
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