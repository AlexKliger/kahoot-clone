import Checkbox from '../../core/Checkbox'
import OperatorSelector from './OperatorSelector'

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

const OperatorForm = ({ operator, setOperator, leftNumType, rightNumType }) => {
    return (
        <div className="max-w-fit mx-auto">
            <div className="max-w-fit mx-auto">
                <OperatorSelector
                    onChange={ (selection) => setOperator({...operator, type: selection}) }
                    value={operator.type}
                />
            </div>

            <div className="max-w-fit mx-auto">
                {(operator.type === OPERATOR.PLUS ||
                operator.type === OPERATOR.MINUS ||
                operator.type === OPERATOR.TIMES) &&
                (leftNumType == NUMBER.INTEGER || 
                leftNumType == NUMBER.DECIMAL) &&
                <Checkbox
                    label="Regrouping?"
                    handleChange={e => setOperator({...operator, regrouping: e.target.value})}
                />}

                {operator.type === OPERATOR.DIVIDE_BY &&
                leftNumType == NUMBER.INTEGER &&
                <Checkbox
                    label="Has remainder?"
                    handleChange={e => setOperator({...operator, hasRemainder: e.target.value})}
                />}

                {leftNumType === NUMBER.FRACTION && rightNumType === NUMBER.FRACTION &&
                <Checkbox
                    label="Common denominators?"
                    handleChange={e => setOperator({...operator, commonDenominators: e.target.value})}
                />
                }
            </div>

        </div>
    )
}

export default OperatorForm