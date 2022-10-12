const math = require('mathjs')
const number = require('./number')

// Operators
class Operator {
    regrouping
    leftNum
    rightNum
    answerIndex
    answerChoiceCount = 4

    constructor(leftNum, rightNum, regrouping) {
        this.regrouping = regrouping
        this.leftNum = leftNum
        this.rightNum = rightNum
    }

    

    generateQuestionString() {
        this.leftNum.generateNewValue()
        this.rightNum.generateNewValue()
    }

    generateAnswerChoices() {
        const answerChoices = []
        let answer
        if (this instanceof Plus) {
            answer = math.add(this.leftNum.value, this.rightNum.value)
        } else if (this instanceof Minus) {
            answer = math.subtract(this.leftNum.value, this.rightNum.value)
        } else if (this instanceof Times) {
            answer = math.multiply(this.leftNum.value, this.rightNum.value)
        } else if (this instanceof DivideBy) {
            answer = math.divide(this.leftNum.value, this.rightNum.value)
        }
        
        while (answerChoices.length < this.answerChoiceCount - 1) {
            let wrongAnswer
            if (this.leftNum instanceof number.Fraction || this.rightNum instanceof number.Fraction) {
                const offsetNum = Math.round(answer.n * Math.random() * (Math.round(Math.random()) ? -1 : 1))
                const offsetDen = Math.round(answer.d * Math.random() * (Math.round(Math.random()) ? -1 : 1)) || 1
                wrongAnswer = math.add(answer, math.fraction(offsetNum, offsetDen))
            } else {
                const offset = Math.round(Math.random() * (answer + 10) * (Math.round(Math.random) ? -1 : 1))
                wrongAnswer = answer + offset
            }
            !answerChoices.includes(math.format(wrongAnswer)) && answerChoices.push(math.format(wrongAnswer))
        }
        this.answerIndex = Math.floor(Math.random() * 4)
        answerChoices.splice(this.answerIndex, 0, math.format(answer))

        return answerChoices
    }
}

class Plus extends Operator {
    generateQuestionString() {
        super.generateQuestionString()
        // If regrouping is false and both numbers are integers...
        if (!this.regrouping &&
            this.leftNum instanceof number.Integer &&
            this.rightNum instanceof number.Integer) {
                // Adjust the generated numbers so that no digit requires regrouping.
                this.#adjustForNoRegrouping()
        }

        return this.leftNum.valueToString() + ' + ' + this.rightNum.valueToString()
    }

    #adjustForNoRegrouping() {
        // Convert numbers to string and pad with 0 to make indexing easier.
        const maxDigits = Math.max(this.leftNum.digits, this.rightNum.digits)
        const leftNumValue = this.leftNum.value.toString().padStart(maxDigits, 0)
        const rightNumValue = this.rightNum.value.toString().padStart(maxDigits, 0)
        // For each place value, starting from the "one's place"...
        for (let i = maxDigits - 1; i >= 0; i--) {
            const digitOfLeft = parseInt(leftNumValue[i])
            const digitOfRight = parseInt(rightNumValue[i])
            // If the sum of the given place value is greater than 10...
            if (digitOfLeft + digitOfRight > 9) {
                const amountOverNine = digitOfLeft + digitOfRight - 9
                // Subtract the amount-over-nine from the given digit from either number.
                if (Math.round(Math.random() * 1)) {
                    this.leftNum.value = this.leftNum.value - amountOverNine * 10 ** (maxDigits - 1 - i)
                } else {
                    this.rightNum.value = this.rightNum.value - amountOverNine * 10 ** (maxDigits - 1 - i)
                }
            }
        }
    }
}

class Minus extends Operator {
    generateQuestionString() {
        super.generateQuestionString()
        // Prevent negative answers (may expand to be optional later)
        if (this.leftNum.value < this.rightNum.value) {
            const temp = this.leftNum
            this.leftNum = this.rightNum
            this.rightNum = temp
        }
        // If regrouping is false and both numbers are integers...
        if (!this.regrouping &&
            this.leftNum instanceof number.Integer
            && this.rightNum instanceof number.Integer) {
                // Adjust the generated numbers so that no digit requires regrouping.
                this.#adjustForNoRegrouping()
        }
        
        return this.leftNum.valueToString() + ' - ' + this.rightNum.valueToString()
    }

    #adjustForNoRegrouping() {
        // Convert numbers to string, pad with 0, then conver to array of digits to make indexing easier.
        const maxDigits = Math.max(this.leftNum.digits, this.rightNum.digits)
        const leftNumValue = this.leftNum.toString().padStart(maxDigits, 0).split('')
        const rightNumValue = this.rightNum.toString().padStart(maxDigits, 0).split('')
        for (let i = maxDigits - 1; i >= 0; i--) {
            const digitOfLeft = parseInt(leftNumValue[i])
            const digitOfRight = parseInt(rightNumValue[i])
            // If the difference of the given place value is less than 0...
            if (digitOfLeft - digitOfRight < 0) {
                // Switch the digits so the greater number is in leftNum.
                leftNumValue[i] = digitOfRight
                rightNumValue[i] = digitOfLeft
                this.leftNum = parseInt(leftNum.join(''))
                this.rightNum = parseInt(rightNum.join(''))
            }
        }
    }
}

class Times extends Operator {
    generateQuestionString() {
        super.generateQuestionString()

        // If regrouping is false and both numbers are integers...
        if (!this.regrouping &&
            this.leftNumType instanceof number.Integer &&
            this.rightNumType instanceof number.Integer) {
                this.#adjustFoRegrouping()
        }

        return this.leftNum.valueToString() + ' x ' + this.rightNum.valueToString()
    }

    #adjustFoRegrouping() {
        // Convert numbers to array of digits to make indexing easier.
        const leftNumValue = this.leftNum.toString().split('')
        const rightNumValue = this.rightNum.toString().split('')
        // For every digit in the right number starting from the one's digit...
        for (let i = rightNumValue.length - 1; i >= 0; i--) {
            const digitOfRight = rightNumValue[i]
            // And for every digit in the left number starting from the one's digit...
            for (let j = leftNumValue.length - 1; j >= 0; j--) {
                const digitOfLeft = leftNumValue[j]
                // If the product of the respective digits is greater than 9...
                if (digitOfRight * digitOfLeft > 9) {
                    let amountOverNine = leftNumValue[j] * rightNumValue[i] - 9
                    while (amountOverNine > 0) {
                        // Randomly decrement one of the digits.
                        Math.round(Math.random() * 1) ? rightNumValue[i]-- : leftNumValue[j]--
                        amountOverNine = leftNumValue[j] * rightNumValue[i] - 9
                    }
                }
            }
        }
        this.leftNum = leftNumValue.join('')
        this.rightNum = rightNumValue.join('')
    }
}

class DivideBy extends Operator {
    remainderRequired

    constructor(leftNum, rightNum, hasRemainder) {
        super(leftNum, rightNum)
        this.remainderRequired = hasRemainder
    }

    generateQuestionString() {
        super.generateQuestionString()
        // If remainder is false and both numbers are integers...
        if (!this.remainderRequired && this.leftNum instanceof number.Integer && this.rightNum instanceof number.Integer) {
            // Subtract the remainder from the dividend.
            const remainder = this.leftNum % this.rightNum
            this.leftNum -= remainder
        }
        return this.leftNum.valueToString() + ' / ' + this.rightNum.valueToString()
    }
}

module.exports = {Operator: Operator, Plus: Plus, Minus: Minus, Times: Times, DivideBy: DivideBy}