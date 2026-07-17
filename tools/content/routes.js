const express = require('express');
const contentController = require('./controllers/contentController');

const router = express.Router();

router.get('/items', contentController.listItems);
router.post('/items', contentController.createItem);
router.patch('/items/:id', contentController.updateItem);
router.delete('/items/:id', contentController.deleteItem);

module.exports = router;
