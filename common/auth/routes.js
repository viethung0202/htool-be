const express = require('express');
const authController = require('./controllers/authController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', requireAuth, authController.logout);

router.get('/users', requireAuth, requireAdmin, authController.listUsers);
router.patch('/users/:id/accept', requireAuth, requireAdmin, authController.setAccept);

module.exports = router;
