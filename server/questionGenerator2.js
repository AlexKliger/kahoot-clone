const QUESTION_CATEGORY = {
    ARITHMETIC: 'arithmetic',
    FRACTIONS: 'fractions'
}

const OPERATION = {
    ADDITION: '+',
    SUBTRACTION: '-',
    MULTIPLICATION: '*',
    DIVISION: '/'
}

const OPTIONS = {
    CARRYING: 'carrying',
    BORROWING: 'borrowing',
    REMAINDERS: 'remainders'
}

const QUESTION = {
    QUESTION_CATEGORY: QUESTION_CATEGORY,
    OPERATION: OPERATION,
    OPTIONS: OPTIONS
}

function generateQuestions(questionCount, config) {
    const questions = []
    for (let i = 0; i < questionCount; i++) {
        questions.push(generateQuestion(config))
    }

    return questions
}

function generateQuestion(config) {
    switch (config.category) {
        case QUESTION_CATEGORY.ARITHMETIC:
            const operator = config.operators[Math.floor(Math.random() * config.operators.length)]
            return generateArithmeticQuestion(operator, config.digits)
        case QUESTION_CATEGORY.FRACTIONS:
            break
        default:
            return null
    }
}

function generateArithmeticQuestion(operator, digits) {
    switch (operator) {
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
    const answer = num1 + num2
    return { question: num1 + ' + ' + num2, answer: answer, choices: generateAnswerChoices(answer, 4) }
}

function generateSubtractionQuestion(range) {
    // Generate a subtraction question where the second number is always less than the first.
    // Question may include regrouping and answer will never be negative.
    const num1 = Math.floor(Math.random() * (range.max - range.min) + range.min)
    const num2 = Math.floor(Math.random() * (num1 - range.min) + range.min)
    const answer = num1 - num2
    return { question: num1 + ' - ' + num2, answer: answer, choices: generateAnswerChoices(answer, 4) }
}

function generateAnswerChoices(correctAnswer, choiceCount) {
    const choices = [correctAnswer]
    while (choices.length < choiceCount) {
        const offset = Math.random() * correctAnswer * (Math.random() > 0.5 ? 1 : -1)
        const wrongAnswer = Math.floor(correctAnswer + offset)
        !choices.includes(wrongAnswer) && choices.push(wrongAnswer)
    }
    return choices
}

console.log(generateQuestions(5, {category: 'arithmetic', operators: ['+', '-'], digits: 3}))