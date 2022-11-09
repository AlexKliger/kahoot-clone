var express = require('express')
var questionController = require('../controllers/question')

const router = express.Router()

router.post('/next', questionController.next)
router.post('/previous', questionController.previous)
router.post('/submitAnswer/:questionId', questionController.submitAnswer)

module.exports = router