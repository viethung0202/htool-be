require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(
  cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173', credentials: true }),
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', require('./common/auth/routes'));

const { requireAuth } = require('./common/middleware/authMiddleware');
app.use('/api/video', requireAuth, require('./tools/video/routes'));
app.use('/api/tasks', requireAuth, require('./tools/tasks/routes'));
app.use('/api/content', requireAuth, require('./tools/content/routes'));

module.exports = app;
