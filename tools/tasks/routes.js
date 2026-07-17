const express = require('express');
const taskController = require('./controllers/taskController');

const router = express.Router();

router.get('/boards', taskController.listBoards);
router.post('/boards', taskController.createBoard);
router.get('/boards/:id', taskController.getBoard);
router.patch('/boards/:id', taskController.updateBoard);
router.delete('/boards/:id', taskController.deleteBoard);

router.post('/lists', taskController.createList);
router.patch('/lists/:id', taskController.updateList);
router.delete('/lists/:id', taskController.deleteList);

router.post('/cards', taskController.createCard);
router.patch('/cards/:id', taskController.updateCard);
router.delete('/cards/:id', taskController.deleteCard);

module.exports = router;
