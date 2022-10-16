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

        // If regrouping is false and both numbers are integers...
        const numbersAreRegroupable =
            (this.leftNum instanceof number.Integer ||
            this.leftNum instanceof number.Decimal) &&
            (this.rightNum instanceof number.Integer ||
            this.rightNum instanceof number.Decimal)
        if (!this.regrouping && numbersAreRegroupable) {
                this.adjustForNoRegrouping()
            }
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

    adjustForNoRegrouping() {
        console.log('Function meant to be overriden by subclasses')
    }
}

class Plus extends Operator {
    generateQuestionString() {
        super.generateQuestionString()

        return this.leftNum.valueToString() + ' + ' + this.rightNum.valueToString()
    }

    adjustForNoRegrouping() {
        console.log('adjustForNoRegrouping')
        console.log('   leftNum:', this.leftNum.value, 'rightNum:', this.rightNum.value)
        const numWithMostDigits = this.leftNum.digits > this.rightNum.digits ? this.leftNum : this.rightNum
        const decimalPlaces = numWithMostDigits.decimalPlaces || 0
        let valueL = this.leftNum.value
        let valueR = this.rightNum.value
        let digitL, digitR;
        for (let i = numWithMostDigits.digits - decimalPlaces - 1; i >= -decimalPlaces; i--) {
            digitL = Math.round(valueL / 10**i)
            valueL -= digitL * 10**i
            digitR = Math.round(valueR / 10**i)
            valueR -= digitR * 10**i
            console.log(`   digitL: ${digitL}  digitR: ${digitR} in ${10**i}'s place`)

            if (digitL + digitR < 10) continue
            while (digitL + digitR + Math.floor(Math.random() * 10) >= 10) {
                const coinFlip = Math.round(Math.random())
                if (coinFlip && digitL > 0) {
                    this.leftNum.value -= 10**i
                    digitL--
                } else {
                    this.rightNum.value -= 10**i
                    digitR--
                }
                console.log('       ', digitL, '+', digitR, '=', digitL + digitR)
            }
        }       
    }
}

class Minus extends Operator {
    generateQuestionString() {
        // Prevent negative answers (may expand to be optional later)
        if (this.leftNum.value < this.rightNum.value) {
            const temp = this.leftNum
            this.leftNum = this.rightNum
            this.rightNum = temp
        }

        super.generateQuestionString()
        
        return this.leftNum.valueToString() + ' - ' + this.rightNum.valueToString()
    }

    adjustForNoRegrouping() {
        console.log('original:', this.leftNum.value, '-', this.rightNum.value)
        // Convert numbers to string, pad with 0, then conver to array of digits to make indexing easier.
        const maxDigits = Math.max(this.leftNum.digits, this.rightNum.digits)
        const leftNumValue = this.leftNum.value.toString().padStart(maxDigits, 0).split('')
        const rightNumValue = this.rightNum.value.toString().padStart(maxDigits, 0).split('')
        for (let i = maxDigits - 1; i >= 0; i--) {
            const digitOfLeft = parseInt(leftNumValue[i])
            const digitOfRight = parseInt(rightNumValue[i])
            // If the difference of the given place value is less than 0...
            if (digitOfLeft - digitOfRight < 0) {
                console.log('digitOfLeft:', digitOfLeft, 'digitOfRight:', digitOfRight)
                // Switch the digits so the greater number is in leftNum.
                leftNumValue[i] = digitOfRight
                rightNumValue[i] = digitOfLeft
                this.leftNum.value = parseInt(leftNumValue.join(''))
                this.rightNum.value = parseInt(rightNumValue.join(''))
            }
        }
    }
}

class Times extends Operator {
    generateQuestionString() {
        super.generateQuestionString()

        return this.leftNum.valueToString() + ' x ' + this.rightNum.valueToString()
    }

    adjustForNoRegrouping() {
        // Convert numbers to array of digits to make indexing easier.
        const leftNumValue = this.leftNum.value.toString().split('')
        const rightNumValue = this.rightNum.value.toString().split('')
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
        this.leftNum.value = parseInt(leftNumValue.join(''))
        this.rightNum.value = parseInt(rightNumValue.join(''))
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

const dec1 = new number.Decimal('positive', 1, 1)
const dec2 = new number.Decimal('positive', 1, 1)
const plus = new Plus(dec1, dec2, false)
console.log(plus.generateQuestionString())

module.exports = {Operator: Operator, Plus: Plus, Minus: Minus, Times: Times, DivideBy: DivideBy}