const express = require('express');
const videoController = require('./controllers/videoController');

const router = express.Router();

router.get('/', videoController.list);
router.post('/', videoController.create);

module.exports = router;
