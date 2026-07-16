const mongoose = require('mongoose');

const conn = mongoose.createConnection(process.env.VIDEO_DB_URL || 'mongodb://unset/video');

// Prevents an unreachable/unset VIDEO_DB_URL from crashing the whole process —
// requests to this tool will fail, other tools keep working.
conn.on('error', (err) => {
  console.error('[video db] connection error:', err.message);
});

module.exports = conn;
