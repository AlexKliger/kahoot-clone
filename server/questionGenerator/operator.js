const number = require('./number')

// Operators
class Operator {
    regrouping
    leftNum
    rightNum
    answer
    answerChoiceCount = 4

    constructor(regrouping) {
        this.regrouping = regrouping
    }

    generateQuestion() {
        console.log('Overide base class implemenation.')
    }

    #generateAnswerChoices() {
        let answerChoices = []
        if (this instanceof Plus) {
            this.answer = leftNum + rightNum
        } else if (this instanceof Minus) {
            this.answer = leftNum - rightNum
        } else if (this instanceof Times) {
            this.answer = leftNum * rightNum
        } else if (this instanceof DivideBy) {
            this.answer = leftNum / rightNum
        }
        answerChoices.push(this.answer)
        while (answerChoices.length < answerChoiceCount) {
            const offset = Math.random() * this.answer * (Math.random() > 0.5 ? 1 : -1)
            const wrongAnswer = Math.floor(this.answer + offset)
            !choices.includes(wrongAnswer) && choices.push(wrongAnswer)
        }
    }
}

class Plus extends Operator {

    generateQuestion(leftNumType, rightNumType) {
        this.leftNum = leftNumType.generateNumber()
        this.rightNum = rightNumType.generateNumber()
        // If regrouping is false and both numbers are integers...
        if (!this.regrouping && leftNumType instanceof number.Integer && rightNumType instanceof number.Integer) {
            // Convert numbers to string and pad with 0 to make indexing easier.
            const maxDigits = Math.max(leftNumType.digits, rightNumType.digits)
            const leftNum = this.leftNum.toString().padStart(maxDigits, 0)
            const rightNum = this.rightNum.toString().padStart(maxDigits, 0)
            // For each place value, starting from the "one's place"...
            for (let i = maxDigits - 1; i >= 0; i--) {
                const digitOfLeft = parseInt(leftNum[i])
                const digitOfRight = parseInt(rightNum[i])
                // If the sum of the given place value is greater than 10...
                if (digitOfLeft + digitOfRight > 9) {
                    const amountOverNine = digitOfLeft + digitOfRight - 9
                    // Subtract the amount-over-nine from the given digit from either number.
                    if (Math.round(Math.random() * 1)) {
                        this.leftNum = this.leftNum - amountOverNine * 10 ** (maxDigits - 1 - i)
                    } else {
                        this.rightNum = this.rightNum - amountOverNine * 10 ** (maxDigits - 1 - i)
                    }
                }
            }
        }

        return this.leftNum.toString() + ' + ' + this.rightNum.toString()
    }
}

class Minus extends Operator {

    generateQuestion(leftNumType, rightNumType) {
        this.leftNum = leftNumType.generateNumber()
        this.rightNum = rightNumType.generateNumber()
        // If regrouping is false and both numbers are integers...
        if (!this.regrouping && leftNumType instanceof number.Integer && rightNumType instanceof number.Integer) {
            // Convert numbers to string, pad with 0, then conver to array of digits to make indexing easier.
            const maxDigits = Math.max(leftNumType.digits, rightNumType.digits)
            const leftNum = this.leftNum.toString().padStart(maxDigits, 0).split('')
            const rightNum = this.rightNum.toString().padStart(maxDigits, 0).split('')
            for (let i = maxDigits - 1; i >= 0; i--) {
                const digitOfLeft = parseInt(leftNum[i])
                const digitOfRight = parseInt(rightNum[i])
                // If the difference of the given place value is less than 0...
                if (digitOfLeft - digitOfRight < 0) {
                    // Switch the digits so the greater number is in leftNum.
                    leftNum[i] = digitOfRight
                    rightNum[i] = digitOfLeft
                    this.leftNum = parseInt(leftNum.join(''))
                    this.rightNum = parseInt(rightNum.join(''))
                }
            }
        }
        
        return this.leftNum + ' - ' + this.rightNum
    }
}

class Times extends Operator {
    generateQuestion(leftNumType, rightNumType) {
        this.leftNum = leftNumType.generateNumber()
        this.rightNum = rightNumType.generateNumber()

        // If regrouping is false and both numbers are integers...
        if (!this.regrouping && leftNumType instanceof number.Integer && rightNumType instanceof number.Integer) {
            // Convert numbers to array of digits to make indexing easier.
            const leftNum = this.leftNum.toString().split('')
            const rightNum = this.rightNum.toString().split('')
            // For every digit in the right number starting from the one's digit...
            for (let i = rightNum.length - 1; i >= 0; i--) {
                const digitOfRight = rightNum[i]
                // And for every digit in the left number starting from the one's digit...
                for (let j = leftNum.length - 1; j >= 0; j--) {
                    const digitOfLeft = leftNum[j]
                    // If the product of the respective digits is greater than 9...
                    if (digitOfRight * digitOfLeft > 9) {
                        let amountOverNine = leftNum[j] * rightNum[i] - 9
                        while (amountOverNine > 0) {
                            // Randomly decrement one of the digits.
                            Math.round(Math.random() * 1) ? rightNum[i]-- : leftNum[j]--
                            amountOverNine = leftNum[j] * rightNum[i] - 9
                        }
                    }
                }
            }
            this.leftNum = leftNum.join('')
            this.rightNum = rightNum.join('')
        }

        return this.leftNum + ' x ' + this.rightNum
    }
}

class DivideBy extends Operator {
    remainderRequired

    constructor(regrouping, hasRemainder) {
        super(regrouping)
        this.remainderRequired = hasRemainder
    }

    generateQuestion(leftNumType, rightNumType) {
        this.leftNum = leftNumType.generateNumber()
        this.rightNum = rightNumType.generateNumber()
        // If remainder is false and both numbers are integers...
        if (!this.remainderRequired && leftNumType instanceof number.Integer && rightNumType instanceof number.Integer) {
            // Subtract the remainder from the dividend.
            const remainder = this.leftNum % this.rightNum
            this.leftNum -= remainder
        }
        return this.leftNum + ' / ' + this.rightNum
    }
}

module.exports = {Operator: Operator, Plus: Plus, Minus: Minus, Times: Times, DivideBy: DivideBy}