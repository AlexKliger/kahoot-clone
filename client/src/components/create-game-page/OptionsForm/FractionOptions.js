import Checkbox from "../../core/Checkbox"

const NUMBER = {
    INTEGER: 'integer',
    DECIMAL: 'decimal',
    FRACTION: 'fraction'
}

const FractionOptions = ({number, setNumber, operator, setOperator}) => {
    return (
            <>
            {number.type === NUMBER.FRACTION &&
            <div>
                <Checkbox
                    label="Like denominators"
                    handleChange={e => setOperator({...operator, commonDenominators: e.target.value})}
                />
                <Checkbox
                    label="Allow improper"
                    handleChange={e => setNumber({...number, allowImproper: e.target.value})}
                />
                
                <label className="mb-4 mt-6">
                    <input
                        className="text-black w-16"
                        type="number"
                        value={number.digitsInNum}
                        onChange={e => {
                            setNumber({...number, digitsInNum: parseInt(e.target.value)})
                        }}
                    ></input>
                    {`digit${number.digitsInNum > 1 ? 's' : ''} in numerator`}
                </label>
                
                <label>
                    <input
                        className="text-black w-16"
                        type="number"
                        value={number.digitsInDen}
                        onChange={e => {
                            setNumber({...number, digitsInDen: parseInt(e.target.value)})
                        }}
                    ></input>
                    {`digit${number.digitsInDen > 1 ? 's' : ''} in denominator`}
                </label>
            </div>
            }
            </>
    )
}

export default FractionOptions