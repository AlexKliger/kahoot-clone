import { useCallback } from 'react'
import Checkbox from './Checkbox'

const NUMBER = {
    INTEGER: 'integer',
    FRACTION: 'fraction'
}

const NumberForm = ({ number, setNumber }) => {
    const handleSelectionChange = useCallback((e) => {
        console.log('handleSelectionChange')
        let inputs = {type: e.target.value}
        if (e.target.value === NUMBER.FRACTION) {
            inputs = {...inputs, digitsInNum: 1, digitsInDen: 1}
        }
        setNumber({...number, ...inputs})
    })

    return (
        <section style={{"display": "flex"}}>
            <label htmlFor="left-number">
                Left Number
                <select value={number.type} name="left-number" id="left-number" onChange={handleSelectionChange}>
                {Object.values(NUMBER).map((type, key) => (
                    <option value={type} key={key}>{type}</option>
                ))}
                </select>
            </label>

            <div>
                <Checkbox
                    label="Negative"
                    handleChange={e => setNumber({...number, sign: e.target.value ? 'negative' : 'positive'})}
                />

                {number.type === NUMBER.INTEGER &&
                <label>
                    Digits
                    <input
                        type="number"
                        value={number.digits}
                        onChange={e => {
                            setNumber({...number, digits: parseInt(e.target.value)})
                        }}
                    ></input>
                </label>
                }

                {number.type === NUMBER.FRACTION &&
                <div style={{"display": "flex", "flexDirection": "column", "alignItems": "flex-end"}}>
                    <label>
                        Digits in numerator
                        <input
                            type="number"
                            value={number.digitsInNum}
                            onChange={e => {
                                setNumber({...number, digitsInNum: parseInt(e.target.value)})
                            }}
                        >
                        </input>
                    </label>
                    <label>
                        Digits in denominator
                        <input
                            type="number"
                            value={number.digitsInDen}
                            onChange={e => {
                                setNumber({...number, digitsInDen: parseInt(e.target.value)})
                            }}
                        >
                        </input>
                    </label>
                </div>
                }
            </div>


        </section>
    )
}

export default NumberForm