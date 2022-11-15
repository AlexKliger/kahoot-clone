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

// Class that parses JSON objects and instantiates number and operator objects.
class QuestionGenerator {
    numLeft
    numRight
    operator

    constructor(configLeft, configRight, configOp) {
        this.numLeft = this.#jsonToNumber(configLeft)

        this.numRight = this.#jsonToNumber(configRight)

        this.operator = this.#jsonToOperator(configOp)
    }

    generateQuestionObject() {
        const text = this.operator.generateQuestionString(this.numLeft, this.numRight)
        const choices = this.operator.generateAnswerChoices()
        const question = {question: text, answerIndex: this.operator.answerIndex, choices: choices}
        return question
    }

    #jsonToNumber(configNum) {
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

    #jsonToOperator(configOp) {
        switch (configOp.type) {
            case OPERATOR.PLUS:
                return new operators.Plus(
                    this.numLeft,
                    this.numRight,
                    configOp)
                break
            case OPERATOR.MINUS:
                return operators.Minus(
                    this.numLeft,
                    this.numRight,
                    configOp)
                break
            case OPERATOR.TIMES:
                return operators.Times(
                    this.numLeft,
                    this.numRight,
                    configOp)
                break
            case OPERATOR.DIVIDE_BY:
                return operators.DivideBy(
                    this.numLeft,
                    this.numRight,
                    configOp)
                break
            default:
                break
        }
    }
}

module.exports = QuestionGenerator