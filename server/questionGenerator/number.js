const SIGN = {
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

module.exports = { Number: Number, Integer: Integer }