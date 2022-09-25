var express = require('express')
var questionController = require('../controllers/question')

const router = express.Router()

router.post('/next', questionController.next)
router.post('/previous', questionController.previous)

module.exports = router