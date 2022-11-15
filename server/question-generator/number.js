const { all } = require('mathjs')
const math = require('mathjs')

const SIGN = {
    POSITIVE: 'positive',
    NEGATIVE: 'negative'
}

class Number {
    sign
    value

    constructor({sign = 'positive'}) {
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

    constructor({sign = 'positive', digits = 1}) {
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

    constructor({sign = 'positive', digits = 1, decimalPlaces = 1}) {
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
    allowImproper

    constructor({sign = 'positive', digitsInNum = 1, digitsInDen = 1, allowImproper = false}) {
        super(sign)
        this.digitsInNum = digitsInNum
        this.digitsInDen = digitsInDen
        this.allowImproper = allowImproper
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
        if (numerator > denominator && !this.allowImproper) {
            // Swap larger numerator for smaller denominator.
            [numerator, denominator] = [denominator, numerator]
        }
        this.value = math.fraction(numerator * (this.sign === SIGN.POSITIVE ? 1 : -1), denominator)
        return this.value
    }
}

module.exports = { Number: Number, Integer: Integer, Decimal: Decimal, Fraction: Fraction }