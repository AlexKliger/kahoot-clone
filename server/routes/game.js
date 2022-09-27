const express = require('express')
const gameController = require('../controllers/game')
const questionRouter = require('../routes/question')

const router = express.Router()
router.use('/questions', questionRouter)

router.post('/create', gameController.create)
router.post('/join', gameController.join)
router.post('/leave', gameController.leave)
router.post('/start', gameController.start)
router.post('/reset', gameController.reset)

module.exports = router