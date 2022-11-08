const OPERATOR = {
    PLUS: '+',
    MINUS: '-',
    TIMES: 'x',
    DIVIDE_BY: '/'
}

function parseOperator(string) {
    const operator = string.split(' ')[1]
    switch (operator) {
        case OPERATOR.PLUS:
            return 'plus'
        case OPERATOR.MINUS:
            return 'minus'
        case OPERATOR.TIMES:
            return 'xmark'
        case OPERATOR.DIVIDE_BY:
            return 'divide'
    }
}

const Question = ({ question }) => {
    return (
        <span className="question font-size--extra-large">
            <span>{question.split(' ')[0]} </span>
            <i className={`fas fa-${parseOperator(question)}`}></i>
            <span> {question.split(' ')[2]} </span>
            <i className="fas fa-equals"></i>
        </span>
    )
}

export default Question