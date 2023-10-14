import NumberSelector from './NumberSelector'
import OperatorSelector from './OperatorSelector'

const NUMBER = {
    INTEGER: 'integer',
    DECIMAL: 'decimal',
    FRACTION: 'fraction'
}

const MainForm = ({ operator, setOperator, number, setNumber }) => {
    function handleSelectionChange(selection) {
        // Each number type has unique properties that need to be set.
        if (selection === NUMBER.INTEGER) {
            setNumber({...number, type: selection})
        } else if (selection == NUMBER.DECIMAL) {
            setNumber({...number, type: selection, decimalPlaces: 1})
        } else if (selection === NUMBER.FRACTION) {
            setNumber({...number, type: selection, digitsInNum: 1, digitsInDen: 1})
        }
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <NumberSelector
                onChange={ (selection) => handleSelectionChange(selection) }
                value={ number.type }
            />

            <OperatorSelector
                onChange={ (selection) => setOperator({...operator, type: selection}) }
                value={operator.type}
            />
        </div>
    )
}

export default MainForm