const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    choices: {
        type: Array,
        require: true
    },
    answer: {
        type: Number,
        required: true
    }  
})

module.exports = QuestionSchema