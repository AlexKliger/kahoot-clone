const numbers = ['integer', 'decimal', 'fraction']

const NumberSelector = ({ onChange, value }) => {
    function onSelection(selection) {
        onChange(selection)
    }

    return (
        <div class="grid grid-cols-4 gap-2 text-center text-6x italic font-bold">
            {numbers.map((num, key) =>
                <div
                    className={ "hover:bg-blue-400 border-2 border-white rounded p-4 cursor-pointer transition " + (value === num && "bg-blue-400 border-blue-400") }
                    onClick={ () => onSelection(num) }
                    key={ key }
                >
                    <span>{num.slice(0, 3).toUpperCase()}</span>
                </div>
            )}
        </div>
    )
}

export default NumberSelector