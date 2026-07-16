const { Schema } = require('mongoose');
const conn = require('../db');

const videoSchema = new Schema(
  {
    title: { type: String, required: true },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true },
);

module.exports = conn.model('Video', videoSchema);
