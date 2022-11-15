const numbers = require('./number')
const operators = require('./operator')

const NUMBER_TYPE = {
    INTEGER: 'integer',
    FRACTION: 'fraction',
    DECIMAL: 'decimal'
}

const OPERATOR = {
    PLUS: '+',
    MINUS: '-',
    TIMES: 'x',
    DIVIDE_BY: '/'
}

function generateQuestions(configs, count) {
    const questions = []
    const operators = configs.map(config => {
        const numLeft = jsonToNumber(config.left)
        const numRight = jsonToNumber(config.right)
        const operator = jsonToOperator(config.operator, numLeft, numRight)

        return operator
    })
    
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * operators.length)
        const question = operators[randomIndex].generateQuestionObject()
        questions.push(question)
    }

    return questions
}

function jsonToNumber(configNum) {
    switch (configNum.type) {
        case NUMBER_TYPE.INTEGER:
            return new numbers.Integer(configNum)
            break
        case NUMBER_TYPE.DECIMAL:
            return new numbers.Decimal(configNum)
            break
        case NUMBER_TYPE.FRACTION:
            return new numbers.Fraction(configNum)
            break
    }
}

function jsonToOperator(configOp, numLeft, numRight) {
    switch (configOp.type) {
        case OPERATOR.PLUS:
            return new operators.Plus(
                numLeft,
                numRight,
                configOp)
        case OPERATOR.MINUS:
            return new operators.Minus(
                numLeft,
                numRight,
                configOp)
        case OPERATOR.TIMES:
            return new operators.Times(
                numLeft,
                numRight,
                configOp)
        case OPERATOR.DIVIDE_BY:
            return new operators.DivideBy(
                numLeft,
                numRight,
                configOp)
        default:
            break
    }
}

module.exports = generateQuestions