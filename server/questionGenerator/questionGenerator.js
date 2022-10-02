const numbers = require('./number')
const operators = require('./operator')

const NUMBER_TYPE = {
    INTEGER: 'integer',
    FRACTION: 'fraction'
}

const OPERATION_TYPE = {
    PLUS: '+',
    MINUS: '-',
    TIMES: '*',
    DIVIDE_BY: '/'
}

class QuestionGenerator {
    leftNum
    rightNum
    operation

    constructor(leftNumConfig, rightNumConfig, operationConfig) {
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

        switch (operationConfig.type) {
            case OPERATION_TYPE.PLUS:
                this.operation = new operators.Plus(operationConfig.regrouping)
                break
            case OPERATION_TYPE.MINUS:
                this.operation = new operators.Minus(operationConfig.regrouping)
                break
            case OPERATION_TYPE.TIMES:
                this.operation = new operators.Times(operationConfig.regrouping)
                break
            case OPERATION_TYPE.DIVIDE_BY:
                this.operation = new operators.DivideBy(operationConfig.regrouping)
                break
            default:
                break
        }
    }

    generateQuestion() {
        return this.operation.generateQuestion(this.leftNum, this.rightNum)
    }
}

const int1 = new numbers.Integer('positive', 3)
const int2 = new numbers.Integer('positive', 2)
const op = new operators.DivideBy(false)
console.log(op.generateQuestion(int1, int2))

// module.exports = QuestionGenerator