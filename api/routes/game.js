const express = require('express');
const GameController = require('../controller/gameController');

const router = express.Router();

router.get('/game', GameController.getGameHistory);
router.post('/game', GameController.postGame);
router.get('/game-analysis', GameController.getGameAnalysis);

module.exports = router;