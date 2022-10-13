const math = require('mathjs')

const SIGN = {
    POSITIVE: 'positive',
    NEGATIVE: 'negative'
}

class Number {
    sign
    value

    constructor(sign) {
        this.sign = sign
    }

    generateNewValue() {
        console.log('Overide base class implementation.')
    }

    valueToString() {
        return math.format(this.value)
    }
}

class Integer extends Number {
    digits

    constructor(sign, digits) {
        super(sign)
        this.digits = digits
    }

    generateNewValue() {
        const max = parseInt(Array(this.digits).fill(9).join(''))
        const min = parseInt(1 + Array(this.digits - 1).fill(0).join(''))
        this.value = Math.floor(Math.random() * (max - min) + min) * (this.sign === SIGN.POSITIVE ? 1 : -1)
        return this.value
    }
}

class Decimal extends Integer {
    decimalPlaces

    constructor(sign, digits, decimalPlaces) {
        super(sign, digits)
        this.decimalPlaces = decimalPlaces
    }

    generateNewValue() {
        super.generateNewValue()
        this.value = this.value / 10 ** this.decimalPlaces
        return this.value
    }
}

class Fraction extends Number {
    digitsInNum
    digitsInDen
    improper

    constructor(sign, digitsInNum, digitsInDen) {
        super(sign)
        this.digitsInNum = digitsInNum
        this.digitsInDen = digitsInDen
    }

    #generateNumerator() {
        const max = parseInt(Array(this.digitsInNum).fill(9).join(''))
        const min = parseInt(1 + Array(this.digitsInNum - 1).fill(0).join(''))
        return Math.floor(Math.random() * (max - min) + min)
    }

    #generateDenominator() {
        const max = parseInt(Array(this.digitsInDen).fill(9).join(''))
        const min = parseInt(1 + Array(this.digitsInDen - 1).fill(0).join(''))
        return Math.floor(Math.random() * (max - min) + min)
    }

    generateNewValue() {
        let numerator = this.#generateNumerator()
        let denominator = this.#generateDenominator()
        if (this.improper && numerator < denominator) {
            let temp = numerator
            numerator = denominator
            denominator = temp
        } else if (!this.improper && numerator > denominator) {
            let temp = numerator
            numerator = denominator
            denominator = temp
        }
        this.value = math.fraction(numerator * (this.sign === SIGN.POSITIVE ? 1 : -1), denominator)
        return this.value
    }
}

module.exports = { Number: Number, Integer: Integer, Decimal: Decimal, Fraction: Fraction }