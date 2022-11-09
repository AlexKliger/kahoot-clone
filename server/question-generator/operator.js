const math = require('mathjs')
const { Integer, Decimal, Fraction } = require('./number')
const number = require('./number')

// Normal distribution using Box-Muller transform
function normalDistribution() {
    const u = 1 - Math.random()
    const v = Math.random()
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
}

// Operators
class Operator {
    leftNum
    rightNum
    regrouping
    allowImproperFractions = false
    commonDenominators
    answerChoiceCount = 4
    answerIndex

    constructor(leftNum, rightNum, {regrouping = true, commonDenominators = false}) {
        this.leftNum = leftNum
        this.rightNum = rightNum
        this.regrouping = regrouping
        this.commonDenominators = commonDenominators
    }

    generateQuestionString() {
        const leftNum = this.leftNum
        const rightNum = this.rightNum

        // Set whether fraction objects generate improper fractions.
        if (leftNum instanceof number.Fraction) leftNum.allowImproper = this.allowImproperFractions
        if (rightNum instanceof number.Fraction) rightNum.allowImproper = this.allowImproperFractions

        leftNum.generateNewValue()
        rightNum.generateNewValue()

        // Adjust integers and decimals if regrouping is not selected.
        const numbersAreRegroupable =
            (leftNum instanceof number.Integer ||
            leftNum instanceof number.Decimal) &&
            (rightNum instanceof number.Integer ||
            rightNum instanceof number.Decimal)
        if (!this.regrouping && numbersAreRegroupable) {
                this.adjustForNoRegrouping()
            }

        // Adjust fractions
        if (leftNum instanceof number.Fraction &&
            rightNum instanceof number.Fraction) {
            // Adjust if sum is improper
            if (!this.allowImproperFractions) {
                let answer = math.add(leftNum.value, rightNum.value)
                while (answer.n > answer.d) {
                    const coinFlip = Math.round(Math.random())
                    if (coinFlip) {
                        leftNum.value.d++
                    } else {
                        rightNum.value.d++
                    }
                    answer = math.add(leftNum.value, rightNum.value)
                }
            }
            // Adjust for common denominators
            // Set both denominators to the larger of the two
            if (this.commonDenominators) {
                if (leftNum.value.d > rightNum.value.d) {
                    rightNum.value.d = leftNum.value.d
                } else {
                    leftNum.value.d = rightNum.value.d
                }
            }
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

        // Generate unique answer choices.
        while (answerChoices.length < this.answerChoiceCount - 1) {
            let wrongAnswer
            if (this.leftNum instanceof number.Fraction || this.rightNum instanceof number.Fraction) {
                const offsetNum = Math.round(answer.n * normalDistribution())
                const offsetDen = Math.round(answer.d * normalDistribution())
                wrongAnswer = math.fraction(answer.n + offsetNum, answer.d + offsetDen || 1)
            } else if (this.leftNum instanceof number.Decimal || this.rightNum instanceof number.Decimal) {
                const offset = answer * normalDistribution()
                answer = math.round(answer, Math.max(this.leftNum.decimalPlaces, this.rightNum.decimalPlaces))
                wrongAnswer = math.round(answer + offset, Math.max(this.leftNum.decimalPlaces, this.rightNum.decimalPlaces))
            } else {
                const offset = Math.round((answer + 10) * normalDistribution())
                wrongAnswer = answer + offset
            }

            if (!answerChoices.includes(math.format(wrongAnswer)) && math.format(wrongAnswer) !== math.format(answer)) {
                answerChoices.push(math.format(wrongAnswer))
            }
        }
        // Insert the real answer into a random index.
        this.answerIndex = Math.floor(Math.random() * this.answerChoiceCount)
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
        // For each digit, starting at the farthest left...
        for (let i = numWithMostDigits.digits - decimalPlaces - 1; i >= -decimalPlaces; i--) {
            // Parse left and right digits
            if (i >= 0) {
                digitL = Math.floor(valueL / 10**i)
                digitR = Math.floor(valueR / 10**i)
            } else {
                digitL = Math.floor(math.round(valueL / 10**i, decimalPlaces))
                digitR = Math.floor(math.round(valueR / 10**i, decimalPlaces))
            }

            // Remove place value for next iteration of loop.
            console.log(`       digitL: ${digitL} in ${10**i}'s place`)
            valueL = math.round(valueL - digitL * 10**i, decimalPlaces)
            console.log(`       digitR: ${digitR} in ${10**i}'s place`)
            valueR = math.round(valueR - digitR * 10**i, decimalPlaces)

            // If the sum of the digits is less then 10 then nothing needs to be adjusted.
            if (digitL + digitR < 10) continue
            // Randomly adjust either digit until their sum is less than 10 by a random amount between 1 and 9
            const offset = Math.floor(Math.random() * 5)
            while (digitL + digitR + offset >= 10) {
                const coinFlip = Math.round(Math.random())
                if (coinFlip && digitL > 0) {
                    this.leftNum.value = math.round(this.leftNum.value - 10**i, decimalPlaces)
                    digitL--
                } else {
                    this.rightNum.value = math.round(this.rightNum.value - 10**i, decimalPlaces)
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
            // Parse left and right digits
            if (i >= 0) {
                digitL = Math.floor(valueL / 10**i)
                digitR = Math.floor(valueR / 10**i)
            } else {
                digitL = Math.floor(math.round(valueL / 10**i, decimalPlaces))
                digitR = Math.floor(math.round(valueR / 10**i, decimalPlaces))
            }

            // Remove place value for next iteration of loop.
            console.log(`       digitL: ${digitL} in ${10**i}'s place`)
            valueL = math.round(valueL - digitL * 10**i, decimalPlaces)
            console.log(`       digitR: ${digitR} in ${10**i}'s place`)
            valueR = math.round(valueR - digitR * 10**i, decimalPlaces)

            // If the left digit is greater than the right digit, nothing needs to be done
            if (digitL >= digitR) continue
            console.log('       digitL < digitR')
            // Randomly increment either the left or right digit until the left digit is greater than the right digit buy a random offset.
            const offset = Math.floor(Math.random() * 10)
            while (digitL - digitR < offset) {
                const coinFlip = Math.round(Math.random())
                if (coinFlip && digitL < 9) {
                    this.leftNum.value = math.round(this.leftNum.value + 10**i, decimalPlaces)
                    digitL++
                } else if (!coinFlip && digitR > 0) {
                    this.rightNum.value = math.round (this.rightNum.value - 10**i, decimalPlaces)
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
        console.log('adjustForNoRegrouping')
        console.log('   leftNum:', this.leftNum.value, 'rightNum:', this.rightNum.value)
        const decimalPlacesL = this.leftNum.decimalPlaces || 0
        const decimalPlacesR = this.rightNum.decimalPlaces || 0
        let valueL = this.leftNum.value
        let valueR = this.rightNum.value
        let digitL, digitR;
        // Parse digit of left number.
        for (let i = this.leftNum.digits - decimalPlacesL - 1; i >= -decimalPlacesL; i--) {
            if (i >= 0) {
                digitL = Math.floor(valueL / 10**i)
            } else {
                digitL = Math.floor(math.round(valueL / 10**i, decimalPlaces))
            }
            valueL = math.round(valueL - digitL * 10**i, decimalPlacesL)
            
            // Parse digit of right number.
            for (let j = this.rightNum.digits - decimalPlacesR - 1; j >= -decimalPlacesR; j--) {
                // Parse left and right digits
                if (i >= 0) {
                    digitR = Math.floor(valueR / 10**i)
                } else {
                    digitR = Math.floor(math.round(valueR / 10**i, decimalPlaces))
                }
                valueR = math.round(valueR - digitR * 10**i, decimalPlacesR)
                console.log(`   ${10**i}'s place: digitL: ${digitL}  digitR: ${digitR}`)

                if (digitL * digitR < 10) continue
                console.log('       digitL * digitR > 10')
                while (digitL * digitR >= 10) {
                    const coinFlip = Math.round(Math.random())
                    if (coinFlip && digitL > 0) {
                        this.leftNum.value = math.round(this.leftNum.value - 10**i, decimalPlacesL)
                        digitL--
                    } else {
                        this.leftNum.value = math.round(this.leftNum.value - 10**i, decimalPlacesR)
                        digitR--
                    }

                }
            }
        }
    }
}

class DivideBy extends Operator {
    remainderRequired

    constructor(leftNum, rightNum, hasRemainder) {
        super(leftNum, rightNum, true)
        this.remainderRequired = hasRemainder
    }

    generateQuestionString() {
        super.generateQuestionString()
        // If remainder is false and both numbers are integers...
        if (!this.remainderRequired && this.leftNum instanceof number.Integer && this.rightNum instanceof number.Integer) {
            // Subtract the remainder from the dividend.
            const remainder = this.leftNum.value % this.rightNum.value
            this.leftNum.value -= remainder
        }
        
        return this.leftNum.valueToString() + ' / ' + this.rightNum.valueToString()
    }
}

module.exports = {Operator: Operator, Plus: Plus, Minus: Minus, Times: Times, DivideBy: DivideBy}