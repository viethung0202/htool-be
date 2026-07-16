require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

app.use('/api/auth', require('./common/auth/routes'));

const requireAuth = require('./common/middleware/authMiddleware');
app.use('/api/video', requireAuth, require('./tools/video/routes'));
app.use('/api/tasks', requireAuth, require('./tools/tasks/routes'));

module.exports = app;
