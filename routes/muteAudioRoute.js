const express = require('express');
const router = express.Router();
const { muteAudioController } = require('../controller/muteAudioController');

router.post('/', muteAudioController);

module.exports = router;
