const express = require('express');
const taskController = require('./controllers/taskController');

const router = express.Router();

router.get('/boards', taskController.listBoards);
router.post('/boards', taskController.createBoard);
router.post('/lists', taskController.createList);
router.post('/cards', taskController.createCard);

module.exports = router;
