const QUESTION_TYPE = {
    ARITHMETIC: 'arithmetic',
    FRACTIONS: 'fractions'
}

function generateQuestions(questionCount, config) {
    const questions = []
    for (let i = 0; i < question; i++) {
        questions.push(generateQuestion(config))
    }

    return questions
}

function generateRandomQuestion(config) {
    const question = {}
    switch (config.type) {
        case QUESTION_TYPE.ARITHMETIC:
            const operator = random.choice(config.operators)
            return generateArithmeticQuestion(operator, config.digits)
        case QUESTION_TYPE.FRACTIONS:
            break
        default:
            return null
    }
}

function generateArithmeticQuestion(operator, digits) {
    switch(operator) {
        case '+':
            return generateAdditionQuestion(generateRange(digits))
        case '-':
            return generateSubtractionQuestion(generateRange(digits))
        case '*':
            break
        case '/':
            break
        default:
            return null
    }
}

function generateRange(digits) {
    const max = parseInt(Array(digits).fill(9).join(''))
    const min = parseInt(1 + Array(digits - 1).fill(0).join(''))
    return {min: min, max: max}
}

function generateAdditionQuestion(range) {
    // Generate an addition question.
    // Question may include regrouping.
    const num1 = Math.floor(Math.random() * (range.max - range.min) + range.min)
    const num2 = Math.floor(Math.random() * (range.max - range.min) + range.min)
    return num1 + '+' + num2
}

function generateSubtractionQuestion(range) {
    // Generate a subtraction question where the second number is always less than the first.
    // Question may include regrouping and answer will never be negative.
    const num1 = Math.floor(Math.random() * (range.max - range.min) + range.min)
    const num2 = Math.floor(Math.random() * (num1 - range.min) + range.min)
    return num1 + '-' + num2
}