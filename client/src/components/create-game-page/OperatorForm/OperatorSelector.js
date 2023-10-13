const operators = ['+', '-', 'x', '/']
const fontAwesomeMap = {
    '+': 'plus',
    '-': 'minus',
    'x': 'xmark',
    '/': 'divide'
}

const OperatorSelector = ({ onChange, value }) => {
    function onSelection(selection) {
        onChange(selection)
    }

    return (
        <div class="grid grid-cols-2 gap-2 text-center text-6xl max-w-fit">
            {operators.map((op, key) => 
                <div
                    className={ "hover:bg-blue-400 border-2 border-white rounded p-4 cursor-pointer transition " + (value == op && "bg-blue-400 border-blue-400") }
                    onClick={ () => onSelection(op) }
                    key={ key }
                >
                    <span className={`fas fa-${fontAwesomeMap[op]}`}>
                    </span>
                </div>
            )}
        </div>
    )
}

export default OperatorSelector