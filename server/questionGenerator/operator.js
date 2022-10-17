const { round } = require('mathjs')
const math = require('mathjs')
const number = require('./number')

function roundAccurately(number, decimalPlaces) {
    /*
    JS lacks floating point precision and resultes in floating errors. This made parsing
    decimal place digits difficult. I found this solution that accurately rounds to the
    neares given decimal place.
    */
    return Number(Math.round(number + `e${decimalPlaces}`) + `e-${decimalPlaces}`)
}

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
        // For each digit, starting at the farthest right...
        for (let i = numWithMostDigits.digits - decimalPlaces - 1; i >= -decimalPlaces; i--) {
            // Parse left digit
            digitL = Math.floor(roundAccurately(valueL / 10**i, decimalPlaces))
            valueL = roundAccurately(valueL - digitL * 10**i, decimalPlaces)
            // Parse right digit
            digitR = Math.floor(roundAccurately(valueR / 10**i, decimalPlaces))
            valueR = roundAccurately(valueR - digitR * 10**i, decimalPlaces)
            console.log(`   digitL: ${digitL}  digitR: ${digitR} in ${10**i}'s place`)

            // If the sum of the digits is less then 10 then nothing needs to be adjusted.
            if (digitL + digitR < 10) continue
            // Randomly adjust either digit until their sum is less than 10 by a random amount between 1 and 9
            const offset = Math.floor(Math.random() * 5)
            while (digitL + digitR + offset >= 10) {
                const coinFlip = Math.round(Math.random())
                if (coinFlip && digitL > 0) {
                    this.leftNum.value = roundAccurately(this.leftNum.value - 10**i, decimalPlaces)
                    digitL--
                } else {
                    this.rightNum.value = roundAccurately(this.rightNum.value - 10**i, decimalPlaces)
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
        console.log('adjustForNoRegrouping')
        console.log('   leftNum:', this.leftNum.value, 'rightNum:', this.rightNum.value)
        const numWithMostDigits = this.leftNum.digits > this.rightNum.digits ? this.leftNum : this.rightNum
        const decimalPlaces = numWithMostDigits.decimalPlaces || 0
        let valueL = this.leftNum.value
        let valueR = this.rightNum.value
        let digitL, digitR;
        // For each digit, starting at the farthest right...
        for (let i = numWithMostDigits.digits - decimalPlaces - 1; i >= -decimalPlaces; i--) {
            // Parse left digit
            digitL = Math.floor(roundAccurately(valueL / 10**i, decimalPlaces))
            valueL = roundAccurately(valueL - digitL * 10**i, decimalPlaces)
            // Parse right digit
            digitR = Math.floor(roundAccurately(valueR / 10**i, decimalPlaces))
            valueR = roundAccurately(valueR - digitR * 10**i, decimalPlaces)

            console.log(`   ${10**i}'s place: digitL: ${digitL}  digitR: ${digitR}`)
            // If the left digit is greater than the right digit, nothing needs to be done
            if (digitL >= digitR) continue
            console.log('       digitL < digitR')
            // Randomly increment either the left or right digit until the left digit is greater than the right digit buy a random offset.
            const offset = Math.floor(Math.random() * 10)
            while (digitL < digitR + offset) {
                const coinFlip = Math.round(Math.random())
                if (coinFlip && digitL < 9) {
                    this.leftNum.value = roundAccurately(this.leftNum.value + 10**i, decimalPlaces)
                    digitL++
                } else {
                    this.rightNum.value = roundAccurately(this.rightNum.value - 10**i, decimalPlaces)
                    digitR--
                }
                console.log('       digitL:', digitL, 'digitR:', digitR)
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

const num1 = new number.Decimal('positive', 4, 2)
const num2 = new number.Decimal('positive', 4, 2)
const plus = new Plus(num1, num2, false)
console.log(plus.generateQuestionString())

module.exports = {Operator: Operator, Plus: Plus, Minus: Minus, Times: Times, DivideBy: DivideBy}