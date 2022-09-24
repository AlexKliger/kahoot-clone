const express = require('express')
const gameController = require('../controllers/game')

const router = express.Router()

router.post('/create', gameController.create)
router.post('/join', gameController.join)
router.post('/leave', gameController.leave)

module.exports = router