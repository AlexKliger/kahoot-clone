const numbers = require('./number')
const operators = require('./operator')

const NUMBER_TYPE = {
    INTEGER: 'integer',
    FRACTION: 'fraction'
}

const OPERATOR = {
    PLUS: '+',
    MINUS: '-',
    TIMES: 'x',
    DIVIDE_BY: '/'
}

class QuestionGenerator {
    leftNum
    rightNum
    operator

    constructor(leftNumConfig, rightNumConfig, operatorConfig) {
        switch (leftNumConfig.type) {
            case NUMBER_TYPE.INTEGER:
                this.leftNum = new numbers.Integer(leftNumConfig.sign, leftNumConfig.digits)
                break
        }

        switch (rightNumConfig.type) {
            case NUMBER_TYPE.INTEGER:
                this.rightNum = new numbers.Integer(rightNumConfig.sign, rightNumConfig.digits)
                break
        }

        switch (operatorConfig.type) {
            case OPERATOR.PLUS:
                this.operator = new operators.Plus(operatorConfig.regrouping)
                break
            case OPERATOR.MINUS:
                this.operator = new operators.Minus(operatorConfig.regrouping)
                break
            case OPERATOR.TIMES:
                this.operator = new operators.Times(operatorConfig.regrouping)
                break
            case OPERATOR.DIVIDE_BY:
                this.operator = new operators.DivideBy(operatorConfig.regrouping)
                break
            default:
                break
        }
    }

    generateQuestion() {
        const text = this.operator.generateQuestion(this.leftNum, this.rightNum)
        const choices = this.operator.generateAnswerChoices()
        const question = {question: text, answer: this.operator.answerIndex, choices: choices}
        return question
    }
}

module.exports = QuestionGenerator