require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

app.use('/api/video', require('./tools/video/routes'));

module.exports = app;
