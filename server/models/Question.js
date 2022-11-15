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
    answerIndex: {
        type: Number,
        required: true
    },
    submittedAnswers: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    timestamp: {
        type: Date,
    }
},
{ minimize: false }) // Needed to override mongoose default of not saving empty objects.

module.exports = QuestionSchema