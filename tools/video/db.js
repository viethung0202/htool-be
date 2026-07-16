const mongoose = require('mongoose');

const conn = mongoose.createConnection(process.env.VIDEO_DB_URL);

module.exports = conn;
