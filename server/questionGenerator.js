class QuestionGenerator {
    leftNum
    rightNum
    operation

    constructor(leftNum, rightNum, operation) {
        this.leftNum = leftNum
        this.rightNum = rightNum
        this.operation = operation
    }
}

SIGN = {
    POSITIVE: 'positive',
    NEGATIVE: 'negative'
}

// Numbers
class Number {
    sign

    constructor(sign) {
        this.sign = sign
    }

    generateNumber() {
        console.log('Overide base class implementation.')
    }
}

class Integer extends Number {
    digits

    constructor(sign, digits) {
        super(sign)
        this.digits = digits
    }

    generateNumber() {
        const max = parseInt(Array(this.digits).fill(9).join(''))
        const min = parseInt(1 + Array(this.digits - 1).fill(0).join(''))
        return Math.floor(Math.random() * (max - min) + min) * (this.sign === SIGN.POSITIVE ? 1 : -1)
    }
}

// Operators
class Operator {
    regrouping

    constructor(regrouping) {
        this.regrouping
    }

    generateQuestion() {
        console.log('Overide base class implemenation.')
    }
}

class Plus extends Operator {
    leftNum
    rightNum

    generateQuestion(leftNumType, rightNumType) {
        this.leftNum = leftNumType.generateNumber()
        this.rightNum = rightNumType.generateNumber()
        console.log('original leftNum:', this.leftNum, '  rightNum:', this.rightNum)
        // If regrouping is false and both numbers are integers...
        if (!this.regrouping && leftNumType instanceof Integer && rightNumType instanceof Integer) {
            // Convert numbers to string and pad with 0 to make indexing easier.
            const maxDigits = Math.max(leftNumType.digits, rightNumType.digits)
            const leftNum = this.leftNum.toString().padStart(maxDigits, 0)
            const rightNum = this.rightNum.toString().padStart(maxDigits, 0)
            // For each place value, starting from the "one's place"...
            for (let i = maxDigits - 1; i >= 0; i--) {
                console.log('place value index:', i)
                const digitOfLeft = parseInt(leftNum[i])
                const digitOfRight = parseInt(rightNum[i])
                // If the sum of the given place value is greater than 10...
                if (digitOfLeft + digitOfRight > 9) {
                    const amountOverNine = digitOfLeft + digitOfRight - 9
                    console.log('   place value index sum over 9')
                    console.log('   amount over nine:', amountOverNine)
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

const integer1 = new Integer('positive', 3)
const integer2= new Integer('positive', 2)
const plus = new Plus(false)
console.log(plus.generateQuestion(integer1, integer2))